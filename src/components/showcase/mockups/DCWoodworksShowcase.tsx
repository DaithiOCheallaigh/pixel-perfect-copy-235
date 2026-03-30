import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ChevronRight, Star } from "lucide-react";
import { useEffect } from "react";
import dcLogo from "@/assets/images/showcase/dc-woodworks-logo.png";

// ── Real site images from dcwoodworks.ie ──
const WP = "https://dcwoodworks.ie/wp-content/uploads/2022/02";
const heroImg = `${WP}/Kitchen-View.jpg`;
const traditionalImg = `${WP}/traditional.jpg`;
const contemporaryImg = `${WP}/contemporary.jpg`;
const handlelessImg = `${WP}/handle-less.jpg`;
const kitchenImg = `${WP}/Kitchen-1.jpg`;
const sinkImg = `${WP}/Sink-View.jpg`;
const kitchen2Img = `${WP}/Kitchen-2.jpg`;
const kitchen3Img = `${WP}/Kitchen-3.jpg`;
const wardrobeImg = `${WP}/Cartoon-Wardrobe.jpg`;
const furnitureImg = `${WP}/new-collection-furniture-img.jpg`;
const cartonHouseImg = `${WP}/1.-Carton-House.jpg`;
const sinkWorktopImg = `${WP}/Sink-Worktop.jpg`;

// ── Warm Luxury Palette ──
const cream = "#FAF7F2";
const warmWhite = "#F3EDE4";
const warmGrey = "#E8E0D4";
const darkText = "#1A1A18";
const bodyText = "#4A4740";
const mutedText = "#8A857C";
const accent = "#8B7355"; // warm bronze
const accentDark = "#6B5840";
const borderCol = "#E0D8CC";

// ── Slow, luxurious animations ──
const slow = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const collections = [
  { title: "Traditional", desc: "Classic shaker profiles, hand-painted finishes, and timeless detailing crafted for warmth and character.", img: traditionalImg },
  { title: "Contemporary", desc: "Clean lines, bold colours, and modern functionality designed for today's living spaces.", img: contemporaryImg },
  { title: "Handle-less", desc: "Sleek, minimal profiles with integrated handles for a seamless, refined aesthetic.", img: handlelessImg },
];

const gallery = [
  { img: kitchenImg, title: "Bespoke Kitchen" },
  { img: sinkImg, title: "Stone Worktops" },
  { img: cartonHouseImg, title: "Carton House" },
  { img: kitchen2Img, title: "Shaker Detail" },
  { img: kitchen3Img, title: "Custom Joinery" },
  { img: wardrobeImg, title: "Walk-in Wardrobes" },
  { img: sinkWorktopImg, title: "Sink & Worktop" },
  { img: furnitureImg, title: "Bespoke Furniture" },
];

const reviews = [
  { quote: "DC Woodworks transformed our kitchen beyond our expectations. The craftsmanship and attention to detail is second to none.", name: "Sarah M.", location: "Dublin" },
  { quote: "From design to installation, the whole process was seamless. We couldn't be happier with our new handle-less kitchen.", name: "James & Claire O'B.", location: "Meath" },
];

const DCWoodworksShowcase = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  const serif = "'Cormorant Garamond', Georgia, serif";
  const sans = "system-ui, -apple-system, 'Segoe UI', sans-serif";

  return (
    <div style={{ background: cream, color: darkText, fontFamily: sans }} className="min-h-screen">
      {/* ── Nav ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-30 backdrop-blur-xl border-b"
        style={{ background: `${cream}ee`, borderColor: borderCol }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <img src={dcLogo} alt="DC Woodworks" className="h-12 object-contain" />
          <div className="hidden md:flex items-center gap-10 text-[11px] tracking-[0.25em] uppercase" style={{ color: mutedText, fontWeight: 400 }}>
            <a href="#about" className="hover:text-black transition-colors duration-500">About</a>
            <a href="#collections" className="hover:text-black transition-colors duration-500">Kitchens</a>
            <a href="#gallery" className="hover:text-black transition-colors duration-500">Gallery</a>
            <a href="#contact" className="hover:text-black transition-colors duration-500">Contact</a>
          </div>
          <a
            href="tel:0469500127"
            className="flex items-center gap-2 px-5 py-2.5 text-[11px] tracking-[0.15em] uppercase transition-all duration-500"
            style={{ background: darkText, color: cream, fontWeight: 400 }}
          >
            <Phone className="w-3.5 h-3.5" strokeWidth={1.2} />
            Book a Call
          </a>
        </div>
      </nav>

      {/* ── Hero — Full Screen ── */}
      <section className="relative h-screen min-h-[700px]">
        <motion.img
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          src={heroImg}
          alt="DC Woodworks luxury kitchen"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(250,247,242,0.92) 0%, rgba(250,247,242,0.7) 45%, rgba(250,247,242,0.1) 100%)" }} />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
            <motion.div
              variants={slow} initial="hidden" animate="visible" custom={0}
              className="w-16 h-[1px] mb-8"
              style={{ background: accent }}
            />
            <motion.p
              variants={slow} initial="hidden" animate="visible" custom={1}
              className="text-[11px] tracking-[0.4em] uppercase mb-6"
              style={{ color: accent, fontWeight: 400 }}
            >
              Award-Winning Kitchens &amp; Interiors
            </motion.p>
            <motion.h1
              variants={slow} initial="hidden" animate="visible" custom={2}
              className="text-5xl md:text-7xl lg:text-[5.5rem] leading-[1] tracking-[-0.02em] max-w-2xl"
              style={{ fontFamily: serif, fontWeight: 300 }}
            >
              Crafted in
              <br />
              <span className="italic" style={{ color: accent }}>Ireland</span>
            </motion.h1>
            <motion.p
              variants={slow} initial="hidden" animate="visible" custom={3}
              className="mt-6 text-base md:text-lg max-w-md leading-relaxed tracking-wide"
              style={{ color: bodyText, fontWeight: 300 }}
            >
              Ireland's premier kitchen suppliers, designers &amp; interiors experts.
              Designed &amp; crafted in Meath — just 30 minutes from Dublin.
            </motion.p>
            <motion.div
              variants={slow} initial="hidden" animate="visible" custom={4}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 text-[11px] tracking-[0.2em] uppercase transition-all duration-500"
                style={{ background: darkText, color: cream, fontWeight: 400 }}
              >
                Book a Consultation
                <ChevronRight className="w-4 h-4" strokeWidth={1.2} />
              </a>
              <a
                href="#collections"
                className="inline-flex items-center gap-3 border px-8 py-4 text-[11px] tracking-[0.2em] uppercase transition-all duration-500 hover:bg-black/5"
                style={{ borderColor: borderCol, color: darkText, fontWeight: 400 }}
              >
                View Collections
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-28 md:py-40" style={{ background: warmWhite }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="w-12 h-[1px] mb-8" style={{ background: accent }} />
              <p className="text-[11px] tracking-[0.4em] uppercase mb-6" style={{ color: accent, fontWeight: 400 }}>
                About DC Woodworks
              </p>
              <h2 className="text-3xl md:text-5xl leading-tight tracking-[-0.01em] mb-8" style={{ fontFamily: serif, fontWeight: 300 }}>
                Where tradition meets
                <br />
                <span className="italic">modern craft</span>
              </h2>
              <p className="leading-[1.9] mb-5 text-[15px]" style={{ color: bodyText, fontWeight: 300 }}>
                Based in Baconstown, Co. Meath, DC Woodworks are Ireland's premier kitchen suppliers,
                designers and interiors experts. We design and craft our kitchens in Ireland using
                premium quality locally sourced materials.
              </p>
              <p className="leading-[1.9] text-[15px]" style={{ color: bodyText, fontWeight: 300 }}>
                From traditional shaker kitchens to sleek handle-less designs, we bring quality
                craftsmanship and attention to detail to every project — building the perfect
                custom kitchens for our customers in Meath, Dublin and across Ireland.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
              className="relative"
            >
              <img
                src={kitchen2Img}
                alt="DC Woodworks craftsmanship"
                className="w-full aspect-[4/5] object-cover"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -left-6 p-8 border" style={{ background: cream, borderColor: borderCol }}>
                <p className="text-4xl" style={{ fontFamily: serif, fontWeight: 300, color: accent }}>20+</p>
                <p className="text-[11px] tracking-[0.2em] uppercase mt-1" style={{ color: mutedText, fontWeight: 400 }}>Years Experience</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Collections ── */}
      <section id="collections" className="py-28 md:py-40" style={{ background: cream }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <div className="w-12 h-[1px] mx-auto mb-8" style={{ background: accent }} />
            <p className="text-[11px] tracking-[0.4em] uppercase mb-6" style={{ color: accent, fontWeight: 400 }}>
              Kitchen Collections
            </p>
            <h2 className="text-3xl md:text-5xl" style={{ fontFamily: serif, fontWeight: 300 }}>
              Find Your <span className="italic">Style</span>
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {collections.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group"
              >
                <div className="aspect-[3/4] overflow-hidden mb-6">
                  <img
                    src={c.img}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-2xl mb-2" style={{ fontFamily: serif, fontWeight: 400 }}>{c.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: bodyText, fontWeight: 300 }}>
                  {c.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full Width Image Break with Quote ── */}
      <section className="relative h-[60vh] min-h-[450px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <img
            src={furnitureImg}
            alt="DC Woodworks craftsmanship detail"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(26,26,24,0.55)" }}>
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center max-w-2xl px-6"
          >
            <p className="text-2xl md:text-4xl italic leading-snug text-white" style={{ fontFamily: serif, fontWeight: 300 }}>
              "Quality is never an accident; it is always the result of intelligent effort"
            </p>
            <p className="text-[11px] tracking-[0.3em] uppercase mt-6" style={{ color: warmGrey, fontWeight: 400 }}>
              John Ruskin
            </p>
          </motion.blockquote>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section id="gallery" className="py-28 md:py-40" style={{ background: warmWhite }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <div className="w-12 h-[1px] mx-auto mb-8" style={{ background: accent }} />
            <p className="text-[11px] tracking-[0.4em] uppercase mb-6" style={{ color: accent, fontWeight: 400 }}>
              Portfolio
            </p>
            <h2 className="text-3xl md:text-5xl" style={{ fontFamily: serif, fontWeight: 300 }}>
              Recent <span className="italic">Projects</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {gallery.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group relative aspect-square overflow-hidden"
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: "linear-gradient(to top, rgba(26,26,24,0.7), transparent 60%)" }}
                >
                  <p className="text-sm text-white tracking-wide" style={{ fontFamily: serif, fontWeight: 400 }}>{p.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Showroom Banner ── */}
      <section className="border-y" style={{ borderColor: borderCol, background: cream }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h3 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: serif, fontWeight: 300 }}>
              Visit Our <span className="italic">Showroom</span>
            </h3>
            <p className="text-sm" style={{ color: bodyText, fontWeight: 300 }}>
              Baconstown, Enfield, Co. Meath — Mon–Fri 9:30am–5:30pm. Saturday by appointment.
            </p>
          </motion.div>
          <a
            href="#contact"
            className="flex items-center gap-3 px-8 py-4 text-[11px] tracking-[0.2em] uppercase transition-all duration-500 whitespace-nowrap"
            style={{ background: darkText, color: cream, fontWeight: 400 }}
          >
            <MapPin className="w-4 h-4" strokeWidth={1.2} />
            Get Directions
          </a>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-28 md:py-40" style={{ background: warmWhite }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <div className="w-12 h-[1px] mx-auto mb-8" style={{ background: accent }} />
          <p className="text-[11px] tracking-[0.4em] uppercase mb-6" style={{ color: accent, fontWeight: 400 }}>
            Testimonials
          </p>
          <h2 className="text-3xl md:text-5xl mb-16" style={{ fontFamily: serif, fontWeight: 300 }}>
            What Our Clients <span className="italic">Say</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-16">
            {reviews.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-left"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-current" style={{ color: accent }} />
                  ))}
                </div>
                <p className="text-lg italic leading-relaxed mb-8" style={{ fontFamily: serif, color: bodyText, fontWeight: 300 }}>
                  "{r.quote}"
                </p>
                <div className="w-8 h-[1px] mb-4" style={{ background: borderCol }} />
                <p className="text-sm tracking-wide" style={{ fontWeight: 400 }}>{r.name}</p>
                <p className="text-[11px] tracking-[0.15em] uppercase mt-1" style={{ color: mutedText, fontWeight: 400 }}>{r.location}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-28 md:py-40" style={{ background: cream }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <div className="w-12 h-[1px] mx-auto mb-8" style={{ background: accent }} />
            <p className="text-[11px] tracking-[0.4em] uppercase mb-6" style={{ color: accent, fontWeight: 400 }}>
              Contact
            </p>
            <h2 className="text-3xl md:text-5xl" style={{ fontFamily: serif, fontWeight: 300 }}>
              Get in <span className="italic">Touch</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: borderCol }}>
            {[
              { icon: MapPin, title: "Showroom", detail: "Baconstown, Enfield", sub: "Co. Meath, A83 HC80" },
              { icon: Clock, title: "Opening Hours", detail: "Mon–Fri 9:30am–5:30pm", sub: "Sat by appointment" },
              { icon: Phone, title: "Phone", detail: "(046) 950 0127", sub: "Tap to call", href: "tel:0469500127" },
              { icon: Mail, title: "Email", detail: "info@dcwoodworks.ie", sub: "Get in touch", href: "mailto:info@dcwoodworks.ie" },
            ].map((item, i) => (
              <motion.a
                key={item.title}
                href={item.href || "#"}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="p-10 text-center block transition-colors duration-500 hover:bg-black/[0.02]"
                style={{ background: warmWhite }}
              >
                <item.icon className="w-5 h-5 mx-auto mb-5" style={{ color: accent }} strokeWidth={1.2} />
                <h3 className="text-sm tracking-[0.1em] uppercase mb-3" style={{ fontWeight: 400 }}>{item.title}</h3>
                <p className="text-sm" style={{ fontWeight: 300 }}>{item.detail}</p>
                <p className="text-[11px] mt-1" style={{ color: mutedText, fontWeight: 400 }}>{item.sub}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t py-12" style={{ borderColor: borderCol, background: cream }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <img src={dcLogo} alt="DC Woodworks" className="h-10 object-contain opacity-50" />
          <p className="text-[11px] tracking-[0.15em]" style={{ color: mutedText, fontWeight: 400 }}>
            &copy; {new Date().getFullYear()} DC Woodworks. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DCWoodworksShowcase;
