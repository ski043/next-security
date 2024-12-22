import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import prisma from "./utils/db";
import { FormComponent } from "@/components/web/FormComponent";

async function getTasks() {
  const tasks = await prisma.task.findMany();
  return tasks;
}

export default async function Home() {
  const tasks = await getTasks();
  return (
    <div className="max-w-sm mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create a new Task</CardTitle>
          <CardDescription>Create a new task to get started</CardDescription>
        </CardHeader>
        <FormComponent />
      </Card>
      <Separator className="my-5" />
      <div>
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg mb-2"
          >
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm font-medium">
              Task #{index + 1}
            </span>
            <p className="text-gray-700">{task.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
