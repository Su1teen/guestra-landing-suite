import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { CapabilityMap } from "../components/product/CapabilityMap";
import { ModuleLinksSection } from "../components/home/ModuleLinksSection";
import { PMSChessboard } from "../components/product/PMSChessboard";
import { CRMKanban } from "../components/product/CRMKanban";
import { capabilityGroups } from "../data/capabilities";
import { moduleLinks } from "../data/moduleLinks";

describe("progressive product presentation", () => {
  it("keeps every capability, description and future status in the document", () => {
    const { container } = render(<MemoryRouter><CapabilityMap /></MemoryRouter>);
    for (const group of capabilityGroups) {
      for (const item of group.items) {
        expect(container).toHaveTextContent(item.title);
        expect(container).toHaveTextContent(item.note);
        if (item.status) expect(screen.getByText(item.title).parentElement).toHaveTextContent("Скоро");
      }
      expect(container.querySelector(`a[href="${group.href}"]`)).toBeInTheDocument();
    }
    expect(container.querySelectorAll("details")).toHaveLength(capabilityGroups.length);
  });

  it("lets the visitor choose each of the six module connections", () => {
    render(<MemoryRouter><ModuleLinksSection /></MemoryRouter>);
    moduleLinks.slice(0, 6).forEach((link, index) => {
      const button = screen.getByRole("button", { name: `0${index + 1} ${link.title}` });
      fireEvent.click(button);
      expect(button).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByText(link.text)).toBeVisible();
    });
  });
});

describe("visitor-controlled demonstrations", () => {
  it("opens a reservation only on request and closes it with Escape", async () => {
    render(<PMSChessboard />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Анна Иванова, Forest 101" }));
    expect(screen.getByRole("dialog", { name: "Бронь: Анна Иванова" })).toHaveTextContent("Forest 101");
    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("updates the reservation dates when showing a transfer", () => {
    render(<PMSChessboard />);
    fireEvent.click(screen.getByRole("button", { name: "Показать перенос брони" }));
    fireEvent.click(screen.getByRole("button", { name: "Анна Иванова, Forest 101" }));
    expect(screen.getByRole("dialog")).toHaveTextContent("17 окт – 19 окт");
    expect(screen.getByRole("button", { name: "Вернуть даты" })).toHaveAttribute("aria-pressed", "true");
  });

  it("moves the CRM request into confirmed after the visitor shows payment", () => {
    const { container } = render(<CRMKanban />);
    const column = () => [...container.querySelectorAll(".grid-cols-6 > div")].find((el) => within(el as HTMLElement).queryByText("Подтверждено")) as HTMLElement;
    expect(within(column()).queryByText("Анна Иванова")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Показать получение оплаты" }));
    expect(within(column()).getByText("Анна Иванова")).toBeInTheDocument();
    expect(within(column()).getByText("Оплачено")).toBeInTheDocument();
  });
});
