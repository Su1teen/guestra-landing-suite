export const guest = {
  name: "Анна Иванова",
  initials: "АИ",
  phone: "+7 701 •• •• 42",
  tags: ["VIP", "Повторный гость"],
  stays: 3,
  lastVisit: "ЛЕС Боровое",
  interest: "Домик Forest",
  ltv: 482_000,
  preferences: ["SPA", "Завтрак в домик", "Тихий домик у леса"],
};

export const booking = {
  dates: "18–20 октября",
  property: "ЛЕС Боровое",
  category: "Forest House",
  rate: 74_000,
  nights: 2,
  adults: 2,
  status: "Подтверждено",
  payment: "Предоплата получена",
  channel: "WhatsApp",
  manager: "Айдана",
  ai: "Активен",
};

export type ChatStep =
  | { kind: "guest"; text: string }
  | { kind: "ai"; text: string }
  | { kind: "system"; events: string[] }
  | { kind: "status"; text: string; tone: "success" | "warning" };

export const salesScript: ChatStep[] = [
  { kind: "guest", text: "Здравствуйте! Есть домик на выходные на 4 человек?" },
  { kind: "ai", text: "Здравствуйте, Анна! Да, проверяю актуальную доступность." },
  { kind: "system", events: ["Найден гость", "Проверка Bnovo", "Проверка загрузки", "Получен актуальный тариф"] },
  {
    kind: "ai",
    text: "На 18–20 октября доступен Forest House. Стоимость — 74 000 ₸ за ночь.\nМогу также добавить SPA-доступ и завтрак.",
  },
  { kind: "guest", text: "Да, бронируйте." },
  { kind: "ai", text: "Готово. Отправляю ссылку на предоплату." },
  { kind: "system", events: ["Создана бронь", "CRM обновлена", "Отправлена ссылка"] },
  { kind: "status", text: "Предоплата ожидается", tone: "warning" },
  { kind: "status", text: "Бронь подтверждена", tone: "success" },
];

export const heroScript: ChatStep[] = [
  { kind: "guest", text: "Здравствуйте! Есть домик на выходные на двоих?" },
  { kind: "ai", text: "Здравствуйте, Анна! Рада видеть вас снова. Проверяю Forest House на 18–20 октября." },
  { kind: "system", events: ["Найден гость", "Проверена доступность", "Получен тариф"] },
  { kind: "ai", text: "Домик Forest свободен — 67 000 ₸ за ночь. Добавить SPA, как в прошлый раз?" },
  { kind: "guest", text: "Да, бронируйте с SPA." },
  { kind: "status", text: "Бронь подтверждена", tone: "success" },
];

export const allSystemEvents = [
  "Найден гость",
  "Проверена доступность",
  "Получен актуальный тариф",
  "Выбрана категория",
  "Создана бронь",
  "Отправлена ссылка",
  "Предоплата получена",
];

export const voiceTranscript = [
  { who: "ai", text: "Здравствуйте! Подскажите, пожалуйста, даты вашего проживания." },
  { who: "guest", text: "Добрый день, хотели бы на 18–20 октября, нас четверо." },
  { who: "ai", text: "Отлично. Есть коттедж Forest на четырёх гостей. Отправить предложение в WhatsApp?" },
  { who: "guest", text: "Да, давайте." },
] as const;

export const voiceSummary = {
  guest: "Илья",
  interest: "Коттедж Forest",
  dates: "18–20 октября",
  guests: 4,
  intent: "Высокий интерес",
  nextAction: "Отправить предложение",
};

export const crmColumns = [
  { title: "Новые обращения", count: 6, tone: "primary" as const },
  { title: "В работе", count: 4, tone: "violet" as const },
  { title: "Предложение", count: 3, tone: "warning" as const },
  { title: "Ожидается предоплата", count: 2, tone: "warning" as const },
  { title: "Подтверждено", count: 9, tone: "success" as const },
  { title: "Потеряно", count: 1, tone: "danger" as const },
];

export const crmLeads: Record<string, { name: string; note: string; sum?: string; channel: string }[]> = {
  "Новые обращения": [
    { name: "Илья Петров", note: "Коттедж Forest, 4 гостя", channel: "Звонок" },
    { name: "Мария Ким", note: "Семейный номер, 3 ночи", channel: "WhatsApp" },
    { name: "Дмитрий С.", note: "Корпоратив, 20 чел.", channel: "Сайт" },
  ],
  "В работе": [
    { name: "Айгерим Н.", note: "SPA-уикенд", sum: "128 000 ₸", channel: "WhatsApp" },
    { name: "Олег Ким", note: "Домик Lake, 2 ночи", sum: "96 000 ₸", channel: "Booking.com" },
  ],
  Предложение: [{ name: "Асель Т.", note: "Forest + завтрак", sum: "154 000 ₸", channel: "WhatsApp" }],
  "Ожидается предоплата": [{ name: "Анна Иванова", note: "Forest House, 18–20 окт", sum: "148 000 ₸", channel: "WhatsApp" }],
  Подтверждено: [
    { name: "Сергей Л.", note: "Lake House, 3 ночи", sum: "201 000 ₸", channel: "Сайт" },
    { name: "Жанар А.", note: "Стандарт, 1 ночь", sum: "42 000 ₸", channel: "Звонок" },
  ],
  Потеряно: [{ name: "Тимур Б.", note: "Нет дат", channel: "WhatsApp" }],
};

export const timeline = [
  { year: "2024", property: "ЛЕС Боровое", detail: "Forest House · 2 ночи", kind: "Бронь" },
  { year: "2025", property: "ЛЕС Боровое", detail: "SPA + ресторан · 3 ночи", kind: "Бронь + услуги" },
  { year: "2026", property: "ЛЕС Астана", detail: "Делюкс · 1 ночь", kind: "Бронь" },
];

export const rooms = ["Forest 101", "Forest 102", "Forest 104", "Lake 201", "Lake 202", "Делюкс 305", "Стандарт 310"];

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
  { room: 2, start: 3, nights: 1, guest: "Мария Ким", rate: "68 000 ₸", source: "Booking.com", services: "—", payment: "Ожидает", tone: "warning" },
  { room: 3, start: 0, nights: 3, guest: "Олег Ким", rate: "96 000 ₸", source: "Booking.com", services: "Трансфер", payment: "Оплачено", tone: "success" },
  { room: 3, start: 5, nights: 2, guest: "Айгерим Н.", rate: "98 000 ₸", source: "WhatsApp", services: "SPA", payment: "Предоплата", tone: "violet" },
  { room: 4, start: 2, nights: 2, guest: "Дмитрий С.", rate: "92 000 ₸", source: "Сайт", services: "Ресторан", payment: "Оплачено", tone: "success" },
  { room: 5, start: 1, nights: 2, guest: "Жанар А.", rate: "42 000 ₸", source: "Звонок", services: "—", payment: "Оплачено", tone: "success" },
  { room: 6, start: 4, nights: 3, guest: "Тимур Б.", rate: "38 000 ₸", source: "Airbnb", services: "—", payment: "Ожидает", tone: "warning" },
];

export const pricingFactors = [
  { label: "Сезон", pct: 10 },
  { label: "Загрузка 82%", pct: 15 },
  { label: "Высокий темп бронирований", pct: 8 },
  { label: "Праздничные даты", pct: 20 },
];

export const baseRate = 60_000;
export const floorPrice = 50_000;

export const housekeeping = {
  summary: [
    { label: "К уборке", value: 12, tone: "primary" as const },
    { label: "В процессе", value: 3, tone: "warning" as const },
    { label: "Готовы", value: 7, tone: "success" as const },
    { label: "Проверка", value: 2, tone: "violet" as const },
  ],
  tasks: [
    { room: "Домик 104", type: "Уборка после выезда", time: "13:25", status: "Проверка супервайзером", tone: "violet" as const },
    { room: "Lake 201", type: "Уборка после выезда", time: "13:40", status: "В процессе", tone: "warning" as const },
    { room: "Forest 102", type: "Подготовка к заезду", time: "14:00", status: "Готов", tone: "success" as const },
    { room: "Делюкс 305", type: "Запрос гостя: полотенца", time: "14:10", status: "Новая", tone: "primary" as const },
  ],
};

export const journey = [
  "Бронь создана",
  "Предзаезд",
  "Housekeeping",
  "Заезд",
  "Запрос гостя",
  "Сервисная задача",
  "Выезд",
  "Уборка",
  "Отзыв",
  "Лояльность",
];

export const guestRevenue = [
  { label: "Проживание", value: 148_000, color: "hsl(var(--primary))" },
  { label: "Ресторан", value: 31_500, color: "hsl(var(--violet))" },
  { label: "SPA", value: 24_000, color: "hsl(var(--emerald))" },
  { label: "Трансфер", value: 8_000, color: "hsl(var(--amber))" },
];

export const ownerKpis = [
  { label: "Выручка", value: 48_600_000, delta: "+18,4%", format: "tenge" },
  { label: "Загрузка", value: 82, delta: "+6 п.п.", format: "pct" },
  { label: "ADR", value: 74_500, delta: "+9,2%", format: "tenge" },
  { label: "RevPAR", value: 61_090, delta: "+15,8%", format: "tenge" },
  { label: "Прямые бронирования", value: 43, delta: "+11 п.п.", format: "pct" },
  { label: "Повторные гости", value: 31, delta: "+7 п.п.", format: "pct" },
  { label: "Доп. выручка", value: 24, delta: "рост", format: "pctDelta" },
] as const;

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

export const drr = [
  { label: "Сегодня", revenue: 1_620_000, occupancy: 84, adr: 76_200 },
  { label: "Вчера", revenue: 1_480_000, occupancy: 79, adr: 73_900 },
  { label: "Этот месяц", revenue: 38_400_000, occupancy: 82, adr: 74_500 },
  { label: "Этот квартал", revenue: 112_900_000, occupancy: 78, adr: 72_100 },
];

export const portfolio = [
  { name: "ЛЕС Боровое", rooms: 48, occupancy: 84, revenue: 21_400_000, trend: [42, 48, 55, 51, 63, 70, 74] },
  { name: "ЛЕС Астана", rooms: 36, occupancy: 79, revenue: 16_900_000, trend: [30, 34, 33, 41, 46, 52, 58] },
  { name: "ЛЕС Алматы", rooms: 52, occupancy: 76, revenue: 10_300_000, trend: [20, 26, 24, 31, 37, 40, 44] },
];

export const integrations = [
  "WhatsApp",
  "CRM",
  "Bnovo",
  "Rosta",
  "АТС",
  "Booking.com",
  "Airbnb",
  "Сайт",
  "Оплата",
  "Ресторан",
  "SPA",
  "Отзывы",
];

export const roadmap = [
  { stage: "01", title: "Подключение", en: "Connect", items: ["CRM", "PMS", "POS", "WhatsApp"] },
  { stage: "02", title: "Автоматизация", en: "Automate", items: ["AI-продажи", "Follow-up", "Voice AI", "Операции"] },
  { stage: "03", title: "Оптимизация", en: "Optimize", items: ["Dynamic Pricing", "Revenue-аналитика", "Аналитика"] },
  { stage: "04", title: "Собственные модули", en: "Own", items: ["Guestra CRM", "Guestra PMS", "Guestra Operations"] },
  { stage: "05", title: "Hotel OS", en: "Hotel OS", items: ["Всё связано в одной системе"] },
];
