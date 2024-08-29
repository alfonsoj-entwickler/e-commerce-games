"use client";

import { QuantitySelector, SizeSelector } from "@/components";
import { ValidSizes } from "@/interfaces";
import { Game } from "@prisma/client";
import { useState } from "react";

interface Props {
  game: Game;
}

export const AddToCart = ({ game }: Props) => {
  const [size, setSize] = useState<ValidSizes | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [errorPosted, setErrorPosted] = useState<boolean>(false);

  const addToCart = () => {
    setErrorPosted(true);
    console.log(size, quantity, game);
  };

  return (
    <>
      {errorPosted && !size && (
        <span className="mt-2 text-red-500 fade-in">
          Please, select a size.
        </span>
      )}

      <SizeSelector
        selectedSize={size}
        availableSizes={game.sizes}
        onSizeChanged={setSize}
      />
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />
      <button type="button" className="btn-primary my-5" onClick={addToCart}>
        Add in cart
      </button>
    </>
  );
};
