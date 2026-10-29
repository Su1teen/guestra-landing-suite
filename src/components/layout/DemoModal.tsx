import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { LeadForm } from "@/components/shared/LeadForm";
import type { LeadIntent } from "@/lib/lead";

interface DemoModalContextValue {
  open: (intent?: LeadIntent) => void;
  close: () => void;
}

export type DemoIntent = LeadIntent;

const DemoModalContext = createContext<DemoModalContextValue | null>(null);

export const useDemoModal = () => {
  const ctx = useContext(DemoModalContext);
  if (!ctx) throw new Error("useDemoModal must be used inside DemoModalProvider");
  return ctx;
};

const copy: Record<LeadIntent, { title: string; subtitle: string; cta: string }> = {
  demo: {
    title: "Запросить демо",
    subtitle: "Покажем Guestra на сценариях вашего отеля: переписку с гостем, шахматку, задачи служб и отчёты.",
    cta: "Запросить демо",
  },
  integration: {
    title: "Обсудить подключение",
    subtitle: "Расскажите, какие системы работают в отеле сейчас. Предложим порядок перехода без остановки работы.",
    cta: "Обсудить подключение",
  },
  voice: {
    title: "Голосовой AI-агент",
    subtitle: "Покажем, как агент принимает звонки, уточняет даты и состав гостей и передаёт обращение в CRM.",
    cta: "Обсудить голосового агента",
  },
  pricing: {
    title: "Рассчитать стоимость",
    subtitle: "Стоимость зависит от номерного фонда, модулей и числа объектов. Подготовим расчёт под ваш отель.",
    cta: "Получить расчёт",
  },
};

export const DemoModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [intent, setIntent] = useState<LeadIntent | null>(null);
  const [formKey, setFormKey] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((next: LeadIntent = "demo") => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setFormKey((k) => k + 1);
    setIntent(next);
  }, []);
  const close = useCallback(() => {
    setIntent(null);
    returnFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    if (!intent) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLInputElement>("input")?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [intent, close]);

  const value = useMemo(() => ({ open, close }), [open, close]);
  const text = copy[intent ?? "demo"];

  return (
    <DemoModalContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {intent && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} className="fixed inset-0 z-[90] bg-ink/60 backdrop-blur-sm" />
            <div className="pointer-events-none fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-6">
              <motion.div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="demo-title"
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-auto max-h-[calc(100dvh-24px)] w-full max-w-lg overflow-y-auto rounded-3xl border border-border bg-white shadow-2xl"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 id="demo-title" className="text-2xl font-semibold tracking-tight">{text.title}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text.subtitle}</p>
                    </div>
                    <button onClick={close} aria-label="Закрыть" className="-mr-2 -mt-1 rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <LeadForm key={formKey} intent={intent} submitLabel={text.cta} compact className="mt-6" />
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </DemoModalContext.Provider>
  );
};
