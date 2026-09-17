import { AlertTriangle, ArrowUpRight, Clock3, TrendingUp } from "lucide-react";
import { Window } from "./Window";

const metrics = [
  { label: "Выручка за месяц", value: "221 млн ₸", change: "+12,8%" },
  { label: "Загрузка", value: "80%", change: "+6 п.п." },
  { label: "ADR", value: "68 500 ₸", change: "+9,2%" },
  { label: "RevPAR", value: "54 800 ₸", change: "+15,8%" },
];

const attention = [
  { label: "Просроченные задачи", detail: "7 · уборка и сервис", tone: "bg-rose" },
  { label: "Изменение тарифа вручную", detail: "Объект 02 · сегодня, 11:42", tone: "bg-amber" },
  { label: "Новые негативные отзывы", detail: "4 · за последние 7 дней", tone: "bg-violet" },
];

const bars = [39, 48, 44, 58, 54, 67, 61, 73, 69, 82, 76, 92];

export const OwnerControlCenter = () => (
  <div>
    <Window title="Guestra CRM / Кабинет собственника" badge={<span className="hidden rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary sm:inline">Обзор бизнеса</span>}>
      <div className="grid gap-4 p-3 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-background-alt px-4 py-3">
          <div>
            <p className="text-xs font-semibold text-foreground">Все объекты</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">Сводка по выручке и событиям</p>
          </div>
          <span className="rounded-lg border border-border bg-white px-3 py-1.5 text-[11px] font-medium text-muted-foreground">Этот месяц</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {metrics.map((metric) => <div key={metric.label} className="rounded-xl border border-border bg-white p-3.5">
            <p className="text-[11px] text-muted-foreground">{metric.label}</p>
            <div className="num mt-2 text-lg font-semibold tracking-tight text-foreground sm:text-xl">{metric.value}</div>
            <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald"><ArrowUpRight className="h-3 w-3" />{metric.change}</div>
          </div>)}
        </div>

        <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-xl border border-border bg-white p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-semibold">Прогноз выручки</p>
                <p className="mt-1 text-[11px] text-muted-foreground">Факт и ожидаемый результат месяца</p>
              </div>
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-6 flex items-baseline gap-2"><span className="num text-2xl font-semibold tracking-tight">241 млн ₸</span><span className="text-xs font-medium text-emerald">+7,1% к плану</span></div>
            <div className="mt-5 flex h-20 items-end gap-1.5" aria-label="Демонстрационный график роста выручки">
              {bars.map((height, index) => <span key={index} className="flex-1 rounded-t-md bg-primary/15 last:bg-primary" style={{ height: `${height}%` }} />)}
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-muted-foreground"><span>Начало периода</span><span>Прогноз</span></div>
          </div>
          <div className="rounded-xl border border-border bg-white p-4">
            <div className="flex items-center justify-between"><p className="text-xs font-semibold">Требует внимания</p><AlertTriangle className="h-4 w-4 text-amber" /></div>
            <ul className="mt-3 divide-y divide-border/70">
              {attention.map((item) => <li key={item.label} className="flex items-start gap-2.5 py-2.5 first:pt-0 last:pb-0">
                <span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${item.tone}`} />
                <div className="min-w-0"><p className="text-xs font-medium">{item.label}</p><p className="mt-0.5 text-[11px] text-muted-foreground">{item.detail}</p></div>
              </li>)}
            </ul>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-background-alt/60 px-4 py-3 text-[11px] text-muted-foreground">
          <Clock3 className="h-3.5 w-3.5 shrink-0 text-primary" /> Последнее событие: менеджер изменил тариф на выходные · 11:42
        </div>
      </div>
    </Window>
    <p className="mt-3 text-center text-xs text-muted-foreground"></p>
  </div>
);
