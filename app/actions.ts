/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import prisma from "./utils/db";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { schema } from "./utils/zodSchemas";
import arcjet, { validateEmail } from "./utils/arcjet";
import { request } from "@arcjet/next";

const aj = arcjet.withRule(
  validateEmail({
    mode: "LIVE",
    block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
  })
);

export async function createTask(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }

  const validatedFields = schema.safeParse({
    email: formData.get("email"),
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      message: "Some Fields are not filled out",
    };
  }

  const req = await request();
  const decision = await aj.protect(req, {
    email: validatedFields.data.email,
  });

  if (decision.isDenied()) {
    return {
      message: "Email is not valid",
    };
  }

  await prisma.task.create({
    data: {
      email: formData.get("email") as string,
      name: formData.get("name") as string,
    },
  });

  revalidatePath("/");
  return { message: true };
}

export async function createBlog(formData: FormData) {
  const content = formData.get("content");
  await prisma.blog.create({
    data: {
      content: content as string,
    },
  });

  revalidatePath("/example-4");
}
