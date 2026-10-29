export const guest = {
  name: "Анна Иванова",
  initials: "АИ",
  phone: "+7 701 •• •• 42",
  tags: ["VIP", "Повторный гость"],
  stays: 3,
  lastVisit: "Объект 01",
  interest: "Домик Forest",
  ltv: 482_000,
  loyalty: "Gold",
  preferences: ["SPA", "Завтрак в домик", "Тихий домик у леса"],
};

export type ChatStep =
  | { kind: "guest"; text: string }
  | { kind: "ai"; text: string }
  | { kind: "staff"; text: string; author: string }
  | { kind: "system"; events: string[] }
  | { kind: "status"; text: string; tone: "success" | "warning" | "neutral" };

/** Сценарий AI-администратора: повторяет реальный жизненный цикл обращения в Guestra CRM. */
export const salesScript: ChatStep[] = [
  { kind: "guest", text: "Здравствуйте! Есть домик на 18–20 октября? Нас четверо." },
  { kind: "ai", text: "Здравствуйте, Анна! Рады, что вы снова с нами. Проверяю свободные домики." },
  { kind: "system", events: ["Гость узнан · 3 визита", "Наличие проверено в PMS", "Цена из тарифа"] },
  { kind: "ai", text: "Forest House на четверых свободен: 74 000 ₸ за ночь, за две ночи 148 000 ₸. В прошлый раз вы брали SPA, добавить?" },
  { kind: "guest", text: "Да. И можно заехать в 11, а не в 14?" },
  { kind: "status", text: "Администратор Айдана взяла диалог", tone: "neutral" },
  { kind: "staff", author: "Айдана, ресепшен", text: "Анна, ранний заезд в 11:00 подтверждаю, без доплаты. Дальше вам поможет AI." },
  { kind: "status", text: "Диалог возвращён AI", tone: "neutral" },
  { kind: "ai", text: "Отправляю ссылку на предоплату 50%. Домик держу за вами до 18:40." },
  { kind: "system", events: ["КП отправлено", "Номер удержан до 18:40", "Ссылка на оплату"] },
  { kind: "status", text: "Ожидает оплаты", tone: "warning" },
  { kind: "status", text: "Оплата получена · бронь подтверждена", tone: "success" },
];

export const allSystemEvents = [
  "Гость узнан по истории",
  "Наличие проверено в PMS",
  "Цена взята из тарифа",
  "Диалог у администратора",
  "КП отправлено",
  "Номер удержан до оплаты",
  "Оплата получена",
  "Бронь в шахматке, напоминания запланированы",
];

/** Сколько действий из allSystemEvents выполнено к шагу сценария. */
export const salesProgress = (done: number) => {
  const map = [0, 0, 0, 3, 3, 3, 4, 4, 4, 4, 6, 7, 8];
  return map[Math.min(done, map.length - 1)];
};

export const voiceTranscript = [
  { who: "ai", text: "Здравствуйте! Подскажите, пожалуйста, даты вашего проживания." },
  { who: "guest", text: "Добрый день, хотели бы на 25–27 октября, нас четверо." },
  { who: "ai", text: "На эти даты свободен Forest House на четверых, 74 000 ₸ за ночь. Отправить предложение в WhatsApp?" },
  { who: "guest", text: "Да, давайте." },
] as const;

export const voiceSummary = {
  guest: "Илья",
  interest: "Forest House",
  dates: "25–27 октября",
  guests: 4,
  intent: "Тёплое обращение",
  nextAction: "КП в WhatsApp",
};

export const crmColumns = [
  { title: "Новый запрос", count: 6, tone: "primary" as const },
  { title: "Клиент думает", count: 4, tone: "violet" as const },
  { title: "Готов оплатить", count: 3, tone: "warning" as const },
  { title: "Ожидает оплаты", count: 2, tone: "warning" as const },
  { title: "Подтверждено", count: 9, tone: "success" as const },
  { title: "Закрыто", count: 1, tone: "danger" as const },
];

export const crmLeads: Record<string, { name: string; note: string; sum?: string; channel: string }[]> = {
  "Новый запрос": [
    { name: "Илья Петров", note: "Коттедж Forest, 4 гостя", channel: "Звонок" },
    { name: "Мария Ким", note: "Семейный номер, 3 ночи", channel: "WhatsApp" },
    { name: "Дмитрий С.", note: "Корпоратив, 20 чел.", channel: "Сайт" },
  ],
  "Клиент думает": [
    { name: "Айгерим Н.", note: "SPA-уикенд", sum: "128 000 ₸", channel: "WhatsApp" },
    { name: "Олег Ким", note: "Домик Lake, 2 ночи", sum: "192 000 ₸", channel: "Telegram" },
  ],
  "Готов оплатить": [{ name: "Асель Т.", note: "Forest + завтрак", sum: "154 000 ₸", channel: "WhatsApp" }],
  "Ожидает оплаты": [{ name: "Анна Иванова", note: "Forest House, 18–20 окт", sum: "148 000 ₸", channel: "WhatsApp" }],
  Подтверждено: [
    { name: "Сергей Л.", note: "Lake House, 3 ночи", sum: "201 000 ₸", channel: "Сайт" },
    { name: "Жанар А.", note: "Стандарт, 1 ночь", sum: "42 000 ₸", channel: "Звонок" },
  ],
  Закрыто: [{ name: "Тимур Б.", note: "Причина: нет нужных дат", channel: "WhatsApp" }],
};

export const timeline = [
  { year: "2024", property: "Объект 01", detail: "Forest House · 2 ночи", kind: "Бронь" },
  { year: "2025", property: "Объект 01", detail: "SPA + ресторан · 3 ночи", kind: "Бронь + услуги" },
  { year: "2026", property: "Объект 02", detail: "Городской номер · 1 ночь", kind: "Бронь" },
];

export const rooms = ["Forest 101", "Forest 102", "Forest 103", "Lake 201", "Lake 202", "A-Frame 301", "Sky 401"];

export type Reservation = {
  room: number;
  start: number;
  nights: number;
  guest: string;
  rate: string;
  source: string;
  services: string;
  payment: "Оплачено" | "Предоплата" | "Ожидает";
  tone: "primary" | "violet" | "success" | "warning";
};

export const reservations: Reservation[] = [
  { room: 0, start: 0, nights: 2, guest: "Сергей Л.", rate: "74 000 ₸", source: "Сайт", services: "Завтрак", payment: "Оплачено", tone: "success" },
  { room: 0, start: 4, nights: 2, guest: "Анна Иванова", rate: "74 000 ₸", source: "WhatsApp", services: "SPA, завтрак", payment: "Предоплата", tone: "primary" },
  { room: 1, start: 1, nights: 3, guest: "Асель Т.", rate: "71 000 ₸", source: "WhatsApp", services: "Завтрак", payment: "Предоплата", tone: "primary" },
  { room: 2, start: 3, nights: 1, guest: "Мария Ким", rate: "68 000 ₸", source: "Booking.com", services: "-", payment: "Ожидает", tone: "warning" },
  { room: 3, start: 0, nights: 3, guest: "Олег Ким", rate: "96 000 ₸", source: "Booking.com", services: "Трансфер", payment: "Оплачено", tone: "success" },
  { room: 3, start: 5, nights: 2, guest: "Айгерим Н.", rate: "98 000 ₸", source: "WhatsApp", services: "SPA", payment: "Предоплата", tone: "violet" },
  { room: 4, start: 2, nights: 2, guest: "Дмитрий С.", rate: "92 000 ₸", source: "Сайт", services: "Ресторан", payment: "Оплачено", tone: "success" },
  { room: 5, start: 1, nights: 2, guest: "Жанар А.", rate: "42 000 ₸", source: "Звонок", services: "-", payment: "Оплачено", tone: "success" },
  { room: 6, start: 4, nights: 3, guest: "Тимур Б.", rate: "38 000 ₸", source: "Airbnb", services: "-", payment: "Ожидает", tone: "warning" },
];

export const baseRate = 60_000;
export const floorPrice = 50_000;

export const revenueByUnit = [
  { label: "Номера", value: 68, color: "hsl(var(--primary))" },
  { label: "Ресторан", value: 17, color: "hsl(var(--violet))" },
  { label: "SPA", value: 10, color: "hsl(var(--emerald))" },
  { label: "Другое", value: 5, color: "hsl(var(--amber))" },
];

export const channelMix = [
  { label: "Прямые", value: 43, color: "hsl(var(--primary))" },
  { label: "OTA", value: 27, color: "hsl(var(--cyan))" },
  { label: "WhatsApp", value: 21, color: "hsl(var(--whatsapp))" },
  { label: "Телефон", value: 9, color: "hsl(var(--amber))" },
];

export const portfolio = [
  { name: "Объект 01", rooms: 48, occupancy: 84, revenue: 96_000_000, adr: 81_200, revpar: 68_208, direct: 51, issue: "Проверить смены с высокой долей возвратов", trend: [42, 48, 55, 51, 63, 70, 74] },
  { name: "Объект 02", rooms: 36, occupancy: 79, revenue: 55_000_000, adr: 64_300, revpar: 50_797, direct: 35, issue: "Прямых броней меньше, чем в Объекте 01", trend: [30, 34, 33, 41, 46, 52, 58] },
  { name: "Объект 03", rooms: 52, occupancy: 76, revenue: 70_000_000, adr: 58_700, revpar: 44_612, direct: 38, issue: "Низкий RevPAR при самом большом номерном фонде", trend: [20, 26, 24, 31, 37, 40, 44] },
];

