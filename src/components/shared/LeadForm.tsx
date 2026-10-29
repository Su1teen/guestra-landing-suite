import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { mailtoHref, SALES_EMAIL, submitLead, type LeadIntent } from "@/lib/lead";

const roomOptions = ["До 20", "20–50", "50–100", "100–200", "Больше 200", "Несколько объектов"];
const roleOptions = ["Собственник", "Генеральный директор или управляющий", "Продажи и бронирование", "Ресепшен", "Финансы", "Другое"];

const field =
  "w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 transition focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10";

interface LeadFormProps {
  intent?: LeadIntent;
  submitLabel?: string;
  compact?: boolean;
  className?: string;
  onSent?: () => void;
}

type State = "idle" | "sending" | "sent" | "error";

export const LeadForm = ({ intent = "demo", submitLabel = "Отправить заявку", compact, className, onSent }: LeadFormProps) => {
  const [state, setState] = useState<State>("idle");
  const openedAt = useRef(Date.now());

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    setState("sending");
    try {
      await submitLead({
        intent,
        name: value("name"),
        email: value("email"),
        phone: value("phone") || undefined,
        company: value("company"),
        rooms: value("rooms") || undefined,
        role: value("role") || undefined,
        message: value("message") || undefined,
        website: value("website") || undefined,
        elapsedMs: Date.now() - openedAt.current,
      });
      setState("sent");
      onSent?.();
    } catch {
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div className={cn("flex flex-col items-center px-4 py-10 text-center", className)} role="status">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald/10 text-emerald">
          <Check className="h-6 w-6" strokeWidth={2.5} />
        </span>
        <p className="mt-4 text-lg font-semibold">Заявка отправлена</p>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
          Ответим в течение рабочего дня с адреса {SALES_EMAIL} и предложим время для демо.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("grid gap-3.5", className)} aria-label="Заявка на демо">
      <div className="grid gap-3.5 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="text-xs font-medium">Имя</span>
          <input required name="name" autoComplete="name" placeholder="Как к вам обращаться" className={field} />
        </label>
        <label className="grid gap-1.5">
          <span className="text-xs font-medium">Рабочая почта</span>
          <input required name="email" type="email" autoComplete="email" placeholder="name@hotel.kz" className={field} />
        </label>
        <label className="grid gap-1.5">
          <span className="text-xs font-medium">Отель или сеть</span>
          <input required name="company" autoComplete="organization" placeholder="Название и город" className={field} />
        </label>
        <label className="grid gap-1.5">
          <span className="text-xs font-medium">
            Телефон <span className="font-normal text-muted-foreground">· по желанию</span>
          </span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="+7" className={field} />
        </label>
        <label className="grid gap-1.5">
          <span className="text-xs font-medium">Номерной фонд</span>
          <span className="relative"><select name="rooms" defaultValue="" className={cn(field, "appearance-none pr-9")}>
            <option value="" disabled>
              Сколько номеров
            </option>
            {roomOptions.map((option) => <option key={option}>{option}</option>)}
          </select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /></span>
        </label>
        <label className="grid gap-1.5">
          <span className="text-xs font-medium">Ваша роль</span>
          <span className="relative"><select name="role" defaultValue="" className={cn(field, "appearance-none pr-9")}>
            <option value="" disabled>
              Выберите
            </option>
            {roleOptions.map((option) => <option key={option}>{option}</option>)}
          </select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /></span>
        </label>
      </div>
      {!compact && (
        <label className="grid gap-1.5">
          <span className="text-xs font-medium">
            Что важно показать <span className="font-normal text-muted-foreground">· по желанию</span>
          </span>
          <textarea name="message" rows={3} placeholder="Например: AI в WhatsApp, переход с текущей PMS, отчёты для собственника" className={cn(field, "resize-none")} />
        </label>
      )}
      <div className="hidden" aria-hidden>
        <label>
          Сайт
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state === "error" && (
        <p className="rounded-xl border border-rose/30 bg-rose/5 px-3.5 py-2.5 text-sm text-foreground" role="alert">
          Не удалось отправить заявку. Попробуйте ещё раз или напишите на{" "}
          <a href={mailtoHref()} className="font-medium text-primary underline-offset-2 hover:underline">
            {SALES_EMAIL}
          </a>
          .
        </p>
      )}

      <Button type="submit" size="lg" disabled={state === "sending"} className="mt-1 h-12 rounded-xl text-[15px]">
        {state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <>{submitLabel} <ArrowRight className="h-4 w-4" /></>}
      </Button>
      <p className="text-[11px] leading-relaxed text-muted-foreground">
        Отправляя заявку, вы соглашаетесь с{" "}
        <Link to="/privacy" className="underline underline-offset-2 hover:text-foreground">
          политикой конфиденциальности
        </Link>
        .
      </p>
    </form>
  );
};
