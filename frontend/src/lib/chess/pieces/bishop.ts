import { BISHOP_DIRS } from "@/lib/utils/constants";
import type { BoardType, PieceColor, Position } from "../types";
import { Piece } from "./piece";

export class Bishop extends Piece {
  constructor(color: PieceColor) {
    super(color, "bishop");
  }

  getValidMoves(row: number, col: number, board: BoardType ): Position[] {
    return this.slideMoves(row, col, board, BISHOP_DIRS);
  }
};
