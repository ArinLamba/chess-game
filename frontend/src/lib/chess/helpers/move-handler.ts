import { useHighlightedMoves } from "@/store/use-highlighted-moves";
import type { BoardType, Position } from "../types";
import { checkMove, cloneBoard } from "./board-helper";

import { useTurnStore } from "@/store/use-turn";
import { useSelectedSquare } from "@/store/use-selected-square";


type HanldeMoveProps = {
  row: number;
  col: number;
  board: BoardType;
  setBoard: (board: BoardType) => void;
}

export const handleMove = ({
  row,
  col,
  board,
  setBoard
}: HanldeMoveProps) => {

  const { highlightedMoves, setHighlightedMoves, clearHighlightedMoves } = useHighlightedMoves.getState();
  const { selectedSquare, setSelectedSquare, clearSelectedSquare } = useSelectedSquare.getState(); 
  const { turn, toggleTurn } = useTurnStore.getState();

  const piece = board[row][col];

  // ---- FIRST CLICK ----
  if (selectedSquare === null) {
    if (piece && piece.color === turn) {
      setSelectedSquare([row, col]);
      const moves = piece.getValidMoves(row, col, board);
      setHighlightedMoves(moves);
    } else {
      clearHighlightedMoves();
    }
    return;
  }

  // ---- SECOND CLICK ----
  if (selectedSquare) {
    const [prevRow, prevCol] = selectedSquare;
    if(prevRow === row && prevCol === col) {
      clearSelectedSquare();
      clearHighlightedMoves();
      return;
    }

    // Case 1: clicked on a valid move square
    if (checkMove([row, col], highlightedMoves)) {
      const newBoard = cloneBoard(board);

      if(newBoard[prevRow][prevCol]?.type === "king") {
        handleKingMove({ board: newBoard, from: selectedSquare, to: [row, col] });
        toggleTurn();
        clearSelectedSquare();
        clearHighlightedMoves();
        setBoard(newBoard);
        return;
      }

      // move piece
      newBoard[row][col] = newBoard[prevRow][prevCol];
      if(newBoard[row][col]) newBoard[row][col].hasMoved = true;
      newBoard[prevRow][prevCol] = null;
      console.log(newBoard[row][col]?.type, newBoard[row][col]?.hasMoved);

      setBoard(newBoard);
      toggleTurn();
    }

    // Case 2: clicked on another piece of the same color → treat as new selection
    else if (piece && piece.color === turn) {
      setSelectedSquare([row, col]);
      const moves = piece.getValidMoves(row, col, board);
      setHighlightedMoves(moves);
      return; // don’t reset selection here
    }

    // reset after any second click
    clearSelectedSquare();
    clearHighlightedMoves();
  }
};

type HandleKingMoveProps = {
  board: BoardType;
  from: Position;
  to: Position;
};


export const handleKingMove = ({ board, from, to } : HandleKingMoveProps) => {
  const [fr, fc] = from;
  const [tr, tc] = to;
  const piece = board[fr][fc];
  if(!piece) return;

  if(piece.type === "king" && Math.abs(tc - fc) === 2) {
    // king side castling
    if(tc > fc) {
      board[fr][5] = board[fr][7];
      board[fr][7] = null; 
      if(board[fr][5]) board[fr][5].hasMoved = true;
    }
    else { // queen side castling
      board[fr][3] = board[fr][0];
      board[fr][0] = null;
      if(board[fr][3]) board[fr][3].hasMoved = true;
    }
  }

  // normal king move
  board[tr][tc] = piece;
  board[fr][fc] = null;
  piece.hasMoved = true;
}