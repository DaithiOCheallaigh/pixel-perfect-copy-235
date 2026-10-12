import { SEO } from "@/components/SEO";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import AvailabilityCTA from "../components/AvailabilityCTA";
import { getServiceById, services } from "../data/services";
import { CALENDLY_URL, vatFootnote } from "@/data/pricing";
import { Button } from "@/components/ui/button";
import avatarImg from "@/assets/avatar.jpeg";

const ServicePage = () => {
  const { id } = useParams<{ id: string }>();
  const service = getServiceById(id || "");


  if (!service) {
    return (
      <main className="flex min-h-screen items-center justify-center pt-24">
        <SEO title="Page not found" description="This page doesn't exist." noindex />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Service not found</h1>
          <Link to="/services" className="mt-4 inline-block text-primary">← All services</Link>
        </div>
      </main>
    );
  }

  const related = service.relatedServices
    .map((rid) => services.find((s) => s.id === rid))
    .filter(Boolean);

  return (
    <main className="pt-24">
      <SEO title={service.title} description={service.metaDescription ?? service.intro.slice(0, 155)} url={`/services/expertise/${service.id}`} />
      {/* Hero */}
      <section className="px-6 pt-12 pb-12 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <Link to="/services" className="font-mono-label mb-8 inline-block text-muted-foreground transition-colors hover:text-primary">
              ← All services
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <span className="font-mono-label text-primary">{service.category}</span>
            <h1 className="mb-6 mt-2 text-4xl font-black tracking-tighter text-foreground md:text-6xl">
              {service.title}
            </h1>
            <p className="mb-3 text-lg font-semibold text-primary">{service.priceLine}</p>
            <p className="mb-6 text-xs text-muted-foreground">{vatFootnote()}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
            <div className="space-y-4">
              {service.intro.split("\n\n").map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-muted-foreground">{p}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero image */}
      {service.image && (
        <section className="px-6 pb-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="overflow-hidden rounded-sm">
                <img src={service.image} alt={service.title} className="w-full object-cover" loading="lazy" />
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Services list */}
      {service.services && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <SectionLabel>{service.servicesTitle || "Services"}</SectionLabel>
              <div className="grid gap-3 md:grid-cols-2">
                {service.services.map((item, i) => {
                  const [title, ...descParts] = item.split(" — ");
                  const desc = descParts.join(" — ");
                  return (
                    <div key={i} className="rounded-sm bg-card p-5">
                      <h3 className="text-sm font-bold text-foreground">{title}</h3>
                      {desc && <p className="mt-1 text-xs text-muted-foreground">{desc}</p>}
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Benefits */}
      {service.benefits && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <SectionLabel>{service.benefitsTitle || "Benefits"}</SectionLabel>
              <div className="grid gap-3 md:grid-cols-2">
                {service.benefits.map((benefit, i) => (
                  <ScrollReveal key={i} delay={i * 0.06}>
                    <div className="rounded-sm bg-card p-5">
                      <h3 className="text-sm font-bold text-foreground">{benefit.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{benefit.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Process */}
      {service.process && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <SectionLabel>{service.processTitle || "Process"}</SectionLabel>
              <div className="space-y-4">
                {service.process.map((step, i) => (
                  <ScrollReveal key={i} delay={i * 0.06}>
                    <div className="flex gap-4 rounded-sm bg-card p-5">
                      <span className="font-mono-label mt-0.5 text-primary">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <h3 className="text-sm font-bold text-foreground">{step.title}</h3>
                        <p className="mt-1 text-xs text-muted-foreground">{step.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Related expertise */}
      {related.length > 0 && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <SectionLabel>Related Expertise</SectionLabel>
              <div className="grid gap-2 md:grid-cols-3">
                {related.map((r) =>
                  r ? (
                    <Link
                      key={r.id}
                      to={`/services/expertise/${r.id}`}
                      className="group rounded-sm bg-card p-5 transition-all hover:-translate-y-1"
                    >
                      <span className="font-mono-label text-primary">{r.category}</span>
                      <h3 className="mt-1 text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                        {r.title}
                      </h3>
                    </Link>
                  ) : null
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Expert bio */}
      <section className="px-6 py-12 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="flex gap-6 rounded-sm bg-card p-6 md:p-8">
              <img
                src={avatarImg}
                alt="Dave Kelly"
                className="h-16 w-16 flex-shrink-0 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <h3 className="text-base font-bold text-foreground">Your Expert</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.expertBio}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-12 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="mb-4 text-2xl font-bold text-foreground">Interested in this service?</h2>
            <p className="mb-6 text-sm text-muted-foreground">Book a free intro call to discuss your project</p>
            <Button asChild><a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-sm bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-all hover:gap-2.5"
            >
              Book a free call <span>↗</span>
            </a></Button>
          </ScrollReveal>
        </div>
      </section>

      <hr className="swiss-hr mx-6 md:mx-12 lg:mx-24" />
      <AvailabilityCTA />
    </main>
  );
};

export default ServicePage;
