import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ChevronRight, Star } from "lucide-react";
import { useEffect } from "react";

// ── Real site images from dcwoodworks.ie ──
const WP = "https://dcwoodworks.ie/wp-content/uploads/2022/02";
const logo = `${WP}/cropped-Logo.jpg`;
const heroImg = `${WP}/promo-banner-img.jpg`;
const traditionalImg = `${WP}/traditional.jpg`;
const contemporaryImg = `${WP}/contemporary.jpg`;
const handlelessImg = `${WP}/handle-less.jpg`;
const kitchenImg = `${WP}/Kitchen.jpg`;
const sinkImg = `${WP}/Sink.jpg`;
const kitchenViewImg = `${WP}/Kitchen-View.jpg`;
const kitchen1Img = `${WP}/Kitchen-1.jpg`;
const kitchen2Img = `${WP}/Kitchen-2.jpg`;
const kitchen3Img = `${WP}/Kitchen-3.jpg`;
const wardrobeImg = `${WP}/Cartoon-Wardrobe.jpg`;
const furnitureImg = `${WP}/new-collection-furniture-img.jpg`;

// ── Palette ──
const gold = "#C4A35A";
const goldMuted = "#A08942";
const bg = "#0C0B09";
const surface = "#12110E";
const border = "#1F1D18";
const textPrimary = "#F5F0E8";
const textMuted = "#8A8375";

// ── Slow, luxurious animations ──
const slow = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: "easeOut" } },
};

const collections = [
  { title: "Traditional", desc: "Classic shaker profiles, hand-painted finishes, and timeless detailing crafted for warmth and character.", img: traditionalImg },
  { title: "Contemporary", desc: "Clean lines, bold colours, and modern functionality designed for today's living spaces.", img: contemporaryImg },
  { title: "Handle-less", desc: "Sleek, minimal profiles with integrated handles for a seamless, refined aesthetic.", img: handlelessImg },
];

const gallery = [
  { img: kitchenImg, title: "Bespoke Kitchen" },
  { img: sinkImg, title: "Stone Worktops" },
  { img: kitchenViewImg, title: "Kitchen Design" },
  { img: kitchen1Img, title: "Island Living" },
  { img: kitchen2Img, title: "Shaker Detail" },
  { img: kitchen3Img, title: "Custom Joinery" },
  { img: wardrobeImg, title: "Walk-in Wardrobes" },
  { img: furnitureImg, title: "Bespoke Furniture" },
];

const reviews = [
  { quote: "DC Woodworks transformed our kitchen beyond our expectations. The craftsmanship and attention to detail is second to none.", name: "Sarah M.", location: "Dublin" },
  { quote: "From design to installation, the whole process was seamless. We couldn't be happier with our new handle-less kitchen.", name: "James & Claire O'B.", location: "Meath" },
];

const DCWoodworksShowcase = () => {
  useEffect(() => {
    // Load Playfair Display serif font
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  const serif = "'Playfair Display', Georgia, 'Times New Roman', serif";
  const sans = "'Mona Sans', system-ui, sans-serif";

  return (
    <div style={{ background: bg, color: textPrimary, fontFamily: sans }} className="min-h-screen">
      {/* ── Nav ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-30 backdrop-blur-xl border-b"
        style={{ background: `${bg}cc`, borderColor: border }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <img src={logo} alt="DC Woodworks" className="h-10 object-contain" />
          <div className="hidden md:flex items-center gap-10 text-[11px] tracking-[0.25em] uppercase font-light" style={{ color: textMuted }}>
            <a href="#about" className="hover:text-white transition-colors duration-500">About</a>
            <a href="#collections" className="hover:text-white transition-colors duration-500">Kitchens</a>
            <a href="#gallery" className="hover:text-white transition-colors duration-500">Gallery</a>
            <a href="#contact" className="hover:text-white transition-colors duration-500">Contact</a>
          </div>
          <a
            href="tel:0469500127"
            className="flex items-center gap-2 px-5 py-2.5 text-[11px] tracking-[0.15em] uppercase font-light transition-all duration-500 border"
            style={{ borderColor: gold, color: gold }}
          >
            <Phone className="w-3.5 h-3.5" strokeWidth={1} />
            Book a Call
          </a>
        </div>
      </nav>

      {/* ── Hero — Full Screen ── */}
      <section className="relative h-screen min-h-[700px]">
        <motion.img
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          src={heroImg}
          alt="DC Woodworks luxury kitchen"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${bg}, ${bg}88 50%, ${bg}33)` }} />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-20 lg:pb-28 w-full">
            <motion.div
              variants={slow} initial="hidden" animate="visible" custom={0}
              className="w-16 h-[1px] mb-8"
              style={{ background: gold }}
            />
            <motion.p
              variants={slow} initial="hidden" animate="visible" custom={1}
              className="text-[11px] tracking-[0.4em] uppercase mb-6 font-light"
              style={{ color: gold }}
            >
              Award-Winning Kitchens &amp; Interiors
            </motion.p>
            <motion.h1
              variants={slow} initial="hidden" animate="visible" custom={2}
              className="text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] tracking-[-0.02em] max-w-4xl"
              style={{ fontFamily: serif }}
            >
              Crafted in
              <br />
              <span className="italic font-normal" style={{ color: gold }}>Ireland</span>
            </motion.h1>
            <motion.p
              variants={slow} initial="hidden" animate="visible" custom={3}
              className="mt-6 text-base md:text-lg font-light max-w-lg leading-relaxed tracking-wide"
              style={{ color: textMuted }}
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
                className="inline-flex items-center gap-3 px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-light transition-all duration-500"
                style={{ background: gold, color: bg }}
              >
                Book a Consultation
                <ChevronRight className="w-4 h-4" strokeWidth={1} />
              </a>
              <a
                href="#collections"
                className="inline-flex items-center gap-3 border px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-light transition-all duration-500 hover:bg-white/5"
                style={{ borderColor: `${textMuted}44`, color: textPrimary }}
              >
                View Collections
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <div className="w-12 h-[1px] mb-8" style={{ background: gold }} />
              <p className="text-[11px] tracking-[0.4em] uppercase mb-6 font-light" style={{ color: gold }}>
                About DC Woodworks
              </p>
              <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-[-0.01em] mb-8" style={{ fontFamily: serif }}>
                Where tradition meets
                <br />
                <span className="italic">modern craft</span>
              </h2>
              <p className="font-light leading-[1.9] mb-5 text-[15px]" style={{ color: textMuted }}>
                Based in Baconstown, Co. Meath, DC Woodworks are Ireland's premier kitchen suppliers,
                designers and interiors experts. We design and craft our kitchens in Ireland using
                premium quality locally sourced materials.
              </p>
              <p className="font-light leading-[1.9] text-[15px]" style={{ color: textMuted }}>
                From traditional shaker kitchens to sleek handle-less designs, we bring quality
                craftsmanship and attention to detail to every project — building the perfect
                custom kitchens for our customers in Meath, Dublin and across Ireland.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              className="relative"
            >
              <img
                src={kitchenImg}
                alt="DC Woodworks craftsmanship"
                className="w-full aspect-[4/5] object-cover"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -left-6 p-8 border" style={{ background: bg, borderColor: border }}>
                <p className="text-4xl font-light" style={{ fontFamily: serif, color: gold }}>20+</p>
                <p className="text-[11px] tracking-[0.2em] uppercase font-light mt-1" style={{ color: textMuted }}>Years Experience</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Collections ── */}
      <section id="collections" className="py-28 md:py-40" style={{ background: surface }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <div className="w-12 h-[1px] mx-auto mb-8" style={{ background: gold }} />
            <p className="text-[11px] tracking-[0.4em] uppercase mb-6 font-light" style={{ color: gold }}>
              Kitchen Collections
            </p>
            <h2 className="text-3xl md:text-5xl font-light" style={{ fontFamily: serif }}>
              Find Your <span className="italic">Style</span>
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-1">
            {collections.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 1 }}
                className="group relative overflow-hidden"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                    loading="lazy"
                  />
                </div>
                <div
                  className="absolute inset-0 flex flex-col justify-end p-8"
                  style={{ background: `linear-gradient(to top, ${bg}ee, ${bg}66 40%, transparent)` }}
                >
                  <h3 className="text-2xl font-light mb-2" style={{ fontFamily: serif }}>{c.title}</h3>
                  <p className="text-[13px] font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ color: textMuted }}>
                    {c.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full Width Image Break ── */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={furnitureImg}
            alt="DC Woodworks craftsmanship detail"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: `${bg}88` }}>
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-center max-w-2xl px-6"
          >
            <p className="text-2xl md:text-4xl font-light italic leading-snug" style={{ fontFamily: serif }}>
              "Quality is never an accident; it is always the result of intelligent effort"
            </p>
            <p className="text-[11px] tracking-[0.3em] uppercase mt-6 font-light" style={{ color: goldMuted }}>
              John Ruskin
            </p>
          </motion.blockquote>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section id="gallery" className="py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <div className="w-12 h-[1px] mx-auto mb-8" style={{ background: gold }} />
            <p className="text-[11px] tracking-[0.4em] uppercase mb-6 font-light" style={{ color: gold }}>
              Portfolio
            </p>
            <h2 className="text-3xl md:text-5xl font-light" style={{ fontFamily: serif }}>
              Recent <span className="italic">Projects</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
            {gallery.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.8 }}
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
                  style={{ background: `linear-gradient(to top, ${bg}cc, transparent 60%)` }}
                >
                  <p className="text-sm font-light tracking-wide" style={{ fontFamily: serif }}>{p.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Showroom Banner ── */}
      <section className="border-y" style={{ borderColor: border }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-2xl md:text-3xl font-light mb-3" style={{ fontFamily: serif }}>
              Visit Our <span className="italic">Showroom</span>
            </h3>
            <p className="text-sm font-light" style={{ color: textMuted }}>
              Baconstown, Enfield, Co. Meath — Mon–Fri 9:30am–5:30pm. Saturday by appointment.
            </p>
          </motion.div>
          <a
            href="#contact"
            className="flex items-center gap-3 px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-light transition-all duration-500 border whitespace-nowrap"
            style={{ borderColor: gold, color: gold }}
          >
            <MapPin className="w-4 h-4" strokeWidth={1} />
            Get Directions
          </a>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-28 md:py-40" style={{ background: surface }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <div className="w-12 h-[1px] mx-auto mb-8" style={{ background: gold }} />
          <p className="text-[11px] tracking-[0.4em] uppercase mb-6 font-light" style={{ color: gold }}>
            Testimonials
          </p>
          <h2 className="text-3xl md:text-5xl font-light mb-16" style={{ fontFamily: serif }}>
            What Our Clients <span className="italic">Say</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {reviews.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 1 }}
                className="text-left"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-current" style={{ color: gold }} />
                  ))}
                </div>
                <p className="text-lg font-light italic leading-relaxed mb-8" style={{ fontFamily: serif, color: textMuted }}>
                  "{r.quote}"
                </p>
                <div className="w-8 h-[1px] mb-4" style={{ background: border }} />
                <p className="text-sm font-light tracking-wide">{r.name}</p>
                <p className="text-[11px] font-light tracking-[0.15em] uppercase mt-1" style={{ color: textMuted }}>{r.location}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <div className="w-12 h-[1px] mx-auto mb-8" style={{ background: gold }} />
            <p className="text-[11px] tracking-[0.4em] uppercase mb-6 font-light" style={{ color: gold }}>
              Contact
            </p>
            <h2 className="text-3xl md:text-5xl font-light" style={{ fontFamily: serif }}>
              Get in <span className="italic">Touch</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: border }}>
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
                transition={{ delay: i * 0.15, duration: 0.8 }}
                className="p-10 text-center block transition-colors duration-500 hover:bg-white/[0.02]"
                style={{ background: bg }}
              >
                <item.icon className="w-5 h-5 mx-auto mb-5" style={{ color: gold }} strokeWidth={1} />
                <h3 className="text-sm font-light tracking-[0.1em] uppercase mb-3">{item.title}</h3>
                <p className="text-sm font-light">{item.detail}</p>
                <p className="text-[11px] font-light mt-1" style={{ color: textMuted }}>{item.sub}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t py-12" style={{ borderColor: border }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <img src={logo} alt="DC Woodworks" className="h-8 object-contain opacity-60" />
          <p className="text-[11px] font-light tracking-[0.15em]" style={{ color: textMuted }}>
            &copy; {new Date().getFullYear()} DC Woodworks. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DCWoodworksShowcase;
