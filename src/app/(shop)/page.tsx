import { GameGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";

const games = initialData.products;

export default function Shop() {
  return (
    <>
      <Title title="Shop" subtitle="All games" className="mb-2" />
      <GameGrid 
        games={games}
      />
    </>
  );
}
