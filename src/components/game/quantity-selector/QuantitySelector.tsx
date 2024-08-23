"use client";

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity?: number;
  onQuantityChanged: (quantity: number) => void;
}

export const QuantitySelector = ({
  quantity = 1,
  onQuantityChanged,
}: Props) => {
  return (
    <div className="flex items-center">
      <button type="button">
        <IoRemoveCircleOutline
          size={30}
          onClick={(e) => onQuantityChanged(quantity == 1 ? 1 : quantity - 1)}
        />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-100 text-center">{quantity}</span>
      <button type="button">
        <IoAddCircleOutline
          size={30}
          onClick={(e) => onQuantityChanged(quantity == 10 ? 10 : quantity + 1)}
        />
      </button>
    </div>
  );
};
