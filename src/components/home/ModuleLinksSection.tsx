import { useState } from "react";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ModuleTag } from "@/components/product/ModuleLinkCard";
import { moduleLinks } from "@/data/moduleLinks";

/** All six scenarios remain in the document; one receives focus at a time. */
export const ModuleLinksSection = () => {
  const [active, setActive] = useState(0);
  const Fragment = moduleLinks[active].Fragment;
  return (
    <section id="how" className="section workflow-section scroll-mt-20">
      <div className="container-wide">
        <div className="section-heading-row">
          <SectionHeader eyebrow="Как модули работают вместе" title="От сообщения гостя до отчёта собственника" lede="Продажи, бронирования, службы и финансы в Guestra работают на одних данных. Действие в одном модуле сразу видно в остальных, без пересылок и ручного переноса." />
          <Link to="/platform" className="text-link">Весь путь брони <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="workflow-layout">
          <div className="workflow-list">
            {moduleLinks.slice(0, 6).map((link, i) => (
              <div key={link.title} className="workflow-item" data-active={active === i}>
                <h3><button type="button" aria-expanded={active === i} aria-controls={`workflow-${i}`} onClick={() => setActive(i)}><span className="num">0{i + 1}</span>{link.title}{active === i ? <Minus /> : <Plus />}</button></h3>
                <div id={`workflow-${i}`} hidden={active !== i} className="workflow-description"><p>{link.text}</p><div className="workflow-mobile-visual"><link.Fragment /></div></div>
              </div>
            ))}
          </div>
          <div className="workflow-visual" aria-hidden="true">
            <div className="stage-caption"><span>Связь модулей</span><span className="num">0{active + 1} / 06</span></div>
            <div key={active} className="workflow-scene"><ModuleTag modules={moduleLinks[active].modules} /><h3>{moduleLinks[active].title}</h3><Fragment /></div>
            <span className="workflow-footnote">Демонстрация на условных данных</span>
          </div>
        </div>
      </div>
    </section>
  );
};
