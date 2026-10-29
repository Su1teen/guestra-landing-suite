import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { capabilityGroups, type CapabilityGroup } from "@/data/capabilities";
import { StatusBadge } from "@/components/shared/StatusBadge";

const GroupList = ({ group }: { group: CapabilityGroup }) => (
  <ul className="divide-y divide-border/70">
    {group.items.map((item) => (
      <li key={item.title} className="py-2.5">
        <div className="flex items-start justify-between gap-2">
          <span className={cn("text-sm font-medium leading-snug", item.status && "text-foreground/70")}>{item.title}</span>
          {item.status && <StatusBadge className="mt-0.5" />}
        </div>
        <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{item.note}</p>
      </li>
    ))}
  </ul>
);

/** Карта всей платформы: плотный типографический блок, читается как оглавление продукта. */
export const CapabilityMap = ({ groups = capabilityGroups }: { groups?: CapabilityGroup[] }) => (
  <>
    <div className="hidden gap-x-8 lg:grid lg:grid-cols-5">
      {groups.map((group) => (
        <div key={group.id} className="flex flex-col">
          <Link to={group.href} className="group border-b-2 border-foreground pb-3">
            <h3 className="flex items-center justify-between gap-2 text-[15px] font-semibold leading-snug">
              {group.title}
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
            </h3>
          </Link>
          <GroupList group={group} />
        </div>
      ))}
    </div>
    <div className="divide-y divide-border rounded-2xl border border-border bg-white lg:hidden">
      {groups.map((group) => (
        <details key={group.id} className="group px-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 [&::-webkit-details-marker]:hidden">
            <span>
              <span className="block text-[15px] font-semibold">{group.title}</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">{group.items.length} возможностей</span>
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition group-open:rotate-180" />
          </summary>
          <div className="pb-4">
            <GroupList group={group} />
            <Link to={group.href} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Подробнее <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </details>
      ))}
    </div>
  </>
);
