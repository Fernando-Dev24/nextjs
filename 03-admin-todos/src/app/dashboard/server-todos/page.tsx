export const dynamic = "force-dynamic"; // no guarda nada en cache
export const revalidate = 0; // fuerza a que la pagina se vuelva a construir cada que el usuario entra y sale de la misma, esto para obtener la ultima actualizacion de la base de datos en caso que otros usuario esten actualizando la misma data que nosotros

import prisma from "@/app/lib/prisma";
import { TodosGrid } from "../../../todos/components/TodosGrid";
import { NewTodo } from "../../../todos/components/NewTodo";

export default async function ServerTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  return (
    <>
      <span className="text-3xl mb-10">Server actions</span>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  );
}
