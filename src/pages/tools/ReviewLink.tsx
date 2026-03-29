import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Lock, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import ToolLayout from "@/components/tools/ToolLayout";
import EmailGate from "@/components/tools/EmailGate";
import ServiceUpsellCard from "@/components/tools/ServiceUpsellCard";
import { QRCodeSVG } from "qrcode.react";

const ReviewLink = () => {
  const [businessName, setBusinessName] = useState("");
  const [city, setCity] = useState("");
  const [reviewLink, setReviewLink] = useState("");
  const [generating, setGenerating] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!businessName.trim() || !city.trim()) {
      toast({ title: "Please enter your business name and city", variant: "destructive" });
      return;
    }
    setGenerating(true);
    // Manual fallback: construct a Google search review link
    const query = encodeURIComponent(`${businessName.trim()} ${city.trim()}`);
    const link = `https://www.google.com/search?q=${query}&hl=en#lrd=`;
    // More useful: direct search link that leads to the review flow
    const directLink = `https://search.google.com/local/writereview?placeid=manual_lookup_required`;
    // Since we don't have Places API, use a search-based approach
    const searchReviewLink = `https://www.google.com/maps/search/${query}`;
    setReviewLink(searchReviewLink);
    setGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(reviewLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    const svg = document.getElementById("review-qr");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx?.drawImage(img, 0, 0, 512, 512);
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `${businessName.trim().replace(/\s+/g, "-").toLowerCase()}-review-qr.png`;
      a.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <ToolLayout
      title="Google Review Link Generator"
      description="Get a direct Google review link + QR code to share with customers."
      metaTitle="Free Google Review Link Generator — Lacuna Digital"
      metaDescription="Generate a direct Google review link and QR code for your business. Free, no sign-up."
    >
      {!reviewLink ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <Input placeholder="Business name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
          <Input placeholder="Town or city" value={city} onChange={(e) => setCity(e.target.value)} />
          <Button onClick={handleGenerate} disabled={generating} className="w-full">
            Generate Review Link
          </Button>
          <p className="text-xs text-muted-foreground">
            We'll create a Google Maps link for your business. For a direct Place ID review link, get in touch for a free setup.
          </p>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Review link — always visible */}
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">Your Review Link</p>
            <div className="flex items-center gap-3">
              <code className="flex-1 overflow-hidden text-ellipsis rounded-lg bg-muted px-3 py-2 text-sm text-foreground">{reviewLink}</code>
              <button
                onClick={handleCopy}
                className="shrink-0 rounded-md border border-border p-2 text-muted-foreground transition-colors hover:text-primary"
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* QR code — gated */}
          {!unlocked ? (
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5">
                <div className="flex items-center justify-center">
                  <div className="pointer-events-none select-none blur-md">
                    <QRCodeSVG value={reviewLink} size={160} />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-card/60">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </div>
              <EmailGate toolUsed="review-link" businessType="" ctaLabel="Get your free QR code →" onUnlock={() => setUnlocked(true)} />
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-primary">Your QR Code</p>
                <div className="flex flex-col items-center gap-4">
                  <QRCodeSVG id="review-qr" value={reviewLink} size={200} bgColor="transparent" fgColor="hsl(310, 60%, 50%)" />
                  <Button variant="outline" onClick={handleDownloadQR}>
                    <Download className="mr-2 h-4 w-4" /> Download QR Code
                  </Button>
                </div>
              </div>
              <ServiceUpsellCard
                title="Want to show up higher in local search?"
                description="I offer a free Local SEO strategy session — let's get your business found by the right customers."
                linkTo="/services#seo"
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </ToolLayout>
  );
};

export default ReviewLink;
