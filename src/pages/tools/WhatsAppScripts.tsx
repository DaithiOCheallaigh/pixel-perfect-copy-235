import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import ToolLayout from "@/components/tools/ToolLayout";
import EmailGate from "@/components/tools/EmailGate";
import ServiceUpsellCard from "@/components/tools/ServiceUpsellCard";
import { Loader2 } from "lucide-react";

interface Scripts {
  welcome: string;
  away: string;
  faqs: { question: string; answer: string }[];
}

const CopyBtn = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="shrink-0 rounded-md border border-border p-2 text-muted-foreground transition-colors hover:text-primary"
    >
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
    </button>
  );
};

const businessTypes = ["Restaurant", "Salon", "Retail", "Service Business", "Other"];

const WhatsAppScripts = () => {
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [faq1, setFaq1] = useState("");
  const [faq2, setFaq2] = useState("");
  const [faq3, setFaq3] = useState("");
  const [scripts, setScripts] = useState<Scripts | null>(null);
  const [generating, setGenerating] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const handleGenerate = async () => {
    if (!businessName.trim() || !businessType) {
      toast({ title: "Please fill in your business name and type", variant: "destructive" });
      return;
    }
    setGenerating(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-whatsapp-scripts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            businessName: businessName.trim(),
            businessType,
            ownerName: businessName.trim(),
            hours: "9am-6pm",
            offering: businessType,
            takesBookings: true,
            bookingContact: "",
            faq1: faq1.trim(),
            faq2: faq2.trim(),
            faq3: faq3.trim(),
          }),
        }
      );
      if (!res.ok) throw new Error("Generation failed");
      const data = await res.json();
      setScripts(data);
    } catch {
      toast({ title: "Failed to generate scripts — please try again", variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <ToolLayout
      title="WhatsApp Script Generator"
      description="Generate ready-to-use auto-reply scripts for your WhatsApp Business account."
      metaTitle="Free WhatsApp Script Generator — Lacuna Digital"
      metaDescription="Generate WhatsApp Business auto-reply scripts for free. No sign-up required."
    >
      <AnimatePresence mode="wait">
        {!scripts ? (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <Input placeholder="Business name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
            <Select value={businessType} onValueChange={setBusinessType}>
              <SelectTrigger><SelectValue placeholder="Business type" /></SelectTrigger>
              <SelectContent>
                {businessTypes.map((t) => (<SelectItem key={t} value={t}>{t}</SelectItem>))}
              </SelectContent>
            </Select>
            <p className="text-sm font-medium text-muted-foreground">Top FAQs your customers ask (optional)</p>
            <Input placeholder="FAQ 1, e.g. What are your opening hours?" value={faq1} onChange={(e) => setFaq1(e.target.value)} />
            <Input placeholder="FAQ 2" value={faq2} onChange={(e) => setFaq2(e.target.value)} />
            <Input placeholder="FAQ 3" value={faq3} onChange={(e) => setFaq3(e.target.value)} />
            <Button onClick={handleGenerate} disabled={generating} className="w-full">
              {generating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating…</> : "Generate Scripts"}
            </Button>
          </motion.div>
        ) : (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Free preview: greeting */}
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">Greeting Message</p>
              <div className="flex items-start gap-3">
                <p className="flex-1 whitespace-pre-wrap text-sm text-foreground">{scripts.welcome}</p>
                <CopyBtn text={scripts.welcome} />
              </div>
            </div>

            {/* Gated content */}
            {!unlocked ? (
              <div className="space-y-4">
                {/* Blurred previews */}
                <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5">
                  <div className="pointer-events-none select-none blur-sm">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">FAQ Responses</p>
                    <p className="text-sm text-muted-foreground">Your personalised FAQ auto-replies will appear here…</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-card/60">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5">
                  <div className="pointer-events-none select-none blur-sm">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Out-of-Hours Reply</p>
                    <p className="text-sm text-muted-foreground">Your after-hours auto-reply will appear here…</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-card/60">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                <EmailGate toolUsed="whatsapp-scripts" businessType={businessType} ctaLabel="Get your free scripts →" onUnlock={() => setUnlocked(true)} />
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                {scripts.faqs.length > 0 && (
                  <div className="rounded-xl border border-border bg-card p-5">
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-primary">FAQ Responses</p>
                    <div className="space-y-4">
                      {scripts.faqs.map((faq, i) => (
                        <div key={i}>
                          <p className="text-xs font-semibold text-muted-foreground">{faq.question}</p>
                          <div className="mt-1 flex items-start gap-3">
                            <p className="flex-1 whitespace-pre-wrap text-sm text-foreground">{faq.answer}</p>
                            <CopyBtn text={faq.answer} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="rounded-xl border border-border bg-card p-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">Out-of-Hours Reply</p>
                  <div className="flex items-start gap-3">
                    <p className="flex-1 whitespace-pre-wrap text-sm text-foreground">{scripts.away}</p>
                    <CopyBtn text={scripts.away} />
                  </div>
                </div>
                <ServiceUpsellCard
                  title="Want the full WhatsApp Business system set up for you?"
                  description="Free registration, professional setup — I'll handle everything so you can focus on running your business."
                  linkTo="/services#whatsapp"
                />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </ToolLayout>
  );
};

export default WhatsAppScripts;
