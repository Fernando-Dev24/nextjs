import prisma from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  // Purgar la base de dato
  await prisma.todo.deleteMany();

  // Insertar algunos datos de prueba de forma masiva
  await prisma.todo.createMany({
    data: [
      { description: "Primer todo", complete: true },
      { description: "Segundo todo" },
      { description: "Tercer todo" },
      { description: "Cuarto todo" },
    ],
  });

  return NextResponse.json({ message: "Seed executed" });
}
