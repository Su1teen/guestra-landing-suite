import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDemoModal } from "@/components/layout/DemoModal";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Reveal } from "@/components/shared/Reveal";
import { capabilityGroups } from "@/data/capabilities";
import { productNav } from "@/data/navigation";

interface PageIntroProps {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  visual?: React.ReactNode;
  visualCaption?: string;
  /** side — визуал справа от текста; below — широкий визуал под текстом. */
  layout?: "side" | "below";
  secondary?: { label: string; href: string };
}

export const PageIntro = ({ eyebrow, title, description, visual, visualCaption = "Пример интерфейса · условные данные", layout = "side", secondary }: PageIntroProps) => {
  const { open } = useDemoModal();
  const text = (
    <div className={cn("intro-copy", layout === "below" && "intro-copy-wide")}>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="lede mt-6 max-w-2xl">{description}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" className="h-12 rounded-lg px-7" onClick={(event) => open("demo", event.currentTarget)}>Запросить демо</Button>
        {secondary && (
          <Button asChild size="lg" variant="outline" className="h-12 rounded-lg px-7">
            <Link to={secondary.href}>{secondary.label}<ArrowRight className="h-4 w-4" /></Link>
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <section className={cn("page-intro", !visual && "page-intro-text", layout === "below" && "page-intro-wide")}>
      <div className="container-wide">
        {visual && layout === "side" ? (
          <div className="intro-layout">
            {text}
            <div className="intro-visual product-stage"><span className="stage-label">Guestra / {eyebrow}</span>{visual}<p className="demo-caption">{visualCaption}</p></div>
          </div>
        ) : (
          <>
            {text}
            {visual && <div className="intro-visual product-stage"><span className="stage-label">Guestra / {eyebrow}</span>{visual}<p className="demo-caption">{visualCaption}</p></div>}
          </>
        )}
      </div>
    </section>
  );
};

interface PageSectionProps {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  tone?: "default" | "alt" | "ink";
  aside?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export const PageSection = ({ id, eyebrow, title, lede, tone = "default", aside, className, children }: PageSectionProps) => (
  <section id={id} className={cn("page-section section scroll-mt-20", tone === "alt" && "bg-background-alt", tone === "default" && "bg-background", tone === "ink" && "ink", className)}>
    <div className="container-wide">
      <div className={cn("grid gap-6", aside && "lg:grid-cols-[1fr_auto] lg:items-end")}>
        <Reveal className="max-w-3xl">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className={cn("headline", eyebrow && "mt-5")}>{title}</h2>
          {lede && <p className="lede mt-5 max-w-2xl">{lede}</p>}
        </Reveal>
        {aside}
      </div>
      {children && <div className="mt-12">{children}</div>}
    </div>
  </section>
);

/** Две колонки: текст с пунктами и интерфейс. */
export const Split = ({ children, visual, reverse }: { children: React.ReactNode; visual: React.ReactNode; reverse?: boolean }) => (
  <div className="product-split grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
    <div className={cn(reverse && "lg:order-2")}>{children}</div>
    <Reveal delay={0.08} className={cn("product-stage min-w-0", reverse && "lg:order-1")}>{visual}</Reveal>
  </div>
);

export const Points = ({ items, dark }: { items: { title: string; text: string }[]; dark?: boolean }) => (
  <ol className="editorial-points space-y-6">
    {items.map((item, i) => (
      <li key={item.title} className="grid grid-cols-[28px_1fr] gap-3">
        <span className={cn("num pt-0.5 text-sm font-semibold", dark ? "text-[hsl(222_100%_76%)]" : "text-primary")}>{String(i + 1).padStart(2, "0")}</span>
        <div>
          <h3 className={cn("font-semibold", dark && "text-white")}>{item.title}</h3>
          <p className={cn("mt-1 text-sm leading-relaxed", dark ? "text-white/65" : "text-muted-foreground")}>{item.text}</p>
        </div>
      </li>
    ))}
  </ol>
);

/** Текстовый блок для Split: заголовок, лид и пункты. */
export const SplitText = ({ eyebrow, title, lede, points }: { eyebrow?: string; title: string; lede?: string; points?: { title: string; text: string }[] }) => (
  <div>
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
    <h3 className={cn("text-balance text-2xl font-semibold leading-tight tracking-[-0.02em] sm:text-[2rem]", eyebrow && "mt-4")}>{title}</h3>
    {lede && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{lede}</p>}
    {points && <div className="mt-8"><Points items={points} /></div>}
  </div>
);

/** Возможности одного направления из общей карты. */
export const GroupCapabilities = ({ groupId, title = "Возможности", tone = "alt" }: { groupId: string; title?: string; tone?: "default" | "alt" }) => {
  const group = capabilityGroups.find((g) => g.id === groupId);
  if (!group) return null;
  return (
    <PageSection tone={tone} eyebrow={title} title={group.title} lede={group.lead}>
      <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
        {group.items.map((item) => (
          <li key={item.title} className="border-t border-border py-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className={cn("text-[15px] font-semibold", item.status && "text-foreground/70")}>{item.title}</h3>
              {item.status && <StatusBadge className="mt-0.5" />}
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
          </li>
        ))}
      </ul>
    </PageSection>
  );
};

/** Откуда модуль получает данные и куда отдаёт. */
export const Connections = ({ module, from, to }: { module: string; from: string[]; to: string[] }) => (
  <div className="grid items-stretch gap-3 rounded-3xl border border-border bg-white p-4 sm:p-6 md:grid-cols-[1fr_auto_1fr]">
    <div className="rounded-2xl bg-background-alt p-4">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Получает</p>
      <ul className="mt-3 space-y-2 text-sm">{from.map((f) => <li key={f}>{f}</li>)}</ul>
    </div>
    <div className="flex items-center justify-center">
      <span className="rounded-2xl bg-primary px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-primary/20">{module}</span>
    </div>
    <div className="rounded-2xl bg-background-alt p-4">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Передаёт</p>
      <ul className="mt-3 space-y-2 text-sm">{to.map((t) => <li key={t}>{t}</li>)}</ul>
    </div>
  </div>
);

/** Переход к соседнему модулю: держит посетителя внутри истории платформы. */
export const NextModule = ({ href }: { href: string }) => {
  const item = productNav.find((p) => p.href === href);
  if (!item) return null;
  return (
    <section className="next-module px-5 py-12 sm:px-8">
      <Link to={item.href} className="container-wide group flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm text-muted-foreground">Следующий модуль</span>
        <span className="flex items-center gap-3 text-2xl font-semibold tracking-tight transition group-hover:text-primary">
          {item.label}
          <span className="hidden text-base font-normal text-muted-foreground sm:inline">{item.description}</span>
          <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
        </span>
      </Link>
    </section>
  );
};

/** Подпись под макетом функции, которая ещё в разработке. */
export const ConceptNote = ({ className }: { className?: string }) => (
  <p className={cn("mt-3 flex items-center gap-2 text-xs text-muted-foreground", className)}>
    <StatusBadge /> Концепция интерфейса. Функция в разработке.
  </p>
);
