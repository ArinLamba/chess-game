
import { ResignButton } from "./resign-button";
import { SelectPieceTheme } from "./select-piece-theme";

export const Modification = () => {
  return (
    <div className="bg-neutral-800 rounded border border-white/10 gap-4 h-[704px] w-8 flex flex-col relative">
      <SelectPieceTheme />
      <div className=" w-full bottom-0 absolute">
        <ResignButton />
      </div>
    </div>
  );
};