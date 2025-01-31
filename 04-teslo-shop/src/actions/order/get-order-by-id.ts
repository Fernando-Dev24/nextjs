"use server";

import prisma from "@/lib/prisma";

export const getOrderById = async (id: string) => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        OrderAddress: true,
        OrderItem: {
          include: {
            product: {
              select: {
                title: true,
                ProductImage: {
                  take: 1,
                  select: {
                    url: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw new Error(`Order with id ${id} not found`);

    const { OrderItem, ...restOrder } = order;

    return {
      ok: true,
      message: "Orden encontrada",
      order: {
        ...restOrder,
        products: OrderItem.map((item) => ({
          ...item,
          title: item.product.title,
          images: item.product.ProductImage.map((image) => image.url),
        })),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al encontrar la orden",
    };
  }
};
