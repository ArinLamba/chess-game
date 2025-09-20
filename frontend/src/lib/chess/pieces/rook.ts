import { ROOK_DIRS } from "@/lib/utils/constants";
import type { PieceColor, BoardType, Position } from "../types";
import { Piece } from "./piece";

export class Rook extends Piece {
  constructor(color: PieceColor) {
    super(color, "rook");
  }

  getValidMoves(row: number, col: number, board: BoardType ): Position[] {
    return this.slideMoves(row, col, board, ROOK_DIRS);
  }
};