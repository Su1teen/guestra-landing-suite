import Index from "./pages/Index";
import AIPage from "./pages/products/AIPage";
import CRMPage from "./pages/products/CRMPage";
import PMSPage from "./pages/products/PMSPage";
import RevenuePage from "./pages/products/RevenuePage";
import OperationsPage from "./pages/products/OperationsPage";
import OwnerPage from "./pages/products/OwnerPage";
import PlatformPage from "./pages/PlatformPage";
import IntegrationsPage from "./pages/IntegrationsPage";
import SecurityPage from "./pages/SecurityPage";
import { ImplementationPage, PricingPage, PrivacyPage, UpdatesPage } from "./pages/InfoPages";

export const SITE_URL = "https://guestra.org";

export interface SiteRoute {
  path: string;
  title: string;
  description: string;
  element: JSX.Element;
  priority: number;
}

/** Единый список страниц: роутер, метаданные, пререндер и sitemap берут данные отсюда. */
export const siteRoutes: SiteRoute[] = [
  {
    path: "/",
    title: "Guestra — PMS, CRM и AI-администратор для отелей",
    description: "AI-администратор отвечает гостям в WhatsApp, Telegram и по телефону и бронирует через PMS. Шахматка, услуги, задачи служб и отчёты собственника в одной системе.",
    element: <Index />,
    priority: 1,
  },
  {
    path: "/ai",
    title: "AI-администратор для отеля — Guestra",
    description: "Отвечает гостям в WhatsApp, Telegram и по телефону, проверяет наличие и цены в PMS, удерживает номер до оплаты и передаёт сложные случаи сотруднику.",
    element: <AIPage />,
    priority: 0.9,
  },
  {
    path: "/crm",
    title: "CRM для отеля: входящие, обращения и оплаты — Guestra",
    description: "Единые входящие WhatsApp, Telegram и звонков, статусы обращений до оплаты, удержание номера, напоминания гостю, сегменты и аналитика продаж.",
    element: <CRMPage />,
    priority: 0.9,
  },
  {
    path: "/pms",
    title: "PMS для отеля и загородного комплекса — Guestra",
    description: "Шахматка, ресепшен, карточка брони, услуги по слотам, группы, фолио, касса и ночной аудит. Брони из AI и CRM появляются сразу.",
    element: <PMSPage />,
    priority: 0.9,
  },
  {
    path: "/revenue-management",
    title: "Управление доходами и динамические цены — Guestra",
    description: "Тариф по загрузке, темпу бронирований, сезону и праздникам с расшифровкой факторов, согласованием, историей изменений и прогнозом.",
    element: <RevenuePage />,
    priority: 0.8,
  },
  {
    path: "/operations",
    title: "Операции отеля: уборка, техслужба, просьбы гостей — Guestra",
    description: "Задания уборки с чек-листами и проверкой, смены, заявки техслужбы с блокировкой номера, просьбы гостей как задачи со сроком.",
    element: <OperationsPage />,
    priority: 0.8,
  },
  {
    path: "/owner",
    title: "Кабинет собственника отеля — Guestra",
    description: "Выручка, загрузка, ADR и RevPAR по объекту и сети, план и факт, отклонения и журнал решений команды.",
    element: <OwnerPage />,
    priority: 0.9,
  },
  {
    path: "/platform",
    title: "Как работает Guestra — путь брони через всю систему",
    description: "От сообщения в WhatsApp до отчёта собственника: как связаны AI-администратор, CRM, PMS, службы и финансы.",
    element: <PlatformPage />,
    priority: 0.8,
  },
  {
    path: "/integrations",
    title: "Интеграции — Guestra",
    description: "WhatsApp, Telegram, телефония, календари OTA, ссылки на оплату, выгрузка для бухгалтерии и API для AI-агентов.",
    element: <IntegrationsPage />,
    priority: 0.7,
  },
  {
    path: "/security",
    title: "Безопасность данных — Guestra",
    description: "Доступ по ролям и объектам, история изменений, изоляция объектов и правила, по которым работает AI-администратор.",
    element: <SecurityPage />,
    priority: 0.6,
  },
  {
    path: "/implementation",
    title: "Внедрение Guestra в отеле",
    description: "Обследование, перенос данных, обучение по ролям и постепенный запуск AI-администратора без остановки работы отеля.",
    element: <ImplementationPage />,
    priority: 0.7,
  },
  {
    path: "/pricing",
    title: "Стоимость Guestra",
    description: "Стоимость зависит от номерного фонда, модулей и числа объектов. Оставьте заявку, чтобы получить расчёт.",
    element: <PricingPage />,
    priority: 0.7,
  },
  {
    path: "/updates",
    title: "Что нового в Guestra",
    description: "Новые функции CRM, PMS и AI-администратора и возможности, которые сейчас в разработке.",
    element: <UpdatesPage />,
    priority: 0.5,
  },
  {
    path: "/privacy",
    title: "Политика конфиденциальности — Guestra",
    description: "Как Guestra обрабатывает данные из заявок на сайте guestra.org.",
    element: <PrivacyPage />,
    priority: 0.2,
  },
];

export const notFoundMeta = {
  title: "Страница не найдена — Guestra",
  description: "Такой страницы нет. Перейдите на главную или выберите раздел платформы.",
};
