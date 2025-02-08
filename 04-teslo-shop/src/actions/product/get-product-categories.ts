"use server";

import prisma from "@/lib/prisma";

export const getProductCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    return {
      ...categories,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener las categorías");
  }
};
