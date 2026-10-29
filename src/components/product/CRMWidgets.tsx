import { useState } from "react";
import { CheckCheck, Clock3, Link2, MessageCircle, Phone, Send, Sparkles, Star, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { Window } from "./Window";

/* ─── Единые входящие ─────────────────────────────────────────── */

type Channel = "WhatsApp" | "Telegram" | "Звонок";
const conversations: { name: string; channel: Channel; preview: string; time: string; owner: "AI" | "Айдана" | "Ждёт"; status: string; tone: string }[] = [
  { name: "Анна Иванова", channel: "WhatsApp", preview: "Да. И можно заехать в 11?", time: "10:43", owner: "Айдана", status: "Ожидает оплаты", tone: "bg-amber/15 text-[hsl(28_80%_34%)]" },
  { name: "Олег Ким", channel: "Telegram", preview: "Спасибо, подумаем до вечера", time: "10:31", owner: "AI", status: "Клиент думает", tone: "bg-violet/10 text-violet" },
  { name: "+7 701 ••• 18", channel: "Звонок", preview: "Свадьба, 12 номеров, июнь", time: "10:12", owner: "Ждёт", status: "Новый запрос", tone: "bg-primary/10 text-primary" },
  { name: "Асель Т.", channel: "WhatsApp", preview: "Оплатила, спасибо!", time: "09:58", owner: "AI", status: "Подтверждено", tone: "bg-emerald/10 text-emerald" },
  { name: "Мария Ким", channel: "WhatsApp", preview: "А с собакой можно?", time: "09:40", owner: "AI", status: "Новый запрос", tone: "bg-primary/10 text-primary" },
];

const channelIcon = (c: Channel) =>
  c === "WhatsApp" ? <MessageCircle className="h-3.5 w-3.5 text-whatsapp" /> : c === "Telegram" ? <Send className="h-3.5 w-3.5 text-cyan" /> : <Phone className="h-3.5 w-3.5 text-primary" />;

export const InboxPreview = ({ className }: { className?: string }) => {
  const [active, setActive] = useState(0);
  const c = conversations[active];
  return (
    <Window title="Guestra CRM · Входящие" className={className} badge={<span className="hidden items-center gap-1 text-[11px] text-muted-foreground sm:flex"><Sparkles className="h-3 w-3 text-violet" /> AI ведёт 11 из 14</span>}>
      <div className="grid sm:grid-cols-[1fr_1.05fr]">
        <ul className="divide-y divide-border/70 border-b border-border sm:border-b-0 sm:border-r">
          {conversations.map((item, i) => (
            <li key={item.name}>
              <button type="button" onClick={() => setActive(i)} aria-pressed={active === i} className={cn("flex w-full items-start gap-2.5 px-3.5 py-2.5 text-left transition", active === i ? "bg-primary/[0.06]" : "hover:bg-background-alt")}>
                <span className="mt-0.5">{channelIcon(item.channel)}</span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-[13px] font-semibold">{item.name}</span>
                    <span className="num shrink-0 text-[10px] text-muted-foreground">{item.time}</span>
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-muted-foreground">{item.preview}</span>
                  <span className="mt-1.5 flex items-center gap-1.5">
                    <span className={cn("rounded-full px-1.5 py-px text-[10px] font-semibold", item.tone)}>{item.status}</span>
                    <span className="text-[10px] text-muted-foreground">{item.owner === "AI" ? "ведёт AI" : item.owner === "Ждёт" ? "ждёт ответа" : `ведёт ${item.owner}`}</span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="p-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{c.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{c.name}</p>
              <p className="text-[11px] text-muted-foreground">{c.channel} · {c.status}</p>
            </div>
          </div>
          <dl className="mt-4 space-y-2 text-xs">
            {[
              ["Даты", active === 0 ? "18–20 октября · 4 гостя" : active === 2 ? "июнь · 12 номеров" : "уточняет"],
              ["Визиты", active === 0 ? "3, последний — весной" : "первое обращение"],
              ["Ответственный", c.owner === "AI" ? "AI-администратор" : c.owner === "Ждёт" ? "не назначен" : "Айдана, ресепшен"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3"><dt className="text-muted-foreground">{k}</dt><dd className="text-right font-medium">{v}</dd></div>
            ))}
          </dl>
          <div className="mt-4 flex gap-2 text-xs font-medium">
            <span className={cn("flex-1 rounded-lg px-2 py-2 text-center", c.owner === "AI" ? "bg-primary text-white" : "border border-border bg-white")}>{c.owner === "AI" ? "Взять диалог" : "Вернуть ИИ"}</span>
            <span className="flex-1 rounded-lg border border-border bg-white px-2 py-2 text-center">Создать КП</span>
          </div>
          <p className="mt-3 rounded-lg bg-background-alt px-2.5 py-2 text-[11px] leading-snug text-muted-foreground">
            <b className="font-semibold text-foreground">Заметка:</b> {active === 0 ? "ранний заезд согласован, без доплаты" : "пока без заметок"}
          </p>
        </div>
      </div>
    </Window>
  );
};

/* ─── Классификация обращения ─────────────────────────────────── */

export const ClassificationCard = ({ className }: { className?: string }) => (
  <Window title="Обращение · Олег Ким" className={className} bodyClassName="p-4 sm:p-5">
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {[
        { k: "Качество", v: "Высокое" },
        { k: "Направление", v: "Проживание" },
        { k: "Температура", v: "Тёплый" },
        { k: "Вероятность", v: "60%" },
      ].map((m) => (
        <div key={m.k} className="rounded-lg bg-background-alt px-3 py-2.5">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.k}</div>
          <div className="mt-1 text-sm font-semibold">{m.v}</div>
        </div>
      ))}
    </div>
    <div className="mt-4 grid gap-4 sm:grid-cols-2">
      <div>
        <p className="text-xs font-semibold">Причины</p>
        <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
          <li>Назвал даты и состав гостей</li>
          <li>Спросил про цену за две ночи</li>
          <li>Не ответил на предложение 4 часа</li>
        </ul>
      </div>
      <div>
        <p className="text-xs font-semibold">Недостающие данные</p>
        <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
          <li>Нужен ли завтрак</li>
          <li>Время заезда</li>
        </ul>
      </div>
    </div>
    <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-primary/20 bg-primary/[0.05] p-3 text-xs">
      <Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
      <span><b className="font-semibold">Рекомендуемое действие:</b> напомнить о предложении сегодня до 18:00, пока домик свободен.</span>
    </div>
  </Window>
);

/* ─── Запрос оплаты и удержание номера ────────────────────────── */

export const PaymentHoldCard = ({ className }: { className?: string }) => (
  <Window title="Бронь · Анна Иванова" className={className} bodyClassName="p-4 sm:p-5">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-semibold">Forest House · 18–20 октября</p>
        <p className="mt-0.5 text-xs text-muted-foreground">4 гостя · SPA для двоих · ранний заезд 11:00</p>
      </div>
      <span className="rounded-full bg-amber/15 px-2 py-0.5 text-[10px] font-semibold text-[hsl(28_80%_34%)]">Ожидает оплаты</span>
    </div>
    <div className="mt-4 space-y-2 text-xs">
      <div className="flex justify-between"><span className="text-muted-foreground">Сумма брони</span><span className="num font-medium">172 000 ₸</span></div>
      <div className="flex justify-between"><span className="text-muted-foreground">Предоплата 50%</span><span className="num font-semibold">86 000 ₸</span></div>
      <div className="flex justify-between"><span className="text-muted-foreground">Номер удержан до</span><span className="num font-medium">сегодня, 18:40</span></div>
    </div>
    <div className="mt-4 flex items-center gap-2 rounded-lg border border-border bg-background-alt px-3 py-2 text-xs">
      <Link2 className="h-3.5 w-3.5 text-primary" />
      <span className="min-w-0 flex-1 truncate text-muted-foreground">Ссылка на оплату отправлена в WhatsApp</span>
      <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" />
    </div>
    <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">Если оплата не придёт вовремя, удержание снимется само, а номер вернётся в продажу.</p>
  </Window>
);

/* ─── Работа отдела продаж ────────────────────────────────────── */

const managers = [
  { name: "AI-администратор", requests: 212, conversion: "38%", response: "сразу", revenue: "14,2 млн ₸" },
  { name: "Айдана", requests: 64, conversion: "41%", response: "6 мин", revenue: "6,1 млн ₸" },
  { name: "Тимур", requests: 51, conversion: "29%", response: "18 мин", revenue: "3,4 млн ₸" },
];

export const SalesPerformance = ({ className }: { className?: string }) => (
  <Window title="Аналитика · Продажи за октябрь" className={className} bodyClassName="p-0">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[460px] text-xs">
        <thead className="bg-background-alt text-[10px] uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-4 py-2.5 text-left font-semibold">Кто ведёт</th>
            <th className="px-3 py-2.5 text-right font-semibold">Обращения</th>
            <th className="px-3 py-2.5 text-right font-semibold">В бронь</th>
            <th className="px-3 py-2.5 text-right font-semibold">Первый ответ</th>
            <th className="px-4 py-2.5 text-right font-semibold">Выручка</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/70">
          {managers.map((m) => (
            <tr key={m.name}>
              <td className="px-4 py-3 font-medium">{m.name}</td>
              <td className="num px-3 py-3 text-right">{m.requests}</td>
              <td className="num px-3 py-3 text-right">{m.conversion}</td>
              <td className="num px-3 py-3 text-right">{m.response}</td>
              <td className="num px-4 py-3 text-right font-medium">{m.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="flex flex-wrap gap-x-6 gap-y-1 border-t border-border px-4 py-3 text-[11px] text-muted-foreground">
      <span>Закрыто без брони: <b className="font-semibold text-foreground">94</b></span>
      <span>Главная причина: <b className="font-semibold text-foreground">нет нужных дат</b></span>
    </div>
  </Window>
);

/* ─── Сегменты и кампании ─────────────────────────────────────── */

export const SegmentCard = ({ className }: { className?: string }) => (
  <Window title="Маркетинг · Сегмент" className={className} bodyClassName="p-4 sm:p-5">
    <p className="text-sm font-semibold">Гости, которые брали SPA и не были с весны</p>
    <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
      {["Проживаний ≥ 1", "Покупали SPA", "Последний визит до 1 июня", "Согласие на рассылку"].map((c) => (
        <span key={c} className="rounded-md border border-border bg-background-alt px-2 py-1">{c}</span>
      ))}
    </div>
    <div className="mt-4 flex items-end justify-between rounded-xl bg-background-alt px-4 py-3">
      <div>
        <div className="num text-2xl font-semibold">186</div>
        <div className="text-[11px] text-muted-foreground">гостей в сегменте</div>
      </div>
      <span className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white">Создать кампанию</span>
    </div>
  </Window>
);

/* ─── Репутация ───────────────────────────────────────────────── */

const reviews = [
  { author: "Мадина", stay: "Lake 201 · 12–14 окт", score: 10, text: "Тихо, чисто, вкусные завтраки.", replied: true },
  { author: "Ерлан", stay: "Forest 103 · 10–11 окт", score: 6, text: "Заселили на час позже, номер не успели убрать.", replied: false },
];

export const ReputationCard = ({ className }: { className?: string }) => (
  <Window title="Репутация · Лента отзывов" className={className} bodyClassName="p-4 sm:p-5">
    <div className="flex items-center justify-between rounded-xl bg-background-alt px-4 py-3">
      <div>
        <div className="num text-2xl font-semibold">8,7</div>
        <div className="text-[11px] text-muted-foreground">средний балл записанных отзывов</div>
      </div>
      <span className="rounded-full bg-rose/10 px-2 py-0.5 text-[10px] font-semibold text-rose">1 негатив без ответа</span>
    </div>
    <ul className="mt-3 space-y-2.5">
      {reviews.map((r) => (
        <li key={r.author} className="rounded-xl border border-border p-3 text-xs">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 font-semibold"><UserRound className="h-3.5 w-3.5 text-muted-foreground" /> {r.author}</span>
            <span className={cn("flex items-center gap-1 font-semibold", r.score < 7 ? "text-rose" : "text-emerald")}><Star className="h-3 w-3 fill-current" /> {r.score}</span>
          </div>
          <p className="mt-1 text-muted-foreground">{r.stay}</p>
          <p className="mt-1.5">{r.text}</p>
          <p className={cn("mt-2 text-[11px] font-medium", r.replied ? "text-emerald" : "text-primary")}>{r.replied ? "Ответ отправлен" : "Черновик ответа · связано с проживанием"}</p>
        </li>
      ))}
    </ul>
  </Window>
);
