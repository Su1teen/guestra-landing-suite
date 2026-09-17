import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { OwnerControlCenter } from "@/components/product/OwnerControlCenter";
import { useDemoModal } from "@/components/layout/DemoModal";
import { ease } from "@/lib/motion";

export const Hero = () => {
  const { open } = useDemoModal();
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 md:pb-24 md:pt-40">
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
            Все системы отеля -
            <br />
            <span className="gradient-text">На одной платформе.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="lede mx-auto mt-6 max-w-2xl"
          >
            Guestra объединяет CRM, PMS, продажи, AI, операционные процессы, revenue и аналитику - в одном кабинете. Все, что происходит с бизнесом и где нужно ваше внимание.
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
              <Link to="/owner">CRM - кабинет собственника <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </motion.div>

        </div>

        <div className="mx-auto mt-14 max-w-5xl md:mt-16">
          <OwnerControlCenter />
        </div>
      </div>
    </section>
  );
};
