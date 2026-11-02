import type { ComponentType } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { CaseBlock, CaseHero, CaseSection, CardGrid, Prose } from "../components/case-study/CaseLayout";
import HiringCTA from "../components/HiringCTA";
import { Stage } from "../components/spark-components/Stage";
import ToolRail from "../components/spark-components/ToolRail";
import RecordFlow from "../components/spark-components/RecordFlow";
import { sparkComponents, type SparkComponentId } from "../data/sparkComponents";

const stages: Record<SparkComponentId, ComponentType> = {
  "tool-rail": ToolRail,
  "record-flow": RecordFlow,
};

export default function SparkComponents() {
  return (
    <main className="overflow-x-hidden pt-24">
      <SEO title="MedEd Workspace Components" description="Pieces of the MedEd Workspace prototype shown on their own, with what each is for and why it works." noindex />
      <div className="px-6 pt-8 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <Link to="/work/spark" className="font-mono-label text-muted-foreground transition-colors hover:text-primary">← MedEd Workspace</Link>
        </div>
      </div>
      <CaseHero
        client="Elsevier · MedEd Workspace"
        title="Components"
        summary="Small, well-made pieces of the MedEd Workspace prototype, lifted out of the product so you can see how each one behaves and why it's there."
        meta={[]}
      />

      {sparkComponents.map((c) => {
        const StageContent = stages[c.id];
        return (
          <CaseSection key={c.id} label={`${c.number} · ${c.title}`} title={c.title}>
            <CaseBlock>
              <Prose text={c.purpose} />
            </CaseBlock>
            <CaseBlock title="Why it works">
              <CardGrid items={c.benefits.map((b) => ({ title: b.title, desc: b.text }))} columns={2} />
            </CaseBlock>
            <div>
              <Stage label={c.title}>
                <StageContent />
              </Stage>
              <p className="mt-3 font-mono-label text-xs text-muted-foreground">{c.hint}</p>
              <p className="mt-1 font-mono-label text-xs text-muted-foreground">{c.source}</p>
            </div>
          </CaseSection>
        );
      })}

      <hr className="swiss-hr mx-6 md:mx-12 lg:mx-24" />
      <HiringCTA />
    </main>
  );
}
