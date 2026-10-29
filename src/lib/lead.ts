export const SALES_EMAIL = "sales@guestra.org";

export type LeadIntent = "demo" | "integration" | "voice" | "pricing";

export interface LeadPayload {
  name: string;
  email: string;
  phone?: string;
  company: string;
  rooms?: string;
  role?: string;
  message?: string;
  intent: LeadIntent;
  website?: string;
  elapsedMs: number;
}

const readUtm = () => {
  if (typeof window === "undefined") return undefined;
  try {
    const stored = JSON.parse(sessionStorage.getItem("guestra:utm") ?? "{}") as Record<string, string>;
    return Object.keys(stored).length ? stored : undefined;
  } catch {
    return undefined;
  }
};

/** Запоминает UTM-метки первого визита в сессии, чтобы передать их вместе с заявкой. */
export const captureUtm = () => {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  params.forEach((value, key) => {
    if (key.startsWith("utm_")) utm[key] = value;
  });
  if (!Object.keys(utm).length) return;
  try {
    sessionStorage.setItem("guestra:utm", JSON.stringify(utm));
  } catch {
    /* хранилище может быть недоступно */
  }
};

export const submitLead = async (payload: LeadPayload) => {
  const response = await fetch("/api/lead", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...payload, page: window.location.pathname, utm: readUtm() }),
  });
  if (!response.ok) throw new Error(`lead: ${response.status}`);
  const body = (await response.json().catch(() => ({}))) as { ok?: boolean };
  if (!body.ok) throw new Error("lead: rejected");
};

export const mailtoHref = (subject = "Демо Guestra") => `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(subject)}`;
