"use client";

import { SimpleWidget } from "../";
import { IoCafeOutline } from "react-icons/io5";
import { useAppSelector } from "@/store";

export const WidgetsGrid = () => {
  /* REDUX */
  const counter = useAppSelector((state) => state.counter.count);

  return (
    <div className="flex flex-wrap p-2 justify-center">
      <SimpleWidget
        subtitle="Producto en carrito de compras"
        title={counter.toString()}
        href="/dashboard/counter"
        label="Carrito de compras"
        hrefLabel="Ir al carrito"
        icon={<IoCafeOutline size={50} className="text-blue-500" />}
      />
    </div>
  );
};
