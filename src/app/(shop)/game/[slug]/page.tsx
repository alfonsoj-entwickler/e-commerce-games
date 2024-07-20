import {
  GameMobileSlideShow,
  GameSlideShow,
  QuantitySelector,
  SizeSelector,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export default function Game({ params }: Props) {
  const { slug } = params;
  const game = initialData.products.find((game) => game.slug === slug);

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
        <GameSlideShow title={game.title} images={game.images} classname="hidden sm:block"/>
      </div>
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {game.title}
        </h1>
        <p className="text-lg mb-5">{game.price}€</p>
        <SizeSelector
          selectedSize={game.sizes[0]}
          availableSizes={game.sizes}
        />
        <QuantitySelector quantity={2} />
        <button type="button" className="btn-primary my-5">
          Add in cart
        </button>
        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{game.description}</p>
      </div>
    </div>
  );
}
