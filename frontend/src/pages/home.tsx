import { Controls } from "@/components/controls";
import { Modification } from "@/components/modification";
import { ChessBoard } from "@/pages/chess-board";

export const Home = () => {
  return (
    <div className="min-h-screen bg-neutral-900 flex flex-row-reverse gap-[10px] h-full items-center justify-center">
      {/* TODO: Add navbar or controls type something */}
      <Controls />
      <Modification />
      <div className="rounded overflow-x-auto border flex items-center  border-white/20">
        <ChessBoard />
      </div>
    </div>
  );
};