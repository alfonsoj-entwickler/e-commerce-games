import { getOrdersByUser } from "@/actions";
import { Title } from "@/components";

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline, IoClipboardOutline } from "react-icons/io5";

export default async function Orders() {
  const { ok, orders = [] } = await getOrdersByUser();

  if (!ok) {
    redirect("/auth/login");
  }
  return (
    <>
      <Title title="Orders" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                #ID
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Full name
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                State
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={`table-order-${order.id}`}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id.split("-").at(-1)}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.OrderAddress?.firstName} -{" "}
                  {order.OrderAddress?.lastName}
                </td>
                {order.isPaid ? (
                  <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <IoCardOutline className="text-green-800" />
                    <span className="mx-2 text-green-800">Payed</span>
                  </td>
                ) : (
                  <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <IoCardOutline className="text-red-800" />
                    <span className="mx-2 text-red-800">No pay</span>
                  </td>
                )}

                <td className="text-sm text-gray-900 font-light px-6">
                  <Link
                    href={`/orders/${order.id}`}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <IoClipboardOutline />
                    <span>View the order</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
