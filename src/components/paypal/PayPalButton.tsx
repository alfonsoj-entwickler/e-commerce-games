"use client";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js";
import { paypalCheckPayment, setTransactionId } from "@/actions";

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ orderId, amount }: Props) => {
  const rountedAmount = Math.round(amount * 100) / 100;

  const [{ isPending }] = usePayPalScriptReducer();
  if (isPending) {
    return (
      <div className="animate-pulse mt-10">
        <div className="h-12 bg-gray-400 rounded"></div>
        <div className="h-12 bg-gray-400 rounded mt-2"></div>
      </div>
    );
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: `${rountedAmount}`,
          },
        },
      ],
    });

    const { ok } = await setTransactionId(orderId, transactionId);
    if (!ok) {
      throw new Error("Not update order");
    }

    return transactionId;
  };
  const onApprove = async (
    data: OnApproveData,
    actions: OnApproveActions
  ): Promise<void> => {
    const details = await actions.order?.capture();
    if (!details) return;
    await paypalCheckPayment(details.id ?? "");
  };

  return (
    <div className="relative z-0">
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  );
};
