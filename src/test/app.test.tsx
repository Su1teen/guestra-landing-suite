import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AppRoutes } from "../App";
import { siteRoutes } from "../routes";
import { LeadForm } from "../components/shared/LeadForm";
import { capabilityGroups } from "../data/capabilities";

const renderAt = (path: string) => render(<MemoryRouter initialEntries={[path]}><AppRoutes /></MemoryRouter>);

describe("routes", () => {
  it.each(siteRoutes.map((r) => r.path))("renders %s with a single h1", (path) => {
    const { container } = renderAt(path);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });

  it("renders the 404 page for unknown paths", () => {
    renderAt("/does-not-exist");
    expect(screen.getByRole("heading", { level: 1, name: "Такой страницы нет" })).toBeInTheDocument();
  });

  it("gives every route its own title and description", () => {
    const titles = new Set(siteRoutes.map((r) => r.title));
    expect(titles.size).toBe(siteRoutes.length);
    siteRoutes.forEach((r) => expect(r.description.length).toBeGreaterThan(60));
  });
});

describe("LeadForm", () => {
  afterEach(() => vi.unstubAllGlobals());

  const fill = () => {
    fireEvent.change(screen.getByPlaceholderText("Как к вам обращаться"), { target: { value: "Тест" } });
    fireEvent.change(screen.getByPlaceholderText("name@hotel.kz"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Название и город"), { target: { value: "Тестовый отель" } });
  };

  it("shows success only after the API confirms", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    render(<MemoryRouter><LeadForm /></MemoryRouter>);
    fill();
    fireEvent.click(screen.getByRole("button", { name: /Отправить заявку/ }));
    await waitFor(() => expect(screen.getByText("Заявка отправлена")).toBeInTheDocument());
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("/api/lead");
    expect(JSON.parse(String(init.body))).toMatchObject({ name: "Тест", email: "test@example.com", company: "Тестовый отель", intent: "demo" });
  });

  it("offers the sales email when sending fails", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("", { status: 502 })));
    render(<MemoryRouter><LeadForm /></MemoryRouter>);
    fill();
    fireEvent.click(screen.getByRole("button", { name: /Отправить заявку/ }));
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("sales@guestra.org");
    expect(alert.querySelector("a")?.getAttribute("href")).toMatch(/^mailto:sales@guestra\.org/);
  });
});

describe("capabilities", () => {
  it("marks future features explicitly and keeps titles unique", () => {
    const items = capabilityGroups.flatMap((g) => g.items);
    expect(new Set(items.map((i) => i.title)).size).toBe(items.length);
    expect(items.filter((i) => i.status === "soon").map((i) => i.title)).toContain("Обмен с 1С");
  });
});
