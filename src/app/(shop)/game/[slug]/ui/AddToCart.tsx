"use client";

import { QuantitySelector, SizeSelector } from "@/components";
import type { CartGame, Game, ValidSizes } from "@/interfaces";
import { useCartStore } from "@/store";
import { useState } from "react";

interface Props {
  game: Game;
}

export const AddToCart = ({ game }: Props) => {
  const addGameToCart = useCartStore((state) => state.addGameToCart);
  const [size, setSize] = useState<ValidSizes | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [errorPosted, setErrorPosted] = useState<boolean>(false);

  const addToCart = () => {
    console.log(game);
    setErrorPosted(true);
    if (!size) return;

    const cartGame: CartGame = {
      id: game.id,
      slug: game.slug,
      title: game.slug,
      price: game.price,
      quantity: quantity,
      size: size,
      image: game.images[0],
    };
    addGameToCart(cartGame);
    setErrorPosted(false);
    setQuantity(1);
    setSize(undefined);

    //console.log({ size, quantity, game });
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
      <button
        type="button"
        className="btn-primary my-5"
        onClick={(e) => addToCart()}
      >
        Add in cart
      </button>
    </>
  );
};
