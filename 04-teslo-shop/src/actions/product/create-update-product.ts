"use server";

import prisma from "@/lib/prisma";
import { Gender, Product, Size } from "@prisma/client";
import { revalidatePath } from "next/cache";
import z from "zod";

import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

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

  try {
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
        product = await prisma.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });

        console.log({ newProduct: product });
      }

      // Proceso de carga y guardado de imagenes
      // recorrer las imagenes y guardarlas
      if (formData.getAll("images")) {
        // Se espera que se reciba un arreglo de URL []
        const images = await uploadImages(formData.getAll("images") as File[]);
        if (!images)
          throw new Error("Error al cargar las imagenes, rolling back");

        await prisma.productImage.createMany({
          data: images.map((image) => ({ url: image!, productId: product.id })),
        });
      }

      return {
        product,
      };
    });

    // done: Revalidar paths
    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    return {
      ok: true,
      product: prismaTx.product,
    };
  } catch (error) {
    return {
      ok: false,
      error: "Error al ejecutar la acción",
    };
  }
};

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`)
          .then((r) => r.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    console.log(error);
    return null;
  }
};
