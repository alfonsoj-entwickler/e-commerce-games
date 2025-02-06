"use client";

import Image from "next/image";
import { useCartStore } from "@/store";
import Link from "next/link";
import { currencyFormat } from "@/utils";

export const GamesInCart = () => {
  const gamesInCart = useCartStore((state) => state.cart);
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
            <span>
              {game.size} - {game.title} ({game.quantity})
            </span>
            <p className="font-bold">
              {currencyFormat(game.price * game.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
