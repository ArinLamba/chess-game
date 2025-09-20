import type { BoardType, Position } from "@/lib/chess/types"

import { Pawn } from "@/lib/chess/pieces/pawn";
import { Rook } from "@/lib/chess/pieces/rook";
import { Knight } from "@/lib/chess/pieces/knight";
import { Bishop } from "@/lib/chess/pieces/bishop";
import { Queen } from "@/lib/chess/pieces/queen";
import { King } from "@/lib/chess/pieces/king";


export const generateBoard = (): BoardType => {
  const board: BoardType = Array.from({ length: 8 }, () => Array(8).fill(null));

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      // Pawns
      if (row === 1) board[row][col] = new Pawn("black");
      if (row === 6) board[row][col] = new Pawn("white");

      // Rooks
      if (row === 0 && (col === 0 || col === 7)) board[row][col] = new Rook("black");
      if (row === 7 && (col === 0 || col === 7)) board[row][col] = new Rook("white");

      // Knights
      if (row === 0 && (col === 1 || col === 6)) board[row][col] = new Knight("black");
      if (row === 7 && (col === 1 || col === 6)) board[row][col] = new Knight("white");

      // Bishops
      if (row === 0 && (col === 2 || col === 5)) board[row][col] = new Bishop("black");
      if (row === 7 && (col === 2 || col === 5)) board[row][col] = new Bishop("white");

      // Queens
      if (row === 0 && col === 3) board[row][col] = new Queen("black");
      if (row === 7 && col === 3) board[row][col] = new Queen("white");

      // Kings
      if (row === 0 && col === 4) board[row][col] = new King("black");
      if (row === 7 && col === 4) board[row][col] = new King("white");
    }
  }

  return board;
};

export const cloneBoard = (board: BoardType) => {
  return board.map(row => row.map(cell => cell));
};

export const checkMove = (move: Position, highlightedMoves: Position[]): boolean => {
  return highlightedMoves.some(([r, c]) => r === move[0] && c === move[1]);
};


