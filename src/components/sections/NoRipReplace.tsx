import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const layers = [
  {
    title: "Сегодня: ваши системы",
    items: ["Текущая CRM", "Текущая PMS", "Текущий POS", "WhatsApp", "АТС"],
    tone: "border-border bg-white",
    note: "Составляем карту систем и решаем, какие данные нужны в первую очередь.",
  },
  {
    title: "Guestra подключается сверху",
    items: ["AI-продажи", "Автоматизация", "Аналитика", "Revenue"],
    tone: "border-primary/40 bg-primary/5",
    note: "Подключаем подтверждённые источники и сверяем данные перед использованием.",
    highlight: true,
  },
  {
    title: "Затем: собственные модули",
    items: ["Guestra CRM", "Guestra PMS", "Guestra Operations", "Channel Manager"],
    tone: "border-violet/40 bg-violet/5",
    note: "Переход на собственные модули планируется отдельно, с проверкой данных и процессов.",
  },
];

export const NoRipReplace = () => (
  <section className="section bg-background-alt">
    <div className="container-wide">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <SectionHeader
          eyebrow="Плавный переход"
          title="Не нужно менять всё сразу."
          lede="Внедрение начинается с проверки действующих систем и данных. После этого можно выбрать последовательность подключения без спешки для команды отеля."
        />
        <Reveal delay={0.1}>
          <div className="flex flex-col gap-3">
            {layers.map((l, i) => (
              <div key={l.title} className="contents">
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.15 + i * 0.15 }}
                  className={cn("rounded-2xl border p-5 shadow-sm", l.tone, l.highlight && "shadow-[0_0_0_4px_hsl(var(--primary)/0.08),0_20px_50px_-20px_hsl(var(--primary)/0.4)]")}
                >
                  <div className="flex items-center gap-2">
                    <span className="num text-xs text-muted-foreground">0{i + 1}</span>
                    <span className="font-semibold">{l.title}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {l.items.map((it) => (
                      <span key={it} className={cn("rounded-lg border px-2.5 py-1 text-xs font-medium", l.highlight ? "border-primary/30 bg-white text-primary" : "border-border bg-white")}>
                        {it}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{l.note}</p>
                </motion.div>
                {i < layers.length - 1 && (
                  <div className="flex justify-center text-muted-foreground/60" aria-hidden>
                    <ArrowDown className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
