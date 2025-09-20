import { Flag } from "lucide-react";

import { ActionTooltip } from "./action-tooltip";
import { useEffect, useState } from "react";

import { usePlaying } from "@/store/use-running";
import { useHighlightedMoves } from "@/store/use-highlighted-moves";
import { useSelectedSquare } from "@/store/use-selected-square";
import { useTurnStore } from "@/store/use-turn";

export const ResignButton = () => {

  const [resignTrigger, setResignTrigger] = useState(false);
  
  const { isPlaying, setIsPlaying} = usePlaying();
  const clearHighlightedMoves = useHighlightedMoves(state => state.clearHighlightedMoves);
  const clearSelectedSquare  = useSelectedSquare(state => state.clearSelectedSquare); 
  const resetTurn = useTurnStore(state => state.resetTurn);

  useEffect(() => {
    setIsPlaying(false);
    clearHighlightedMoves();
    clearSelectedSquare();
    resetTurn();
  }, [resignTrigger]);

  return (
    <>
      {isPlaying && (
        <ActionTooltip 
          label= "Resign"
        >
          <button 
            className="h-7 w-full flex justify-around items-center text-muted-foreground hover:text-neutral-300 cursor-pointer transition"
            onClick={() => setResignTrigger(prev => !prev)}
          >
            <Flag size={20}/>
          </button>
        </ActionTooltip>
      )}
    </>
  );
};