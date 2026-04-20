import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ExternalLink, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

interface ShowcaseEntry {
  id: string;
  slug: string;
  business_name: string;
  business_type: string;
  contact_email: string;
  status: string;
  created_at: string;
}

const STATUS_STYLES: Record<string, string> = {
  draft: "bg-muted text-muted-foreground border-border",
  sent: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  viewed: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  interested: "bg-green-500/10 text-green-400 border-green-500/20",
  not_interested: "bg-red-500/10 text-red-400 border-red-500/20",
};

const ShowcasesIndex = () => {
  const [entries, setEntries] = useState<ShowcaseEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Showcases — Internal";
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "robots");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", "noindex, nofollow");

    const fetchEntries = async () => {
      const { data, error } = await supabase
        .from("showcase_entries")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setEntries(data as ShowcaseEntry[]);
      setLoading(false);
    };
    fetchEntries();
  }, []);

  const copyLink = (slug: string) => {
    const url = `${window.location.origin}/showcase/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 1500);
  };

  return (
    <div className="min-h-screen bg-background px-6 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Internal · Proposals
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
            Showcases
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Live previews of every proposal mockup currently shared with prospects. Click a card to open the public showcase view.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : entries.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">No showcases yet. Create one in the admin panel.</p>
            <Link
              to="/showcase/admin"
              className="mt-4 inline-block text-sm text-primary underline hover:text-primary/80"
            >
              Open admin →
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {entries.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group relative rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-semibold text-foreground truncate">
                      {entry.business_name}
                    </h2>
                    {entry.business_type && (
                      <p className="text-sm text-muted-foreground truncate">
                        {entry.business_type}
                      </p>
                    )}
                  </div>
                  <span
                    className={`shrink-0 ml-3 rounded-full border px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider ${STATUS_STYLES[entry.status] ?? STATUS_STYLES.draft}`}
                  >
                    {entry.status.replace("_", " ")}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-muted-foreground mb-5">
                  <p className="font-mono">/showcase/{entry.slug}</p>
                  {entry.contact_email && <p className="truncate">{entry.contact_email}</p>}
                  <p>{new Date(entry.created_at).toLocaleDateString()}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/showcase/${entry.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Open <ExternalLink className="h-3 w-3" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => copyLink(entry.slug)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    {copiedSlug === entry.slug ? (
                      <>
                        <Check className="h-3 w-3" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" /> Copy link
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/showcase/admin"
            className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            Manage in admin →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowcasesIndex;
