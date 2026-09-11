import { cn } from "@/lib/utils";

interface WindowProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  dark?: boolean;
  badge?: React.ReactNode;
  bodyClassName?: string;
}

export const Window = ({ title, dark, badge, className, bodyClassName, children, ...props }: WindowProps) => (
  <div className={cn(dark ? "window-dark" : "window", "overflow-hidden", className)} {...props}>
    {title !== undefined && (
      <div
        className={cn(
          "flex h-10 items-center gap-3 border-b px-4",
          dark ? "border-white/10 bg-white/[0.03]" : "border-border/70 bg-background-alt/70",
        )}
      >
        <div className="flex gap-1.5" aria-hidden>
          <span className={cn("h-2.5 w-2.5 rounded-full", dark ? "bg-white/15" : "bg-foreground/10")} />
          <span className={cn("h-2.5 w-2.5 rounded-full", dark ? "bg-white/15" : "bg-foreground/10")} />
          <span className={cn("h-2.5 w-2.5 rounded-full", dark ? "bg-white/15" : "bg-foreground/10")} />
        </div>
        <span className={cn("truncate text-xs font-medium", dark ? "text-white/60" : "text-muted-foreground")}>
          {title}
        </span>
        {badge && <div className="ml-auto">{badge}</div>}
      </div>
    )}
    <div className={cn(bodyClassName)}>{children}</div>
  </div>
);
