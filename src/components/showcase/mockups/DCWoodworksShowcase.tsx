import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ChevronRight, Award, Ruler, Paintbrush, Sofa, Star } from "lucide-react";
import heroImg from "@/assets/images/showcase/dc-woodworks-hero.jpg";
import traditionalImg from "@/assets/images/showcase/dc-woodworks-traditional.jpg";
import contemporaryImg from "@/assets/images/showcase/dc-woodworks-contemporary.jpg";
import wardrobeImg from "@/assets/images/showcase/dc-woodworks-wardrobe.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const accent = "#1B3A2D"; // deep forest green — craftsmanship feel
const accentLight = "#2E6B4F";
const bg = "#0A0A0C";
const surface = "#111114";
const border = "#1E1E22";
const textPrimary = "#F0EDE8";
const textSecondary = "#9A958E";

const collections = [
  {
    title: "Traditional Style",
    desc: "Classic shaker profiles, hand-painted finishes, and timeless detailing crafted for warmth.",
    img: traditionalImg,
  },
  {
    title: "Contemporary Style",
    desc: "Clean lines, bold colours, and modern functionality for today's living.",
    img: contemporaryImg,
  },
  {
    title: "Handle-less Style",
    desc: "Sleek, minimal profiles with integrated handles for a seamless, modern look.",
    img: heroImg,
  },
];

const features = [
  { icon: Ruler, title: "Bespoke Design", desc: "Every kitchen designed and measured to your exact space" },
  { icon: Paintbrush, title: "Irish Craftsmanship", desc: "Designed and built in Ireland using locally sourced materials" },
  { icon: Award, title: "Award Winning", desc: "Recognised for excellence in kitchen design and build" },
  { icon: Sofa, title: "Full Interiors", desc: "Wardrobes, home bars, utility rooms, and bespoke furniture" },
];

const projects = [
  { title: "Howth — Bespoke Kitchen", img: heroImg },
  { title: "Walk-in Wardrobe", img: wardrobeImg },
  { title: "Contemporary Handleless", img: contemporaryImg },
];

const DCWoodworksShowcase = () => {
  return (
    <div style={{ background: bg, color: textPrimary }} className="min-h-screen font-sans">
      {/* ── Nav ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-30 backdrop-blur-md border-b"
        style={{ background: `${bg}e6`, borderColor: border }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs tracking-wider"
              style={{ background: accent, color: textPrimary }}
            >
              DC
            </div>
            <span className="text-sm font-semibold tracking-wide">DC Woodworks</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase" style={{ color: textSecondary }}>
            <a href="#about" className="hover:opacity-80 transition-opacity">About</a>
            <a href="#collections" className="hover:opacity-80 transition-opacity">Kitchens</a>
            <a href="#projects" className="hover:opacity-80 transition-opacity">Projects</a>
            <a href="#contact" className="hover:opacity-80 transition-opacity">Contact</a>
          </div>
          <a
            href="tel:0469500127"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-colors"
            style={{ background: accent, color: textPrimary }}
          >
            <Phone className="w-3.5 h-3.5" />
            Call Us
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-16">
        <div className="relative h-[75vh] min-h-[520px] overflow-hidden">
          <img
            src={heroImg}
            alt="DC Woodworks luxury kitchen"
            className="absolute inset-0 w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${bg}, ${bg}99 40%, transparent)` }} />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-6xl mx-auto px-6 pb-16 w-full">
              <motion.p
                variants={fadeUp} initial="hidden" animate="visible" custom={0}
                className="text-xs tracking-[0.3em] uppercase mb-4 font-semibold"
                style={{ color: accentLight }}
              >
                Award Winning Kitchens & Interiors
              </motion.p>
              <motion.h1
                variants={fadeUp} initial="hidden" animate="visible" custom={1}
                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight max-w-3xl"
              >
                DC Woodworks
              </motion.h1>
              <motion.p
                variants={fadeUp} initial="hidden" animate="visible" custom={2}
                className="mt-4 text-base md:text-lg max-w-xl leading-relaxed"
                style={{ color: textSecondary }}
              >
                Ireland's premier kitchen suppliers, designers &amp; interiors experts.
                Designed &amp; crafted in Meath — just 30 minutes from Dublin.
              </motion.p>
              <motion.div
                variants={fadeUp} initial="hidden" animate="visible" custom={3}
                className="mt-8 flex flex-wrap gap-3"
              >
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-colors"
                  style={{ background: accent, color: textPrimary }}
                >
                  Book a Consultation
                  <ChevronRight className="w-4 h-4" />
                </a>
                <a
                  href="#collections"
                  className="inline-flex items-center gap-2 border px-6 py-3 rounded-full text-sm font-medium transition-colors hover:opacity-80"
                  style={{ borderColor: border, color: textPrimary }}
                >
                  View Kitchens
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: accentLight }}>
                About DC Woodworks
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Crafting kitchens you'll cherish
              </h2>
              <p className="leading-relaxed mb-4" style={{ color: textSecondary }}>
                Based in Baconstown, Co. Meath, DC Woodworks are Ireland's premier kitchen suppliers,
                designers and interiors experts. We design and craft our kitchens in Ireland using
                premium quality locally sourced materials.
              </p>
              <p className="leading-relaxed" style={{ color: textSecondary }}>
                From traditional shaker kitchens to sleek handle-less designs, we bring quality
                craftsmanship and attention to detail to every project — building the perfect
                custom kitchens for our customers in Meath, Dublin and across Ireland.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="grid grid-cols-2 gap-4">
                {features.map((f, i) => (
                  <div
                    key={f.title}
                    className="rounded-2xl p-5 border"
                    style={{ borderColor: border }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: `${accent}33` }}
                    >
                      <f.icon className="w-5 h-5" style={{ color: accentLight }} />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: textSecondary }}>{f.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Collections ── */}
      <section id="collections" className="py-24 md:py-32" style={{ background: surface }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: accentLight }}>
              Kitchen Collections
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">Find Your Style</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {collections.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group rounded-2xl overflow-hidden border"
                style={{ borderColor: border }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    width={640}
                    height={480}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{c.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: textSecondary }}>{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects Gallery ── */}
      <section id="projects" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: accentLight }}>
              Recent Work
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">Our Recent Projects</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative rounded-2xl overflow-hidden aspect-square"
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  width={640}
                  height={640}
                />
                <div
                  className="absolute inset-0 flex items-end p-6"
                  style={{ background: `linear-gradient(to top, ${bg}cc, transparent 60%)` }}
                >
                  <h3 className="font-semibold text-base">{p.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Showroom Banner ── */}
      <section className="py-16 border-y" style={{ borderColor: border, background: `linear-gradient(135deg, ${accent}1a, transparent)` }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              Visit Our Showroom
            </h3>
            <p className="text-sm" style={{ color: textSecondary }}>
              Baconstown, Enfield, Co. Meath — Mon–Fri 9:30am–5:30pm. Saturday by appointment.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-colors whitespace-nowrap"
            style={{ background: accent, color: textPrimary }}
          >
            <MapPin className="w-4 h-4" />
            Get Directions
          </a>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-24 md:py-32" style={{ background: surface }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: accentLight }}>
            Customer Reviews
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What Our Customers Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                quote: "DC Woodworks transformed our kitchen beyond our expectations. The craftsmanship and attention to detail is second to none.",
                name: "Sarah M.",
                location: "Dublin",
              },
              {
                quote: "From design to installation, the whole process was seamless. We couldn't be happier with our new handle-less kitchen.",
                name: "James & Claire O'B.",
                location: "Meath",
              },
            ].map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="border rounded-2xl p-8 text-left"
                style={{ borderColor: border }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-current" style={{ color: accentLight }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: textSecondary }}>
                  "{r.quote}"
                </p>
                <p className="text-sm font-semibold">{r.name}</p>
                <p className="text-xs" style={{ color: textSecondary }}>{r.location}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: accentLight }}>
              Contact
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MapPin,
                title: "Showroom",
                detail: "Baconstown, Enfield",
                sub: "Co. Meath, A83 HC80",
              },
              {
                icon: Clock,
                title: "Opening Hours",
                detail: "Mon–Fri 9:30am–5:30pm",
                sub: "Sat by appointment only",
              },
              {
                icon: Phone,
                title: "Phone",
                detail: "(046) 950 0127",
                sub: "Tap to call",
                href: "tel:0469500127",
              },
              {
                icon: Mail,
                title: "Email",
                detail: "Get in touch",
                sub: "info@dcwoodworks.ie",
                href: "mailto:info@dcwoodworks.ie",
              },
            ].map((item, i) => (
              <motion.a
                key={item.title}
                href={item.href || "#"}
                target={item.href?.startsWith("http") ? "_blank" : undefined}
                rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="border rounded-2xl p-6 text-center block transition-colors"
                style={{ borderColor: border }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${accent}33` }}
                >
                  <item.icon className="w-5 h-5" style={{ color: accentLight }} />
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm">{item.detail}</p>
                <p className="text-xs mt-1" style={{ color: textSecondary }}>{item.sub}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t py-8" style={{ borderColor: border }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ color: textSecondary }}>
          <p>&copy; {new Date().getFullYear()} DC Woodworks. All Rights Reserved.</p>
          <p>Baconstown, Enfield, Co. Meath</p>
        </div>
      </footer>
    </div>
  );
};

export default DCWoodworksShowcase;
