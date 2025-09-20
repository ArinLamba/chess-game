// src/store/useHistoryStore.ts
import { create } from "zustand";
import type { Position } from "@/lib/chess/types";

type Move = {
  from: Position;
  to: Position;
  piece: string;   // e.g. "pawn", "queen"
  captured?: string; // if a piece was captured
}

interface HistoryState {
  moves: Move[];

  addMove: (move: Move) => void;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState>((set) => ({
  moves: [],

  addMove: (move) => set((state) => ({ moves: [...state.moves, move] })),
  clearHistory: () => set({ moves: [] }),
}));
