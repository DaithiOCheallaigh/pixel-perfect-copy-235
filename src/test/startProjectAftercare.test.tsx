import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StartProject from "@/pages/StartProject";
import { SELECTION_STORAGE_KEY, selectionItems, selectionTotals } from "@/data/serviceEstimates";

vi.mock("@/components/SEO", () => ({ SEO: () => null }));
vi.mock("@/lib/submitLead", () => ({ submitLead: vi.fn() }));

const open = (ids: unknown[] = []) => {
  sessionStorage.setItem(SELECTION_STORAGE_KEY, JSON.stringify(ids));
  render(<MemoryRouter><StartProject /></MemoryRouter>);
};
const saved = (): string[] => JSON.parse(sessionStorage.getItem(SELECTION_STORAGE_KEY) ?? "[]");
const growth = () => screen.getByRole("button", { name: "Growth · €200/mo" });

beforeEach(() => sessionStorage.clear());
afterEach(cleanup);

describe("enquiry aftercare choices", () => {
  it("adds Growth to Launch and prices setup and monthly separately", () => {
    open(["launch"]);
    fireEvent.click(growth());
    expect(saved()).toEqual(["launch", "growth"]);
    expect(selectionTotals(selectionItems(saved().map((id) => ({ id }))))).toEqual({ oneOff: 750, monthly: 200 });
  });

  it("replaces existing aftercare while keeping the website", () => {
    open(["business-8", "self-managed"]);
    fireEvent.click(growth());
    expect(saved()).toEqual(["business-8", "growth"]);
    fireEvent.click(screen.getByRole("button", { name: "Care · €65/mo" }));
    expect(saved()).toEqual(["business-8", "care"]);
  });

  it("clears an active option without removing the website", () => {
    open(["launch", "growth"]);
    fireEvent.click(growth());
    expect(saved()).toEqual(["launch"]);
  });

  it("allows aftercare without a website and restores it after remount", () => {
    open();
    fireEvent.click(growth());
    expect(saved()).toEqual(["growth"]);
    cleanup();
    render(<MemoryRouter><StartProject /></MemoryRouter>);
    expect(growth()).toHaveAttribute("aria-pressed", "true");
    expect(selectionTotals(selectionItems(saved().map((id) => ({ id }))))).toEqual({ oneOff: 0, monthly: 200 });
  });

  it("reads only string IDs from storage", () => {
    open(["launch", 123, null, { id: "care" }]);
    expect(saved()).toEqual(["launch"]);
  });
});