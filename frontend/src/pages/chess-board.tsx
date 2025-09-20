import { useState } from "react";
import { Square } from "./square";

import type { BoardType } from "@/lib/chess/types";

import { handleMove } from "@/lib/chess/helpers/move-handler";

import { generateBoard } from "@/lib/chess/helpers/board-helper";

import { usePlaying } from "@/store/use-running";
import { useHighlightedMoves } from "@/store/use-highlighted-moves";
import { useSelectedSquare } from "@/store/use-selected-square";

export const ChessBoard = () => {
  const isPlaying = usePlaying(state => state.isPlaying);
  const highlightedMoves = useHighlightedMoves(state => state.highlightedMoves);
  const selectedSquare = useSelectedSquare(state => state.selectedSquare); 

  const [board, setBoard] = useState<BoardType>(generateBoard());

  const handleClick = (row: number, col: number) => {
    if (!isPlaying) return; // TODO: later: connect socket after click
    handleMove({ row, col, board, setBoard });
  };


  return (
    <div className="" onContextMenu={(e) => e.preventDefault()}>
      <div>
        {board.map((row, i) => 
          <div key={i} className="grid" style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}>
            {row.map((cell, j) => (
    
              <Square
                key={`${i}-${j}`}
                cell={cell}
                row={i}
                col={j}
                highlightedMoves={highlightedMoves}
                selectedSquare={selectedSquare}
                onClick={() => handleClick(i, j)}
              />
              
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

