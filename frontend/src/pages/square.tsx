import type { PieceColor, PieceType, Position } from "@/lib/chess/types";
import type { Piece } from "@/lib/chess/pieces/piece";
import { pieceThemes, type Theme } from "@/lib/utils/constants";
import { useTheme } from "@/store/use-theme";

type Props = {
  cell: Piece | null;
  row: number;
  col: number;
  highlightedMoves: Position[]; // pass this from ChessBoard
  selectedSquare: Position | null;
  onClick: () => void;
};

export const Square = ({ cell, row, col, highlightedMoves, selectedSquare, onClick }: Props) => {

  const theme = useTheme(state => state.theme);
  const sum = row + col;

  let className = "h-22 w-22 aspect-square text-neutral-800 flex items-center justify-center relative";
  if (sum % 2 !== 0) className += " bg-[#AD6C4C]";
  else className += " bg-[#E6D6D3]";

  const isMove = highlightedMoves.some(([r, c]) => r === row && c === col);
  const isCapture = cell !== null && isMove;

  return (
    <div className={`${className} group`} onClick={onClick}>
      {/* piece */}
      {cell && (
        <img
          src={getPiece(cell.type, cell.color, theme)}
          alt={`${cell.type} ${cell.color}`}
          className="h-20 w-20 aspect-square pointer-events-none select-none"
        />
      )}

      {/* capture highlight */}
      {isCapture && (
        <div className="absolute inset-0 border-4 border-amber-50/50 bg-red-600/20 pointer-events-none"></div>
      )}
      {/* legal move dot on empty squares */}
      {isMove && !isCapture && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-6 w-6 bg-black/20 rounded-full group-hover:scale-125 transition-transform"></div>
        </div>
      )}


      {/* selected piece highlight */}
      {selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col && (
        <div className="absolute inset-0 border-4 border-yellow-500  pointer-events-none"></div>
      )}
    </div>
  );
};


const getPiece = (type: PieceType, color: PieceColor, theme: Theme): string => {
  if (!type || !color) return "";
  return pieceThemes[theme][`${type}-${color}`];
};
