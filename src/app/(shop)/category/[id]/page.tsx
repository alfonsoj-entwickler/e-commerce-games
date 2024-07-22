import { GameGrid, Title } from "@/components";
import { notFound } from "next/navigation";
import { initialData, ValidHardwares } from "@/seed/seed";

const games = initialData.products;

interface Props {
  params: {
    id: ValidHardwares;
  };
}

export default function Category({ params }: Props) {
  const { id } = params;
  //if (id === "nintendo") {
  //  notFound();
  //}

  return (
    <>
      <Title title={id.toUpperCase()} subtitle="Games" className="mb-2" />
      <GameGrid games={games.filter((item) => (item.hardware === id))} />
    </>
  );
}
