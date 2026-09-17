import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDemoModal } from "@/components/layout/DemoModal";
import { ease } from "@/lib/motion";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  secondLink?: { label: string; href: string };
}

export const PageIntro = ({ eyebrow, title, description, secondLink }: PageIntroProps) => {
  const { open } = useDemoModal();
  return <section className="relative overflow-hidden border-b border-border bg-background-alt pb-16 pt-32 md:pb-20 md:pt-40">
    <div className="grid-bg absolute inset-0 -z-10" aria-hidden />
    <div className="container-wide px-5 sm:px-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="max-w-4xl">
        <span className="eyebrow"><span className="eyebrow-dot" aria-hidden />{eyebrow}</span>
        <h1 className="headline-xl mt-6">{title}</h1>
        <p className="lede mt-6 max-w-2xl">{description}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" className="h-12 rounded-full px-7" onClick={() => open("demo")}>Запросить демо</Button>
          {secondLink && <Button asChild size="lg" variant="outline" className="h-12 rounded-full px-7">
            <Link to={secondLink.href}>{secondLink.label}<ArrowRight className="h-4 w-4" /></Link>
          </Button>}
        </div>
      </motion.div>
    </div>
  </section>;
};
