"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Title } from "@/components";
import { GamesInCart } from "./ui/GamesInCart";
import { OrderSummary } from "./ui/OrderSummary";

export default function Cart() {
  const [loaded, setLoaded] = useState(false);
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
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
