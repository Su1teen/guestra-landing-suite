import { describe, expect, it, vi, afterEach } from "vitest";
import { buildLeadEmail, validateLead } from "./lead";
import { handleLead, type Env } from "./index";

const valid = { name: "Айдана", email: "Aidana@Hotel.kz", company: "Отель у озера", rooms: "20–50", intent: "demo", elapsedMs: 9000 };

const post = (body: unknown) =>
  new Request("https://guestra.org/api/lead", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });

describe("validateLead", () => {
  it("accepts a complete lead and normalises email", () => {
    const result = validateLead(valid);
    expect(result.ok).toBe(true);
    expect((result as { lead: { email: string } }).lead.email).toBe("aidana@hotel.kz");
  });

  it("rejects missing required fields and bad email", () => {
    expect(validateLead({ ...valid, company: "" }).ok).toBe(false);
    expect(validateLead({ ...valid, email: "not-an-email" }).ok).toBe(false);
  });

  it("flags honeypot and too-fast submissions as spam", () => {
    expect(validateLead({ ...valid, website: "http://spam" })).toEqual({ ok: false, error: "spam" });
    expect(validateLead({ ...valid, elapsedMs: 300 })).toEqual({ ok: false, error: "spam" });
  });

  it("keeps only utm_* keys", () => {
    const result = validateLead({ ...valid, utm: { utm_source: "google", evil: "x" } }) as { lead: { utm: Record<string, string> } };
    expect(result.lead.utm).toEqual({ utm_source: "google" });
  });
});

describe("buildLeadEmail", () => {
  it("puts the hotel into the subject and lists filled fields only", () => {
    const { subject, text } = buildLeadEmail({ name: "Айдана", email: "a@b.kz", company: "Отель у озера" }, { receivedAt: new Date("2026-10-29T10:00:00Z") });
    expect(subject).toBe("Заявка с сайта: Демо — Отель у озера");
    expect(text).toContain("Почта: a@b.kz");
    expect(text).not.toContain("Телефон");
  });
});

describe("handleLead", () => {
  afterEach(() => vi.unstubAllGlobals());

  const env = (overrides: Partial<Env> = {}): Env => ({ ASSETS: { fetch: async () => new Response("asset") }, ...overrides });

  it("sends the lead to sales@guestra.org through Resend when a key is configured", async () => {
    const fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const response = await handleLead(post(valid), env({ RESEND_API_KEY: "test" }));
    expect(response.status).toBe(200);
    const [, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    const body = JSON.parse(String(init.body));
    expect(body.to).toEqual(["sales@guestra.org"]);
    expect(body.reply_to).toBe("aidana@hotel.kz");
  });

  it("returns 400 for an invalid lead and 502 when delivery fails", async () => {
    expect((await handleLead(post({ ...valid, email: "x" }), env())).status).toBe(400);
    vi.stubGlobal("fetch", vi.fn(async () => new Response("", { status: 500 })));
    expect((await handleLead(post(valid), env({ RESEND_API_KEY: "test" }))).status).toBe(502);
  });

  it("silently accepts spam without sending", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const response = await handleLead(post({ ...valid, website: "bot" }), env({ RESEND_API_KEY: "test" }));
    expect(await response.json()).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects non-POST requests", async () => {
    expect((await handleLead(new Request("https://guestra.org/api/lead"), env())).status).toBe(405);
  });
});

describe("Email Routing delivery", () => {
  it("builds a MIME message for sales@guestra.org with a base64 UTF-8 subject", async () => {
    const sent: { from: string; to: string; raw: string }[] = [];
    const response = await handleLead(post(valid), {
      ASSETS: { fetch: async () => new Response("asset") },
      SEND_EMAIL: { send: async (message) => { sent.push(message as { from: string; to: string; raw: string }); } },
    });
    expect(response.status).toBe(200);
    expect(sent[0].to).toBe("sales@guestra.org");
    expect(sent[0].raw).toContain("Subject: =?UTF-8?B?");
    expect(sent[0].raw).toContain("Reply-To: aidana@hotel.kz");
  });
});
