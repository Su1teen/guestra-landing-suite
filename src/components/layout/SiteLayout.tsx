import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const metadata: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Guestra - управление и контроль гостиничного бизнеса",
    description: "Guestra объединяет CRM, PMS, Revenue Management, AI и операционные процессы. Контроль выручки, загрузки, сотрудников и сервиса для отелей и курортов.",
  },
  "/owner": {
    title: "Кабинет собственника - Guestra",
    description: "Выручка, загрузка, отчётность, действия сотрудников и события, требующие внимания, по одному отелю или всей сети.",
  },
  "/crm": {
    title: "CRM для отеля - Guestra",
    description: "Путь обращения до брони и оплаты, история гостя, повторные продажи и контроль работы с заявками.",
  },
  "/pms": {
    title: "PMS для отеля - Guestra",
    description: "Бронирования, номерной фонд, тарифы, оплаты и заезды в интерфейсе, связанном с продажами и операциями.",
  },
  "/revenue-management": {
    title: "Revenue Management - Guestra",
    description: "Динамическое ценообразование с понятными причинами изменений, ограничениями тарифа и контролем со стороны команды.",
  },
  "/operations": {
    title: "Операции отеля - Guestra",
    description: "Уборка, инженерные заявки и запросы гостей: статусы задач, сроки и отклонения для руководителя.",
  },
  "/ai": {
    title: "AI для отеля - Guestra",
    description: "Сценарии продаж и звонков с данными о госте, наличии номеров и актуальных тарифах.",
  },
  "/integrations": {
    title: "Интеграции и 1С - Guestra",
    description: "Как Guestra может работать с действующими системами отеля и как планируется подключение данных для управленческой отчётности.",
  },
  "/security": {
    title: "Безопасность данных - Guestra",
    description: "Подход Guestra к доступу сотрудников, журналу действий и защите персональных и операционных данных.",
  },
};

export const SiteLayout = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const page = metadata[pathname] ?? metadata["/"];
    const url = `https://guestra.org${pathname === "/" ? "/" : pathname}`;
    document.title = page.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", page.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", page.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", page.description);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", url);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", page.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", page.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
    if (hash) {
      window.requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    } else {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [pathname, hash]);

  return <><Navbar /><Outlet /><Footer /></>;
};
