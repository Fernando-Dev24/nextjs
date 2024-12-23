"use client";

import { useState } from "react";
import { IoRemoveCircleOutline, IoAddCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
}

export const QuantitySelector = ({ quantity }: Props) => {
  const [counter, setCounter] = useState(quantity);

  const onQuantityChanged = (value: number) => {
    if (counter + value < 1) return;
    setCounter(counter + value);
  };

  return (
    <div className="flex">
      <button onClick={() => onQuantityChanged(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>

      <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded-md border border-gray-300">
        {counter}
      </span>

      <button onClick={() => onQuantityChanged(1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
