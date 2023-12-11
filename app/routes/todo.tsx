import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/db.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const todos = await prisma.todo.findMany({});

  return json({ todos });
};

export default function TODORoute() {
  const todos = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto flex flex-col space-y-8 justify-center items-center mt-28">
      <ul className="flex flex-col space-y-4">
        {todos.todos.map((todo) => (
          <li className="border-b border-gray-500 min-w-[300px]">
            {todo.body}
          </li>
        ))}
      </ul>
    </div>
  );
}
