import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroProductDemo } from "@/components/product/HeroProductDemo";
import { useDemoModal } from "@/components/layout/DemoModal";
import { ease } from "@/lib/motion";

const modules = ["CRM", "AI Sales", "Voice AI", "PMS", "Операции", "Revenue", "Channel Manager", "POS", "Guest 360", "Аналитика"];

export const Hero = () => {
  const { open } = useDemoModal();
  return (
    <section id="top" className="relative overflow-hidden pb-24 pt-32 md:pb-32 md:pt-40">
      <div className="grid-bg absolute inset-0 -z-10" aria-hidden />
      <div className="container-wide px-5 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="eyebrow"
          >
            <span className="eyebrow-dot" aria-hidden />
            Единая платформа для отеля
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="headline-xl mt-6"
          >
            Все системы отеля.
            <br />
            <span className="gradient-text">В одной экосистеме.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="lede mx-auto mt-6 max-w-2xl"
          >
            Guestra объединяет CRM, PMS, продажи, AI, операционные процессы, revenue и аналитику - чтобы команда работала в одной
            системе, а руководство видело весь бизнес целиком.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button size="lg" className="h-12 rounded-full px-7 text-[15px] shadow-lg shadow-primary/25" onClick={() => open("demo")}>
              Запросить демо
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full px-7 text-[15px]">
              <a href="#platform">
                Посмотреть платформу <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs font-medium text-muted-foreground"
            aria-label="Модули платформы"
          >
            {modules.map((m, i) => (
              <li key={m} className="flex items-center gap-3">
                {i > 0 && <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/50" aria-hidden />}
                {m}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="mt-16 md:mt-20">
          <HeroProductDemo />
        </div>
      </div>
    </section>
  );
};
