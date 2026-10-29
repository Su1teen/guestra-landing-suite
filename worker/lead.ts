/** Проверка и форматирование заявки. Используется Worker'ом и тестами; браузерного кода не содержит. */
export const LEAD_TO_DEFAULT = "sales@guestra.org";

export interface Lead {
  name: string;
  email: string;
  phone?: string;
  company: string;
  rooms?: string;
  role?: string;
  message?: string;
  intent?: string;
  page?: string;
  utm?: Record<string, string>;
}

type Validation = { ok: true; lead: Lead } | { ok: false; error: "invalid" | "spam" };

// Убираем управляющие символы, чтобы они не попали в заголовки и текст письма.
const clean = (value: unknown, max: number) =>
  // eslint-disable-next-line no-control-regex
  typeof value === "string" ? value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").trim().slice(0, max) : "";

const EMAIL = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]{2,}$/;

export const validateLead = (input: unknown): Validation => {
  if (!input || typeof input !== "object") return { ok: false, error: "invalid" };
  const data = input as Record<string, unknown>;

  // Скрытое поле: люди его не видят и не заполняют.
  if (clean(data.website, 200)) return { ok: false, error: "spam" };
  // Форму не заполняют быстрее двух секунд.
  const elapsed = Number(data.elapsedMs);
  if (Number.isFinite(elapsed) && elapsed < 2000) return { ok: false, error: "spam" };

  const lead: Lead = {
    name: clean(data.name, 120),
    email: clean(data.email, 160).toLowerCase(),
    phone: clean(data.phone, 40) || undefined,
    company: clean(data.company, 160),
    rooms: clean(data.rooms, 40) || undefined,
    role: clean(data.role, 60) || undefined,
    message: clean(data.message, 2000) || undefined,
    intent: clean(data.intent, 40) || undefined,
    page: clean(data.page, 200) || undefined,
  };

  if (data.utm && typeof data.utm === "object") {
    const utm: Record<string, string> = {};
    for (const [key, value] of Object.entries(data.utm as Record<string, unknown>).slice(0, 8)) {
      if (/^utm_[a-z]+$/.test(key)) utm[key] = clean(value, 120);
    }
    if (Object.keys(utm).length) lead.utm = utm;
  }

  if (!lead.name || !lead.company || !EMAIL.test(lead.email)) return { ok: false, error: "invalid" };
  return { ok: true, lead };
};

const intentLabels: Record<string, string> = {
  demo: "Демо",
  integration: "Подключение и интеграции",
  voice: "Голосовой AI-агент",
  pricing: "Стоимость",
};

export const buildLeadEmail = (lead: Lead, meta: { country?: string; receivedAt: Date }) => {
  const topic = intentLabels[lead.intent ?? "demo"] ?? "Демо";
  const subject = `Заявка с сайта: ${topic} — ${lead.company}`;
  const rows: [string, string | undefined][] = [
    ["Тема", topic],
    ["Имя", lead.name],
    ["Почта", lead.email],
    ["Телефон", lead.phone],
    ["Отель или компания", lead.company],
    ["Номерной фонд", lead.rooms],
    ["Роль", lead.role],
    ["Комментарий", lead.message],
    ["Страница", lead.page],
    ["UTM", lead.utm ? Object.entries(lead.utm).map(([k, v]) => `${k}=${v}`).join(", ") : undefined],
    ["Страна по IP", meta.country],
    ["Получено", meta.receivedAt.toISOString()],
  ];
  const text = rows
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
  return { subject, text: `${text}\n\nОтветьте на это письмо, чтобы написать клиенту.` };
};
