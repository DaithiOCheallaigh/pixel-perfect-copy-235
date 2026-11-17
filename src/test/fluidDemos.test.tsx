import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  SpringVsEasing,
  InterruptibleDemo,
  DraggableCard,
  StaggeredGrid,
  ProgressiveResistance,
  LayoutAnimationDemo,
  ReducedMotionDemo,
} from "@/components/blog/FluidUIDemos";

describe("fluid interface demos", () => {
  it("mount with their controls and keep the layout list interactive", () => {
    render(
      <>
        <SpringVsEasing />
        <InterruptibleDemo />
        <DraggableCard />
        <StaggeredGrid />
        <ProgressiveResistance />
        <LayoutAnimationDemo />
        <ReducedMotionDemo />
      </>,
    );
    expect(screen.getByRole("button", { name: "Toggle" })).toBeTruthy();
    expect(screen.getAllByRole("button", { name: "Expand" })).toHaveLength(2);
    expect(screen.getByRole("group", { name: "Boundary behaviour" })).toBeTruthy();
    expect(screen.getAllByRole("button", { name: "Remove" })).toHaveLength(4);
    fireEvent.click(screen.getByRole("button", { name: "+ Insert" }));
    expect(screen.getAllByRole("button", { name: "Remove" })).toHaveLength(5);
    fireEvent.click(screen.getByRole("button", { name: "Teleport" }));
    expect(screen.getByText(/single frame|instant by design/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Reduced" }));
    expect(screen.getByText(/Fades in place/)).toBeTruthy();
  });
});
