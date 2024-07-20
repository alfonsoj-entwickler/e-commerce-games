import Link from "next/link";

import Image from "next/image";
import { redirect } from "next/navigation";

import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function Cart() {
  
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Cart" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Add more items</span>
            <Link href="/" className="underline mb-5">
              continue buy
            </Link>
            {productsInCart.map((game) => (
              <div key={game.slug} className="flex mb-5">
                <Image
                  src={`/products/${game.images[0]}`}
                  width={120}
                  height={120} 
                  alt={game.title}
                  className="mr-5 roundend"
                />
                <div>
                  <p>{game.title}</p>
                  <p>{game.price}€</p>
                  <QuantitySelector quantity={2} />
                  <button type="button" className="underline mt-3">
                    remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Summary</h2>
            <div className="grid grid-cols-2">
              <span>N° Games</span>
              <span className="text-right">3 games</span>
              <span>Subtotal</span>
              <span className="text-right">100€</span>
              <span>Tax(21%)</span>
              <span className="text-right">21€</span>
              <span className="text-2xl mt-5">Total</span>
              <span className="text-2xl mt-5 text-right">121€</span>
            </div>
            <div className="mt-5 mb-2 w-full">
              <Link
                className="flex btn-primary justify-center"
                href="/checkout/address"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
