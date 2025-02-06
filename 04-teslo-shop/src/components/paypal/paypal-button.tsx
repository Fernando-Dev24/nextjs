"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js";
import { paypalCheckPayment, setTransactionId } from "@/actions";

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const roundedAmount = Math.round(amount * 100) / 100;

  if (isPending) {
    return (
      <div className="animate-pulse mb-16">
        <div className="h-10 bg-gray-300 rounded" />
        <div className="mt-2 h-10 bg-gray-300 rounded" />
      </div>
    );
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          invoice_id: orderId,
          amount: { value: `${roundedAmount}`, currency_code: "USD" },
        },
      ],
    });

    /* console.log({ transactionId }); */
    // Guardar el id en la orden de la base de datos
    const { ok, message } = await setTransactionId(orderId, transactionId);
    if (!ok) throw new Error(message);

    return transactionId;
  };

  const onApprove = async (
    data: OnApproveData,
    actions: OnApproveActions
  ): Promise<void> => {
    const details = await actions.order?.capture(); // captura el id de paypal de la orden
    if (!details?.id) return;

    await paypalCheckPayment(details.id);
  };

  return (
    <PayPalButtons
      createOrder={createOrder} // al momento de acceder a la pasarela de pago de paypal
      onApprove={onApprove} //  esto se ejecuta cuando el pago es aprobado
    />
  );
};
