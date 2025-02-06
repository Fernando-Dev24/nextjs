"use server";

import { PaypalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const authToken = await getPaypalBearerToken();
  console.log({ authToken });

  if (!authToken) {
    return {
      ok: false,
      message: "No se pudo obtener el token de autenticación",
    };
  }

  const resp = await verifyPaypalPayment(paypalTransactionId, authToken);
  if (!resp) {
    return {
      ok: false,
      message: "Error al verificar el pago",
    };
  }

  const { status, purchase_units } = resp;
  const { invoice_id: orderId } = purchase_units[0];

  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: "Aún no se ha pagado en Paypal",
    };
  }

  // done: realizar el pago o la update en nuestra base de datos
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });

    // done: Revalidar un path
    revalidatePath(`orders/${orderId}`);
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "500 - Error al realizar el pago",
    };
  }
};

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET ?? "";
  const PAYPAL_OAUTH_URL = process.env.PAYPAL_OAUTH_URL ?? "";

  console.log({
    PAYPAL_CLIENT_ID,
    PAYPAL_SECRET,
  });

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(PAYPAL_OAUTH_URL, {
      ...requestOptions,
      cache: "no-cache",
    }).then((res) => res.json());
    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyPaypalPayment = async (
  paypalTransactionId: string,
  bearerToken: string
): Promise<PaypalOrderStatusResponse | null> => {
  const PAYPAL_ORDER_URL = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const resp = await fetch(PAYPAL_ORDER_URL, {
      ...requestOptions,
      cache: "no-cache",
    }).then((res) => res.json());

    return resp;
  } catch (error) {
    console.log(error);
    return null;
  }
};
