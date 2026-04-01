import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink } from "lucide-react";

interface BioData {
  name: string;
  tagline: string;
  links: { label: string; url: string }[];
  theme: string;
  logo_url: string | null;
}

const themes: Record<string, { bg: string; text: string; linkBorder: string; linkHover: string }> = {
  dark: { bg: "bg-[hsl(0,0%,4%)]", text: "text-white", linkBorder: "border-white/20", linkHover: "hover:bg-white/10" },
  light: { bg: "bg-white", text: "text-[hsl(0,0%,10%)]", linkBorder: "border-black/20", linkHover: "hover:bg-black/5" },
  pink: { bg: "bg-[hsl(310,60%,15%)]", text: "text-white", linkBorder: "border-white/20", linkHover: "hover:bg-white/10" },
};

const OG_IMAGE = "https://www.lacunadigital.io/og-default.png";
const SITE_TITLE = "Lacuna Digital — Dave Kelly | Digital Designer & UX Strategist";

const BioPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [bio, setBio] = useState<BioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!slug) { setNotFound(true); setLoading(false); return; }
      const { data, error } = await supabase.from("bio_pages" as any).select("name, tagline, links, theme, logo_url").eq("slug", slug).maybeSingle();
      if (error || !data) { setNotFound(true); } else { setBio(data as any); }
      setLoading(false);
    };
    load();
  }, [slug]);

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-background"><div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;
  if (notFound || !bio) return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center text-foreground">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted-foreground">This link page doesn't exist.</p>
      <Link to="/tools/link-in-bio" className="mt-4 text-sm font-medium text-primary underline">Create your own →</Link>
    </div>
  );

  const t = themes[bio.theme] || themes.dark;
  const canonicalUrl = `https://www.lacunadigital.io/bio/${slug}`;

  return (
    <>
      <Helmet>
        <title>{SITE_TITLE}</title>
        <meta name="description" content="Digital Designer & UX Strategist — portfolio, services and tools by Dave Kelly." />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Lacuna Digital" />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content="Digital Designer & UX Strategist — portfolio, services and tools by Dave Kelly." />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content="Digital Designer & UX Strategist — portfolio, services and tools by Dave Kelly." />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Helmet>
      <div className={`flex min-h-screen items-center justify-center ${t.bg} px-6 py-12`}>
        <div className="w-full max-w-[400px]">
          <div className="flex flex-col items-center text-center">
            {/* Logo */}
            {bio.logo_url && (
              <div className="mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-white/10">
                <img src={bio.logo_url} alt={`${bio.name} logo`} className="h-full w-full object-cover" />
              </div>
            )}
            <h1 className={`text-2xl font-bold ${t.text}`}>{bio.name}</h1>
            {bio.tagline && <p className={`mt-2 text-sm opacity-70 ${t.text}`}>{bio.tagline}</p>}
            <div className="mt-8 w-full space-y-3">
              {bio.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3.5 text-sm font-medium transition-colors ${t.linkBorder} ${t.text} ${t.linkHover}`}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  {link.label}
                </a>
              ))}
            </div>
            <p className={`mt-10 text-xs opacity-40 ${t.text}`}>
              Built with <a href="/tools/link-in-bio" className="underline">Lacuna Digital</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BioPage;
