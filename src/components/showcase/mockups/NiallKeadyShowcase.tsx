import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, FileText, Shield, Scale, ChevronRight, MessageCircle } from "lucide-react";
import heroImg from "@/assets/images/showcase/niall-keady-hero.jpg";
import portraitImg from "@/assets/images/showcase/niall-keady-portrait.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const services = [
  { icon: FileText, title: "Affidavits", desc: "Witnessing affidavits for court proceedings" },
  { icon: Shield, title: "Declarations", desc: "Administering affirmations, declarations & attestations" },
  { icon: Scale, title: "Document Verification", desc: "Verifying documents for registration under various acts" },
  { icon: FileText, title: "Signature Witnessing", desc: "Witness signatures & verification of ID documents" },
  { icon: Shield, title: "Divorce Proceedings", desc: "Documentation & means affidavit preparation" },
  { icon: Scale, title: "Citizenship", desc: "Naturalisation application & citizenship documentation" },
];

const NiallKeadyShowcase = () => {
  return (
    <div className="bg-[#0C0C0E] text-[#E8E4DD] min-h-screen font-sans">
      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-[#0C0C0E]/90 backdrop-blur-md border-b border-[#1E1E22]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C8A96E] flex items-center justify-center text-[#0C0C0E] font-bold text-sm">
              NK
            </div>
            <span className="text-sm font-semibold tracking-wide text-[#E8E4DD]">
              Niall Keady
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase text-[#8A8680]">
            <a href="#about" className="hover:text-[#C8A96E] transition-colors">About</a>
            <a href="#services" className="hover:text-[#C8A96E] transition-colors">Services</a>
            <a href="#contact" className="hover:text-[#C8A96E] transition-colors">Contact</a>
          </div>
          <a
            href="https://wa.me/message/TTTWH3AJQOJ5G1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#C8A96E] text-[#0C0C0E] px-4 py-2 rounded-full text-xs font-semibold hover:bg-[#B89A5E] transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-16">
        <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <img
            src={heroImg}
            alt="Commissioner for Oaths desk"
            className="absolute inset-0 w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0E] via-[#0C0C0E]/60 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-6xl mx-auto px-6 pb-16 w-full">
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
                className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase mb-4 font-semibold"
              >
                Commissioner for Oaths
              </motion.p>
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight max-w-3xl"
              >
                Niall Keady
              </motion.h1>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="mt-4 text-base md:text-lg text-[#8A8680] max-w-xl leading-relaxed"
              >
                Serving Balbriggan, Skerries, Rush &amp; surrounding areas in North Fingal.
                Office appointments with evening &amp; weekend availability.
              </motion.p>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={3}
                className="mt-8 flex flex-wrap gap-3"
              >
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-[#C8A96E] text-[#0C0C0E] px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#B89A5E] transition-colors"
                >
                  Book an Appointment
                  <ChevronRight className="w-4 h-4" />
                </a>
                <a
                  href="tel:+353861234567"
                  className="inline-flex items-center gap-2 border border-[#2A2A2E] text-[#E8E4DD] px-6 py-3 rounded-full text-sm font-medium hover:border-[#C8A96E] hover:text-[#C8A96E] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
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
              <div className="relative">
                <img
                  src={portraitImg}
                  alt="Niall Keady"
                  className="rounded-2xl w-full max-w-sm aspect-square object-cover"
                  loading="lazy"
                  width={640}
                  height={640}
                />
                <div className="absolute -bottom-4 -right-4 bg-[#C8A96E] text-[#0C0C0E] rounded-xl px-5 py-3 text-xs font-bold tracking-wide">
                  NORTH FINGAL
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <p className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase mb-4 font-semibold">
                About
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Trusted document services for North County Dublin
              </h2>
              <p className="text-[#8A8680] leading-relaxed mb-4">
                I am a Commissioner for Oaths with a proven commitment to integrity and reliability.
                My experience ensures the accurate handling of your documents, and my client-focused
                approach offers you peace of mind.
              </p>
              <p className="text-[#8A8680] leading-relaxed">
                Whether you need affidavits witnessed, declarations administered, or other legal
                processes explained and simplified, I offer expertise and integrity across the
                North County Dublin and Fingal area.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="border border-[#1E1E22] rounded-xl p-4">
                  <p className="text-2xl font-bold text-[#C8A96E]">10+</p>
                  <p className="text-xs text-[#8A8680] mt-1">Years Experience</p>
                </div>
                <div className="border border-[#1E1E22] rounded-xl p-4">
                  <p className="text-2xl font-bold text-[#C8A96E]">500+</p>
                  <p className="text-xs text-[#8A8680] mt-1">Documents Handled</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-24 md:py-32 bg-[#101014]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase mb-4 font-semibold">
              Services
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">What I Can Help With</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="border border-[#1E1E22] rounded-2xl p-6 hover:border-[#C8A96E]/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C8A96E]/10 flex items-center justify-center mb-4 group-hover:bg-[#C8A96E]/20 transition-colors">
                  <s.icon className="w-5 h-5 text-[#C8A96E]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-[#8A8680] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Call-out Service Banner ── */}
      <section className="py-16 bg-gradient-to-r from-[#C8A96E]/10 to-transparent border-y border-[#1E1E22]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              Can't make it to the office?
            </h3>
            <p className="text-[#8A8680] text-sm">
              Call-out service available across North Fingal — I come to you.
            </p>
          </div>
          <a
            href="https://wa.me/message/TTTWH3AJQOJ5G1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#C8A96E] text-[#0C0C0E] px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#B89A5E] transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" />
            Arrange a Call-Out
          </a>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase mb-4 font-semibold">
              Contact
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MapPin,
                title: "Location",
                detail: "North Fingal, Co. Dublin",
                sub: "Balbriggan • Skerries • Rush",
              },
              {
                icon: Clock,
                title: "Availability",
                detail: "Mon–Fri 9am–6pm",
                sub: "Evening & weekend by appt",
              },
              {
                icon: Phone,
                title: "Phone",
                detail: "Call or WhatsApp",
                sub: "Tap to connect",
                href: "https://wa.me/message/TTTWH3AJQOJ5G1",
              },
              {
                icon: Mail,
                title: "Email",
                detail: "Get in touch",
                sub: "info@niallkeady.ie",
                href: "mailto:info@niallkeady.ie",
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
                className="border border-[#1E1E22] rounded-2xl p-6 text-center hover:border-[#C8A96E]/30 transition-colors block"
              >
                <div className="w-12 h-12 rounded-full bg-[#C8A96E]/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-5 h-5 text-[#C8A96E]" />
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-[#E8E4DD]">{item.detail}</p>
                <p className="text-xs text-[#8A8680] mt-1">{item.sub}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#1E1E22] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A8680]">
          <p>&copy; {new Date().getFullYear()} Niall Keady — Commissioner for Oaths</p>
          <p>Serving North Fingal, Co. Dublin</p>
        </div>
      </footer>
    </div>
  );
};

export default NiallKeadyShowcase;
