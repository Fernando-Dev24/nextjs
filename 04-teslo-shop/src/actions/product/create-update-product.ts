"use server";

import prisma from "@/lib/prisma";
import { Gender, Product, Size } from "@prisma/client";
import z from "zod";

const productSchema = z.object({
  // Opcional es que puede estar presente o bien puede llegar nulo
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce // se supone que se hara la tranformacion para obtener los metodos subsiguientes
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))), // Aqui se hace la transformacion
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(",")),
  tags: z.string(),
  gender: z.nativeEnum(Gender), // nativeEnum validara si el valor del campo coincide con alguna de las opciones de un enum de prisma por ejemplo
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);

  // la diferencia de safeParse es que retorna un objeto con el resultado o los errores, el metodo parse lanza un error, parse puede ser de utilidad cuando se busca hacer un rollback
  const productParsed = productSchema.safeParse(data);
  if (!productParsed.success) {
    console.log(productParsed.error);
    return { ok: false };
  }

  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();

  const { id, ...rest } = product;

  const prismaTx = await prisma.$transaction(async (tx) => {
    let product: Product;
    const tagsArray = rest.tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase());

    if (id) {
      // Actualizar
      product = await tx.product.update({
        where: { id },
        data: {
          ...rest,
          sizes: {
            set: rest.sizes as Size[], //  Establecemos el arreglo de sizes y lo convertimos a un set con prisma
          },
          tags: {
            set: tagsArray,
          },
        },
      });

      console.log({ updatedProduct: product });
    } else {
      // Crear
    }

    return {};
  });

  // TODO: Revalidar path

  return {
    ok: true,
  };
};
