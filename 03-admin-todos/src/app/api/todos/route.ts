import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/lib/prisma";
import * as yup from "yup";

export async function GET(request: NextRequest) {
  // Obtener los parametros de la URL
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get("take") ?? "10");
  const skip = Number(searchParams.get("skip") ?? "0");

  // Validar que el take sea un numero
  if (isNaN(take)) {
    return NextResponse.json(
      {
        message: "El parametro take debe ser un numero",
      },
      { status: 400 }
    );
  }

  if (isNaN(skip)) {
    return NextResponse.json(
      {
        message: "El parametro skip debe ser un numero",
      },
      { status: 400 }
    );
  }

  const todos = await prisma.todo.findMany({
    take,
    skip,
  });

  return NextResponse.json(todos);
}

const POST_SCHEMA = yup.object({
  description: yup.string().required("Escribe la descripcion del todo"),
  complete: yup.boolean().optional().default(false),
});

export async function POST(request: NextRequest) {
  try {
    const { complete, description } = await POST_SCHEMA.validate(
      await request.json()
    ); // Cuando hay una propiedad que no se encuentra en el modelo prisma solo retorna un client version, lo mejor es que cuando validemos el body obtengamos solo aquellas keys que vamos a trabajar

    const newTodo = await prisma.todo.create({
      data: { complete, description },
    });
    return NextResponse.json(newTodo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
