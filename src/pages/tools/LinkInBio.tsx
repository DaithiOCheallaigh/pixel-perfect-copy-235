import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Loader2, ExternalLink, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ToolLayout from "@/components/tools/ToolLayout";
import ServiceUpsellCard from "@/components/tools/ServiceUpsellCard";

const themes = [
  { value: "dark", label: "Dark", bg: "bg-[hsl(0,0%,4%)]", text: "text-white" },
  { value: "light", label: "Light", bg: "bg-white", text: "text-[hsl(0,0%,10%)]" },
  { value: "pink", label: "Brand Pink", bg: "bg-[hsl(310,60%,15%)]", text: "text-white" },
];

interface LinkItem { label: string; url: string }

const LinkInBio = () => {
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [links, setLinks] = useState<LinkItem[]>([{ label: "", url: "" }]);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [theme, setTheme] = useState("dark");
  const [published, setPublished] = useState(false);
  const [slug, setSlug] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const addLink = () => { if (links.length < 6) setLinks([...links, { label: "", url: "" }]); };
  const removeLink = (i: number) => setLinks(links.filter((_, idx) => idx !== i));
  const updateLink = (i: number, field: keyof LinkItem, v: string) => {
    const next = [...links];
    next[i] = { ...next[i], [field]: v };
    setLinks(next);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setLogoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const selectedTheme = themes.find((t) => t.value === theme) || themes[0];
  const validLinks = links.filter((l) => l.label.trim() && l.url.trim());

  const initials = name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handlePublish = async () => {
    if (!name.trim()) { toast({ title: "Please enter a name for your page", variant: "destructive" }); return; }
    if (!userName.trim() || !email.trim()) { toast({ title: "Please enter your name and email to publish", variant: "destructive" }); return; }
    if (validLinks.length === 0) { toast({ title: "Add at least one link", variant: "destructive" }); return; }

    setSubmitting(true);
    const generatedSlug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `user-${Date.now()}`;
    try {
      let uploadedLogoUrl: string | null = null;

      // Upload logo to storage if one was selected
      if (fileInputRef.current?.files?.[0]) {
        const file = fileInputRef.current.files[0];
        const ext = file.name.split(".").pop() || "png";
        const path = `${generatedSlug}-${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("bio-logos")
          .upload(path, file, { upsert: true });
        if (!uploadError) {
          const { data: urlData } = supabase.storage.from("bio-logos").getPublicUrl(path);
          uploadedLogoUrl = urlData.publicUrl;
        }
      }

      await supabase.from("tool_leads" as any).insert({
        name: userName.trim(),
        email: email.trim(),
        tool_used: "link-in-bio",
        business_type: "",
      });
      const { error } = await supabase.from("bio_pages" as any).insert({
        slug: generatedSlug,
        name: name.trim(),
        tagline: tagline.trim(),
        links: validLinks,
        theme,
        email: email.trim(),
        logo_url: uploadedLogoUrl,
      });
      if (error) throw error;
      setSlug(generatedSlug);
      setPublished(true);
    } catch {
      toast({ title: "Failed to publish — please try again", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ToolLayout
      title="Link-in-Bio Builder"
      description="Build a beautiful mobile-optimised link page — no sign-up needed."
      metaTitle="Free Link-in-Bio Builder — Lacuna Digital"
      metaDescription="Create a mobile-optimised link page for free. No sign-up required."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-4">
          <Input placeholder="Name or business name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Tagline (one line)" value={tagline} onChange={(e) => setTagline(e.target.value)} />

          {/* Logo upload */}
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Logo</p>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-border bg-muted transition-colors hover:border-primary"
            >
              {logoPreview ? (
                <img src={logoPreview} alt="Logo" className="h-full w-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">Upload</span>
                </div>
              )}
            </button>
          </div>

          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {themes.map((t) => (<SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>))}
            </SelectContent>
          </Select>

          <p className="text-sm font-medium text-muted-foreground">Links (up to 6)</p>
          {links.map((link, i) => (
            <div key={i} className="flex gap-2">
              <Input placeholder="Label" value={link.label} onChange={(e) => updateLink(i, "label", e.target.value)} className="flex-1" />
              <Input placeholder="https://…" value={link.url} onChange={(e) => updateLink(i, "url", e.target.value)} className="flex-1" />
              {links.length > 1 && (
                <button onClick={() => removeLink(i)} className="shrink-0 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
              )}
            </div>
          ))}
          {links.length < 6 && (
            <Button variant="outline" size="sm" onClick={addLink}><Plus className="mr-1 h-3 w-3" /> Add link</Button>
          )}
        </div>

        {/* Live preview */}
        <div className="flex items-start justify-center">
          <div className={`w-full max-w-[320px] rounded-3xl border border-border ${selectedTheme.bg} p-8 shadow-xl`}>
            <div className="flex flex-col items-center text-center">
              {/* Logo / Initials */}
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo" className="h-full w-full object-cover" />
                ) : (
                  <span className={`text-lg font-bold ${selectedTheme.text === "text-white" ? "text-foreground" : "text-foreground"}`}>
                    {initials || "?"}
                  </span>
                )}
              </div>
              <h2 className={`mt-3 text-lg font-bold ${selectedTheme.text}`}>{name || "Your Name"}</h2>
              <p className={`mt-1 text-sm opacity-70 ${selectedTheme.text}`}>{tagline || "Your tagline"}</p>
              <div className="mt-6 w-full space-y-3">
                {(validLinks.length > 0 ? validLinks : [{ label: "Example Link", url: "#" }]).map((l, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                      theme === "dark" ? "border-white/20 text-white hover:bg-white/10" :
                      theme === "light" ? "border-black/20 text-black hover:bg-black/5" :
                      "border-white/20 text-white hover:bg-white/10"
                    }`}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {l.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Publish gate */}
      {!published ? (
        <div className="mt-8 rounded-xl border border-border bg-card p-6">
          <p className="mb-4 text-sm font-semibold text-foreground">Enter your details to publish and get a shareable link</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input placeholder="Your name" value={userName} onChange={(e) => setUserName(e.target.value)} className="flex-1" />
            <Input placeholder="Your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1" />
            <Button onClick={handlePublish} disabled={submitting} className="shrink-0 whitespace-nowrap">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Publish your page →"}
            </Button>
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 space-y-4">
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 text-center">
            <p className="text-sm font-semibold text-foreground">🎉 Your page is live!</p>
            <a
              href={`/bio/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm font-medium text-primary underline"
            >
              lacunadigital.io/bio/{slug}
            </a>
            <p className="mt-3 text-sm text-muted-foreground">
              We're setting up your page — check your email shortly.<br />
              Want a full website for your business?
            </p>
            <a
              href="https://calendly.com/lacunadigital/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Book a free call →
            </a>
          </div>
          <ServiceUpsellCard
            title="Your link page is live. Ready for a full website?"
            description="Microsites start free — I'll design and build something that truly represents your brand."
            linkTo="/services#website"
          />
        </motion.div>
      )}
    </ToolLayout>
  );
};

export default LinkInBio;
