"use client";

import Image from "next/image";
import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Link from "next/link";

export const GamesInCart = () => {
  const gamesInCart = useCartStore((state) => state.cart);
  const updateGameQuantity = useCartStore((state) => state.updateGameQuantity);
  const removeGameInCart = useCartStore((state) => state.removeGameInCart);
  return (
    <>
      {gamesInCart.map((game) => (
        <div
          key={`${game.slug}-${game.size}`}
          className="flex mb-5 p-4 bg-white rounded-md shadow-md overflow-hidden"
        >
          <Link className="group overflow-hidden" href={`/game/${game.slug}`}>
            <Image
              src={`/products/${game.image}`}
              width={120}
              height={120}
              alt={game.title}
              className="mr-5 roundend object-contain object-top scale-100 transition-transform duration-500 group-hover:scale-110"
            />
          </Link>
          <div>
            <Link className="group" href={`/game/${game.slug}`}>
              {game.size} - {game.title}
              <span className="block w-0 h-0.5 bg-blue-500 transition-all duration-700 group-hover:w-full" />
            </Link>
            <p className="my-4">{game.price}€</p>
            <QuantitySelector
              quantity={game.quantity}
              onQuantityChanged={(quantity) =>
                updateGameQuantity(game, quantity)
              }
            />
            <button
              type="button"
              className="underline mt-3"
              onClick={(e) => removeGameInCart(game)}
            >
              remove
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
