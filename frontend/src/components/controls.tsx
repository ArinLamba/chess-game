import { usePlaying } from "@/store/use-running";
import { StickyWrapper } from "./sticky-wrapper";
import { Button } from "./ui/button";

export const Controls = () => {

  const setIsPlaying = usePlaying((state) => state.setIsPlaying);

  const handleNewGame = () => {
    setIsPlaying(true);
  }
  return (
    <div className="">
      <StickyWrapper>
        <Button 
          variant="main" 
          size={"lg"} 
          className="w-[300px] text-2xl tracking-wider"
          onClick={handleNewGame}
        >
          Start Game
        </Button>
      </StickyWrapper>
    </div>
  );
};