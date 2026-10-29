import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HeroComposition } from "@/components/product/HeroComposition";
import { useDemoModal } from "@/components/layout/DemoModal";
import { productNav } from "@/data/navigation";

const facts = ["WhatsApp, Telegram и телефон", "Шахматка, касса и ночной аудит", "Отчёты по каждому объекту и сети", "Интерфейс на русском"];

export const Hero = () => {
  const { open } = useDemoModal();
  return (
    <section id="top" className="home-hero">
      <div className="container-wide hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">PMS · CRM · AI-администратор</p>
          <h1>Гостиничная система, где AI доводит обращение <em>до оплаченной брони</em></h1>
          <p className="lede">AI-администратор отвечает гостям в WhatsApp, Telegram и по телефону, проверяет свободные номера и цены в PMS и держит номер, пока гость оплачивает. Сложный разговор забирает сотрудник — со всей перепиской и историей гостя.</p>
          <div className="hero-actions">
            <Button size="lg" onClick={(event) => open("demo", event.currentTarget)}>Запросить демо <ArrowUpRight className="h-4 w-4" /></Button>
            <a href="#how" className="text-link">Как это работает <ArrowDown className="h-4 w-4" /></a>
          </div>
        </div>
        <div className="hero-stage">
          <div className="stage-caption"><span>Guestra / Работа отеля</span><span>AI → CRM → PMS</span></div>
          <HeroComposition />
          <p className="stage-note">Пример: обращение в WhatsApp становится бронью в PMS и попадает в выручку дня.</p>
        </div>
      </div>
      <ul className="container-wide hero-facts" aria-label="Коротко о Guestra">
        {facts.map((fact) => <li key={fact}>{fact}</li>)}
      </ul>
      <nav className="product-index" aria-label="Модули Guestra">
        <div className="container-wide">
          {productNav.map((item, i) => <Link key={item.href} to={item.href}><span className="num">0{i + 1}</span><span>{item.label}</span><ArrowUpRight className="h-4 w-4" /></Link>)}
        </div>
      </nav>
    </section>
  );
};
