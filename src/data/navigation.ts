export interface ProductNavItem {
  group: string;
  label: string;
  description: string;
  href: string;
}

/** Меню «Платформа»: продукты сгруппированы по задачам отеля, а не по аббревиатурам. */
export const productNav: ProductNavItem[] = [
  { group: "Продажи и гости", label: "AI-администратор", description: "Отвечает в WhatsApp, Telegram и по телефону и бронирует", href: "/ai" },
  { group: "Продажи и гости", label: "CRM и входящие", description: "Обращения, предложения, оплаты и повторные продажи", href: "/crm" },
  { group: "Бронирования", label: "PMS", description: "Шахматка, ресепшен, услуги, группы, фолио и касса", href: "/pms" },
  { group: "Цены", label: "Управление доходами", description: "Цена по спросу, согласование и прогноз", href: "/revenue-management" },
  { group: "Службы", label: "Операции", description: "Уборка, техслужба и запросы гостей", href: "/operations" },
  { group: "Финансы и отчёты", label: "Кабинет собственника", description: "Выручка, план и факт, решения команды", href: "/owner" },
];

export const platformLinks = [
  { label: "Как работает Guestra", href: "/platform" },
  { label: "Интеграции", href: "/integrations" },
  { label: "Безопасность", href: "/security" },
  { label: "Что нового", href: "/updates" },
];
