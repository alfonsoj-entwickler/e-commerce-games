import { Game } from "@/interfaces";
import { GameGridItem } from "./GameGridItem";


interface Props {
  games: Game[];
}
export const GameGrid = ({ games }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-10">
      {games.map((game) => (
        <GameGridItem key={game.slug} game={game} />
      ))}
    </div>
  );
};
