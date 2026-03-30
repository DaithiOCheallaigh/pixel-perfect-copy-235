import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Gift, People, TickCircle } from "iconsax-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import ServicesNavigation from "@/components/ServicesNavigation";
import ServicesFooter from "@/components/ServicesFooter";
import { useToast } from "@/hooks/use-toast";

const steps = [
  {
    icon: People,
    num: "1",
    title: "Share your unique link",
    desc: "Share it with a business you think could use our help.",
  },
  {
    icon: TickCircle,
    num: "2",
    title: "They book and pay",
    desc: "Your referral books and pays for a service.",
  },
  {
    icon: Gift,
    num: "3",
    title: "You get a month free",
    desc: "Your next month is completely free. They save €50.",
  },
];

const Refer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Refer a Friend — Lacuna Digital";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Refer a friend to Lacuna Digital and get a month of your service free. They save €50 on setup.");
  }, []);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      toast({ title: "Please enter your name and email", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const { submitLead } = await import("@/lib/submitLead");
      submitLead({
        name: name.trim(),
        email: email.trim(),
        message: `Existing client requesting referral link. Captured via referral page.`,
      });
    } catch {
      // Best-effort
    }
    setDone(true);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ServicesNavigation visible={true} />

      {/* Hero */}
      <section className="px-6 pb-12 pt-32 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-5xl">🎁</span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              Share Lacuna Digital — get a month free
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              If you're a current client and you refer a friend or business contact, you'll get one full month of your service free when they sign up. They get €50 off their setup too.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <SectionLabel>How It Works</SectionLabel>
          </ScrollReveal>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <ScrollReveal key={s.num} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <s.icon variant="TwoTone" className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mt-4 text-base font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-lg">
          <ScrollReveal>
            <div className="rounded-xl border border-border bg-card p-8">
              {!done ? (
                <>
                  <h2 className="text-xl font-bold">Request your referral link</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Dave will email you your unique referral code within 24 hours.
                  </p>
                  <div className="mt-6 space-y-4">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
                      placeholder="Your name"
                    />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
                      placeholder="Your email"
                    />
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
                    >
                      {submitting ? (
                        <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                      ) : (
                        "Request my referral link →"
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <Check className="mx-auto h-10 w-10 text-primary" />
                  <h3 className="mt-4 text-lg font-bold">Request received!</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Dave will email your unique referral code within 24 hours.
                  </p>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Not a client */}
      <section className="px-6 pb-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-lg text-center">
          <p className="text-muted-foreground">
            Not a client yet? Here's what we can do for your business.
          </p>
          <Link
            to="/services"
            className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
          >
            View Services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <ServicesFooter />
    </div>
  );
};

export default Refer;
