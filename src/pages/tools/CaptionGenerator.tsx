import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Lock, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import ToolLayout from "@/components/tools/ToolLayout";
import EmailGate from "@/components/tools/EmailGate";
import ServiceUpsellCard from "@/components/tools/ServiceUpsellCard";

const businessTypes = ["Restaurant", "Salon", "Retail", "Service Business", "Other"];
const tones = ["Friendly", "Professional", "Witty", "Urgent"];
const platforms = ["Instagram", "Facebook", "LinkedIn"];

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

const CaptionGenerator = () => {
  const [businessType, setBusinessType] = useState("");
  const [postAbout, setPostAbout] = useState("");
  const [tone, setTone] = useState("");
  const [platform, setPlatform] = useState("");
  const [captions, setCaptions] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const handleGenerate = async () => {
    if (!businessType || !postAbout.trim() || !tone || !platform) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setGenerating(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-captions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ businessType, postAbout: postAbout.trim(), tone, platform }),
        }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Generation failed");
      }
      const data = await res.json();
      setCaptions(data.captions);
    } catch (e: any) {
      toast({ title: e.message || "Failed to generate captions", variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <ToolLayout
      title="Social Caption Generator"
      description="AI writes captions with hashtags for any platform, in your tone."
      metaTitle="Free Social Caption Generator — Lacuna Digital"
      metaDescription="Generate social media captions with AI. Tailored to your platform, tone, and business. Free."
    >
      {captions.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <Select value={businessType} onValueChange={setBusinessType}>
            <SelectTrigger><SelectValue placeholder="Business type" /></SelectTrigger>
            <SelectContent>
              {businessTypes.map((t) => (<SelectItem key={t} value={t}>{t}</SelectItem>))}
            </SelectContent>
          </Select>
          <Input placeholder="What's the post about?" value={postAbout} onChange={(e) => setPostAbout(e.target.value)} />
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger><SelectValue placeholder="Tone" /></SelectTrigger>
            <SelectContent>
              {tones.map((t) => (<SelectItem key={t} value={t}>{t}</SelectItem>))}
            </SelectContent>
          </Select>
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger><SelectValue placeholder="Platform" /></SelectTrigger>
            <SelectContent>
              {platforms.map((p) => (<SelectItem key={p} value={p}>{p}</SelectItem>))}
            </SelectContent>
          </Select>
          <Button onClick={handleGenerate} disabled={generating} className="w-full">
            {generating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating…</> : "Generate Captions"}
          </Button>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Caption 1 — free */}
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">Caption 1</p>
            <div className="flex items-start gap-3">
              <p className="flex-1 whitespace-pre-wrap text-sm text-foreground">{captions[0]}</p>
              <CopyBtn text={captions[0]} />
            </div>
          </div>

          {/* Captions 2 & 3 — gated */}
          {!unlocked ? (
            <div className="space-y-4">
              {[1, 2].map((idx) => (
                <div key={idx} className="relative overflow-hidden rounded-xl border border-border bg-card p-5">
                  <div className="pointer-events-none select-none blur-sm">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Caption {idx + 1}</p>
                    <p className="text-sm text-muted-foreground">Another great caption option awaits…</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-card/60">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              ))}
              <EmailGate toolUsed="caption-generator" businessType={businessType} ctaLabel="Get your free captions →" onUnlock={() => setUnlocked(true)} />
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {captions.slice(1).map((cap, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">Caption {i + 2}</p>
                  <div className="flex items-start gap-3">
                    <p className="flex-1 whitespace-pre-wrap text-sm text-foreground">{cap}</p>
                    <CopyBtn text={cap} />
                  </div>
                </div>
              ))}
              <ServiceUpsellCard
                title="Need someone to handle this consistently?"
                description="Ask me about Social Media Setup — I'll create a content system that runs on autopilot."
                linkTo="/services#social"
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </ToolLayout>
  );
};

export default CaptionGenerator;
