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
          "product-window-toolbar flex min-h-11 items-center gap-3 border-b px-4 py-2",
          dark ? "border-white/10 bg-white/[0.03]" : "border-border/70 bg-background-alt/70",
        )}
      >
        <span className={cn("window-mark", dark && "window-mark-light")} aria-hidden>G</span>
        <span className={cn("truncate text-xs font-medium", dark ? "text-white/60" : "text-muted-foreground")}>
          {title}
        </span>
        {badge && <div className="ml-auto">{badge}</div>}
      </div>
    )}
    <div className={cn(bodyClassName)}>{children}</div>
  </div>
);
