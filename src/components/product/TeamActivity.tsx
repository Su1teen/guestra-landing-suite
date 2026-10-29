import { Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Window } from "./Window";

export const activity = [
  { initials: "АМ", role: "Менеджер продаж", action: "Изменён тариф на выходные", detail: "Объект 01 · 82 000 → 92 000 ₸", time: "11:42", tone: "bg-violet/10 text-violet" },
  { initials: "AI", role: "AI-администратор", action: "Создана бронь из WhatsApp", detail: "Forest House · 148 000 ₸", time: "10:52", tone: "bg-primary/10 text-primary" },
  { initials: "ТА", role: "Администратор", action: "Создан запрос на возврат", detail: "42 000 ₸ · ждёт подтверждения", time: "10:18", tone: "bg-amber/15 text-[hsl(28_80%_34%)]" },
  { initials: "ГС", role: "Служба уборки", action: "Номер готов к заезду", detail: "Lake 202 · на 22 минуты позже срока", time: "09:36", tone: "bg-emerald/10 text-emerald" },
];

/** Журнал решений команды: кто, что и когда изменил. */
export const TeamActivity = ({ className, limit = activity.length }: { className?: string; limit?: number }) => (
  <Window title="Guestra · Действия команды" className={className} bodyClassName="p-4 sm:p-5">
    <div className="flex items-center gap-2 text-xs text-muted-foreground"><Clock3 className="h-3.5 w-3.5 text-primary" /> Сегодня, все объекты</div>
    <ul className="mt-3 divide-y divide-border/70">
      {activity.slice(0, limit).map((event) => (
        <li key={event.time} className="flex gap-3 py-3 first:pt-1 last:pb-0">
          <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold", event.tone)}>{event.initials}</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2"><p className="truncate text-[11px] font-semibold text-muted-foreground">{event.role}</p><time className="num text-[11px] text-muted-foreground">{event.time}</time></div>
            <p className="mt-0.5 text-sm font-medium">{event.action}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{event.detail}</p>
          </div>
        </li>
      ))}
    </ul>
  </Window>
);
