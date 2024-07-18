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
      className="relative rounded-md h-[30rem] overflow-hidden fade-in hover:text-slate-700"
    >
      <Image
        src={`/products/${displayImage}`}
        alt={game.title}
        className="w-full object-cover object-center"
        fill
        onMouseEnter={() => setDisplayImage(game.images[1])}
        onMouseLeave={() => setDisplayImage(game.images[0])}
      />
      <div className="absolute bottom-2 left-2 p-4 flex flex-col rounded-md bg-white/50 transition-all">
        <span className="font-semibold">{game.title}</span>
        <span className="font-bold">{game.price}€</span>
      </div>
    </Link>
  );
};
