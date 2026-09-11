import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type EventStatus = "done" | "active" | "pending";

interface SystemEventProps {
  label: string;
  status?: EventStatus;
  meta?: string;
  dark?: boolean;
  className?: string;
}

export const SystemEvent = ({ label, status = "done", meta, dark, className }: SystemEventProps) => (
  <motion.div
    layout
    initial={{ opacity: 0, x: -8 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.35 }}
    className={cn(
      "flex items-center gap-2.5 rounded-lg border px-2.5 py-1.5 text-xs",
      dark ? "border-white/10 bg-white/[0.04] text-white/85" : "border-border bg-white text-foreground",
      status === "pending" && "opacity-45",
      className,
    )}
  >
    <span
      className={cn(
        "flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
        status === "done" && "bg-emerald text-white",
        status === "active" && "bg-primary/15 text-primary",
        status === "pending" && (dark ? "border border-white/20" : "border border-border"),
      )}
      aria-hidden
    >
      {status === "done" && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
      {status === "active" && <Loader2 className="h-2.5 w-2.5 animate-spin" />}
    </span>
    <span className="font-medium">{label}</span>
    {meta && <span className={cn("ml-auto num", dark ? "text-white/45" : "text-muted-foreground")}>{meta}</span>}
  </motion.div>
);

interface SystemEventListProps {
  events: string[];
  /** number of events already completed */
  progress: number;
  dark?: boolean;
  className?: string;
}

export const SystemEventList = ({ events, progress, dark, className }: SystemEventListProps) => (
  <div className={cn("flex flex-col gap-1.5", className)}>
    {events.map((label, i) => (
      <SystemEvent
        key={label}
        label={label}
        dark={dark}
        status={i < progress ? "done" : i === progress ? "active" : "pending"}
      />
    ))}
  </div>
);
