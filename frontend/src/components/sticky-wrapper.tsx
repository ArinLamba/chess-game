type Props = {
  children: React.ReactNode;
};

export const StickyWrapper = ({ children }: Props) => {
  return (
    <div className="hidden md:block w-[368px] sticky bg-neutral-800 rounded border border-white/15">
      <div className="min-h-[calc(100vh-115px)] sticky top-6 flex flex-col items-center justify-center px-4 gap-y-4">
        {children}
      </div>
    </div>
  );
};