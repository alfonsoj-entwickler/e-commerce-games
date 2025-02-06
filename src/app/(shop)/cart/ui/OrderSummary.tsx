"use client";
import { currencyFormat } from "@/utils";
import Link from "next/link";
import { useCartStore } from "@/store";

export const OrderSummary = () => {
  const summaryInCart = useCartStore((state) => state.getSummaryInformation());
  return (
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
        <span className="text-right">{currencyFormat(summaryInCart.tax)}</span>
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
  );
};
