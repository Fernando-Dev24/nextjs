"use server";

import prisma from "@/app/lib/prisma";
import { getUserSession } from "@/auth/actions/auth-actions";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const sleep = async (seconds: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo | void> => {
  // await sleep(3);

  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    throw `Todo con ID: ${id} no encontrado`;
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath("/dashboard/server-todos");
  return updatedTodo;
};

export const createTodo = async (description: string) => {
  try {
    const user = await getUserSession();

    const todo = await prisma.todo.create({
      data: { description, userId: user?.id ?? "" },
    });

    revalidatePath("/dashboard/server-todos");
    return todo;
  } catch (error) {
    return {
      message: "Error creando un todo",
      error,
    };
  }
};

export const deleteCompletedTodos = async () => {
  try {
    const { count } = await prisma.todo.deleteMany({
      where: { complete: true },
    });

    revalidatePath("/dashboard/server-todos");
    return count;
  } catch (error) {
    return {
      message: "Error borrando todos completados",
      error,
    };
  }
};
