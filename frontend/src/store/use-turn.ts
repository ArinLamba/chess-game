// src/store/useTurnStore.ts
import { create } from "zustand";
import type { PieceColor } from "@/lib/chess/types";

type TurnState = {
  turn: PieceColor;

  setTurn: (color: PieceColor) => void;
  toggleTurn: () => void;
  resetTurn: () => void;
}

export const useTurnStore = create<TurnState>((set) => ({
  turn: "white",

  setTurn: (color) => set({ turn: color }),
  toggleTurn: () => set((state) => ({
    turn: state.turn === "white" ? "black" : "white",
  })),
  resetTurn: () => set({ turn: "white" }),
}));
