"use client";
import { useState, useEffect, useRef } from "react";
import { Zap } from "lucide-react";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [rotationAngle, setRotationAngle] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rotationTimer = setInterval(() => {
      setRotationAngle((prev) => {
        const newAngle = (prev + 0.3) % 360;
        return Number(newAngle.toFixed(3));
      });
    }, 50);

    return () => clearInterval(rotationTimer);
  }, []);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, zIndex, opacity };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full flex items-center justify-center"
      style={{ height: "500px" }}
    >
      <div className="relative" style={{ width: "400px", height: "400px" }}>
        {/* Orbit rings - pink tinted */}
        <div className="absolute inset-0 rounded-full border border-primary/30" />
        <div className="absolute inset-4 rounded-full border border-primary/20" />
        <div className="absolute inset-8 rounded-full border border-primary/10" />

        {/* Center element */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center backdrop-blur-sm">
            <Zap className="w-7 h-7 text-primary" />
          </div>
        </div>

        {/* Nodes */}
        {timelineData.map((item, index) => {
          const position = calculateNodePosition(index, timelineData.length);
          const Icon = item.icon;

          const nodeStyle: React.CSSProperties = {
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
            zIndex: position.zIndex,
            opacity: position.opacity,
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          };

          return (
            <div key={item.id} style={nodeStyle}>
              {/* Node circle */}
              <div className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-border/50 bg-card/80 backdrop-blur-sm">
                <Icon className="w-6 h-6 text-foreground" />
              </div>

              {/* Label */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap">
                <span className="text-xs font-medium text-muted-foreground">
                  {item.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
