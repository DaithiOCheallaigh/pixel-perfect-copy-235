import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown, Instagram } from "lucide-react";

// --- IMAGES ---
const HERO = "https://dcwoodworks.ie/wp-content/uploads/2026/03/1E9A6509_HDR-2-1024x683.webp";
const CERISE = "https://dcwoodworks.ie/wp-content/uploads/2026/03/1E9A6464_HDR-scaled.webp";
const BREAK_1 = "https://dcwoodworks.ie/wp-content/uploads/2025/10/1E9A5737_HDR-1024x683.webp";
const BLACK_OAK = "https://dcwoodworks.ie/wp-content/uploads/2025/10/1E9A5822_HDR-1024x683.webp";
const TRIPTYCH = [
  "https://dcwoodworks.ie/wp-content/uploads/2026/03/1E9A6674_HDR-683x1024.webp",
  "https://dcwoodworks.ie/wp-content/uploads/2025/10/1E9A5907-683x1024.webp",
  "https://dcwoodworks.ie/wp-content/uploads/2025/08/DC_Brian_Queeny0A6621_HDR-683x1024.webp",
];
const TEAL = "https://dcwoodworks.ie/wp-content/uploads/2025/08/DC_Brian_Queeny0A6525_HDR-1024x683.webp";
const BREAK_2 = "https://dcwoodworks.ie/wp-content/uploads/2025/08/DC_Brian_Queeny0A6685-1024x683.webp";
const GRID_PROJECTS = [
  { src: "https://dcwoodworks.ie/wp-content/uploads/2025/08/DC_Avril_Mulligan9A9390_HDR-1024x683.webp", name: "Traditional Elegance" },
  { src: "https://dcwoodworks.ie/wp-content/uploads/2025/08/DC_Kathryn_De0A6354_HDR-1024x683.webp", name: "Timeless Shaker Kitchen" },
  { src: "https://dcwoodworks.ie/wp-content/uploads/2025/08/DC_Michelle_Wallace_4394-1024x683.webp", name: "Contemporary Minimalism" },
  { src: "https://dcwoodworks.ie/wp-content/uploads/2025/07/DC_Kitchen1-1024x674.webp", name: "Modern Charcoal & Marble" },
  { src: "https://dcwoodworks.ie/wp-content/uploads/2026/03/1E9A6559_HDR-1024x683.webp", name: "Cerise — Detail" },
  { src: "https://dcwoodworks.ie/wp-content/uploads/2025/10/1E9A5807_HDR-1024x683.webp", name: "Black & Oak — Island" },
];

// --- COLORS ---
const BG = "#0e0e0e";
const BG_ALT = "#111111";
const WARM_WHITE = "#f5f0eb";
const BRONZE = "#c9a96e";

// --- ANIMATION VARIANTS ---
const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE as unknown as [number, number, number, number] } },
};

const imgReveal = {
  hidden: { opacity: 0, scale: 1.03 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: EASE as unknown as [number, number, number, number] } },
};

// --- BLUR-UP IMAGE ---
const BlurImage = ({
  src, alt, className = "", style = {},
}: { src: string; alt: string; className?: string; style?: React.CSSProperties }) => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "200px" });

  return (
    <motion.div
      ref={ref}
      variants={imgReveal}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
      style={{ overflow: "hidden", ...style }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className="w-full h-full object-cover transition-[filter] duration-700"
        style={{ filter: loaded ? "blur(0)" : "blur(12px)", transform: "scale(1.01)" }}
      />
    </motion.div>
  );
};

// --- SECTION WRAPPER ---
const Section = ({ children, className = "", style = {}, id }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; id?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
      style={style}
    >
      {children}
    </motion.section>
  );
};

// --- FEATURED PROJECT ---
const FeaturedProject = ({
  imageSrc, eyebrow, headline, body, imageLeft = true,
}: { imageSrc: string; eyebrow: string; headline: string; body: string; imageLeft?: boolean }) => (
  <Section className={`flex flex-col ${imageLeft ? "md:flex-row" : "md:flex-row-reverse"} w-full min-h-[70vh]`}>
    <div className={`${imageLeft ? "md:w-[60%]" : "md:w-[40%]"} w-full`}>
      <BlurImage src={imageSrc} alt={headline} className="w-full h-full min-h-[50vh] md:min-h-[70vh]" style={{ display: "block" }} />
    </div>
    <div
      className={`${imageLeft ? "md:w-[40%]" : "md:w-[60%]"} w-full flex items-center`}
      style={{ background: BG_ALT }}
    >
      <div className="px-8 py-16 md:px-16 lg:px-20 max-w-xl">
        <p style={{ color: BRONZE, fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 400, marginBottom: 28 }}>
          {eyebrow}
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 300, color: WARM_WHITE, lineHeight: 1.15, marginBottom: 28 }}>
          {headline}
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 300, color: WARM_WHITE, opacity: 0.8, lineHeight: 1.9, marginBottom: 32 }}>
          {body}
        </p>
        <a
          href="#contact"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 400, color: BRONZE, textDecoration: "none", letterSpacing: "0.05em" }}
          className="hover:opacity-75 transition-opacity"
        >
          View Full Project →
        </a>
      </div>
    </div>
  </Section>
);

// --- MAIN COMPONENT ---
const DCWoodworksShowcase = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=DM+Sans:wght@300;400&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  return (
    <div style={{ background: BG, color: WARM_WHITE, cursor: "default" }} className="dc-showcase">
      <style>{`
        .dc-showcase img { cursor: crosshair; }
        .dc-showcase *::selection { background: ${BRONZE}44; color: ${WARM_WHITE}; }
        @media (min-width: 768px) {
          .dc-parallax { background-attachment: fixed; }
        }
      `}</style>

      {/* ===== 1. HERO ===== */}
      <section className="relative w-full h-screen overflow-hidden">
        <BlurImage src={HERO} alt="DC Woodworks bespoke kitchen" className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.45) 100%)" }} />

        {/* Floating nav */}
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center px-6 md:px-12 py-8">
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", color: WARM_WHITE }}>
            DC Woodworks
          </span>
          <a href="#contact" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 400, letterSpacing: "0.1em", color: WARM_WHITE, textDecoration: "none" }} className="hover:opacity-70 transition-opacity">
            Contact
          </a>
        </div>

        {/* Hero text */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-28 px-6 z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 300, letterSpacing: "0.05em", lineHeight: 1.1, color: WARM_WHITE, maxWidth: 800 }}
          >
            Bespoke Kitchens, Crafted in Ireland
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 300, color: WARM_WHITE, opacity: 0.85, marginTop: "1em" }}
          >
            DC Woodworks — Meath & Dublin
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-8"
          >
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
              <ChevronDown size={24} strokeWidth={1} color={WARM_WHITE} style={{ opacity: 0.6 }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== 2. BRAND STATEMENT ===== */}
      <Section className="flex items-center justify-center px-6 py-28 md:py-40" style={{ background: BG_ALT }}>
        <div className="max-w-[700px] text-center">
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: BRONZE, marginBottom: 32 }}>
            About DC Woodworks
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 300, color: WARM_WHITE, lineHeight: 1.2, marginBottom: 28 }}>
            Every kitchen is a portrait of the people who live in it.
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 300, color: WARM_WHITE, opacity: 0.8, lineHeight: 1.9 }}>
            DC Woodworks are Ireland's premier bespoke kitchen makers. Based in Baconstown, Co. Meath, we design and hand-craft every kitchen from scratch — working closely with each client to understand how they live, what they love, and what a kitchen means to their home.
          </p>
        </div>
      </Section>

      {/* ===== 3. CERISE KITCHEN ===== */}
      <FeaturedProject
        imageSrc={CERISE}
        eyebrow="Featured Project — 2026"
        headline="The Cerise Kitchen"
        body="A show-stopping bespoke kitchen built around a fearless use of colour. Rich cerise cabinetry in a traditional shaker frame, aged brass hardware, Calacatta quartz worktops, and a contrasting oxblood island — all beneath a skylight that floods the space with light."
        imageLeft
      />

      {/* ===== 4. FULL-SCREEN BREAK ===== */}
      <section className="w-full relative" style={{ height: "80vh" }}>
        <div
          className="dc-parallax w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${BREAK_1})` }}
        />
      </section>

      {/* ===== 5. BLACK & OAK ===== */}
      <FeaturedProject
        imageSrc={BLACK_OAK}
        eyebrow="Featured Project — 2025"
        headline="Timeless Sophistication in Black & Oak"
        body="Bold black cabinetry with bespoke raised panel moulding, contrasted by limed oak accents and a marble backsplash. A kitchen that commands attention while remaining deeply liveable — a balance only achieved through exceptional craftsmanship."
        imageLeft={false}
      />

      {/* ===== 6. THREE-UP ROW ===== */}
      <Section className="flex flex-col md:flex-row w-full">
        {TRIPTYCH.map((src, i) => (
          <div key={i} className="w-full md:w-1/3" style={{ aspectRatio: "3/4" }}>
            <BlurImage src={src} alt={`DC Woodworks detail ${i + 1}`} className="w-full h-full" />
          </div>
        ))}
      </Section>

      {/* ===== 7. DEEP TEAL ===== */}
      <FeaturedProject
        imageSrc={TEAL}
        eyebrow="Featured Project — 2025"
        headline="Deep Teal Elegance"
        body="Deep teal hand-painted shaker cabinetry, gleaming brass fittings, and a marble-effect quartz island. A velvet-upholstered peninsula adds a layer of warmth — this is a kitchen designed for living and entertaining in equal measure."
        imageLeft
      />

      {/* ===== 8. FULL-SCREEN BREAK 2 ===== */}
      <section className="w-full relative" style={{ height: "80vh" }}>
        <div
          className="dc-parallax w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${BREAK_2})` }}
        />
      </section>

      {/* ===== 9. MORE WORK GRID ===== */}
      <Section className="px-6 md:px-12 py-28 md:py-40" style={{ background: BG_ALT }}>
        <h2 className="text-center mb-16" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 300, color: WARM_WHITE }}>
          More Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 max-w-[1400px] mx-auto">
          {GRID_PROJECTS.map((p, i) => (
            <div key={i} className="relative group overflow-hidden cursor-crosshair" style={{ aspectRatio: "3/2" }}>
              <img
                src={p.src}
                alt={p.name}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-500 group-hover:opacity-75 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, fontStyle: "italic", color: WARM_WHITE, letterSpacing: "0.02em" }}>
                  {p.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== 10. CONTACT CTA ===== */}
      <Section id="contact" className="flex flex-col items-center justify-center text-center px-6" style={{ background: BG, paddingTop: 120, paddingBottom: 120 }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 300, color: WARM_WHITE, lineHeight: 1.15, maxWidth: 700, marginBottom: 20 }}>
          Your kitchen. Your vision. Our craft.
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 300, color: WARM_WHITE, opacity: 0.75, marginBottom: 48 }}>
          Based in Co. Meath — serving Dublin and across Ireland.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="mailto:info@dcwoodworks.ie?subject=Consultation%20Request"
            className="group/cta relative inline-block transition-all duration-300"
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase",
              color: WARM_WHITE, border: `1px solid ${WARM_WHITE}`, padding: "14px 32px", textDecoration: "none",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = BRONZE; e.currentTarget.style.borderColor = BRONZE; e.currentTarget.style.color = BG; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = WARM_WHITE; e.currentTarget.style.color = WARM_WHITE; }}
          >
            Schedule a Consultation
          </a>
          <a
            href="tel:+353469500127"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: WARM_WHITE, textDecoration: "none", padding: "14px 16px" }}
            className="hover:opacity-70 transition-opacity"
          >
            Call us: (046) 950 0127
          </a>
        </div>
      </Section>

      {/* ===== 11. FOOTER ===== */}
      <footer className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-8" style={{ background: BG, borderTop: `1px solid ${WARM_WHITE}11` }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 300, color: WARM_WHITE, opacity: 0.5 }}>
          © 2026 DC Woodworks
        </span>
        <span className="mt-2 md:mt-0" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 300, color: WARM_WHITE, opacity: 0.5 }}>
          Baconstown, Enfield, Co. Meath · info@dcwoodworks.ie
        </span>
        <a href="https://www.instagram.com/dcwoodworks_/" target="_blank" rel="noopener noreferrer" className="mt-2 md:mt-0 hover:opacity-70 transition-opacity" style={{ color: WARM_WHITE, opacity: 0.5 }}>
          <Instagram size={18} strokeWidth={1.5} />
        </a>
      </footer>
    </div>
  );
};

export default DCWoodworksShowcase;
