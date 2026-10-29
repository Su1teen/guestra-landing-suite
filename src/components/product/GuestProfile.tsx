import { motion } from "framer-motion";
import { MessageCircle, Phone, ShoppingBag, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { guest } from "@/data/demo";
import { Pill } from "./Pill";
import { formatTenge } from "./AnimatedMetric";

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-start justify-between gap-3 text-xs">
    <span className="text-muted-foreground">{label}</span>
    <span className="text-right font-medium text-foreground">{value}</span>
  </div>
);

interface GuestProfileProps {
  className?: string;
  variant?: "hero" | "full";
  recommendation?: string;
}

export const GuestProfile = ({ className, variant = "full", recommendation }: GuestProfileProps) => (
  <div className={cn("window p-4", className)}>
    <div className="flex items-start gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white">
        {guest.initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <h3 className="text-[15px] font-semibold leading-tight">{guest.name}</h3>
          <Pill tone="violet">
            <Star className="h-2.5 w-2.5 fill-current" /> VIP
          </Pill>
          <Pill tone="success">Повторный гость</Pill>
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          {guest.stays} предыдущих проживания · последний визит: {guest.lastVisit}
        </div>
      </div>
    </div>

    {variant === "hero" ? (
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-background-alt p-2.5">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Интерес</div>
          <div className="mt-0.5 text-xs font-medium">{guest.interest}</div>
        </div>
        <div className="rounded-lg bg-background-alt p-2.5">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Система видит</div>
          <div className="mt-0.5 text-xs font-medium">2 взрослых · 2 ночи · выходные</div>
        </div>
      </div>
    ) : (
      <div className="mt-4 space-y-2 border-t border-border pt-4">
        <Row label="Телефон" value={guest.phone} />
        <Row label="Предыдущие проживания" value={`${guest.stays} · Объект 01, Объект 02`} />
        <Row
          label="Последние сообщения"
          value={
            <span className="inline-flex items-center gap-1">
              <MessageCircle className="h-3 w-3 text-whatsapp" /> WhatsApp · 10:47
            </span>
          }
        />
        <Row
          label="Последние звонки"
          value={
            <span className="inline-flex items-center gap-1">
              <Phone className="h-3 w-3 text-primary" /> 12 сент · 3:20
            </span>
          }
        />
        <Row
          label="Покупки"
          value={
            <span className="inline-flex items-center gap-1">
              <ShoppingBag className="h-3 w-3 text-violet" /> SPA ×3 · Ресторан ×5
            </span>
          }
        />
        <Row label="Доп. услуги" value="SPA, завтрак, трансфер" />
        <Row label="Предпочтения" value={guest.preferences.join(", ")} />
        <Row label="Отмены и неявки" value="нет" />
        <Row label="Лояльность" value={guest.loyalty} />
        <Row label="Выручка от гостя" value={<span className="num text-sm font-semibold text-foreground">{formatTenge(guest.ltv)}</span>} />
        <Row label="Следующее действие" value={<Pill tone="primary">Отправить предложение</Pill>} />
      </div>
    )}

    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
      className="mt-4 flex items-start gap-2.5 rounded-xl border border-primary/20 bg-primary/[0.05] p-3"
    >
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary text-white">
        </span>
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">Подсказка для администратора</div>
        <p className="mt-0.5 text-xs leading-snug text-foreground">
          {recommendation ?? "Анна трижды брала SPA. Предложить пакет к новой брони?"}
        </p>
      </div>
    </motion.div>
  </div>
);
