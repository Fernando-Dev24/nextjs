"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderActions, CreateOrderData } from "@paypal/paypal-js";

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
        { amount: { value: `${roundedAmount}`, currency_code: "USD" } },
      ],
    });

    console.log({ transactionId });

    return transactionId;
  };

  return <PayPalButtons createOrder={createOrder} /* onApprove={} */ />;
};
