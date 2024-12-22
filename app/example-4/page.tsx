import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import prisma from "../utils/db";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createBlog } from "../actions";

async function getBlogs() {
  const blogs = await prisma.blog.findMany();
  return blogs;
}

const CreateBlog = async () => {
  const blogs = await getBlogs();
  return (
    <div className="max-w-sm mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create a blog article</CardTitle>
          <CardDescription>Create a new blog article</CardDescription>
        </CardHeader>
        <form action={createBlog}>
          <CardContent className="grid gap-y-4">
            <div>
              <Label>Blog Content</Label>
              <Textarea name="content" placeholder="Blog Content" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Create Blog</Button>
          </CardFooter>
        </form>
      </Card>
      <Separator className="my-5" />
      <div>
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg mb-2"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CreateBlog;
