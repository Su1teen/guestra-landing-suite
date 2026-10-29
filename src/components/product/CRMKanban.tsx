import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle, Phone, Globe, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { crmColumns, crmLeads } from "@/data/demo";
import { Pill } from "./Pill";
import { Window } from "./Window";
import { useStepper } from "@/hooks/use-stepper";

const channelIcon = (c: string) => {
  if (c === "WhatsApp") return <MessageCircle className="h-3 w-3 text-whatsapp" />;
  if (c === "Звонок") return <Phone className="h-3 w-3 text-primary" />;
  return <Globe className="h-3 w-3 text-cyan" />;
};

const toneBar: Record<string, string> = {
  primary: "bg-primary",
  violet: "bg-violet",
  warning: "bg-amber",
  success: "bg-emerald",
  danger: "bg-rose",
};

export const CRMKanban = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px -15% 0px" });
  // animates "Анна Иванова" moving from "Ожидает оплаты" → "Подтверждено"
  const step = useStepper(2, inView, { intervals: [2600, 3200], loopPause: 2600 });
  const annaConfirmed = step === 1;

  return (
    <div ref={ref}>
      <Window
        title="Guestra CRM · Обращения"
        className={className}
        badge={
          <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary" /> AI ведёт 14 диалогов
          </span>
        }
      >
        <div className="scrollbar-none overflow-x-auto">
          <div className="grid min-w-[980px] grid-cols-6 gap-3 p-3">
            {crmColumns.map((col) => {
              let leads = crmLeads[col.title] ?? [];
              if (col.title === "Ожидает оплаты" && annaConfirmed) leads = leads.filter((l) => l.name !== "Анна Иванова");
              if (col.title === "Подтверждено" && annaConfirmed)
                leads = [{ name: "Анна Иванова", note: "Forest House, 18–20 окт", sum: "148 000 ₸", channel: "WhatsApp" }, ...leads];
              const count = col.title === "Ожидает оплаты" ? col.count - (annaConfirmed ? 1 : 0) : col.title === "Подтверждено" ? col.count + (annaConfirmed ? 1 : 0) : col.count;

              return (
                <div key={col.title} className="flex flex-col rounded-xl bg-background-alt/80 p-2">
                  <div className="flex items-center gap-2 px-1 pb-2">
                    <span className={cn("h-2 w-2 rounded-full", toneBar[col.tone])} aria-hidden />
                    <span className="truncate text-xs font-semibold">{col.title}</span>
                    <span className="num ml-auto rounded-md bg-white px-1.5 text-[11px] text-muted-foreground">{count}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {leads.map((l) => (
                      <motion.div
                        key={l.name}
                        layout
                        layoutId={l.name === "Анна Иванова" ? "anna" : undefined}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={cn(
                          "rounded-lg border bg-white p-2.5 shadow-sm",
                          l.name === "Анна Иванова" ? "border-primary/40 ring-2 ring-primary/15" : "border-border",
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate text-xs font-semibold">{l.name}</span>
                          {channelIcon(l.channel)}
                        </div>
                        <div className="mt-0.5 truncate text-[11px] text-muted-foreground">{l.note}</div>
                        <div className="mt-2 flex items-center justify-between">
                          {l.sum ? <span className="num text-[11px] font-medium">{l.sum}</span> : <span />}
                          {l.name === "Анна Иванова" && (
                            <Pill tone={annaConfirmed ? "success" : "warning"} dot>
                              {annaConfirmed ? "Оплачено" : "Ждём оплату"}
                            </Pill>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Window>
    </div>
  );
};
