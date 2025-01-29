import Link from "next/link";
import { Title } from "@/components";
import { GamesInCart } from "./ui/GamesInCart";
import { PlaceOrder } from "./ui/PlaceOrder";

export default function Checkout() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verify Orders" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Adjust games</span>
            <Link href="/cart" className="underline mb-5">
              edit cart
            </Link>
            <GamesInCart />
          </div>
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
