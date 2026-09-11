import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDemoModal } from "./DemoModal";
import { Logo } from "./Logo";

const navLinks = [
  { label: "Платформа", href: "#platform" },
  { label: "AI", href: "#ai" },
  { label: "Возможности", href: "#features" },
  { label: "Интеграции", href: "#integrations" },
  { label: "Аналитика", href: "#analytics" },
  { label: "Для сетей", href: "#networks" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { open: openDemo } = useDemoModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "transition-all duration-300",
          scrolled || open ? "border-b border-border/70 bg-white/80 backdrop-blur-xl" : "bg-transparent",
        )}
        aria-label="Основная навигация"
      >
        <div className="container-wide flex h-16 items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-2.5" aria-label="Guestra — на главную">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/70 transition hover:bg-muted hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <Button variant="ghost" className="rounded-full" onClick={() => openDemo("integration")}>
              Обсудить интеграцию
            </Button>
            <Button className="rounded-full px-5" onClick={() => openDemo("demo")}>
              Запросить демо
            </Button>
          </div>

          <button
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-foreground lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="border-b border-border bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col px-5 py-4">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-foreground transition hover:bg-muted"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-3 flex flex-col gap-2 px-1">
                <Button
                  className="h-12 rounded-xl text-[15px]"
                  onClick={() => {
                    setOpen(false);
                    openDemo("demo");
                  }}
                >
                  Запросить демо
                </Button>
                <Button
                  variant="outline"
                  className="h-12 rounded-xl text-[15px]"
                  onClick={() => {
                    setOpen(false);
                    openDemo("integration");
                  }}
                >
                  Обсудить интеграцию
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
