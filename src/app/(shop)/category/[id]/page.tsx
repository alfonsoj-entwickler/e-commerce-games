export const revalidate = 60;

import { redirect } from "next/navigation";
import { GameGrid, Pagination, Title } from "@/components";
import { getPagintionGameWithImages } from "@/actions";
import { Hardware } from "@prisma/client";

interface Props {
  searchParams: {
    page?: string;
  };
  params: {
    id: string;
  };
}

export default async function Category({ params, searchParams }: Props) {
  const { id } = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { games, currentPage, totalPages } = await getPagintionGameWithImages({
    page: Number(page),
    category: id as Hardware,
  });

  if (games.length === 0) {
    redirect(`/category/${id}`);
  }

  return (
    <>
      <Title title={id.toUpperCase()} subtitle="Games" className="mb-2" />
      <GameGrid games={games} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
