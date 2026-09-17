import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink,
  NavigationMenuList, NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useDemoModal } from "./DemoModal";
import { Logo } from "./Logo";

const products = [
  { label: "CRM и продажи", description: "От обращения до оплаты", href: "/crm" },
  { label: "PMS", description: "Брони, номера и тарифы", href: "/pms" },
  { label: "Revenue Management", description: "Цена и прогноз спроса", href: "/revenue-management" },
  { label: "Операции", description: "Уборка, заявки и сервис", href: "/operations" },
  { label: "AI", description: "Продажи и звонки", href: "/ai" },
];

const mainLinks = [
  { label: "Для собственника", href: "/owner" },
  { label: "Интеграции", href: "/integrations" },
  { label: "Безопасность", href: "/security" },
];

const linkClass = ({ isActive }: { isActive: boolean }) => cn(
  "rounded-full px-3.5 py-2 text-sm font-medium transition hover:bg-muted hover:text-foreground",
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

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.nav
        initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
        className={cn("transition-all duration-300", scrolled || open ? "border-b border-border/70 bg-white/90 backdrop-blur-xl" : "bg-white/70 backdrop-blur-md")}
        aria-label="Основная навигация"
      >
        <div className="container-wide flex h-16 items-center justify-between px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Guestra - на главную"><Logo /></Link>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="rounded-full bg-transparent px-3.5 text-foreground/70 hover:bg-muted hover:text-foreground data-[state=open]:bg-muted">
                  Продукты
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-3">
                  <div className="grid w-[580px] grid-cols-2 gap-1.5">
                    {products.map((product) => (
                      <NavigationMenuLink asChild key={product.href}>
                        <Link to={product.href} className="group rounded-xl p-3.5 transition hover:bg-muted focus:bg-muted focus:outline-none">
                          <span className="flex items-center justify-between text-sm font-semibold text-foreground">
                            {product.label}<ArrowUpRight className="h-4 w-4 text-muted-foreground/60 transition group-hover:text-primary" />
                          </span>
                          <span className="mt-1 block text-xs text-muted-foreground">{product.description}</span>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {mainLinks.map((link) => <NavigationMenuItem key={link.href}><NavLink to={link.href} className={linkClass}>{link.label}</NavLink></NavigationMenuItem>)}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden lg:flex">
            <Button className="rounded-full px-5" onClick={() => openDemo("demo")}>Запросить демо</Button>
          </div>
          <button
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-foreground lg:hidden"
            onClick={() => setOpen((v) => !v)} aria-label={open ? "Закрыть меню" : "Открыть меню"} aria-expanded={open}
          >{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}
            className="max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-border bg-white/95 px-5 py-5 shadow-xl backdrop-blur-xl lg:hidden">
            <nav aria-label="Мобильная навигация" className="container-wide">
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Продукты</p>
              <div className="mt-2 grid gap-1 sm:grid-cols-2">
                {products.map((product) => <Link key={product.href} to={product.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2.5 transition hover:bg-muted">
                  <span className="block text-sm font-semibold">{product.label}</span><span className="text-xs text-muted-foreground">{product.description}</span>
                </Link>)}
              </div>
              <div className="my-4 border-t border-border" />
              <div className="grid gap-1 sm:grid-cols-2">
                {mainLinks.map((link) => <Link key={link.href} to={link.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm font-medium transition hover:bg-muted">{link.label}</Link>)}
              </div>
              <Button className="mt-5 h-12 w-full rounded-xl" onClick={() => { setOpen(false); openDemo("demo"); }}>Запросить демо</Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
