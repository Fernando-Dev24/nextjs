import prisma from "@/app/lib/prisma";
import { Todo } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

interface Segments {
  params: {
    id: string;
  };
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const todo = await prisma.todo.findFirst({
    where: {
      id,
    },
  });

  return todo;
};

export async function GET(request: NextRequest, { params }: Segments) {
  const { id } = params;
  const todo = await getTodo(id);

  if (!todo) {
    return NextResponse.json(
      {
        message: `Todo con id ${id} no existe`,
      },
      { status: 404 }
    );
  }

  return NextResponse.json(todo);
}

const PUT_SCHEMA = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
});

export async function PUT(request: NextRequest, { params }: Segments) {
  const { id } = params;
  const todo = await getTodo(id);

  if (!todo) {
    return NextResponse.json(
      {
        message: `Todo con id ${id} no existe`,
      },
      { status: 404 }
    );
  }

  try {
    const { complete, description } = await PUT_SCHEMA.validate(
      await request.json()
    );

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        description,
        complete,
      },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
