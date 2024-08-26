export const revalidate = 60;

import { redirect } from "next/navigation";
import { GameGrid, Pagination, Title } from "@/components";
import { getPagintionGameWithImages } from "@/actions";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Shop({ searchParams }: Props) {
  const { page } = searchParams;
  const { games, currentPage, totalPages } = await getPagintionGameWithImages({
    page: Number(page),
  });

  if (games.length === 0) {
    redirect("/");
  }

  return (
    <>
      <Title title="Shop" subtitle="All games" className="mb-2" />
      <GameGrid games={games} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
