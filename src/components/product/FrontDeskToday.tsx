import { BedDouble, DoorOpen, LogIn, LogOut } from "lucide-react";
import { Window } from "./Window";

const rows = [
  { room: "Forest 101", guest: "Анна Иванова", time: "11:00", ready: true, note: "ранний заезд" },
  { room: "Lake 202", guest: "Дмитрий С.", time: "14:00", ready: true },
  { room: "A-Frame 301", guest: "Жанар А.", time: "15:00", ready: false, note: "уборка 6/12" },
];

/** Фрагмент раздела «Ресепшен (СПиР)»: заезды дня и готовность номеров. */
export const FrontDeskToday = ({ className }: { className?: string }) => (
  <Window title="Ресепшен · сегодня" className={className} bodyClassName="p-4">
    <div className="grid grid-cols-3 gap-2 text-center">
      {[
        { icon: LogIn, label: "Заезды", value: 6 },
        { icon: BedDouble, label: "Проживают", value: 31 },
        { icon: LogOut, label: "Выезды", value: 4 },
      ].map((s) => (
        <div key={s.label} className="rounded-lg bg-background-alt px-2 py-2.5">
          <s.icon className="mx-auto h-3.5 w-3.5 text-primary" aria-hidden />
          <div className="num mt-1 text-lg font-semibold leading-none">{s.value}</div>
          <div className="mt-1 text-[10px] text-muted-foreground">{s.label}</div>
        </div>
      ))}
    </div>
    <ul className="mt-3 divide-y divide-border/70 text-xs">
      {rows.map((r) => (
        <li key={r.room} className="flex items-center gap-2.5 py-2">
          <DoorOpen className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
          <div className="min-w-0 flex-1">
            <div className="truncate font-medium">{r.guest}</div>
            <div className="truncate text-[11px] text-muted-foreground">{r.room} · {r.time}{r.note ? ` · ${r.note}` : ""}</div>
          </div>
          <span className={r.ready ? "rounded-full bg-emerald/10 px-2 py-0.5 text-[10px] font-semibold text-emerald" : "rounded-full bg-amber/15 px-2 py-0.5 text-[10px] font-semibold text-[hsl(28_80%_34%)]"}>
            {r.ready ? "готов" : "не готов"}
          </span>
        </li>
      ))}
    </ul>
  </Window>
);
