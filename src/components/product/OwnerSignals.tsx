import { useState } from "react";
import { cn } from "@/lib/utils";
import { Window } from "./Window";

type Category = "Все" | "Деньги" | "Команда" | "Сервис";

const filters: Category[] = ["Все", "Деньги", "Команда", "Сервис"];
const alerts: { category: Exclude<Category, "Все">; title: string; detail: string; time: string; tone: string }[] = [
  { category: "Сервис", title: "7 задач вышли за срок", detail: "Уборка и запросы гостей · 2 объекта", time: "сегодня", tone: "bg-rose" },
  { category: "Деньги", title: "Темп бронирований на выходные ниже прошлого года", detail: "Объект 02 · −8% на 25–26 октября", time: "10:55", tone: "bg-amber" },
  { category: "Деньги", title: "Возврат выше лимита", detail: "42 000 ₸ · ждёт подтверждения", time: "10:18", tone: "bg-rose" },
  { category: "Команда", title: "Тариф изменён вручную", detail: "Объект 01 · 82 000 → 92 000 ₸", time: "11:42", tone: "bg-violet" },
  { category: "Сервис", title: "Номер снят с продажи техслужбой", detail: "Sky 401 · вторые сутки", time: "вчера", tone: "bg-amber" },
];

/** События, которые требуют решения, с фильтром по типу. */
export const AttentionPanel = ({ className }: { className?: string }) => {
  const [filter, setFilter] = useState<Category>("Все");
  const visible = filter === "Все" ? alerts : alerts.filter((alert) => alert.category === filter);
  return (
    <Window title="Guestra · Требует внимания" className={className} bodyClassName="p-4 sm:p-5">
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Фильтр событий">
        {filters.map((item) => (
          <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}
            className={cn("rounded-lg px-3 py-1.5 text-xs font-medium transition", filter === item ? "bg-primary text-white" : "bg-background-alt text-muted-foreground hover:text-foreground")}>
            {item}
          </button>
        ))}
      </div>
      <ul className="mt-4 divide-y divide-border/70">
        {visible.map((alert) => (
          <li key={alert.title} className="flex gap-3 py-3 first:pt-0 last:pb-0">
            <span className={cn("mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full", alert.tone)} aria-hidden />
            <div className="min-w-0 flex-1"><p className="text-sm font-medium">{alert.title}</p><p className="mt-1 text-xs text-muted-foreground">{alert.detail}</p></div>
            <time className="shrink-0 text-[11px] text-muted-foreground">{alert.time}</time>
          </li>
        ))}
      </ul>
    </Window>
  );
};

const report = [
  { label: "Выручка от номеров", plan: "182", fact: "151", forecast: "196", delta: "+14" },
  { label: "Допуслуги: SPA, ресторан, трансфер", plan: "43", fact: "36", forecast: "45", delta: "+2" },
  { label: "Выручка всего", plan: "225", fact: "187", forecast: "241", delta: "+16", strong: true },
  { label: "Операционные расходы", plan: "151", fact: "126", forecast: "155", delta: "+4", negative: true },
  { label: "GOP", plan: "74", fact: "61", forecast: "86", delta: "+12", strong: true },
];

/** Управленческий отчёт: план, факт с начала месяца и прогноз, как в разделе PMS. */
export const ManagementReport = ({ className }: { className?: string }) => (
  <Window title="Управленческий отчёт · октябрь, все объекты" className={className} bodyClassName="p-0">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] text-xs">
        <thead className="bg-background-alt text-[10px] uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-4 py-2.5 text-left font-semibold">млн ₸</th>
            <th className="px-3 py-2.5 text-right font-semibold">План</th>
            <th className="px-3 py-2.5 text-right font-semibold">Факт на 29-е</th>
            <th className="px-3 py-2.5 text-right font-semibold">Прогноз</th>
            <th className="px-4 py-2.5 text-right font-semibold">К плану</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/70">
          {report.map((row) => (
            <tr key={row.label} className={cn(row.strong && "bg-background-alt/50")}>
              <td className={cn("px-4 py-3", row.strong ? "font-semibold" : "font-medium")}>{row.label}</td>
              <td className="num px-3 py-3 text-right text-muted-foreground">{row.plan}</td>
              <td className="num px-3 py-3 text-right">{row.fact}</td>
              <td className="num px-3 py-3 text-right font-semibold">{row.forecast}</td>
              <td className={cn("num px-4 py-3 text-right font-medium", row.negative ? "text-rose" : "text-emerald")}>{row.delta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="grid grid-cols-3 divide-x divide-border/70 border-t border-border text-center">
      {[["OCC, MTD", "80%"], ["ADR, MTD", "68 500 ₸"], ["RevPAR, YTD", "49 200 ₸"]].map(([k, v]) => (
        <div key={k} className="px-2 py-3"><div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div><div className="num mt-1 text-sm font-semibold">{v}</div></div>
      ))}
    </div>
  </Window>
);
