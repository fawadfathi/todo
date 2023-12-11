import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/db.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const body = formData.get("body") as string;
  const status = formData.get("status") as string;

  const newTodo = await prisma.todo.create({ data: { body, status } });

  return json({ todo: newTodo });
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const allTodos = await prisma.todo.findMany({});

  return json({ todos: allTodos });
};

export default function NewTodoRoute() {
  const allTodo = useLoaderData<typeof loader>();

  return (
    <>
      <Form
        method="post"
        action="/todos/new"
        className="mx-auto flex flex-col space-y-8 justify-center items-center mt-28"
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="body">Body</Label>
          <Input type="text" id="body" placeholder="Body" name="body" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="status">Status</Label>
          <Input type="text" id="status" placeholder="Status" name="status" />
        </div>
        <Button type="submit" variant="outline">
          Save
        </Button>
      </Form>

      <div className="mx-auto flex flex-col space-y-8 justify-center items-center mt-28">
        <ul className="flex flex-col space-y-4">
          {allTodo.todos.map((todo) => (
            <li className="border-b border-gray-500 min-w-[300px]">
              {todo.body}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
