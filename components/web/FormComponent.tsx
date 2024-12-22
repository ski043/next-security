"use client";

import { createTask } from "@/app/actions";
import { Button } from "../ui/button";
import { CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useActionState } from "react";

export function FormComponent() {
  const [state, formAction, isPending] = useActionState(createTask, {
    message: "",
  });
  return (
    <form action={formAction}>
      <CardContent className="grid gap-y-4">
        <div>
          <Label>Task Name</Label>
          <Input name="name" placeholder="Task Name" />
        </div>
        <div>
          <Label>User Email</Label>
          <Input name="email" placeholder="User Email" />
        </div>
        {state.message && <p className="text-red-500">{state.message}</p>}
      </CardContent>
      <CardFooter>
        <Button disabled={isPending}>
          {isPending ? "Creating..." : "Create Task"}
        </Button>
      </CardFooter>
    </form>
  );
}
