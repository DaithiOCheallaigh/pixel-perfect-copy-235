import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MotionGlobalConfig } from "framer-motion";
import {
  SpringVsEasing,
  InterruptibleDemo,
  DraggableCard,
  LayoutAnimationDemo,
  ProgressiveResistance,
  StaggeredGrid,
  ReducedMotionDemo,
} from "@/components/blog/FluidUIDemos";

MotionGlobalConfig.skipAnimations = true;
afterEach(cleanup);

describe("Fluid-interfaces demos", () => {
  it("renders every demo with its footer controls", () => {
    render(
      <>
        <SpringVsEasing />
        <InterruptibleDemo />
        <DraggableCard />
        <LayoutAnimationDemo />
        <ProgressiveResistance />
        <StaggeredGrid />
        <ReducedMotionDemo />
      </>,
    );
    expect(screen.getByRole("button", { name: "Show bar" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Toggle both" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Bring it back" })).toBeTruthy();
    expect(screen.getByRole("radiogroup", { name: "Boundary behaviour" })).toBeTruthy();
    expect(screen.getAllByRole("button", { name: "Replay" })).toHaveLength(2);
    expect(screen.getByRole("switch", { name: "Stagger" })).toBeTruthy();
    expect(screen.getByRole("switch", { name: "Reduced motion" })).toBeTruthy();
  });

  it("shows and hides the audio bar", () => {
    render(<SpringVsEasing />);
    fireEvent.click(screen.getByRole("button", { name: "Show bar" }));
    expect(screen.getByRole("button", { name: "Hide bar" })).toBeTruthy();
  });

  it("opens both accordion rows from the footer button", () => {
    render(<InterruptibleDemo />);
    const rows = () => screen.getAllByRole("button", { name: /What makes an interface feel fluid/ });
    expect(rows()).toHaveLength(2);
    expect(rows().map((b) => b.getAttribute("aria-expanded"))).toEqual(["false", "false"]);
    fireEvent.click(screen.getByRole("button", { name: "Toggle both" }));
    expect(rows().map((b) => b.getAttribute("aria-expanded"))).toEqual(["true", "true"]);
  });

  it("keeps Bring it back disabled while the card is on the stage", () => {
    render(<DraggableCard />);
    expect(screen.getByRole("button", { name: "Bring it back" }).hasAttribute("disabled")).toBe(true);
  });

  it("removes, re-adds and resets blog rows", async () => {
    render(<LayoutAnimationDemo />);
    const removeButtons = () => screen.getAllByRole("button", { name: /^Remove / });
    expect(removeButtons()).toHaveLength(4);
    expect(screen.getByRole("switch", { name: "Animate layout" }).getAttribute("aria-checked")).toBe("true");
    fireEvent.click(removeButtons()[0]);
    await waitFor(() => expect(removeButtons()).toHaveLength(3), { timeout: 2000 });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    expect(removeButtons()).toHaveLength(4);
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(removeButtons()).toHaveLength(4);
  });

  it("switches the boundary behaviour", () => {
    render(<ProgressiveResistance />);
    const group = screen.getByRole("radiogroup", { name: "Boundary behaviour" });
    expect(within(group).getByRole("radio", { name: "Rubber band" }).getAttribute("aria-checked")).toBe("true");
    fireEvent.click(within(group).getByRole("radio", { name: "Hard stop" }));
    expect(within(group).getByRole("radio", { name: "Hard stop" }).getAttribute("aria-checked")).toBe("true");
  });

  it("toggles reduced motion and replays", () => {
    render(<ReducedMotionDemo />);
    const toggle = screen.getByRole("switch", { name: "Reduced motion" });
    const before = toggle.getAttribute("aria-checked");
    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-checked")).not.toBe(before);
    fireEvent.click(screen.getByRole("button", { name: "Replay" }));
    expect(screen.getByText("8 Principles for Crafting Fluid Interfaces")).toBeTruthy();
  });
});
