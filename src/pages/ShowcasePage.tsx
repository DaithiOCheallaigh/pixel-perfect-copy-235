import { useEffect, useState, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ShowcaseInterestBar from "@/components/showcase/ShowcaseInterestBar";
import ShowcaseInterestModal from "@/components/showcase/ShowcaseInterestModal";
import ShowcaseNotFound from "@/components/showcase/ShowcaseNotFound";
import { Loader2 } from "lucide-react";

// Registry of showcase mockup components by slug
const MOCKUP_REGISTRY: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  "niall-keady": lazy(() => import("@/components/showcase/mockups/NiallKeadyShowcase")),
  "dc-woodworks": lazy(() => import("@/components/showcase/mockups/DCWoodworksShowcase")),
};

interface ShowcaseEntry {
  id: string;
  slug: string;
  business_name: string;
  business_type: string;
  contact_email: string;
  status: string;
}

const ShowcasePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [entry, setEntry] = useState<ShowcaseEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [declined, setDeclined] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const fetchEntry = async () => {
      const { data, error } = await supabase
        .from("showcase_entries")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error || !data) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setEntry(data as ShowcaseEntry);
      setLoading(false);

      // Mark as viewed if status is "sent"
      if (data.status === "sent") {
        await supabase.rpc("update_showcase_status", {
          p_slug: slug,
          p_new_status: "viewed",
        });
      }
    };

    fetchEntry();
  }, [slug]);

  // Set document title
  useEffect(() => {
    if (entry) {
      document.title = entry.business_name;
      // Add noindex meta
      let meta = document.querySelector('meta[name="robots"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "robots");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", "noindex, nofollow");
    }
    return () => {
      document.title = "Lacuna Digital";
      const meta = document.querySelector('meta[name="robots"]');
      if (meta) meta.setAttribute("content", "");
    };
  }, [entry]);

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  );
  if (notFound) return <ShowcaseNotFound />;
  if (!entry) return null;

  const handleInterested = () => setModalOpen(true);

  const handleDecline = async () => {
    setDeclined(true);
    await supabase.rpc("update_showcase_status", {
      p_slug: entry.slug,
      p_new_status: "not_interested",
    });
  };

  const handleSubmitSuccess = (name: string) => {
    setSubmittedName(name);
    setSubmitted(true);
    setModalOpen(false);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const MockupComponent = slug ? MOCKUP_REGISTRY[slug] : null;

  return (
    <div className="min-h-screen bg-background pb-24">
      {MockupComponent ? (
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        }>
          <MockupComponent />
        </Suspense>
      ) : (
        <div className="flex items-center justify-center min-h-[60vh] text-muted-foreground">
          <p className="text-lg">Showcase content for <strong>{entry.business_name}</strong></p>
        </div>
      )}

      {/* Lacuna badge */}
      <a
        href="https://lacunadigital.io"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 left-4 z-40 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 px-3 py-1.5 text-[11px] text-muted-foreground/70 hover:text-foreground transition-colors shadow-sm"
      >
        Preview by <span className="font-medium">Lacuna Digital</span>
      </a>

      <ShowcaseInterestBar
        businessName={entry.business_name}
        declined={declined}
        submitted={submitted}
        submittedName={submittedName}
        onInterested={handleInterested}
        onDecline={handleDecline}
      />

      <ShowcaseInterestModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        entry={entry}
        onSuccess={handleSubmitSuccess}
      />
    </div>
  );
};

export default ShowcasePage;
