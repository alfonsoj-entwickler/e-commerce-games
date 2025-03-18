import { getPaginateOrders } from "@/actions";
import { GameImage, Pagination, Title } from "@/components";

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline, IoClipboardOutline } from "react-icons/io5";
import { getPagintionGameWithImages } from "@/actions";
import Image from "next/image";
import { currencyFormat } from "@/utils";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function AdminGames({ searchParams }: Props) {
  const { page } = searchParams;
  const { games, currentPage, totalPages } = await getPagintionGameWithImages({
    page: Number(page),
  });

  return (
    <>
      <Title title="Admin Games" />
      <div className="flex justify-end mb-5">
        <Link href="/admin/game/new" className="btn-primary">
          Add new game
        </Link>
      </div>
      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Image
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Title
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Price
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Hardware
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                inStock
              </th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr
                key={`table-game-${game.id}`}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/game/${game.slug}`}>
                    <GameImage
                      width={80}
                      height={80}
                      src={game.GameImage[0]?.url}
                      alt={`Image - ${game.description}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/admin/game/${game.slug}`}
                    className="hover:underline"
                  >
                    {game.title}
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  {currencyFormat(game.price)}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {game.hardware}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {game.inStock}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination totalPages={totalPages} />
    </>
  );
}
