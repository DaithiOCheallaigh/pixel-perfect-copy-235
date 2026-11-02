import type { ComponentType } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { CardGrid } from "../components/case-study/CaseLayout";
import HiringCTA from "../components/HiringCTA";
import { Stage } from "../components/spark-components/Stage";
import ToolRail from "../components/spark-components/ToolRail";
import RecordFlow from "../components/spark-components/RecordFlow";
import { getSparkComponent, nextSparkComponent, type SparkComponentId } from "../data/sparkComponents";
import NotFound from "./NotFound";

const stages: Record<SparkComponentId, ComponentType> = {
  "tool-rail": ToolRail,
  "record-flow": RecordFlow,
};

export default function SparkComponentDetail() {
  const { slug } = useParams();
  const c = getSparkComponent(slug);
  if (!c) return <NotFound />;
  const StageContent = stages[c.id];
  const next = nextSparkComponent(c.id);

  return (
    <main className="overflow-x-hidden pt-24">
      <SEO title={`${c.title} · MedEd Workspace Components`} description={c.summary} noindex />
      <section className="px-6 pb-24 pt-12 md:px-12 md:pb-32 md:pt-20 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              <li><Link to="/work/spark" className="transition-colors hover:text-foreground">MedEd Workspace</Link></li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li><Link to="/work/spark/components" className="transition-colors hover:text-foreground">Components</Link></li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li aria-current="page" className="text-foreground">{c.title}</li>
            </ol>
          </nav>
          <h1 className="mt-6 text-4xl font-black tracking-tighter md:text-5xl">{c.title}</h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">{c.purpose}</p>

          <div key={c.id} className="mt-10 md:mt-12">
            <Stage label={c.title}>
              <StageContent />
            </Stage>
            <p className="mt-3 font-mono-label text-xs text-muted-foreground">{c.hint}</p>
            <p className="mt-1 font-mono-label text-xs text-muted-foreground">{c.source}</p>
          </div>

          <h2 className="mt-16 text-2xl font-bold tracking-tight md:mt-20 md:text-3xl">Why it works</h2>
          <div className="mt-6">
            <CardGrid items={c.benefits.map((b) => ({ title: b.title, desc: b.text }))} columns={2} />
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-sm">
            <Link to="/work/spark/components" className="text-muted-foreground transition-colors hover:text-foreground">← All components</Link>
            {next && (
              <Link to={`/work/spark/components/${next.id}`} className="text-muted-foreground transition-colors hover:text-foreground">Next: {next.title} →</Link>
            )}
          </div>
        </div>
      </section>
      <hr className="swiss-hr mx-6 md:mx-12 lg:mx-24" />
      <HiringCTA />
    </main>
  );
}
