"use client";
import Image from "next/image";

import { PayPalButton, Title } from "@/components";
import { IoCardOutline } from "react-icons/io5";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { getOrderById } from "@/actions/order/get-order-by-id";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default function Order({ params }: Props) {
  const { id } = params;
  const [order, setOrder] = useState({} as any);

  useEffect(() => {
    const getOrder = async () => {
      const resp = await getOrderById(id);
      setOrder(resp);
      //console.log(resp);
      if (!resp.ok) {
        redirect("/");
      }
    };
    getOrder();
  }, []);

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id.split("-").at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": !order.products?.isPaid,
                  "bg-green-700": order.products?.isPaid,
                }
              )}
            >
              <IoCardOutline size={30} />

              <span className="mx-2">Payed</span>
            </div>

            {/* Items */}
            {order &&
              order.products?.OrderItem.map((item: any) => (
                <div
                  key={`order-product-${item.product.title}-${item.size}`}
                  className="flex mb-5"
                >
                  <Image
                    src={`/products/${item.product.GameImage[0].url}`}
                    width={100}
                    height={100}
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                    alt={item.title}
                    className="mr-5 rounded"
                  />

                  <div>
                    <p>{item.product.title}</p>
                    <p>
                      {item.price}€ x {item.quantity}
                    </p>
                    <p className="font-bold">
                      Subtotal: {item.price * item.quantity}€
                    </p>
                  </div>
                </div>
              ))}
          </div>

          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Address to send</h2>
            <div className="mb-10">
              <p>
                {order.address?.firstName} {order.address?.lastName}
              </p>
              <p>{order.address?.address}</p>
              <p>{order.address?.address2}</p>
              <p>{order.address?.postalCode}</p>
              <p>{order.address?.phone}</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Summary of order</h2>

            <div className="grid grid-cols-2">
              <span>No. Games</span>
              <span className="text-right">
                {order.products?.itemsInOrder} products
              </span>

              <span>Subtotal</span>
              <span className="text-right">{order.products?.subTotal}€</span>

              <span>Tax (21%)</span>
              <span className="text-right">{order.products?.tax}€</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">
                {order.products?.total}€
              </span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <PayPalButton amount={order.products?.total} orderId={order.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
