"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrdersByUser = async () => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId)
    return {
      ok: false,
      message: "No hay una sesión de usuario activa",
    };

  try {
    const orders = await prisma.order.findMany({
      where: { userId: userId },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return {
      ok: true,
      orders: orders,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al obtener las ordenes del usuario",
    };
  }
};
