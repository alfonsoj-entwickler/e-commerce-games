"use client";

import { useAddressStore } from "@/store";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { placeOrder } from "@/actions";
import { useRouter } from "next/navigation";
import Order from "../../../orders/[id]/page";

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const address = useAddressStore((state) => state.address);
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const summaryInCart = useCartStore((state) => state.getSummaryInformation());

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    // console.log({ address, productsToOder });
    const resp = await placeOrder(productsToOder, address);

    // console.log({ resp });

    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
      return;
    }

    clearCart();
    router.replace("/orders/" + resp.order?.id);
  };

  if (!loaded) {
    return <p>Loading ...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
      <h2 className="text-2xl font-bold mb-2">Address to send</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        {address.address2 && <p>{address.address2}</p>}
        <p>{address.city}</p>
        <p>{address.postalCode}</p>
        <p>{address.country}</p>
        <p>{address.phone}</p>
      </div>
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
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
        <p className="mb-5">
          {/* Disclaimer */}
          <span className="text-xs">
            Al hacer clic en &quot;Colocar orden&quot;, aceptas nuestros{" "}
            <a href="#" className="underline">
              términos y condiciones
            </a>{" "}
            y{" "}
            <a href="#" className="underline">
              política de privacidad
            </a>
          </span>
        </p>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <button
          onClick={onPlaceOrder}
          className={clsx({
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
          disabled={isPlacingOrder}
          //href="/orders/123"
        >
          send to order
        </button>
      </div>
    </div>
  );
};
