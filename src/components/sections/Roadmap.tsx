import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { roadmap } from "@/data/demo";
import { viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export const Roadmap = () => (
  <section id="roadmap" className="ink section relative overflow-hidden">
    <div className="pointer-events-none absolute inset-0 grid-bg-dark opacity-50" aria-hidden />
    <div className="container-wide relative">
      <SectionHeader
        eyebrow="Путь к Hotel OS"
        title="От интеграционного слоя — к операционной системе отеля."
        lede="Guestra растёт вместе с отелем: сначала связывает системы, затем автоматизирует, оптимизирует и постепенно становится единой платформой."
      />
      <ol className="relative mt-14 grid gap-4 md:grid-cols-5">
        <div className="absolute left-0 right-0 top-5 hidden h-px bg-white/10 md:block" aria-hidden />
        <motion.div
          className="absolute left-0 top-5 hidden h-px origin-left bg-gradient-to-r from-primary via-violet to-emerald md:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "100%" }}
          aria-hidden
        />
        {roadmap.map((r, i) => {
          const last = i === roadmap.length - 1;
          return (
            <motion.li
              key={r.stage}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="relative"
            >
              <div className={cn("relative z-10 flex h-10 w-10 items-center justify-center rounded-full border text-xs font-semibold", last ? "border-emerald bg-emerald text-ink" : "border-primary/50 bg-ink text-primary")}>
                {r.stage}
              </div>
              <div className={cn("mt-4 rounded-2xl border p-4", last ? "border-emerald/40 bg-emerald/10" : "border-white/10 bg-white/[0.04]")}>
                <div className="text-[10px] uppercase tracking-wider text-white/45">{r.en}</div>
                <div className="mt-1 font-semibold">{r.title}</div>
                <ul className="mt-3 space-y-1 text-xs text-white/65">
                  {r.items.map((it) => (
                    <li key={it}>· {it}</li>
                  ))}
                </ul>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  </section>
);
