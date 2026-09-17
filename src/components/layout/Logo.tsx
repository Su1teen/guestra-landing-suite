import { cn } from "@/lib/utils";

export const Logo = ({ className, light }: { className?: string; light?: boolean }) => (
  <span className={cn("flex items-center gap-2.5", className)}>
    <span className="relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-lg" aria-hidden>
      <img
        src="/logo.png"
        alt=""
        width={28}
        height={28}
        className="h-full w-full scale-110 object-contain"
        loading="eager"
        decoding="async"
      />
    </span>
    <span className={cn("text-[17px] font-semibold tracking-tight", light ? "text-white" : "text-foreground")}>Guestra</span>
  </span>
);
