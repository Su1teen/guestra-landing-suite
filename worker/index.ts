/**
 * Cloudflare Worker сайта guestra.org.
 * Статику отдаёт binding ASSETS, Worker обрабатывает только /api/* (см. run_worker_first в wrangler.toml).
 *
 * POST /api/lead — заявка с сайта. Письмо уходит на LEAD_TO (по умолчанию sales@guestra.org):
 *  - если задан секрет RESEND_API_KEY — через Resend API;
 *  - иначе через binding SEND_EMAIL (Cloudflare Email Routing).
 */
import { buildLeadEmail, LEAD_TO_DEFAULT, validateLead, type Lead } from "./lead";

interface SendEmailBinding {
  send(message: unknown): Promise<void>;
}

export interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  SEND_EMAIL?: SendEmailBinding;
  RESEND_API_KEY?: string;
  LEAD_TO?: string;
  LEAD_FROM?: string;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

const toBase64 = (text: string) => {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
};

const encodeHeader = (value: string) => `=?UTF-8?B?${toBase64(value)}?=`;

const sendViaResend = async (env: Env, from: string, to: string, subject: string, text: string, replyTo?: string) => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({ from: `Guestra <${from}>`, to: [to], subject, text, reply_to: replyTo }),
  });
  if (!response.ok) throw new Error(`Resend responded ${response.status}`);
};

const sendViaEmailRouting = async (env: Env, from: string, to: string, subject: string, text: string, replyTo?: string) => {
  if (!env.SEND_EMAIL) throw new Error("SEND_EMAIL binding is not configured");
  const { EmailMessage } = await import("cloudflare:email");
  const raw = [
    `From: Guestra <${from}>`,
    `To: ${to}`,
    replyTo ? `Reply-To: ${replyTo}` : null,
    `Subject: ${encodeHeader(subject)}`,
    `Message-ID: <${crypto.randomUUID()}@guestra.org>`,
    `Date: ${new Date().toUTCString()}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    toBase64(text).replace(/.{1,76}/g, "$&\r\n"),
  ]
    .filter((line) => line !== null)
    .join("\r\n");
  await env.SEND_EMAIL.send(new EmailMessage(from, to, raw));
};

export const handleLead = async (request: Request, env: Env) => {
  if (request.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405);
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 16_000) return json({ ok: false, error: "too_large" }, 413);

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  const result = validateLead(payload);
  if (result.ok === false) {
    const { error } = result as { error: "invalid" | "spam" };
    // На спам отвечаем «успехом», чтобы бот не подбирал обход.
    return error === "spam" ? json({ ok: true }) : json({ ok: false, error }, 400);
  }

  const to = env.LEAD_TO || LEAD_TO_DEFAULT;
  const from = env.LEAD_FROM || "noreply@guestra.org";
  const { lead } = result as { lead: Lead };
  const { subject, text } = buildLeadEmail(lead, {
    country: request.headers.get("cf-ipcountry") ?? undefined,
    receivedAt: new Date(),
  });

  try {
    if (env.RESEND_API_KEY) await sendViaResend(env, from, to, subject, text, lead.email);
    else await sendViaEmailRouting(env, from, to, subject, text, lead.email);
  } catch (error) {
    console.error("lead delivery failed", error);
    return json({ ok: false, error: "delivery_failed" }, 502);
  }
  return json({ ok: true });
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/lead") return handleLead(request, env);
    if (url.pathname.startsWith("/api/")) return json({ ok: false, error: "not_found" }, 404);
    return env.ASSETS.fetch(request);
  },
};
