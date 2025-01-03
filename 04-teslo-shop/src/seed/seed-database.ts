import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  if (process.env.NODE_ENV === "production") return;

  // 1. Borrar registros
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Categorias
  const { categories, products } = initialData;
  const categoriesData = categories.map((category) => ({
    name: category,
  }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDb = await prisma.category.findMany();
  const categoriesMap = categoriesDb.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>); // <string:shirt, string:ID>

  // Productos
  products.forEach(async (product) => {
    const { type, images, ...rest } = product;
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    // Imagenes
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  console.log("Seed ejecutado correctamente");
}

(() => main())();
