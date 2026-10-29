import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { productNav, platformLinks } from "@/data/navigation";
import { mailtoHref, SALES_EMAIL } from "@/lib/lead";
import { useDemoModal } from "./DemoModal";
import { Logo } from "./Logo";

const columns = [
  { title: "Платформа", links: productNav.map(({ label, href }) => ({ label, href })) },
  { title: "Как устроено", links: platformLinks },
  { title: "Компания", links: [
    { label: "Внедрение", href: "/implementation" },
    { label: "Цены", href: "/pricing" },
    { label: "Политика конфиденциальности", href: "/privacy" },
  ] },
];

export const Footer = () => {
  const { open } = useDemoModal();
  return (
    <footer className="ink border-t border-white/10">
      <div className="container-wide px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" aria-label="Guestra, на главную"><Logo light /></Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              PMS, CRM и AI-администратор для отелей, загородных комплексов и сетей.
            </p>
            <div className="mt-6 flex flex-col items-start gap-3">
              <a href={mailtoHref("Вопрос о Guestra")} className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-white/80">
                <Mail className="h-4 w-4 text-white/60" /> {SALES_EMAIL}
              </a>
              <button onClick={() => open("demo")} className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
                Запросить демо
              </button>
            </div>
          </div>
          {columns.map((column) => <nav key={column.title} aria-label={column.title}>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white/50">{column.title}</h2>
            <ul className="mt-4 space-y-2.5">{column.links.map((link) => <li key={link.href}>
              <Link to={link.href} className="text-sm text-white/75 transition hover:text-white">{link.label}</Link>
            </li>)}</ul>
          </nav>)}
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Guestra</span>
          <span>Интерфейсы на сайте показаны на примерах с условными данными</span>
        </div>
      </div>
    </footer>
  );
};
