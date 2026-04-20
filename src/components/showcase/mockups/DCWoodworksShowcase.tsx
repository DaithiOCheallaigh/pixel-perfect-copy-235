import { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, Instagram, X } from "lucide-react";
import dcLogo from "@/assets/images/showcase/dc-woodworks-logo.png";

// Hide external WhatsApp widget on this page
const useHideWhatsApp = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `#whatsapp-widget-iframe, [id*="whatsapp"], .wa-chat-box, [class*="whatsapp"] { display: none !important; }`;
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, []);
};


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

// --- PAGE-SCOPED RUSTIC TOKENS ---
const BG = "#F4EDE2";          // cream
const BG_ALT = "#EAE1D2";      // oatmeal
const INK = "#2B2520";         // warm charcoal
const WALNUT = "#5C3A21";      // primary wood tone
const SIENNA = "#A64B2A";      // single accent
const SAGE = "#B7BFA8";        // muted sage (supporting)

// Display + body fonts
const SERIF = "'Fraunces', 'Cormorant Garamond', Georgia, serif";
const BODY = "'Lora', Georgia, serif";

// Subtle paper-noise SVG (inline, no extra request)
const NOISE_SVG = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.17  0 0 0 0 0.14  0 0 0 0 0.12  0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>")`;

// Unified warm photo treatment
const PHOTO_FILTER = "sepia(0.10) saturate(0.92) hue-rotate(-5deg)";

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

// --- REVEAL IMAGE (warm filter applied) ---
const RevealImage = ({
  src, alt, className = "", style = {},
}: { src: string; alt: string; className?: string; style?: React.CSSProperties }) => {
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
        className="w-full h-full object-cover"
        style={{ filter: PHOTO_FILTER }}
      />
    </motion.div>
  );
};

// --- ORNAMENTED DIVIDER ---
const Divider = () => (
  <div className="flex items-center justify-center w-full max-w-[420px] mx-auto" aria-hidden>
    <span className="flex-1 h-px" style={{ background: `${INK}33` }} />
    <span style={{ fontFamily: SERIF, color: WALNUT, fontSize: 18, padding: "0 16px", letterSpacing: "0.1em" }}>❦</span>
    <span className="flex-1 h-px" style={{ background: `${INK}33` }} />
  </div>
);

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
      <RevealImage src={imageSrc} alt={headline} className="w-full h-full min-h-[50vh] md:min-h-[70vh]" style={{ display: "block" }} />
    </div>
    <div
      className={`${imageLeft ? "md:w-[40%]" : "md:w-[60%]"} w-full flex items-center`}
      style={{ background: BG_ALT }}
    >
      <div className="px-8 py-16 md:px-16 lg:px-20 max-w-xl">
        <p style={{ color: WALNUT, fontFamily: BODY, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", fontVariantCaps: "all-small-caps", fontWeight: 500, marginBottom: 28 }}>
          {eyebrow}
        </p>
        <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px, 4vw, 46px)", fontWeight: 400, color: INK, lineHeight: 1.15, marginBottom: 28, fontFeatureSettings: "'liga', 'dlig', 'ss01'", letterSpacing: "-0.01em" }}>
          {headline}
        </h2>
        <p style={{ fontFamily: BODY, fontSize: 17, fontWeight: 400, color: INK, opacity: 0.85, lineHeight: 1.8, marginBottom: 32 }}>
          {body}
        </p>
        <a
          href="#contact"
          style={{ fontFamily: BODY, fontSize: 14, fontWeight: 500, color: SIENNA, textDecoration: "none", letterSpacing: "0.04em", borderBottom: `1px solid ${SIENNA}66`, paddingBottom: 2 }}
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
  useHideWhatsApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Lora:wght@400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  return (
    <div style={{ background: BG, color: INK, cursor: "default", position: "relative" }} className="dc-showcase">
      {/* Page-scoped paper noise overlay */}
      <div
        aria-hidden
        style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1,
          backgroundImage: NOISE_SVG, backgroundRepeat: "repeat", opacity: 0.07, mixBlendMode: "multiply",
        }}
      />
      <style>{`
        .dc-showcase img { cursor: crosshair; }
        .dc-showcase *::selection { background: ${SIENNA}33; color: ${INK}; }
      `}</style>

      {/* ===== SLIDE-OUT MENU ===== */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50"
              style={{ background: "rgba(43,37,32,0.45)" }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 z-50 h-full w-[320px] flex flex-col justify-between"
              style={{ background: BG_ALT, borderLeft: `1px solid ${INK}22` }}
            >
              <div>
                <div className="flex justify-end p-8">
                  <button onClick={() => setMenuOpen(false)} className="hover:opacity-70 transition-opacity" style={{ color: INK }}>
                    <X size={24} strokeWidth={1} />
                  </button>
                </div>
                <nav className="flex flex-col gap-8 px-12 pt-8">
                  {[
                    { label: "Our Work", href: "#work" },
                    { label: "About", href: "#about" },
                    { label: "Contact", href: "#contact" },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 400, color: INK, textDecoration: "none", letterSpacing: "-0.01em" }}
                      className="hover:opacity-70 transition-opacity"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="px-12 pb-12">
                <p style={{ fontFamily: BODY, fontSize: 12, color: INK, opacity: 0.55 }}>
                  Baconstown, Enfield, Co. Meath
                </p>
                <a href="tel:+353469500127" style={{ fontFamily: BODY, fontSize: 12, color: SIENNA, textDecoration: "none", marginTop: 4, display: "block" }}>
                  (046) 950 0127
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ===== FIXED SCROLL HEADER ===== */}
      <motion.div
        initial={false}
        animate={{ y: scrolled ? 0 : -80, opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-6 md:px-12 py-4"
        style={{ background: `linear-gradient(to bottom, ${BG}f5, ${BG}cc 60%, transparent)` }}
      >
        <img src={dcLogo} alt="DC Woodworks" className="h-8 md:h-10 w-auto" style={{ filter: "brightness(0) saturate(100%) invert(20%) sepia(30%) saturate(900%) hue-rotate(355deg)" }} />
        <button
          onClick={() => setMenuOpen(true)}
          className="flex flex-col gap-[5px] p-2 hover:opacity-70 transition-opacity"
          aria-label="Open menu"
        >
          <span className="block w-6 h-[1.5px]" style={{ background: INK }} />
          <span className="block w-6 h-[1.5px]" style={{ background: INK }} />
          <span className="block w-6 h-[1.5px]" style={{ background: INK }} />
        </button>
      </motion.div>

      <section className="relative w-full h-screen overflow-hidden">
        <RevealImage src={HERO} alt="DC Woodworks bespoke kitchen" className="absolute inset-0 w-full h-full" />
        {/* Faint wood-grain overlay behind hero only */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><filter id='g'><feTurbulence type='turbulence' baseFrequency='0.012 0.55' numOctaves='2' seed='4'/><feColorMatrix values='0 0 0 0 0.36  0 0 0 0 0.23  0 0 0 0 0.13  0 0 0 0.7 0'/></filter><rect width='100%25' height='100%25' filter='url(%23g)'/></svg>")`,
            backgroundSize: "cover", opacity: 0.10, mixBlendMode: "multiply",
          }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(43,37,32,0.18)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(43,37,32,0.50) 100%)" }} />

        {/* Hero logo — above headline */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none" style={{ paddingBottom: "18vh" }}>
          <motion.img
            src={dcLogo}
            alt="DC Woodworks"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-[160px] md:w-[220px] lg:w-[260px] h-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>

        {/* Hero hamburger (top-right, no header bar) */}
        <div className="absolute top-0 right-0 z-20 px-6 md:px-12 py-6">
          <button
            onClick={() => setMenuOpen(true)}
            className="flex flex-col gap-[5px] p-2 hover:opacity-70 transition-opacity"
            aria-label="Open menu"
          >
            <span className="block w-6 h-[1.5px]" style={{ background: BG }} />
            <span className="block w-6 h-[1.5px]" style={{ background: BG }} />
            <span className="block w-6 h-[1.5px]" style={{ background: BG }} />
          </button>
        </div>

        {/* Hero text */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-28 px-6 z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: SERIF, fontSize: "clamp(40px, 6.5vw, 78px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.05, color: BG, maxWidth: 880, fontFeatureSettings: "'liga', 'dlig', 'ss01'" }}
          >
            Bespoke Kitchens, <em style={{ fontStyle: "italic", fontWeight: 300 }}>Crafted</em> in Ireland
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: BODY, fontSize: 16, fontWeight: 400, color: BG, opacity: 0.9, marginTop: "1em", fontStyle: "italic" }}
          >
            Meath & Dublin
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-8"
          >
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
              <ChevronDown size={24} strokeWidth={1} color={BG} style={{ opacity: 0.7 }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== 2. BRAND STATEMENT ===== */}
      <Section className="flex flex-col items-center justify-center px-6 py-28 md:py-40" style={{ background: BG_ALT }}>
        <div className="max-w-[720px] text-center">
          <p style={{ fontFamily: BODY, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", fontVariantCaps: "all-small-caps", color: WALNUT, marginBottom: 28, fontWeight: 600 }}>
            I. About DC Woodworks
          </p>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(34px, 5vw, 52px)", fontWeight: 400, color: INK, lineHeight: 1.15, marginBottom: 32, fontFeatureSettings: "'liga', 'dlig', 'ss01'", letterSpacing: "-0.015em" }}>
            Every kitchen is a <em style={{ fontStyle: "italic", color: WALNUT }}>portrait</em> of the people who live in it.
          </h2>
          <Divider />
          <p style={{ fontFamily: BODY, fontSize: 17, fontWeight: 400, color: INK, opacity: 0.85, lineHeight: 1.85, marginTop: 32 }}>
            DC Woodworks are Ireland's premier bespoke kitchen makers. Based in Baconstown, Co. Meath, we design and hand-craft every kitchen from scratch — working closely with each client to understand how they live, what they love, and what a kitchen means to their home.
          </p>
        </div>
      </Section>

      {/* ===== 3. CERISE KITCHEN ===== */}
      <FeaturedProject
        imageSrc={CERISE}
        eyebrow="II. Featured Project — MMXXVI"
        headline="The Cerise Kitchen"
        body="A show-stopping bespoke kitchen built around a fearless use of colour. Rich cerise cabinetry in a traditional shaker frame, aged brass hardware, Calacatta quartz worktops, and a contrasting oxblood island — all beneath a skylight that floods the space with light."
        imageLeft
      />

      {/* ===== 4. FULL-SCREEN BREAK ===== */}
      <section className="w-full relative" style={{ height: "80vh" }}>
        <RevealImage src={BREAK_1} alt="DC Woodworks kitchen detail" className="w-full h-full" />
      </section>

      {/* ===== 5. BLACK & OAK ===== */}
      <FeaturedProject
        imageSrc={BLACK_OAK}
        eyebrow="III. Featured Project — MMXXV"
        headline="Timeless Sophistication in Black & Oak"
        body="Bold black cabinetry with bespoke raised panel moulding, contrasted by limed oak accents and a marble backsplash. A kitchen that commands attention while remaining deeply liveable — a balance only achieved through exceptional craftsmanship."
        imageLeft={false}
      />

      {/* ===== 6. THREE-UP ROW ===== */}
      <Section className="flex flex-col md:flex-row w-full">
        {TRIPTYCH.map((src, i) => (
          <div key={i} className="w-full md:w-1/3" style={{ aspectRatio: "3/4" }}>
            <RevealImage src={src} alt={`DC Woodworks detail ${i + 1}`} className="w-full h-full" />
          </div>
        ))}
      </Section>

      {/* ===== 7. DEEP TEAL ===== */}
      <FeaturedProject
        imageSrc={TEAL}
        eyebrow="IV. Featured Project — MMXXV"
        headline="Deep Teal Elegance"
        body="Deep teal hand-painted shaker cabinetry, gleaming brass fittings, and a marble-effect quartz island. A velvet-upholstered peninsula adds a layer of warmth — this is a kitchen designed for living and entertaining in equal measure."
        imageLeft
      />


      {/* ===== 9. MORE WORK GRID ===== */}
      <Section className="px-6 md:px-12 py-28 md:py-40" style={{ background: BG_ALT }}>
        <p className="text-center" style={{ fontFamily: BODY, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", fontVariantCaps: "all-small-caps", color: WALNUT, marginBottom: 16, fontWeight: 600 }}>
          V. Portfolio
        </p>
        <h2 className="text-center mb-10" style={{ fontFamily: SERIF, fontSize: "clamp(30px, 4vw, 40px)", fontWeight: 400, color: INK, letterSpacing: "-0.015em" }}>
          More Work
        </h2>
        <div className="mb-16"><Divider /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 max-w-[1400px] mx-auto">
          {GRID_PROJECTS.map((p, i) => (
            <div key={i} className="relative group overflow-hidden cursor-crosshair" style={{ aspectRatio: "3/2" }}>
              <img
                src={p.src}
                alt={p.name}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-500 group-hover:opacity-75 group-hover:scale-[1.02]"
                style={{ filter: PHOTO_FILTER }}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "rgba(43,37,32,0.35)" }}>
                <span style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 400, fontStyle: "italic", color: BG, letterSpacing: "-0.01em" }}>
                  {p.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== 10. CONTACT CTA ===== */}
      <Section id="contact" className="flex flex-col items-center justify-center text-center px-6" style={{ background: BG, paddingTop: 120, paddingBottom: 120 }}>
        <p style={{ fontFamily: BODY, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", fontVariantCaps: "all-small-caps", color: WALNUT, marginBottom: 24, fontWeight: 600 }}>
          VI. Begin
        </p>
        <h2 style={{ fontFamily: SERIF, fontSize: "clamp(38px, 5.5vw, 60px)", fontWeight: 400, color: INK, lineHeight: 1.1, maxWidth: 760, marginBottom: 20, letterSpacing: "-0.02em", fontFeatureSettings: "'liga', 'dlig', 'ss01'" }}>
          Your kitchen. Your vision. <em style={{ fontStyle: "italic", color: WALNUT }}>Our craft.</em>
        </h2>
        <p style={{ fontFamily: BODY, fontSize: 17, fontWeight: 400, color: INK, opacity: 0.8, marginBottom: 48, fontStyle: "italic" }}>
          Based in Co. Meath — serving Dublin and across Ireland.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Primary: solid walnut */}
          <a
            href="mailto:info@dcwoodworks.ie?subject=Consultation%20Request"
            className="transition-all duration-300"
            style={{
              fontFamily: BODY, fontSize: 13, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase",
              color: BG, background: WALNUT, border: `1px solid ${WALNUT}`, padding: "16px 36px", textDecoration: "none",
              borderRadius: 2,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = SIENNA; e.currentTarget.style.borderColor = SIENNA; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = WALNUT; e.currentTarget.style.borderColor = WALNUT; }}
          >
            Schedule a Consultation
          </a>
          {/* Secondary: cream + ink border */}
          <a
            href="tel:+353469500127"
            style={{
              fontFamily: BODY, fontSize: 13, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase",
              color: INK, background: BG, border: `1px solid ${INK}`, padding: "16px 28px", textDecoration: "none",
              borderRadius: 2,
            }}
            className="hover:opacity-80 transition-opacity"
          >
            Call us: (046) 950 0127
          </a>
        </div>
      </Section>

      {/* ===== 11. FOOTER ===== */}
      <footer className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-8" style={{ background: BG_ALT, borderTop: `1px solid ${INK}22` }}>
        <span style={{ fontFamily: BODY, fontSize: 12, fontWeight: 400, color: INK, opacity: 0.65 }}>
          © MMXXVI · DC Woodworks
        </span>
        <span className="mt-2 md:mt-0" style={{ fontFamily: BODY, fontSize: 12, fontWeight: 400, color: INK, opacity: 0.65, fontStyle: "italic" }}>
          Baconstown, Enfield, Co. Meath · info@dcwoodworks.ie
        </span>
        <a href="https://www.instagram.com/dcwoodworks_/" target="_blank" rel="noopener noreferrer" className="mt-2 md:mt-0 hover:opacity-70 transition-opacity" style={{ color: INK, opacity: 0.65 }}>
          <Instagram size={18} strokeWidth={1.5} />
        </a>
      </footer>
    </div>
  );
};

export default DCWoodworksShowcase;
