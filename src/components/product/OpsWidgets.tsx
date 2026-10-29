import { Package, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { Window } from "./Window";

/* ─── Канбан уборки: те же колонки, что в PMS ─────────────────── */

const columns = [
  { title: "В ожидании", tasks: [{ room: "Sky 401", type: "Выезд", who: "не назначено" }, { room: "Lake 202", type: "Текущая", who: "не назначено" }] },
  { title: "Назначено", tasks: [{ room: "Forest 102", type: "Выезд", who: "Айгерим" }] },
  { title: "В работе", tasks: [{ room: "Forest 101", type: "К раннему заезду", who: "Марина", vip: true }] },
  { title: "Завершено", tasks: [{ room: "A-Frame 301", type: "Выезд", who: "Айгерим" }] },
  { title: "Проверено", tasks: [{ room: "Lake 201", type: "Выезд", who: "Гульнара" }] },
];

export const HousekeepingBoard = ({ className }: { className?: string }) => (
  <Window title="Служба уборки · Задания на сегодня" className={className} bodyClassName="p-0">
    <div className="overflow-x-auto">
      <div className="grid min-w-[720px] grid-cols-5 gap-2.5 p-3">
        {columns.map((col) => (
          <div key={col.title} className="rounded-xl bg-background-alt p-2">
            <div className="flex items-center justify-between px-1 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {col.title}<span className="num rounded bg-white px-1.5 text-foreground">{col.tasks.length}</span>
            </div>
            <div className="space-y-2">
              {col.tasks.map((t) => (
                <div key={t.room} className={cn("rounded-lg border bg-white p-2.5 text-xs shadow-sm", "vip" in t && t.vip ? "border-violet/40" : "border-border")}>
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-semibold">{t.room}</span>
                    {"vip" in t && t.vip && <span className="rounded bg-violet/10 px-1 text-[9px] font-semibold text-violet">VIP</span>}
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">{t.type}</div>
                  <div className="mt-1.5 text-[11px]">{t.who}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </Window>
);

/* ─── Смены и нагрузка ────────────────────────────────────────── */

const staff = [
  { name: "Марина С.", rooms: 7, load: 88 },
  { name: "Айгерим К.", rooms: 6, load: 75 },
  { name: "Жансая Т.", rooms: 4, load: 50 },
];

export const ShiftsCard = ({ className }: { className?: string }) => (
  <Window title="Персонал и смены · утро" className={className} bodyClassName="p-4 sm:p-5">
    <ul className="space-y-3.5">
      {staff.map((s) => (
        <li key={s.name} className="text-xs">
          <div className="flex justify-between"><span className="font-medium">{s.name}</span><span className="num text-muted-foreground">{s.rooms} номеров</span></div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-background-alt"><div className={cn("h-full rounded-full", s.load > 85 ? "bg-amber" : "bg-primary")} style={{ width: `${s.load}%` }} /></div>
        </li>
      ))}
    </ul>
    <p className="mt-4 rounded-lg bg-background-alt px-3 py-2 text-[11px] text-muted-foreground">Автоназначение распределило 17 номеров с учётом смен и приоритета ранних заездов.</p>
  </Window>
);

/* ─── Техслужба и забытые вещи ────────────────────────────────── */

export const MaintenanceCard = ({ className }: { className?: string }) => (
  <Window title="Техслужба" className={className} bodyClassName="space-y-2.5 p-4 sm:p-5">
    {[
      { room: "Sky 401", issue: "Не работает кондиционер", status: "номер снят с продажи", tone: "text-rose bg-rose/10" },
      { room: "Lake 202", issue: "Капает кран в ванной", status: "в работе · Ерболат", tone: "text-[hsl(28_80%_34%)] bg-amber/15" },
      { room: "Forest 102", issue: "Перегорела лампа на террасе", status: "закрыто за 25 мин", tone: "text-emerald bg-emerald/10" },
    ].map((r) => (
      <div key={r.room} className="flex items-start gap-3 rounded-xl border border-border p-3 text-xs">
        <Wrench className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <div className="min-w-0 flex-1"><p className="font-semibold">{r.room} · {r.issue}</p><span className={cn("mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold", r.tone)}>{r.status}</span></div>
      </div>
    ))}
  </Window>
);

export const LostFoundCard = ({ className }: { className?: string }) => (
  <Window title="Забытые вещи" className={className} bodyClassName="p-4 sm:p-5">
    <div className="flex items-start gap-3 text-xs">
      <Package className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <div>
        <p className="font-semibold">LF-0142 · Детские наушники</p>
        <p className="mt-0.5 text-muted-foreground">Forest 103 · найдены при уборке 19 октября</p>
        <p className="mt-2 text-muted-foreground">Хранение до 17 января · гость уведомлён</p>
      </div>
    </div>
  </Window>
);
