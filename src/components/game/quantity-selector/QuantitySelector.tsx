"use client";
import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity?: number;
}

export const QuantitySelector = ({ quantity = 1 }: Props) => {
  const [count, setCount] = useState(quantity);

  return (
    <div className="flex items-center">
      <button type="button">
        <IoRemoveCircleOutline
          size={30}
          onClick={(e) => setCount(count == 1 ? 1 : count - 1)}
        />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-100 text-center">{count}</span>
      <button type="button">
        <IoAddCircleOutline
          size={30}
          onClick={(e) => setCount(count == 10 ? 10 : count + 1)}
        />
      </button>
    </div>
  );
};
