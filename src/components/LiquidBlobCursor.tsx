import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function LiquidBlobCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, { stiffness: 180, damping: 22, mass: 0.6 });
  const y = useSpring(mouseY, { stiffness: 180, damping: 22, mass: 0.6 });

  const fx1 = useSpring(x, { stiffness: 120, damping: 20, mass: 0.8 });
  const fy1 = useSpring(y, { stiffness: 120, damping: 20, mass: 0.8 });

  const fx2 = useSpring(fx1, { stiffness: 90, damping: 18, mass: 1.0 });
  const fy2 = useSpring(fy1, { stiffness: 90, damping: 18, mass: 1.0 });

  const fx3 = useSpring(fx2, { stiffness: 65, damping: 16, mass: 1.2 });
  const fy3 = useSpring(fy2, { stiffness: 65, damping: 16, mass: 1.2 });

  const fx4 = useSpring(fx3, { stiffness: 45, damping: 14, mass: 1.4 });
  const fy4 = useSpring(fy3, { stiffness: 45, damping: 14, mass: 1.4 });

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
