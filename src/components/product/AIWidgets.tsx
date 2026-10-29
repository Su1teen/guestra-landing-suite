import { BookOpen, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Window } from "./Window";

/* ─── Полномочия AI ───────────────────────────────────────────── */

type Who = "ai" | "guest" | "staff";
const permissions: { action: string; who: Who }[] = [
  { action: "Ответить на вопрос об отеле, условиях и маршруте", who: "ai" },
  { action: "Проверить свободные номера и цену в PMS", who: "ai" },
  { action: "Отправить коммерческое предложение", who: "ai" },
  { action: "Забронировать номер и удержать его до оплаты", who: "guest" },
  { action: "Добавить услугу: SPA, баню, трансфер", who: "guest" },
  { action: "Перенести или отменить бронь", who: "guest" },
  { action: "Скидка вне тарифа, возврат денег, исключение из правил", who: "staff" },
];

const whoLabel: Record<Who, { text: string; className: string }> = {
  ai: { text: "AI сам", className: "bg-primary/10 text-primary" },
  guest: { text: "AI после согласия гостя", className: "bg-violet/10 text-violet" },
  staff: { text: "Только сотрудник", className: "bg-amber/15 text-[hsl(28_80%_34%)]" },
};

export const AIPermissions = ({ className }: { className?: string }) => (
  <div className={cn("overflow-hidden rounded-2xl border border-border bg-white", className)}>
    <table className="w-full text-sm">
      <thead className="bg-background-alt text-[11px] uppercase tracking-wider text-muted-foreground">
        <tr>
          <th className="px-5 py-3 text-left font-semibold">Действие</th>
          <th className="px-5 py-3 text-right font-semibold">Кто выполняет</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border/70">
        {permissions.map((p) => (
          <tr key={p.action}>
            <td className="px-5 py-3.5">{p.action}</td>
            <td className="px-5 py-3.5 text-right">
              <span className={cn("inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold", whoLabel[p.who].className)}>{whoLabel[p.who].text}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ─── База знаний объекта ─────────────────────────────────────── */

const topics = [
  { title: "Условия отмены", text: "Бесплатно за 72 часа, позже — стоимость первой ночи" },
  { title: "Предоплата", text: "50% в течение 2 часов после брони" },
  { title: "Заезд и выезд", text: "Заезд с 14:00, выезд до 12:00, ранний заезд по наличию" },
  { title: "Маршрут", text: "Ссылка на 2ГИС, парковка у главного корпуса" },
  { title: "Животные", text: "Можно в домиках Forest, 5 000 ₸ за проживание" },
];

export const KnowledgeBaseCard = ({ className }: { className?: string }) => (
  <Window title="База знаний объекта" className={className} bodyClassName="p-4 sm:p-5">
    <ul className="space-y-2.5">
      {topics.map((t) => (
        <li key={t.title} className="flex gap-3 rounded-xl border border-border px-3 py-2.5 text-xs">
          <BookOpen className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
          <div>
            <p className="font-semibold">{t.title}</p>
            <p className="mt-0.5 text-muted-foreground">{t.text}</p>
          </div>
        </li>
      ))}
    </ul>
  </Window>
);

/* ─── AI-аналитик для руководителя (в разработке) ─────────────── */

export const AIAnalystConcept = ({ className }: { className?: string }) => (
  <Window title="AI-аналитик" className={className} bodyClassName="space-y-3 p-4 sm:p-5">
    <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-sm text-white">
      Почему в прошлые выходные упал RevPAR в Объекте 02?
    </div>
    <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-border bg-background-alt px-3.5 py-3 text-sm">
      <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-violet">Разбор</p>
      <ul className="mt-2 space-y-1.5 text-[13px] leading-snug">
        <li>Загрузка в субботу 64% против 81% неделей раньше.</li>
        <li>4 отмены за сутки до заезда, все из одного корпоративного запроса.</li>
        <li>Тариф снижали вручную в четверг, ADR −6%.</li>
      </ul>
      <p className="mt-3 text-[13px]">Предлагаю ввести предоплату для групп от трёх номеров.</p>
      <div className="mt-3 flex gap-2 text-xs font-medium">
        <span className="rounded-lg border border-border bg-white px-3 py-1.5">Не сейчас</span>
        <span className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-white"><Check className="h-3 w-3" /> Создать правило</span>
      </div>
    </div>
  </Window>
);
