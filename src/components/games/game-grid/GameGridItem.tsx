"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Game } from "@/interfaces";

interface Props {
  game: Game;
}

export const GameGridItem = ({ game }: Props) => {
  const [displayImage, setDisplayImage] = useState(game.images[0]);

  return (
    <Link
      href={`/game/${game.slug}`}
      className="rounded-md overflow-hidden fade-in hover:text-blue-700"
    >
      <Image
        src={`/products/${displayImage}`}
        alt={game.title}
        className="w-full object-cover"
        width={500}
        height={500}
        onMouseEnter={() => setDisplayImage(game.images[1])}
        onMouseLeave={() => setDisplayImage(game.images[0])}
      />
      <div className="p-4 flex flex-col transition-all">
        <span>{game.title}</span>
        <span className="font-bold">{game.price}€</span>
      </div>
    </Link>
  );
};
