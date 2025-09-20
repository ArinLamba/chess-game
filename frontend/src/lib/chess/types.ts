import type { Piece } from "./pieces/piece";


export type PieceType = "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
export type PieceColor = "white" | "black";

export type Position = [number, number];

export type BoardType = (Piece | null)[][];