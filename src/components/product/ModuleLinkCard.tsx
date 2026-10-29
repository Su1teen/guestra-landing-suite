import { cn } from "@/lib/utils";
import type { ModuleLink } from "@/data/moduleLinks";

export const ModuleTag = ({ modules, className }: { modules: string[]; className?: string }) => (
  <p className={cn("module-tag", className)}>
    {modules.map((m, i) => (
      <span key={m}>
        {i > 0 && <span className="mx-1.5 text-primary/35" aria-hidden>+</span>}
        {m}
      </span>
    ))}
  </p>
);

export const ModuleLinkCard = ({ link, className }: { link: ModuleLink; className?: string }) => (
  <article className={cn("flex h-full flex-col rounded-2xl border border-border bg-white p-5 transition hover:border-primary/25 hover:shadow-[0_20px_50px_-30px_rgba(16,24,40,0.35)]", className)}>
    <ModuleTag modules={link.modules} />
    <h3 className="mt-3 text-[17px] font-semibold leading-snug">{link.title}</h3>
    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{link.text}</p>
    <div className="mt-5">
      <link.Fragment />
    </div>
  </article>
);
