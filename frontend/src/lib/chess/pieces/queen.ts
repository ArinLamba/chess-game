import { QUEEN_DIRS } from "@/lib/utils/constants";
import type { BoardType, PieceColor, Position } from "../types";
import { Piece } from "./piece";

export class Queen extends Piece {
  constructor(color: PieceColor) {
    super(color, "queen");
  }

  getValidMoves(row: number, col: number, board: BoardType ): Position[] {
    return this.slideMoves(row, col, board, QUEEN_DIRS);
  }
};