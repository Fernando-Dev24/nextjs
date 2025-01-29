"use client";

import { useAdressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAdressStore((state) => state.address);
  const { itemsInCart, subTotal, tax, total } = useCartStore(
    useShallow((state) => state.getSummaryInformation())
  );
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    // TODO: Server action
    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    console.log({ address, productsToOrder });

    setIsPlacingOrder(false);
  };

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl font-bold mb-2">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>CP - {address.postalCode}</p>
        <p>{address.phone}</p>
      </div>

      {/* DIVIDER */}
      <div className="block mx-auto w-3/4 h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl font-bold mb-2">Orden de compra</h2>

      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">{itemsInCart} artículos</span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">
          {currencyFormat(total)}
        </span>
      </div>

      <div className="mt-5 mb-2 w-full">
        {/* DISCLAIMER */}
        <p className="mb-5">
          <span className="text-xs">
            Al hacer click en &apos;Colocar orden&apos;, aceptas nuestros{" "}
            <a href="#" className="underline">
              términos y condiciones
            </a>{" "}
          </span>
        </p>

        {/* <p className="text-red-500">Error al crear la Orden</p> */}

        <button
          //href={"/orders/123"}
          onClick={onPlaceOrder}
          className={clsx({
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};
