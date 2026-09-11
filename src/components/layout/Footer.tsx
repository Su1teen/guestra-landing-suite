import { Logo } from "./Logo";

const columns = [
  {
    title: "Платформа",
    links: [
      { label: "AI-агент продаж", href: "#ai" },
      { label: "Voice AI", href: "#voice" },
      { label: "CRM и Guest 360", href: "#crm" },
      { label: "PMS", href: "#pms" },
      { label: "Динамическое ценообразование", href: "#pricing" },
    ],
  },
  {
    title: "Управление",
    links: [
      { label: "Операции", href: "#operations" },
      { label: "Аналитика собственника", href: "#analytics" },
      { label: "Для сетей", href: "#networks" },
      { label: "Интеграции", href: "#integrations" },
      { label: "Дорожная карта", href: "#roadmap" },
    ],
  },
  {
    title: "Компания",
    links: [
      { label: "О платформе", href: "#platform" },
      { label: "Модель сотрудничества", href: "#model" },
      { label: "Запросить демо", href: "#contact" },
    ],
  },
];

export const Footer = () => (
  <footer className="ink border-t border-white/10">
    <div className="container-wide px-5 py-16 sm:px-8">
      <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
            Единая операционная платформа для независимых отелей, курортов и гостиничных сетей. Стартовый рынок — Казахстан.
          </p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/45">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <a href={l.href} className="text-sm text-white/75 transition hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Guestra. Все права защищены.</span>
        <span>Hospitality Operating System</span>
      </div>
    </div>
  </footer>
);
