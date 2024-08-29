export const revalidate = 604800;

import { getGameBySlug } from "@/actions/game/get-game-by-slug";
import { GameMobileSlideShow, GameSlideShow, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";

import type { Metadata, ResolvingMetadata } from "next";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.slug;

  const game = await getGameBySlug(id);

  return {
    title: game?.title ?? "Product not found",
    description: game?.description ?? "",
    openGraph: {
      title: game?.title ?? "Product not found",
      description: game?.description ?? "",
      images: [`/products/${game?.images[1]}`],
    },
  };
}

export default async function Game({ params }: Props) {
  const { slug } = params;
  const game = await getGameBySlug(slug);

  if (!game) {
    notFound();
  }
  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">
        <GameMobileSlideShow
          title={game.title}
          images={game.images}
          classname="sm:hidden"
        />
        <GameSlideShow
          title={game.title}
          images={game.images}
          classname="hidden sm:block"
        />
      </div>
      <div className="col-span-1 px-5">
        <StockLabel slug={slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {game.title}
        </h1>
        <p className="text-lg mb-5">{game.price}€</p>

        <AddToCart game={game} />

        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{game.description}</p>
      </div>
    </div>
  );
}
