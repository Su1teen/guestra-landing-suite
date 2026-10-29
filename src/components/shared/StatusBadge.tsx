import { cn } from "@/lib/utils";

/** Единственная метка статуса на сайте: функция в разработке. Работающие функции ничем не помечаются. */
export const StatusBadge = ({ className, dark }: { className?: string; dark?: boolean }) => (
  <span
    className={cn(
      "inline-flex shrink-0 items-center rounded-full border px-1.5 py-px text-[10px] font-semibold leading-4 tracking-wide",
      dark ? "border-white/20 text-white/60" : "border-violet/30 bg-violet/[0.06] text-violet",
      className,
    )}
  >
    Скоро
  </span>
);
