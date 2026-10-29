import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink,
  NavigationMenuList, NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { productNav, platformLinks } from "@/data/navigation";
import { useDemoModal } from "./DemoModal";
import { Logo } from "./Logo";

const mainLinks = [
  { label: "Для собственника", href: "/owner" },
  { label: "Внедрение", href: "/implementation" },
  { label: "Цены", href: "/pricing" },
];

const linkClass = ({ isActive }: { isActive: boolean }) => cn(
  "rounded-md px-3.5 py-2 text-sm font-medium transition hover:bg-muted hover:text-foreground",
  isActive ? "text-primary" : "text-foreground/70",
);

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { open: openDemo } = useDemoModal();

  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("mobile-menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50">
      <nav
        className={cn("transition-colors duration-300", scrolled || open ? "border-b border-border bg-background/95 backdrop-blur-xl" : "border-b border-transparent bg-background/95")}
        aria-label="Основная навигация"
      >
        <div className="container-wide flex h-16 items-center justify-between px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Guestra, на главную"><Logo /></Link>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="rounded-md bg-transparent px-3.5 text-foreground/70 hover:bg-muted hover:text-foreground data-[state=open]:bg-muted">
                  Платформа
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[760px] p-3">
                    <div className="grid grid-cols-3 gap-1">
                      {productNav.map((item) => (
                        <NavigationMenuLink asChild key={item.href}>
                          <Link to={item.href} className="group rounded-xl p-3.5 transition hover:bg-muted focus:bg-muted focus:outline-none">
                            <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{item.group}</span>
                            <span className="mt-1.5 flex items-center justify-between text-sm font-semibold text-foreground">
                              {item.label}
                              <ArrowUpRight className="h-4 w-4 text-muted-foreground/50 transition group-hover:text-primary" />
                            </span>
                            <span className="mt-1 block text-xs leading-snug text-muted-foreground">{item.description}</span>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-x-1 gap-y-1 rounded-xl bg-background-alt px-2 py-2">
                      {platformLinks.map((link) => (
                        <NavigationMenuLink asChild key={link.href}>
                          <Link to={link.href} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-foreground/75 transition hover:bg-white hover:text-foreground">
                            {link.label}
                            <ArrowRight className="h-3 w-3 opacity-50" />
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {mainLinks.map((link) => <NavigationMenuItem key={link.href}><NavLink to={link.href} className={linkClass}>{link.label}</NavLink></NavigationMenuItem>)}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden items-center gap-2 lg:flex">
            <Button className="rounded-md px-5" onClick={(event) => openDemo("demo", event.currentTarget)}>Запросить демо</Button>
          </div>
          <button
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-foreground lg:hidden"
            id="mobile-menu-toggle" aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)} aria-label={open ? "Закрыть меню" : "Открыть меню"} aria-expanded={open}
          >{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-border bg-white px-5 pb-6 pt-4 shadow-xl lg:hidden">
            <nav id="mobile-menu" aria-label="Мобильная навигация" className="container-wide">
              <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Платформа</p>
              <div className="mt-2 grid gap-0.5 sm:grid-cols-2">
                {productNav.map((item) => <Link key={item.href} to={item.href} className="rounded-xl px-3 py-2.5 transition hover:bg-muted">
                  <span className="block text-sm font-semibold">{item.label}</span><span className="text-xs text-muted-foreground">{item.description}</span>
                </Link>)}
              </div>
              <div className="my-3 border-t border-border" />
              <div className="grid gap-0.5 sm:grid-cols-2">
                {[...platformLinks, ...mainLinks].map((link) => <Link key={link.href} to={link.href} className="rounded-xl px-3 py-2.5 text-sm font-medium transition hover:bg-muted">{link.label}</Link>)}
              </div>
              <Button className="mt-5 h-12 w-full rounded-xl" onClick={(event) => { setOpen(false); openDemo("demo", event.currentTarget); }}>Запросить демо</Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
