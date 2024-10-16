"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Title } from "@/components";
import { GamesInCart } from "./ui/GamesInCart";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";

export default function Cart() {
  const [loaded, setLoaded] = useState(false);
  const summaryInCart = useCartStore((state) => state.getSummaryInformation());
  useEffect(() => {
    setLoaded(true);
  }, []);

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
            {loaded ? <GamesInCart /> : <p>Loading ....</p>}
          </div>
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Summary</h2>
            <div className="grid grid-cols-2">
              <span>N° Games</span>
              <span className="text-right">{summaryInCart.itemsInCart}</span>
              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormat(summaryInCart.subTotal)}
              </span>
              <span>Tax(15%)</span>
              <span className="text-right">
                {currencyFormat(summaryInCart.tax)}
              </span>
              <span className="text-2xl mt-5">Total</span>
              <span className="text-2xl mt-5 text-right">
                {currencyFormat(summaryInCart.total)}
              </span>
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
