import { useState } from "react";
import { Check, Moon, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Window } from "./Window";

/* ─── Карточка брони ──────────────────────────────────────────── */

const tabs = ["Обзор", "Проживание", "Гости", "Услуги", "Фолио", "Задачи", "История"] as const;
type Tab = (typeof tabs)[number];

const tabBody: Record<Tab, React.ReactNode> = {
  Обзор: (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
      {[
        ["Гость", "Анна Иванова · 3 визита"], ["Источник", "WhatsApp, AI-администратор"],
        ["Даты", "18–20 октября, 2 ночи"], ["Номер", "Forest 101 · Forest House"],
        ["Тариф", "Гибкий, с завтраком"], ["Оплата", "86 000 из 172 000 ₸"],
        ["Заезд", "11:00, ранний согласован"], ["Готовность", "уборка запланирована"],
      ].map(([k, v]) => <div key={k}><dt className="text-muted-foreground">{k}</dt><dd className="mt-0.5 font-medium">{v}</dd></div>)}
    </dl>
  ),
  Проживание: <p className="text-xs leading-relaxed text-muted-foreground">Категория, номер, даты и тариф. Перенос дат и смена номера проверяют наличие и пересчитывают цену по каждой ночи.</p>,
  Гости: <p className="text-xs leading-relaxed text-muted-foreground">Бронирующий и проживающие отдельно: Анна оплачивает, а заселяются четверо. Профиль каждого гостя открывается без выхода из брони.</p>,
  Услуги: <p className="text-xs leading-relaxed text-muted-foreground">SPA для двоих, 19 октября в 15:00. Услуга занимает слот ресурса и сразу попадает в фолио.</p>,
  Фолио: <p className="text-xs leading-relaxed text-muted-foreground">Проживание 148 000 ₸, SPA 24 000 ₸, предоплата −86 000 ₸. Остаток 86 000 ₸ к оплате при выезде.</p>,
  Задачи: <p className="text-xs leading-relaxed text-muted-foreground">Уборка к раннему заезду до 10:30, детская кроватка в Forest 101, напоминание гостю накануне.</p>,
  История: <p className="text-xs leading-relaxed text-muted-foreground">10:44 бронь создана AI · 10:45 ранний заезд, Айдана · 10:52 оплата получена · каждое изменение с автором и временем.</p>,
};

export const BookingWorkspace = ({ className }: { className?: string }) => {
  const [tab, setTab] = useState<Tab>("Обзор");
  return (
    <Window title="Бронь GR-2918 · Анна Иванова" className={className} badge={<span className="rounded-full bg-emerald/10 px-2 py-0.5 text-[10px] font-semibold text-emerald">Подтверждена</span>}>
      <div className="scrollbar-none flex gap-1 overflow-x-auto border-b border-border px-3 pt-2" role="tablist" aria-label="Разделы брони">
        {tabs.map((t) => (
          <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
            className={cn("shrink-0 border-b-2 px-2.5 pb-2 pt-1 text-xs font-medium transition", tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground")}>
            {t}
          </button>
        ))}
      </div>
      <div className="min-h-[148px] p-4 sm:p-5" role="tabpanel">{tabBody[tab]}</div>
    </Window>
  );
};

/* ─── Услуги и ресурсы по слотам ──────────────────────────────── */

const hours = ["10", "11", "12", "13", "14", "15", "16", "17", "18"];
const resources = [
  { name: "SPA, кабинет 1", slots: [{ s: 1, l: 1, t: "Массаж" }, { s: 5, l: 2, t: "SPA для двоих · Анна И." }] },
  { name: "Баня у озера", slots: [{ s: 2, l: 2, t: "Олег К., 4 чел." }, { s: 6, l: 2, t: "свободно", free: true }] },
  { name: "Трансфер", slots: [{ s: 0, l: 1, t: "Вокзал" }, { s: 4, l: 1, t: "Аэропорт" }] },
];

export const ServiceSlots = ({ className }: { className?: string }) => (
  <Window title="Услуги и ресурсы · 19 октября" className={className} bodyClassName="p-0">
    <div className="overflow-x-auto">
      <div className="min-w-[520px] text-[11px]">
        <div className="flex border-b border-border">
          <div className="w-[120px] shrink-0 px-3 py-2 font-semibold text-muted-foreground">Ресурс</div>
          <div className="grid flex-1 grid-cols-9">{hours.map((h) => <div key={h} className="num border-l border-border/60 py-2 text-center text-muted-foreground">{h}:00</div>)}</div>
        </div>
        {resources.map((r) => (
          <div key={r.name} className="flex h-11 border-b border-border/60 last:border-b-0">
            <div className="flex w-[120px] shrink-0 items-center px-3 font-medium">{r.name}</div>
            <div className="relative grid flex-1 grid-cols-9">
              {hours.map((h) => <div key={h} className="border-l border-border/40" />)}
              {r.slots.map((slot) => (
                <div key={slot.t} className={cn("absolute top-1.5 flex h-8 items-center truncate rounded-md border px-2", slot.free ? "border-dashed border-emerald/50 text-emerald" : "border-violet/35 bg-violet/10 text-violet")}
                  style={{ left: `calc(${(slot.s / 9) * 100}% + 2px)`, width: `calc(${(slot.l / 9) * 100}% - 4px)` }}>
                  <span className="truncate">{slot.t}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </Window>
);

/* ─── Группы и квоты ──────────────────────────────────────────── */

export const GroupBlockCard = ({ className }: { className?: string }) => (
  <Window title="Группы · Блок" className={className} bodyClassName="p-4 sm:p-5">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-semibold">Выездной семинар, 36 участников</p>
        <p className="mt-0.5 text-xs text-muted-foreground">6–9 ноября · заезд накануне и выезд позже по договору</p>
      </div>
      <Users className="h-4 w-4 text-primary" />
    </div>
    <div className="mt-4">
      <div className="flex justify-between text-xs"><span className="text-muted-foreground">Квота</span><span className="num font-medium">9 из 12 номеров выбрано</span></div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-background-alt"><div className="h-full w-3/4 rounded-full bg-primary" /></div>
    </div>
    <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px]">
      {[["Список гостей", "27 из 36"], ["Отпуск квоты", "1 ноября"], ["Оплата", "по счёту"]].map(([k, v]) => (
        <div key={k} className="rounded-lg bg-background-alt px-2 py-2"><div className="text-muted-foreground">{k}</div><div className="mt-0.5 font-semibold">{v}</div></div>
      ))}
    </div>
  </Window>
);

/* ─── Ночной аудит ────────────────────────────────────────────── */

const auditSteps = ["Проверены незаезды и поздние выезды", "Начислено проживание за ночь", "Сверены оплаты и депозиты", "Закрыт операционный день", "Собран ежедневный отчёт"];

export const NightAuditCard = ({ className }: { className?: string }) => (
  <Window title="Ночной аудит · 18 октября" className={className} bodyClassName="p-4 sm:p-5">
    <div className="flex items-center gap-2 text-xs text-muted-foreground"><Moon className="h-3.5 w-3.5 text-violet" /> Запущен в 03:00 · завершён в 03:08</div>
    <ul className="mt-3 space-y-2">
      {auditSteps.map((s) => (
        <li key={s} className="flex items-center gap-2.5 text-xs">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald text-white"><Check className="h-2.5 w-2.5" strokeWidth={3} /></span>
          {s}
        </li>
      ))}
    </ul>
    <div className="mt-4 rounded-lg bg-background-alt px-3 py-2 text-xs">Найдено расхождение: <b className="font-semibold">Lake 202</b> отмечен занятым без проживающего</div>
  </Window>
);
