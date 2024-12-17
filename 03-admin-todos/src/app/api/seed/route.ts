import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
  // Purgar la base de dato
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      email: "test1@google.com",
      password: bcrypt.hashSync("123456"),
      roles: ["admin", "client", "super-user"],
      todos: {
        create: [
          { description: "Primer todo", complete: true },
          { description: "Segundo todo" },
          { description: "Tercer todo" },
          { description: "Cuarto todo" },
          { description: "Quinto todo" },
          { description: "Sexto todo" },
        ],
      },
    },
  });

  // Insertar algunos datos de prueba de forma masiva
  /* await prisma.todo.createMany({
    data: [
      { description: "Primer todo", complete: true },
      { description: "Segundo todo" },
      { description: "Tercer todo" },
      { description: "Cuarto todo" },
      { description: "Quinto todo" },
      { description: "Sexto todo" },
    ],
  }); */

  return NextResponse.json({ message: "Seed executed" });
}
