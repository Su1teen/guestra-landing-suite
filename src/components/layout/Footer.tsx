import { Link } from "react-router-dom";
import { useDemoModal } from "./DemoModal";
import { Logo } from "./Logo";

const columns = [
  { title: "Продукты", links: [
    { label: "CRM и продажи", href: "/crm" }, { label: "PMS", href: "/pms" },
    { label: "Revenue Management", href: "/revenue-management" }, { label: "Операции", href: "/operations" },
    { label: "AI", href: "/ai" },
  ] },
  { title: "Управление", links: [
    { label: "Для собственника", href: "/owner" }, { label: "Интеграции и 1С", href: "/integrations" },
    { label: "Безопасность", href: "/security" },
  ] },
];

export const Footer = () => {
  const { open } = useDemoModal();
  return (
    <footer className="ink border-t border-white/10">
      <div className="container-wide px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" aria-label="Guestra - на главную"><Logo light /></Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">Guestra помогает видеть выручку, работу команды и состояние отеля в одном кабинете.</p>
          </div>
          {columns.map((column) => <nav key={column.title} aria-label={column.title}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/45">{column.title}</h3>
            <ul className="mt-4 space-y-2.5">{column.links.map((link) => <li key={link.href}>
              <Link to={link.href} className="text-sm text-white/75 transition hover:text-white">{link.label}</Link>
            </li>)}</ul>
          </nav>)}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/45">Связаться</h3>
            <button onClick={() => open("demo")} className="mt-4 text-left text-sm text-white/75 transition hover:text-white">Запросить демо</button>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Guestra. Все права защищены.</span>
          <span>Управление гостиничным бизнесом</span>
        </div>
      </div>
    </footer>
  );
};
