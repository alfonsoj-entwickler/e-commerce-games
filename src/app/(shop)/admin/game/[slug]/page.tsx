import { getCategories, getGameBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { GameForm } from "./ui/GameForm";

interface Props {
  params: {
    slug: string;
  };
}
export default async function GamePage({ params }: Props) {
  const { slug } = params;

  const [game, categories] = await Promise.all([
    getGameBySlug(slug),
    getCategories(),
  ]);

  if (!game && slug !== "new") {
    redirect("/admin/games");
  }

  const title = slug === "new" ? "New game" : "Edit game";

  return (
    <>
      <Title title={title} />
      <GameForm game={game ?? {}} categories={categories} />
    </>
  );
}
