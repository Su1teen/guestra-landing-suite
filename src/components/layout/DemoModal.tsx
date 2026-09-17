import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DemoModalContextValue {
  open: (intent?: DemoIntent) => void;
  close: () => void;
}

export type DemoIntent = "demo" | "integration" | "voice";

const DemoModalContext = createContext<DemoModalContextValue | null>(null);

export const useDemoModal = () => {
  const ctx = useContext(DemoModalContext);
  if (!ctx) throw new Error("useDemoModal must be used inside DemoModalProvider");
  return ctx;
};

const titles: Record<DemoIntent, { title: string; subtitle: string; cta: string }> = {
  demo: {
    title: "Запросить демо",
    subtitle: "Покажем, как Guestra будет работать в вашем отеле - на ваших процессах и вашем стеке.",
    cta: "Запросить демо",
  },
  integration: {
    title: "Обсудить интеграцию",
    subtitle: "Расскажите, какие системы уже используете. Мы предложим схему подключения без замены.",
    cta: "Обсудить интеграцию",
  },
  voice: {
    title: "Автоматизировать звонки",
    subtitle: "Подключим Voice AI к вашей АТС и покажем, как звонки превращаются в лиды в CRM.",
    cta: "Обсудить Voice AI",
  },
};

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10";

export const DemoModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [intent, setIntent] = useState<DemoIntent | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const open = useCallback((i: DemoIntent = "demo") => {
    setSubmitted(false);
    setIntent(i);
  }, []);
  const close = useCallback(() => setIntent(null), []);

  useEffect(() => {
    if (!intent) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [intent, close]);

  const value = useMemo(() => ({ open, close }), [open, close]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    window.setTimeout(close, 2800);
  };

  const copy = intent ? titles[intent] : titles.demo;

  return (
    <DemoModalContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {intent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 z-[90] bg-ink/70 backdrop-blur-md"
            />
            <div className="pointer-events-none fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-6">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="demo-title"
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-auto w-full max-w-md overflow-hidden rounded-3xl border border-border bg-white shadow-2xl"
              >
                {!submitted ? (
                  <div className="p-7 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 id="demo-title" className="text-2xl font-semibold tracking-tight">
                          {copy.title}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy.subtitle}</p>
                      </div>
                      <button
                        onClick={close}
                        aria-label="Закрыть"
                        className="-mr-2 -mt-1 rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-medium text-foreground">Имя</span>
                        <input required name="name" type="text" autoComplete="name" placeholder="Айдана Сериковна" className={inputClass} />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-medium text-foreground">Компания / объект</span>
                        <input required name="company" type="text" autoComplete="organization" placeholder="Название отеля или сети" className={inputClass} />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-medium text-foreground">Телефон</span>
                        <input required name="phone" type="tel" autoComplete="tel" placeholder="+7 701 000 00 00" className={inputClass} />
                      </label>

                      <Button type="submit" size="lg" className="mt-2 h-12 w-full rounded-xl text-[15px]">
                        {copy.cta}
                      </Button>
                      <p className="text-center text-[11px] text-muted-foreground">Ответим в течение одного рабочего дня.</p>
                    </form>
                  </div>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="p-12 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.15, stiffness: 260, damping: 18 }}
                      className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald/15 text-emerald"
                    >
                      <Check className="h-7 w-7" strokeWidth={2.5} />
                    </motion.div>
                    <h3 className="mt-5 text-xl font-semibold">Заявка принята</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Мы свяжемся с вами и подготовим демо под ваш объект.</p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </DemoModalContext.Provider>
  );
};
