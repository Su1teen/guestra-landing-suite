import { useState } from "react";
import { AlertCircle, ArrowDownRight, Clock3, MessageSquareText } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { Window } from "./Window";

type Category = "Все" | "Деньги" | "Команда" | "Сервис";

const filters: Category[] = ["Все", "Деньги", "Команда", "Сервис"];
const alerts: { category: Exclude<Category, "Все">; title: string; detail: string; time: string; tone: string }[] = [
  { category: "Сервис", title: "7 задач вышли за срок", detail: "Уборка и запросы гостей · 2 объекта", time: "сегодня", tone: "bg-rose" },
  { category: "Деньги", title: "Темп бронирования на выходные ниже плана", detail: "Объект 02 · −8% к прошлой неделе", time: "10:55", tone: "bg-amber" },
  { category: "Деньги", title: "Возврат выше установленного лимита", detail: "42 000 ₸ · ожидает подтверждения", time: "10:18", tone: "bg-rose" },
  { category: "Команда", title: "Тариф изменён вручную", detail: "Объект 01 · 82 000 → 92 000 ₸", time: "11:42", tone: "bg-violet" },
  { category: "Сервис", title: "4 новых негативных отзыва", detail: "3 упоминания уборки · 1 ожидание заезда", time: "за 7 дней", tone: "bg-amber" },
];

const activity = [
  { initials: "АМ", role: "Менеджер продаж", action: "Изменён тариф на выходные", detail: "Объект 01 · 82 000 → 92 000 ₸", time: "11:42", tone: "bg-violet/10 text-violet" },
  { initials: "ТА", role: "Администратор", action: "Создан запрос на возврат", detail: "42 000 ₸ · ждёт подтверждения", time: "10:18", tone: "bg-amber/10 text-amber" },
  { initials: "АК", role: "Служба уборки", action: "Номер 204 готов к заезду", detail: "Закрыто на 22 минуты позже срока", time: "09:36", tone: "bg-primary/10 text-primary" },
];

export const OwnerSignals = () => {
  const [filter, setFilter] = useState<Category>("Все");
  const visible = filter === "Все" ? alerts : alerts.filter((alert) => alert.category === filter);

  return <section className="section bg-background-alt">
    <div className="container-wide">
      <SectionHeader eyebrow="События и действия" title="Отклонение видно вместе с причиной" lede="Сводка показывает, что требует внимания, а журнал помогает проверить решение сотрудника. Ниже - пример того, как это может выглядеть в кабинете." />
      <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal delay={0.1} className="min-w-0">
          <Window title="Guestra / Требует внимания" className="h-full" bodyClassName="p-4 sm:p-5">
            <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Фильтр событий">
              {filters.map((item) => <button key={item} role="tab" aria-selected={filter === item} onClick={() => setFilter(item)}
                className={cn("rounded-lg px-3 py-1.5 text-xs font-medium transition", filter === item ? "bg-primary text-white" : "bg-background-alt text-muted-foreground hover:text-foreground")}>{item}</button>)}
            </div>
            <div className="mt-4 divide-y divide-border/70">
              {visible.map((alert) => <div key={alert.title} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                <span className={cn("mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full", alert.tone)} />
                <div className="min-w-0 flex-1"><p className="text-sm font-medium">{alert.title}</p><p className="mt-1 text-xs text-muted-foreground">{alert.detail}</p></div>
                <time className="shrink-0 text-[11px] text-muted-foreground">{alert.time}</time>
              </div>)}
            </div>
          </Window>
        </Reveal>
        <Reveal delay={0.18} className="min-w-0">
          <Window title="Guestra / Действия команды" className="h-full" bodyClassName="p-4 sm:p-5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><Clock3 className="h-4 w-4 text-primary" /> Последние действия по объектам</div>
            <div className="mt-4 divide-y divide-border/70">
              {activity.map((event) => <div key={event.time} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold", event.tone)}>{event.initials}</span>
                <div className="min-w-0 flex-1"><div className="flex items-baseline justify-between gap-2"><p className="text-xs font-semibold">{event.role}</p><time className="text-[11px] text-muted-foreground">{event.time}</time></div><p className="mt-1 text-sm">{event.action}</p><p className="mt-1 text-xs text-muted-foreground">{event.detail}</p></div>
              </div>)}
            </div>
          </Window>
        </Reveal>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Интерфейсный пример. События и сотрудники вымышлены.</p>
    </div>
  </section>;
};

const report = [
  { label: "Выручка", plan: "225 млн ₸", forecast: "241 млн ₸", delta: "+16 млн ₸", positive: true },
  { label: "Операционные расходы", plan: "151 млн ₸", forecast: "155 млн ₸", delta: "+4 млн ₸", positive: false },
  { label: "GOP", plan: "74 млн ₸", forecast: "86 млн ₸", delta: "+12 млн ₸", positive: true },
];

export const OwnerReporting = () => <section className="section bg-background">
  <div className="container-wide">
    <SectionHeader eyebrow="Финансы и качество сервиса" title="Результат месяца и отзывы - в одной управленческой картине" lede="Финансовые показатели требуют сверенных источников. Отзывы помогают понять, какие события в работе отеля отражаются на впечатлении гостя." />
    <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
      <Reveal delay={0.1} className="min-w-0">
        <Window title="Guestra / Управленческий отчёт" className="h-full" bodyClassName="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2"><div><p className="text-sm font-semibold">Прогноз месяца</p><p className="mt-1 text-xs text-muted-foreground">План и ожидаемый результат</p></div><span className="shrink-0 rounded-lg bg-emerald/10 px-2.5 py-1 text-xs font-medium text-emerald">+7,1% к плану</span></div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[430px] text-left text-xs">
              <thead><tr className="border-b border-border text-muted-foreground"><th className="pb-3 font-medium">Показатель</th><th className="pb-3 text-right font-medium">План</th><th className="pb-3 text-right font-medium">Прогноз</th><th className="pb-3 text-right font-medium">Отклонение</th></tr></thead>
              <tbody>{report.map((row) => <tr key={row.label} className="border-b border-border/70 last:border-0"><td className="py-3 font-medium">{row.label}</td><td className="num py-3 text-right text-muted-foreground">{row.plan}</td><td className="num py-3 text-right font-semibold">{row.forecast}</td><td className={cn("num py-3 text-right font-medium", row.positive ? "text-emerald" : "text-rose")}>{row.delta}</td></tr>)}</tbody>
            </table>
          </div>
          <div className="mt-5 flex items-start gap-2 rounded-xl bg-background-alt p-3 text-xs leading-relaxed text-muted-foreground"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Для реального отчёта нужно согласовать статьи и сверить данные PMS, POS и 1С.</div>
        </Window>
      </Reveal>
      <Reveal delay={0.18} className="min-w-0">
        <Window title="Guestra / Репутация" className="h-full" bodyClassName="p-4 sm:p-5">
          <div className="flex items-start justify-between"><div><p className="text-sm font-semibold">Отзывы за 7 дней</p><p className="mt-1 text-xs text-muted-foreground">По подключённым источникам</p></div><div className="text-right"><p className="num text-2xl font-semibold">4,6<span className="text-base text-muted-foreground">/5</span></p><p className="flex items-center justify-end gap-1 text-xs text-rose"><ArrowDownRight className="h-3.5 w-3.5" /> −0,2</p></div></div>
          <div className="mt-5 grid grid-cols-2 gap-2"><div className="rounded-xl border border-border bg-background-alt p-3"><p className="num text-xl font-semibold">28</p><p className="mt-1 text-xs text-muted-foreground">новых отзывов</p></div><div className="rounded-xl border border-rose/20 bg-rose/5 p-3"><p className="num text-xl font-semibold text-rose">4</p><p className="mt-1 text-xs text-muted-foreground">требуют ответа</p></div></div>
          <div className="mt-5"><p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Темы замечаний</p><div className="mt-3 space-y-2.5"><div className="flex items-center justify-between text-xs"><span>Уборка номера</span><span className="num font-medium">3</span></div><div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full w-3/4 rounded-full bg-rose" /></div><div className="flex items-center justify-between text-xs"><span>Ожидание заезда</span><span className="num font-medium">1</span></div><div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full w-1/4 rounded-full bg-amber" /></div></div></div>
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-primary/5 p-3 text-xs text-primary"><MessageSquareText className="h-4 w-4 shrink-0" /> Жалобу на уборку можно связать с задачей службы.</div>
        </Window>
      </Reveal>
    </div>
    <p className="mt-3 text-xs text-muted-foreground">Интерфейсный пример. Финансовые данные, оценки и отзывы демонстрационные.</p>
  </div>
</section>;
