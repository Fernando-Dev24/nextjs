"use server";

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productsId: ProductToOrder[],
  address: Address
) => {
  // Obtener la sesion y verificarla
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return {
      ok: false,
      message: "No hay sesión de usuario",
    };
  }

  // Obtener la informacion de los productos
  // NOTA: Recuerden que podemos llevar dos o mas productos con el mismo ID
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsId.map((p) => p.productId), // Buscar los productos que hagan match con el ID enviado mediante el arreglo
      },
    },
  });

  // Calcular los montos // Encabezado
  const itemsInOrder = productsId.reduce((count, p) => count + p.quantity, 0);

  // Los totales de tax, subtotal y total
  const { subTotal, tax, total } = productsId.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) throw new Error(`${item.productId} no existe - 500`);

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  // Crear la transaccion de BD
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Actualizar el stock de los productos
      const updatedProductsPromises = products.map((product) => {
        // Buscar y acumular valores
        const productQuantity = productsId
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity < 1) {
          throw new Error(`${product.id} no tiene un precio definido`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity, // Detras de las cortinas la base de datos realiza otra peticion para traer el numero disponible de la base de datos en ese preciso momento y no usa una solicitud vieja
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      // Verificar valores negativos en la existencia === no hay stock
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} no tiene inventario suficiente`);
        }
      });

      // 2. Crear la orden - Encabezado - Detalles
      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subTotal,
          tax,
          total,
          isPaid: false,
          OrderItem: {
            createMany: {
              data: productsId.map((product) => ({
                quantity: product.quantity,
                size: product.size,
                productId: product.productId,
                price:
                  products.find((p) => p.id === product.productId)?.price ?? 0,
              })),
            },
          },
        },
      });

      // Validar si algun producto de los orderItems su precio es cero o menor a uno, si esto es asi quiere decir que hay un producto que no se encontro y debemos de hacer un rollback en nuestra base de datos

      // 3. Grabar la direccion de la orden
      const { country, ...restAddress } = address;

      // Con todo esto podemos crear la direccion de entrega
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          orderId: order.id,
          countryId: country,
        },
      });

      return {
        order,
        orderAddress,
        updatedProducts,
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message ?? "Error en la soliciutd",
    };
  }
};
