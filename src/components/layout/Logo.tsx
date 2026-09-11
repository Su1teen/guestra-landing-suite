import { cn } from "@/lib/utils";

export const Logo = ({ className, light }: { className?: string; light?: boolean }) => (
  <span className={cn("flex items-center gap-2.5", className)}>
    <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-primary" aria-hidden>
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
        <path d="M12 4v4M12 16v4M4 12h4M16 12h4" />
        <path d="M6.3 6.3l2.5 2.5M15.2 15.2l2.5 2.5M6.3 17.7l2.5-2.5M15.2 8.8l2.5-2.5" opacity="0.55" />
      </svg>
    </span>
    <span className={cn("text-[17px] font-semibold tracking-tight", light ? "text-white" : "text-foreground")}>Guestra</span>
  </span>
);
