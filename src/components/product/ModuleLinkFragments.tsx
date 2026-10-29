import { ArrowRight, CalendarClock, Check, CheckCircle2, Clock3, MapPin, MessageCircle, Sparkles, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

/** Маленькие фрагменты интерфейса для карточек «связок». Без «хрома» окна, только суть экрана. */
const Frame = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("rounded-xl border border-border bg-background-alt/70 p-3 text-[11.5px] leading-snug", className)}>{children}</div>
);

const Row = ({ label, value, strong }: { label: string; value: string; strong?: boolean }) => (
  <div className="flex items-baseline justify-between gap-3">
    <span className="text-muted-foreground">{label}</span>
    <span className={cn("num shrink-0 whitespace-nowrap", strong ? "font-semibold text-foreground" : "font-medium")}>{value}</span>
  </div>
);

export const BookingFromChat = () => (
  <Frame className="flex items-center gap-2">
    <div className="min-w-0 flex-1 rounded-lg rounded-br-sm bg-[#d9fdd3] px-2.5 py-1.5 text-[#111b21]">
      Forest House свободен: 74&nbsp;000&nbsp;₸ за ночь
    </div>
    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
    <div className="min-w-0 flex-1 rounded-md border border-primary bg-primary px-2 py-1.5 font-medium text-white">
      Анна И. · 18–20 окт
    </div>
  </Frame>
);

export const Handoff = () => (
  <Frame>
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-1.5 font-medium"><UserRound className="h-3.5 w-3.5 text-primary" /> Отвечает: Айдана</span>
      <span className="flex items-center gap-1 text-muted-foreground"><Sparkles className="h-3 w-3 text-violet" /> AI на паузе</span>
    </div>
    <div className="mt-2.5 flex gap-2">
      <span className="flex-1 rounded-md bg-primary px-2 py-1.5 text-center font-medium text-white">Взять диалог</span>
      <span className="flex-1 rounded-md border border-border bg-white px-2 py-1.5 text-center font-medium">Вернуть ИИ</span>
    </div>
  </Frame>
);

export const CheckoutCleaning = () => (
  <Frame className="space-y-2">
    <div className="flex items-center justify-between">
      <span className="font-medium">Forest 104 · выезд 12:00</span>
      <span className="rounded-full bg-rose/10 px-2 py-0.5 text-[10px] font-semibold text-rose">грязный</span>
    </div>
    <div className="flex items-center gap-2 rounded-lg border border-border bg-white px-2.5 py-1.5">
      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
      <span className="flex-1">Уборка после выезда · Гульнара</span>
      <span className="num text-muted-foreground">6/12</span>
    </div>
  </Frame>
);

export const ServicesToFolio = () => (
  <Frame className="space-y-1.5">
    <Row label="Проживание, 2 ночи" value="148 000 ₸" />
    <Row label="SPA, 19 окт, 15:00" value="24 000 ₸" />
    <div className="border-t border-border pt-1.5">
      <Row label="Фолио" value="172 000 ₸" strong />
    </div>
  </Frame>
);

export const Reminders = () => (
  <Frame className="space-y-1.5">
    {[
      { when: "За 3 дня", what: "Маршрут в 2ГИС, условия отмены", icon: MapPin },
      { when: "Накануне", what: "Время заезда и парковка", icon: CalendarClock },
    ].map((item) => (
      <div key={item.when} className="flex items-center gap-2 rounded-lg border border-border bg-white px-2.5 py-1.5">
        <item.icon className="h-3.5 w-3.5 shrink-0 text-primary" />
        <span className="w-[62px] shrink-0 font-medium">{item.when}</span>
        <span className="min-w-0 flex-1 truncate text-muted-foreground">{item.what}</span>
        <MessageCircle className="h-3.5 w-3.5 shrink-0 text-whatsapp" />
      </div>
    ))}
  </Frame>
);

export const PriceApproval = () => (
  <Frame className="space-y-2">
    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
      <span className="font-medium">Forest House · суббота</span>
      <span className="num whitespace-nowrap"><span className="text-muted-foreground line-through">74 000</span> → <b className="font-semibold">81 500 ₸</b></span>
    </div>
    <div className="flex items-center gap-2 rounded-lg bg-emerald/10 px-2.5 py-1.5 font-medium text-emerald">
      <Check className="h-3.5 w-3.5" strokeWidth={3} /> Утвердила Айдана, 10:42
    </div>
  </Frame>
);

export const GuestRequestTask = () => (
  <Frame className="flex items-center gap-2">
    <div className="min-w-0 flex-1 rounded-lg rounded-bl-sm bg-white px-2.5 py-1.5 shadow-sm">Можно ещё два полотенца?</div>
    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
    <div className="min-w-0 flex-1 rounded-lg border border-amber/40 bg-amber/10 px-2.5 py-1.5">
      <span className="block font-medium">Уборка · Lake 201</span>
      <span className="flex items-center gap-1 text-muted-foreground"><Clock3 className="h-3 w-3" /> срок 15 мин</span>
    </div>
  </Frame>
);

export const RepeatGuest = () => (
  <Frame className="flex items-center gap-3">
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">АИ</span>
    <div className="min-w-0 flex-1">
      <span className="block font-medium">Анна Иванова · 3 визита</span>
      <span className="block truncate text-muted-foreground">Берёт SPA, просит ранний заезд</span>
    </div>
    <span className="rounded-full bg-violet/10 px-2 py-0.5 text-[10px] font-semibold text-violet">повторный</span>
  </Frame>
);

export const NightAuditClose = () => (
  <Frame className="space-y-1.5">
    <Row label="Начисления за день" value="8 550 000 ₸" />
    <Row label="Оплаты" value="7 920 000 ₸" />
    <div className="flex items-center gap-2 border-t border-border pt-1.5 font-medium text-emerald">
      <Check className="h-3.5 w-3.5" strokeWidth={3} /> День закрыт, отчёт готов к 03:10
    </div>
  </Frame>
);

export const MaintenanceBlock = () => (
  <Frame className="space-y-2">
    <div className="flex items-center justify-between">
      <span className="font-medium">Sky 401 · не работает кондиционер</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="rounded-full bg-rose/10 px-2 py-0.5 text-[10px] font-semibold text-rose">снят с продажи</span>
      <span className="text-muted-foreground">до закрытия заявки техслужбой</span>
    </div>
  </Frame>
);
