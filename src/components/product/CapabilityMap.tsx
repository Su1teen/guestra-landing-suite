import { ArrowUpRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { capabilityGroups, type CapabilityGroup } from "@/data/capabilities";
import { StatusBadge } from "@/components/shared/StatusBadge";

/** Native disclosures preserve every capability in SSR and work without JavaScript. */
export const CapabilityMap = ({ groups = capabilityGroups }: { groups?: CapabilityGroup[] }) => (
  <div className="capability-directory">
    {groups.map((group, i) => (
      <details key={group.id} className="capability-group">
        <summary>
          <span className="directory-number num">0{i + 1}</span>
          <span className="directory-name">{group.title}<span>{group.lead}</span></span>
          <span className="directory-count num">{group.items.length} функций</span>
          <Plus className="directory-toggle" aria-hidden="true" />
        </summary>
        <div className="directory-content">
          <ul>
            {group.items.map((item) => <li key={item.title}><h4>{item.title}{item.status && <StatusBadge />}</h4><p>{item.note}</p></li>)}
          </ul>
          <Link to={group.href} className="text-link">Подробнее о модуле <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </details>
    ))}
  </div>
);
