import { SEO } from "@/components/SEO";
import SectionLabel from "@/components/SectionLabel";
import { vatFootnote } from "@/data/pricing";
import { workingTerms } from "@/data/workingTerms";
import { usePageDescription } from "@/hooks/usePageDescription";

const Terms = () => {
  const description = "Plain-English project terms: payment, care plans, revisions, content deadlines and third-party services.";
  usePageDescription(description);
  return (
    <main className="px-6 pb-24 pt-32 md:px-12">
      <SEO title="Terms" description={description} url="/services/terms" />
      <div className="mx-auto max-w-3xl">
        <SectionLabel>Working together</SectionLabel>
        <h1 className="mt-4 text-4xl font-extrabold md:text-6xl">Terms</h1>
        <p className="mt-6 text-lg text-muted-foreground">These terms summarise how I work; your written quote governs each project.</p>
        <div className="mt-12 divide-y divide-border">
          {workingTerms.map(term => <section key={term.title} className="py-8">
            <h2 className="text-xl font-bold">{term.title}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{term.text}</p>
          </section>)}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">{vatFootnote()}</p>
      </div>
    </main>
  );
};
export default Terms;