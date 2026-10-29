import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Check,
  ClipboardList,
  Bell,
  Users,
  Wrench,
  LogOut,
  ArrowRight,
  CalendarCheck,
  Clock,
  MessageCircle,
  Phone,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Pill, type Tone } from "./Pill";
import { Window } from "./Window";

/* ─── Типы и структуры данных ────────────────────────────────── */
type StageKey = "pre-arrival" | "housekeeping" | "service" | "maintenance" | "checkout";

interface Assignee {
  name: string;
  role: string;
  initials: string;
}

interface TaskItem {
  room: string;
  roomType: string;
  taskTitle: string;
  assignee: Assignee;
  channel: string;
  channelIcon: typeof MessageCircle;
  timeInfo: string;
  status: string;
  tone: Tone;
  progress?: number;
  checkpoints: string[];
  priority?: "Стандарт" | "Высокий" | "Срочно";
}

interface StageData {
  label: string;
  badgeCount: number;
  icon: typeof Users;
  color: string;
  department: string;
  counters: { label: string; value: number; tone: string; suffix?: string }[];
  tasks: TaskItem[];
  timeline: string[];
}

const stages: Record<StageKey, StageData> = {
  "pre-arrival": {
    label: "Предзаезд",
    badgeCount: 12,
    icon: CalendarCheck,
    color: "text-primary",
    department: "Служба приёма и подготовки номеров",
    counters: [
      { label: "Прибытий сегодня", value: 12, tone: "primary" },
      { label: "Особые пожелания", value: 3, tone: "violet" },
      { label: "Ожидают подготовки", value: 2, tone: "warning" },
      { label: "Готовы к заселению", value: 7, tone: "success" },
    ],
    tasks: [
      {
        room: "Forest House 104",
        roomType: "Коттедж у леса",
        taskTitle: "Подготовка номера к заезду · Анна Иванова",
        assignee: { name: "Марина Смирнова", role: "Горничная 1-й смены", initials: "МС" },
        channel: "WhatsApp",
        channelIcon: MessageCircle,
        timeInfo: "Заезд в 15:00 · Осталось 1ч 35м",
        status: "В процессе",
        tone: "warning",
        progress: 65,
        checkpoints: ["Комплектация спальни ✓", "Проверка климат-контроля ✓", "Приветственный набор"],
        priority: "Высокий",
      },
      {
        room: "Lake 201",
        roomType: "Домик у озера",
        taskTitle: "Особое пожелание: тихий номер, доп. подушки",
        assignee: { name: "Гульнара Бекова", role: "Супервайзер службы", initials: "ГБ" },
        channel: "Онлайн-бронирование",
        channelIcon: QrCode,
        timeInfo: "Заезд в 14:00 · Подготовлен заранее",
        status: "Подготовлен",
        tone: "success",
        progress: 100,
        checkpoints: ["Пожелание учтено ✓", "Комплектация проверена ✓", "Ключ-карта выпущена ✓"],
        priority: "Стандарт",
      },
      {
        room: "A-Frame 301",
        roomType: "A-Frame с террасой",
        taskTitle: "VIP-гость: подготовка фруктовой корзины и мини-бара",
        assignee: { name: "Айбек Толеу", role: "Служба питания (F&B)", initials: "АТ" },
        channel: "Ресепшен",
        channelIcon: Phone,
        timeInfo: "Заезд в 16:30 · Заказ передан на кухню",
        status: "Новая задача",
        tone: "primary",
        progress: 25,
        checkpoints: ["Заказ оформлен ✓", "Доставка в номер ожидается"],
        priority: "Высокий",
      },
    ],
    timeline: ["Бронь подтверждена", "Задачи распределены", "Номер готовится", "Инспекция пройдена", "Готов к заселению"],
  },
  housekeeping: {
    label: "Уборка",
    badgeCount: 14,
    icon: ClipboardList,
    color: "text-amber",
    department: "Служба уборки",
    counters: [
      { label: "К уборке сегодня", value: 12, tone: "primary" },
      { label: "В процессе уборки", value: 3, tone: "warning" },
      { label: "Готовы к заезду", value: 7, tone: "success" },
      { label: "На инспекции", value: 2, tone: "violet" },
    ],
    tasks: [
      {
        room: "Forest 103",
        roomType: "Forest House",
        taskTitle: "Генеральная уборка после выезда гостя",
        assignee: { name: "Марина Смирнова", role: "Горничная", initials: "МС" },
        channel: "Система отеля",
        channelIcon: CheckCircle2,
        timeInfo: "Начало: 13:24 · Норматив: 45 мин",
        status: "В работе",
        tone: "warning",
        progress: 68,
        checkpoints: ["Смена постельного белья ✓", "Дезинфекция ванной ✓", "Пополнение мини-бара", "Финальный осмотр"],
        priority: "Высокий",
      },
      {
        room: "Lake 201",
        roomType: "Коттедж у озера",
        taskTitle: "Текущая уборка и пополнение банных принадлежностей",
        assignee: { name: "Айгерим Касым", role: "Горничная", initials: "АК" },
        channel: "План смены",
        channelIcon: QrCode,
        timeInfo: "13:40 · Ожидает проверки супервайзером",
        status: "На проверке",
        tone: "violet",
        progress: 90,
        checkpoints: ["Уборка выполнена ✓", "Озонирование проведено ✓", "Осмотр супервайзером"],
        priority: "Стандарт",
      },
      {
        room: "Forest 102",
        roomType: "Forest House",
        taskTitle: "Экспресс-подготовка к раннему заселению",
        assignee: { name: "Гульнара Бекова", role: "Супервайзер", initials: "ГБ" },
        channel: "Система отеля",
        channelIcon: CheckCircle2,
        timeInfo: "14:00 · Принят без замечаний",
        status: "Готов к заезду",
        tone: "success",
        progress: 100,
        checkpoints: ["Чистота 100% ✓", "Ароматизация ✓", "Статус в PMS: Чистый ✓"],
        priority: "Стандарт",
      },
    ],
    timeline: ["Выезд гостя", "Задача создана автоматически", "Уборка номера", "Инспекция качества", "Статус: Чист в PMS"],
  },
  service: {
    label: "Сервис",
    badgeCount: 5,
    icon: Bell,
    color: "text-violet",
    department: "Служба сервиса и консьерж-сервис",
    counters: [
      { label: "Активные запросы", value: 5, tone: "primary" },
      { label: "Выполнено сегодня", value: 18, tone: "success" },
      { label: "Вне срока", value: 0, tone: "success" },
      { label: "Среднее время ответа", value: 6, tone: "violet", suffix: " мин" },
    ],
    tasks: [
      {
        room: "A-Frame 301",
        roomType: "A-Frame с террасой",
        taskTitle: "«Можно принести дополнительное тёплое одеяло?»",
        assignee: { name: "Служба обслуживания", role: "Дежурный этажа", initials: "СО" },
        channel: "WhatsApp гостя",
        channelIcon: MessageCircle,
        timeInfo: "Срок: 08:32 мин осталось · Норматив: 15 мин",
        status: "Принято в работу",
        tone: "primary",
        progress: 55,
        checkpoints: ["Запрос принят AI-администратором ✓", "Назначен дежурный ✓", "Доставка в номер"],
        priority: "Высокий",
      },
      {
        room: "Forest 101",
        roomType: "Forest House",
        taskTitle: "Заказ ужина в номер: сет от шеф-повара на 2 персоны",
        assignee: { name: "Служба F&B", role: "Курьер ресторана", initials: "РМ" },
        channel: "QR-меню в номере",
        channelIcon: QrCode,
        timeInfo: "Срок: 12:15 мин осталось · Норматив: 30 мин",
        status: "В доставке",
        tone: "warning",
        progress: 80,
        checkpoints: ["Блюда приготовлены ✓", "Сет упакован ✓", "Курьер направляется к домику"],
        priority: "Стандарт",
      },
      {
        room: "Lake 202",
        roomType: "Домик у озера",
        taskTitle: "Согласование позднего выезда до 16:00 (VIP-гость)",
        assignee: { name: "Айдана Сериковна", role: "Старший администратор", initials: "АС" },
        channel: "Звонок на ресепшн",
        channelIcon: Phone,
        timeInfo: "11:15 · Подтверждено администрацией",
        status: "Согласовано",
        tone: "success",
        progress: 100,
        checkpoints: ["Проверка шахматки заездов ✓", "Продление в PMS ✓", "Уведомление гостю в чат ✓"],
        priority: "Стандарт",
      },
    ],
    timeline: ["Запрос гостя", "Авто-маршрутизация", "Назначение сотрудника", "Выполнение", "Подтверждение гостю"],
  },
  maintenance: {
    label: "Инженерия",
    badgeCount: 4,
    icon: Wrench,
    color: "text-rose",
    department: "Инженерно-техническая служба",
    counters: [
      { label: "Открытые заявки", value: 4, tone: "primary" },
      { label: "Срочный приоритет", value: 1, tone: "danger" },
      { label: "В работе у мастеров", value: 2, tone: "warning" },
      { label: "Устранено сегодня", value: 6, tone: "success" },
    ],
    tasks: [
      {
        room: "Домик 108",
        roomType: "Forest House",
        taskTitle: "Кондиционер: слабое охлаждение",
        assignee: { name: "Алексей Ковалев", role: "Старший инженер-техник", initials: "АК" },
        channel: "Сигнал от горничной",
        channelIcon: CheckCircle2,
        timeInfo: "Срочно · В работе 25 мин",
        status: "В работе",
        tone: "warning",
        progress: 75,
        checkpoints: ["Очистка фильтров ✓", "Дозаправка хладагента ✓", "Тестовый запуск климата"],
        priority: "Срочно",
      },
      {
        room: "Lake 201",
        roomType: "Коттедж у озера",
        taskTitle: "Регулировка термостата и смесителя в ванной",
        assignee: { name: "Ерлан Султанов", role: "Мастер-сантехник", initials: "ЕС" },
        channel: "Чек-лист инспекции",
        channelIcon: QrCode,
        timeInfo: "Устранено за 35 мин · Протечек нет",
        status: "Завершено",
        tone: "success",
        progress: 100,
        checkpoints: ["Замена уплотнителя ✓", "Проверка давления воды ✓", "Акт подписан ✓"],
        priority: "Стандарт",
      },
      {
        room: "Стандарт 310",
        roomType: "Гостиничный корпус",
        taskTitle: "Плановая профилактика электронного замка двери",
        assignee: { name: "Дежурный техник", role: "Инженерная смена", initials: "ДТ" },
        channel: "Авто-мониторинг замков",
        channelIcon: ShieldCheck,
        timeInfo: "Запланировано на завтра, 10:00",
        status: "Запланировано",
        tone: "primary",
        progress: 10,
        checkpoints: ["Комплектующие на складе ✓", "Ожидание свободного окна"],
        priority: "Стандарт",
      },
    ],
    timeline: ["Фиксация проблемы", "Оценка приоритета", "Назначение мастера", "Ремонтные работы", "Проверка и закрытие"],
  },
  checkout: {
    label: "Выезд",
    badgeCount: 8,
    icon: LogOut,
    color: "text-emerald",
    department: "Служба расчета и освобождения номеров",
    counters: [
      { label: "Выездов сегодня", value: 8, tone: "primary" },
      { label: "Выезд оформлен", value: 5, tone: "success" },
      { label: "Ожидают проверки", value: 2, tone: "warning" },
      { label: "Задач уборки создано", value: 3, tone: "violet" },
    ],
    tasks: [
      {
        room: "Forest 103",
        roomType: "Forest House",
        taskTitle: "Анна Иванова · Выезд в 14:00 · Быстрый расчет через WhatsApp",
        assignee: { name: "Администратор стойки", role: "Расчетная группа", initials: "АС" },
        channel: "WhatsApp",
        channelIcon: MessageCircle,
        timeInfo: "Статус номера → Требует уборки · Задача горничной создана",
        status: "Выезд оформлен",
        tone: "success",
        progress: 100,
        checkpoints: ["Ключ-карта деактивирована ✓", "Статус номера: Требует уборки ✓", "Задача горничной отправлена ✓", "Запрос отзыва запланирован ✓"],
        priority: "Высокий",
      },
      {
        room: "Lake 202",
        roomType: "Домик у озера",
        taskTitle: "Олег Ким · Выезд в 12:00 · Сверка мини-бара и счета",
        assignee: { name: "Динара Мусина", role: "Администратор", initials: "ДМ" },
        channel: "Ресепшен",
        channelIcon: Phone,
        timeInfo: "Ожидание проверки номера горничной",
        status: "Ожидает расчёта",
        tone: "warning",
        progress: 60,
        checkpoints: ["Осмотр мини-бара в процессе", "Счет за доп. услуги сформирован ✓"],
        priority: "Стандарт",
      },
      {
        room: "Forest 101",
        roomType: "Forest House",
        taskTitle: "Сергей Л. · Выезд в 11:00 · Счет оплачен · Оценка 5/5",
        assignee: { name: "Служба заботы о гостях", role: "Авто-сценарий", initials: "СЗ" },
        channel: "Профиль гостя",
        channelIcon: CheckCircle2,
        timeInfo: "Запущен сценарий повторного бронирования",
        status: "Завершено",
        tone: "success",
        progress: 100,
        checkpoints: ["Полный расчет закрыт ✓", "Отзыв 5 звезд получен ✓", "Бонусные баллы начислены ✓"],
        priority: "Стандарт",
      },
    ],
    timeline: ["Выезд гостя", "Сверка счета и мини-бара", "Смена статуса номера", "Задача службе уборки", "Сценарий лояльности"],
  },
};

const stageKeys: StageKey[] = ["pre-arrival", "housekeeping", "service", "maintenance", "checkout"];

const toneDot: Record<string, string> = {
  primary: "bg-primary",
  warning: "bg-amber",
  success: "bg-emerald",
  violet: "bg-violet",
  danger: "bg-rose",
};

/* ─── Блок входящей брони (триггер операций) ─────────────────── */
const BookingTrigger = ({ visible }: { visible: boolean }) => {
  const checks = [
    "Подготовка номера к заселению",
    "Проверка особых пожеланий гостя",
    "Создание задач предзаезда дежурным",
    "Назначение уборки и комплектации",
  ];

  return (
    <div className="window p-3 sm:p-4">
      <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Бронь запускает работу отеля
        </div>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          задачи создаются автоматически
        </span>
      </div>
      <div className="grid gap-2.5 sm:grid-cols-[1.1fr_auto_1.2fr] items-center">
        <div className="rounded-xl border border-primary/20 bg-primary/[0.04] p-2.5 sm:p-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">Новая бронь</span>
            <Pill tone="success" dot>Подтверждено</Pill>
          </div>
          <div className="mt-1.5 space-y-0.5 text-xs">
            <div className="text-sm font-semibold text-foreground">Анна Иванова</div>
            <div className="text-muted-foreground">Объект: <span className="font-medium text-foreground">Ваш отель</span> · Домик: <span className="font-medium text-foreground">Forest House</span></div>
            <div className="text-muted-foreground">Заезд: <span className="font-medium text-foreground">18 окт</span> · Выезд: <span className="font-medium text-foreground">20 окт</span></div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 py-0.5 text-primary sm:py-0">
          <span className="hidden text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:block">авто</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>
        <div className="rounded-xl border border-border bg-background-alt/60 p-2.5 sm:p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Автоматические сценарии</div>
          <ul className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-1">
            {checks.map((c, i) => (
              <motion.li
                key={c}
                initial={{ opacity: 0, x: -6 }}
                animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="flex items-center gap-1.5 text-xs"
              >
                <Check className="h-3.5 w-3.5 text-emerald shrink-0" />
                <span className="truncate font-medium text-foreground/90 text-[11px]">{c}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

/* ─── Отдельная панель переключения отделов (Табы) ───────────── */
const StageTabsBar = ({
  active,
  onChange,
}: {
  active: StageKey;
  onChange: (k: StageKey) => void;
}) => (
  <div className="border-b border-border/70 bg-background-alt/40 p-1.5 sm:px-3 sm:py-2">
    <div className="scrollbar-none flex gap-1.5 overflow-x-auto sm:justify-center" role="tablist" aria-label="Службы отеля">
      {stageKeys.map((k) => {
        const s = stages[k];
        const Icon = s.icon;
        const isActive = active === k;
        return (
          <button
            key={k}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(k)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all shadow-sm min-h-[36px]",
              isActive
                ? "bg-primary text-white "
                : "bg-white text-muted-foreground hover:bg-background-alt hover:text-foreground border border-border/80"
            )}
          >
            <Icon className={cn("h-3.5 w-3.5 shrink-0", isActive ? "text-white" : s.color)} />
            <span>{s.label}</span>
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none",
                isActive ? "bg-white/20 text-white" : "bg-background-alt text-muted-foreground"
              )}
            >
              {s.badgeCount}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

/* ─── Контент выбранного отдела ──────────────────────────────── */
const StageContent = ({ stage }: { stage: StageData }) => (
  <motion.div
    key={stage.label}
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.2 }}
    className="grid gap-3 p-3 sm:p-4"
  >
    {/* Карточки ключевых показателей отдела */}
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {stage.counters.map((c) => (
        <div key={c.label} className="rounded-xl border border-border/60 bg-background-alt/60 p-2 sm:p-2.5 shadow-sm">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className={cn("h-1.5 w-1.5 rounded-full", toneDot[c.tone])} aria-hidden /> {c.label}
          </div>
          <div className="num mt-0.5 text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
            {c.value}
            {c.suffix ?? ""}
          </div>
        </div>
      ))}
    </div>

    {/* Задачи службы с расширенными визуальными атрибутами */}
    <div className="space-y-2.5">
      {stage.tasks.slice(0, 2).map((t, i) => {
        const ChannelIcon = t.channelIcon;
        return (
          <motion.div
            key={t.room + t.taskTitle}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.06 + i * 0.05 }}
            className="rounded-xl border border-border bg-white p-3 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Верхняя строка: Номер, тип и статус */}
            <div className="flex flex-wrap items-center justify-between gap-1.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-foreground">{t.room}</span>
                <span className="text-xs text-muted-foreground font-medium">· {t.roomType}</span>
                {t.priority === "Срочно" && (
                  <span className="flex items-center gap-1 rounded-md bg-rose/10 px-1.5 py-0.5 text-[10px] font-semibold text-rose">
                    <AlertCircle className="h-3 w-3" /> Срочно
                  </span>
                )}
                {t.priority === "Высокий" && (
                  <span className="rounded-md bg-amber/15 px-1.5 py-0.5 text-[10px] font-semibold text-amber">
                    Высокий приоритет
                  </span>
                )}
              </div>
              <Pill tone={t.tone} dot>{t.status}</Pill>
            </div>

            {/* Название задачи */}
            <div className="mt-1 text-xs sm:text-sm font-medium text-foreground/90">
              {t.taskTitle}
            </div>

            {/* Чек-лист шагов выполнения */}
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              {t.checkpoints.map((cp) => (
                <span
                  key={cp}
                  className="inline-flex items-center gap-1 rounded-md bg-background-alt/80 border border-border/50 px-2 py-0.5 text-[10px] sm:text-[11px] text-foreground/80 font-medium"
                >
                  <Check className="h-3 w-3 text-emerald shrink-0" />
                  {cp}
                </span>
              ))}
            </div>

            {/* Прогресс выполнения, если указан */}
            {t.progress !== undefined && (
              <div className="mt-2">
                <div className="flex items-center justify-between text-[10px] sm:text-[11px]">
                  <span className="text-muted-foreground">Прогресс выполнения</span>
                  <span className="num font-semibold text-foreground">{t.progress}%</span>
                </div>
                <div className="mt-0.5 h-1.5 overflow-hidden rounded-full bg-background-alt">
                  <motion.div
                    className={cn(
                      "h-full rounded-full",
                      t.progress === 100 ? "bg-emerald" : "bg-primary"
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: `${t.progress}%` }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            )}

            {/* Нижняя строка: Исполнитель, Источник и Время */}
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-2 text-xs text-muted-foreground">
              {/* Аватар и имя исполнителя */}
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[9px] font-bold text-primary">
                  {t.assignee.initials}
                </div>
                <div>
                  <span className="font-semibold text-foreground text-xs">{t.assignee.name}</span>
                  <span className="ml-1 text-[10px] text-muted-foreground">({t.assignee.role})</span>
                </div>
              </div>

              {/* Канал и время */}
              <div className="flex items-center gap-2.5 text-[11px]">
                <span className="flex items-center gap-1 text-foreground/80 font-medium">
                  <ChannelIcon className="h-3.5 w-3.5 text-primary" /> {t.channel}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {t.timeInfo}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>

    {/* Пошаговая цепочка процесса (Timeline) */}
    <div className="mt-0.5 rounded-xl border border-border/70 bg-background-alt/50 p-2 sm:p-2.5">
      <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        Этапы процесса: {stage.department}
      </div>
      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
        {stage.timeline.map((t, i) => (
          <div key={t} className="flex shrink-0 items-center gap-1.5">
            <span
              className={cn(
                "flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold",
                i === 0
                  ? "bg-primary text-white shadow-sm"
                  : "border border-border bg-white text-muted-foreground"
              )}
            >
              {i + 1}
            </span>
            <span className="whitespace-nowrap text-xs font-medium text-foreground/80">{t}</span>
            {i < stage.timeline.length - 1 && <ArrowRight className="mx-1 h-3 w-3 shrink-0 text-border" />}
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

/* ─── Главный компонент раздела ──────────────────────────────── */
export const OperationsDashboard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px" });
  const [activeStage, setActiveStage] = useState<StageKey>("service");
  const stage = stages[activeStage];

  return (
    <div ref={ref} className="w-full space-y-3.5">
      {/* 1. Блок новой брони (триггер) */}
      <BookingTrigger visible={inView} />

      {/* 2. Основное окно операционного центра */}
      <Window
        title="Guestra PMS · Операции"
        badge={
          <span className="flex items-center gap-1.5 text-xs text-emerald font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald animate-pulse" />
            Смена активна
          </span>
        }
      >
        {/* Табы навигации */}
        <StageTabsBar active={activeStage} onChange={setActiveStage} />

        {/* Динамическое содержимое выбранного отдела */}
        <AnimatePresence mode="wait">
          <StageContent stage={stage} />
        </AnimatePresence>
      </Window>
    </div>
  );
};

/* ─── Экспорты для обратной совместимости ────────────────────── */
export const AutomationTimeline = ({ step }: { step: number }) => null;
export const HousekeepingMobile = ({ step }: { step: number }) => null;
