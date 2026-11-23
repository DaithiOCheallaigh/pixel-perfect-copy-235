import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ServicesNavigation from "@/components/ServicesNavigation";

afterEach(cleanup);

describe("header blog links", () => {
  it("portfolio Navigation has no /blog link", () => {
    const { container } = render(<MemoryRouter><Navigation visible /></MemoryRouter>);
    expect(container.querySelector('a[href="/blog"]')).toBeNull();
  });
  it("ServicesNavigation links to /blog", () => {
    render(<MemoryRouter><ServicesNavigation visible /></MemoryRouter>);
    const links = screen.getAllByRole("link", { name: "Blog" });
    expect(links.length).toBeGreaterThan(0);
    links.forEach((l) => expect(l.getAttribute("href")).toBe("/blog"));
  });
});
