import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function LiquidBlobCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, { stiffness: 650, damping: 45, mass: 0.9 });
  const y = useSpring(mouseY, { stiffness: 650, damping: 45, mass: 0.9 });

  const fx1 = useSpring(x, { stiffness: 420, damping: 34, mass: 1.0 });
  const fy1 = useSpring(y, { stiffness: 420, damping: 34, mass: 1.0 });

  const fx2 = useSpring(fx1, { stiffness: 380, damping: 38, mass: 1.25 });
  const fy2 = useSpring(fy1, { stiffness: 380, damping: 38, mass: 1.25 });

  const fx3 = useSpring(fx2, { stiffness: 340, damping: 42, mass: 1.5 });
  const fy3 = useSpring(fy2, { stiffness: 340, damping: 42, mass: 1.5 });

  const fx4 = useSpring(fx3, { stiffness: 300, damping: 46, mass: 1.75 });
  const fy4 = useSpring(fy3, { stiffness: 300, damping: 46, mass: 1.75 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  const followers = [
    { fx: fx1, fy: fy1, size: 46 },
    { fx: fx2, fy: fy2, size: 39 },
    { fx: fx3, fy: fy3, size: 32 },
    { fx: fx4, fy: fy4, size: 25 },
  ];

  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9999,
          filter: "url(#goo)",
          mixBlendMode: "difference",
        }}
      >
        {/* Main blob */}
        <motion.div
          style={{
            position: "absolute",
            left: x,
            top: y,
            width: 55,
            height: 55,
            borderRadius: "50%",
            backgroundColor: "white",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Follower blobs */}
        {followers.map((f, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              left: f.fx,
              top: f.fy,
              width: f.size,
              height: f.size,
              borderRadius: "50%",
              backgroundColor: "white",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>
    </>
  );
}
