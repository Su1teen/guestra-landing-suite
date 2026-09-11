import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

const systems = [
  { label: "WhatsApp", scatter: [12, 18], color: "bg-whatsapp" },
  { label: "CRM", scatter: [78, 12], color: "bg-primary" },
  { label: "PMS", scatter: [28, 52], color: "bg-violet" },
  { label: "POS", scatter: [86, 48], color: "bg-amber" },
  { label: "OTA", scatter: [8, 82], color: "bg-cyan" },
  { label: "Таблицы", scatter: [56, 88], color: "bg-emerald" },
  { label: "АТС", scatter: [50, 14], color: "bg-rose" },
  { label: "Уборка", scatter: [88, 84], color: "bg-primary" },
  { label: "SPA", scatter: [34, 26], color: "bg-violet" },
  { label: "Аналитика", scatter: [66, 62], color: "bg-cyan" },
];

const R = 36;
const circle = (i: number, n: number) => {
  const a = (i / n) * Math.PI * 2 - Math.PI / 2;
  return [50 + R * Math.cos(a), 50 + R * Math.sin(a)];
};

const chaosLinks: [number, number, string][] = [
  [0, 1, "вручную"],
  [2, 3, "копирование"],
  [4, 2, "таблицы"],
  [6, 1, "звонок"],
  [5, 9, "экспорт"],
  [8, 7, "переписка"],
  [1, 2, "повторный ввод"],
];

const Node = ({
  label,
  scatter,
  index,
  progress,
  color,
}: {
  label: string;
  scatter: number[];
  index: number;
  progress: MotionValue<number>;
  color: string;
}) => {
  const [cx, cy] = circle(index, systems.length);
  const x = useTransform(progress, (p) => {
    const t = Math.max(0, Math.min(1, (p - 0.15) / 0.55));
    return scatter[0] + (cx - scatter[0]) * t;
  });
  const y = useTransform(progress, (p) => {
    const t = Math.max(0, Math.min(1, (p - 0.15) / 0.55));
    return scatter[1] + (cy - scatter[1]) * t;
  });
  const left = useTransform(x, (v) => `${v}%`);
  const top = useTransform(y, (v) => `${v}%`);
  const rotate = useTransform(progress, [0, 0.7], [(index % 2 ? 1 : -1) * (4 + index), 0], { clamp: true });
  const shadow = useTransform(progress, [0.5, 0.8], ["0 0 0 0 rgba(255,255,255,0)", "0 0 0 1px hsl(var(--primary) / 0.5)"], { clamp: true });

  return (
    <motion.div
      style={{ left, top, rotate, boxShadow: shadow }}
      className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-xl border border-white/15 bg-ink-2 px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-md"
    >
      <span className={cn("h-2 w-2 rounded-full", color)} aria-hidden />
      {label}
    </motion.div>
  );
};

const Link = ({ a, b, label, progress }: { a: number; b: number; label: string; progress: MotionValue<number> }) => {
  const opacity = useTransform(progress, [0.15, 0.45], [1, 0], { clamp: true });
  const [x1, y1] = systems[a].scatter;
  const [x2, y2] = systems[b].scatter;
  return (
    <motion.g style={{ opacity }}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeOpacity="0.28" strokeWidth="0.35" strokeDasharray="1.2 1.4" />
      <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 1.2} fill="white" fillOpacity="0.5" fontSize="2.2" textAnchor="middle">
        {label}
      </text>
    </motion.g>
  );
};

const Spoke = ({ index, progress }: { index: number; progress: MotionValue<number> }) => {
  const [cx, cy] = circle(index, systems.length);
  const opacity = useTransform(progress, (p) => Math.max(0, Math.min(1, (p - 0.55) / 0.2)));
  const len = useTransform(progress, (p) => Math.max(0, Math.min(1, (p - 0.55) / 0.25)));
  const x2 = useTransform(len, (v) => 50 + (cx - 50) * v);
  const y2 = useTransform(len, (v) => 50 + (cy - 50) * v);
  return (
    <g>
      {/* Базовая линия связи (всегда видна, не создает прерывистых ошмётков) */}
      <motion.line
        x1={50}
        y1={50}
        x2={x2}
        y2={y2}
        style={{ opacity }}
        stroke="hsl(var(--primary) / 0.35)"
        strokeWidth="0.5"
      />
      {/* Анимированный поток импульсов вдоль линии связи */}
      <motion.line
        x1={50}
        y1={50}
        x2={x2}
        y2={y2}
        style={{ opacity }}
        stroke="hsl(var(--primary))"
        strokeWidth="0.5"
        strokeDasharray="3 4"
        strokeLinecap="round"
        className="dash-flow"
      />
    </g>
  );
};

export const ChaosToConnection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 55, damping: 30, mass: 0.3 });

  const chaosOpacity = useTransform(progress, [0.3, 0.5], [1, 0]);
  const chaosY = useTransform(progress, [0.3, 0.5], [0, -24]);
  const connectOpacity = useTransform(progress, [0.55, 0.75], [0, 1]);
  const connectY = useTransform(progress, [0.55, 0.75], [24, 0]);
  const centerScale = useTransform(progress, [0.5, 0.75], [0, 1]);
  const centerOpacity = useTransform(progress, [0.5, 0.65], [0, 1]);
  const glow = useTransform(progress, [0.6, 1], [0, 1]);

  return (
    <div ref={ref} className="relative h-[240vh] md:h-[260vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-5">
        <div className="grid-bg-dark absolute inset-0" aria-hidden />

        <div className="relative z-10 mx-auto grid h-full w-full max-w-6xl grid-rows-[auto_1fr] gap-6 py-16 md:grid-cols-[0.9fr_1.1fr] md:grid-rows-1 md:items-center md:gap-10 md:py-24">
          <div className="relative w-full max-w-lg md:-translate-y-6 lg:-translate-y-10">
            <motion.div style={{ opacity: chaosOpacity, y: chaosY }} className="w-full">
              <span className="eyebrow">
                <span className="eyebrow-dot" aria-hidden />
                Проблема
              </span>
              <h2 className="headline mt-4 sm:mt-5">
                У отеля может быть десять систем. <span className="text-white/45">Но ни одной общей картины.</span>
              </h2>
              <p className="lede mt-3 sm:mt-5 max-w-md">
                Продажи в WhatsApp и по телефону, брони в PMS, ресторан в POS, отчёты в таблицах. Каждый блок работает — но отдельно.
                Данные переносят вручную, повторные гости выглядят как новые.
              </p>
            </motion.div>
            <motion.div style={{ opacity: connectOpacity, y: connectY }} className="pointer-events-none absolute inset-0 w-full">
              <span className="eyebrow">
                <span className="eyebrow-dot" aria-hidden />
                Решение
              </span>
              <h2 className="headline mt-4 sm:mt-5">Guestra соединяет их.</h2>
              <p className="lede mt-3 sm:mt-5 max-w-md">
                Все системы подключаются к одному operating layer. Гость, бронь, цена, задача и выручка становятся одной связанной
                историей — без повторного ввода данных.
              </p>
            </motion.div>
          </div>

          <div className="relative aspect-square w-full min-w-0 max-w-[min(520px,100%)] self-center justify-self-center">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
              {chaosLinks.map(([a, b, label]) => (
                <Link key={`${a}-${b}`} a={a} b={b} label={label} progress={progress} />
              ))}
              {systems.map((_, i) => (
                <Spoke key={i} index={i} progress={progress} />
              ))}
            </svg>

            <motion.div
              style={{ scale: centerScale, opacity: centerOpacity }}
              className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            >
              <motion.div
                style={{ opacity: glow }}
                className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.45),transparent_70%)] blur-xl"
              />
              <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-ink px-5 py-3 shadow-2xl">
                <Logo light />
              </div>
            </motion.div>

            {systems.map((s, i) => (
              <Node key={s.label} index={i} label={s.label} scatter={s.scatter} color={s.color} progress={progress} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
