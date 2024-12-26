import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  if (process.env.NODE_ENV === "production") {
    console.log("No se puede ejecutar el seed en producción");
    return;
  }

  // 1. Borrar registros
  await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);

  console.log("Seed ejecutado correctamente");
}

(() => main())();
