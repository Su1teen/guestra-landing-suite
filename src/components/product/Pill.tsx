import { cn } from "@/lib/utils";

export type Tone = "neutral" | "primary" | "success" | "warning" | "danger" | "violet" | "whatsapp";

const tones: Record<Tone, string> = {
  neutral: "bg-muted text-muted-foreground",
  primary: "bg-primary/10 text-primary",
  success: "bg-emerald/10 text-emerald",
  warning: "bg-amber/15 text-[hsl(30,90%,38%)]",
  danger: "bg-rose/10 text-rose",
  violet: "bg-violet/10 text-violet",
  whatsapp: "bg-whatsapp/10 text-[hsl(142,70%,32%)]",
};

interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  dot?: boolean;
}

export const Pill = ({ tone = "neutral", dot, className, children, ...props }: PillProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium leading-4",
      tones[tone],
      className,
    )}
    {...props}
  >
    {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />}
    {children}
  </span>
);
