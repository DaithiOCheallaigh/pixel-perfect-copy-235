import { useState, useCallback, type ReactNode } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import HiringCTA from "../components/HiringCTA";
import { projects, type CaseStage, type CaseImageEntry, type Project } from "../data/projects";
import { SEO } from "../components/SEO";
import { fitDescription } from "@/lib/seoDescription";
import DesignHandoffCarousel from "../components/DesignHandoffCarousel";
import CaseImage from "../components/CaseImage";
import figmaLogo from "@/assets/logos/figma.svg";
import {
  BulletList,
  CardGrid,
  CaseBlock,
  CaseEmbed,
  CaseHero,
  CaseSection,
  CaseVideo,
  MediaGroup,
  NextProject,
  Prose,
  Reflection,
  StatGrid,
  ToolsStrip,
} from "../components/case-study/CaseLayout";

const videoMeta: Record<string, { poster: string; width: number; height: number }> = {
  "/videos/chatgpt-brainstorm.mp4": { poster: "/images/work/chatgpt-brainstorm-poster.webp", width: 1658, height: 1080 },
  "/videos/trip-admit-reel-vistara.mp4": { poster: "/images/work/trip-admit-reel-vistara-poster.webp", width: 720, height: 1280 },
};

const youtubeEmbedUrl = (url: string) => {
  const id = url.match(/[?&]v=([^&]+)/)?.[1] ?? url.split("/").pop();
  return `https://www.youtube-nocookie.com/embed/${id}`;
};

const phaseStage = (num: string): CaseStage =>
  num === "01" ? "research" : num === "02" || num === "03" ? "exploration" : num === "04" ? "solution" : "build";

const caseDescriptions: Record<string, string> = {
  "ai-reviews": "How I designed an AI-powered review tool that helps businesses capture and showcase authentic customer feedback.",
  "digital-tipping": "Designing TipDirect — a frictionless digital tipping experience for hospitality and service workers.",
};

/** Builds the seven-stage story for a data-driven case study. Stages without content are omitted. */
function buildStory(project: Project) {
  const images = project.images ?? [];
  const paired = (key: string) => images.filter((img) => img.with === key);
  const loose = (stage: CaseStage) => images.filter((img) => img.stage === stage && !img.with);
  const phases = project.designProcessDetails ?? [];
  let flip = false;
  const alt = () => (flip = !flip);

  const phaseBlocks = (stage: CaseStage) =>
    phases.filter((ph) => phaseStage(ph.num) === stage).map((ph) => (
      <CaseBlock
        key={ph.num}
        title={`${ph.num} / ${ph.title}`}
        flip={alt()}
        media={ph.num === "05" ? undefined : ph.image ? [{ src: ph.image, alt: ph.title }] : undefined}
      >
        <Prose text={ph.text} />
        {ph.outcomes && (
          <div className="mt-6 rounded-2xl border border-border bg-card p-6">
            <h4 className="mb-2 text-sm font-bold text-foreground">Outcomes</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">{ph.outcomes}</p>
          </div>
        )}
        {ph.num === "05" && <DesignHandoffCarousel />}
      </CaseBlock>
    ));

  const gallery = (stage: CaseStage) => {
    const list = loose(stage);
    return list.length ? <CaseBlock key={`gallery-${stage}`} media={list} /> : null;
  };

  const stages: { stage: CaseStage; label: string; blocks: ReactNode[] }[] = [];
  const push = (stage: CaseStage, label: string, blocks: (ReactNode | null | false | undefined)[]) => {
    const kept = blocks.filter(Boolean) as ReactNode[];
    if (kept.length) stages.push({ stage, label, blocks: kept });
  };

  /* 1. Overview */
  push("overview", "Overview", [
    project.description && (
      <CaseBlock
        key="description"
        title="What it is"
        media={project.mobileImage ? [{ src: project.mobileImage, alt: `${project.title} on mobile` }] : paired("description")}
      >
        <Prose text={project.description} />
      </CaseBlock>
    ),
    project.designProcess && (
      <CaseBlock key="process" title="Process at a glance">
        <CardGrid items={project.designProcess.map((p) => ({ eyebrow: p.num, title: p.title, desc: p.desc }))} />
      </CaseBlock>
    ),
    gallery("overview"),
  ]);

  /* 2. Problem */
  push("problem", "The Challenge", [
    project.challenge && (
      <CaseBlock key="challenge" flip={project.challengeImageRight ? false : true} media={project.challengeImage ? [{ src: project.challengeImage, alt: "The challenge" }] : undefined}>
        <Prose text={project.challenge} />
      </CaseBlock>
    ),
    gallery("problem"),
  ]);

  /* 3. Research & discovery */
  flip = false;
  push("research", "Research & Discovery", [
    (project.researchIntro || project.researchFindings) && (
      <CaseBlock key="research" title="What we learned">
        {project.researchIntro && <Prose text={project.researchIntro} className="mb-8" />}
        {project.researchFindings && (
          <div className="grid gap-8 md:grid-cols-2">
            {project.researchFindings.map((finding) => {
              const [heading, ...rest] = finding.split(": ");
              const points = rest.join(": ").split(". ").filter(Boolean).map((pt) => (pt.endsWith(".") ? pt : `${pt}.`));
              return (
                <div key={heading}>
                  <h4 className="mb-3 text-base font-bold text-foreground">{heading}</h4>
                  <BulletList items={points} />
                </div>
              );
            })}
          </div>
        )}
      </CaseBlock>
    ),
    project.journeyUnderstanding && (
      <CaseBlock key="journey" title="Understanding the passenger journey" media={paired("journey")}>
        <Prose text={project.journeyUnderstanding} />
        {project.journeyStages && (
          <div className="mt-8">
            <CardGrid items={project.journeyStages.map((s) => ({ title: s.phase, desc: s.text }))} />
          </div>
        )}
      </CaseBlock>
    ),
    project.initialApproach && (
      <CaseBlock key="initialApproach" title="Initial approach & user journeys" flip={alt()} media={paired("initialApproach")}>
        <Prose text={project.initialApproach} />
      </CaseBlock>
    ),
    ...phaseBlocks("research"),
    gallery("research"),
  ]);

  /* 4. Exploration & approach */
  flip = false;
  const exploreText = project.explorationDetail || project.exploration;
  push("exploration", "Exploration & Approach", [
    exploreText && (
      <CaseBlock
        key="exploration"
        title="Exploring the idea"
        flip={alt()}
        media={
          project.explorationVideo && videoMeta[project.explorationVideo] ? (
            <CaseVideo src={project.explorationVideo} label="Team brainstorm session" {...videoMeta[project.explorationVideo]} />
          ) : paired("exploration")
        }
      >
        <Prose text={exploreText} />
        {project.sharingMethods && (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.sharingMethods.map((m) => (
              <span key={m} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{m}</span>
            ))}
          </div>
        )}
      </CaseBlock>
    ),
    project.designGoals && (
      <CaseBlock key="designGoals" title="Design goals">
        <CardGrid items={project.designGoals} />
      </CaseBlock>
    ),
    project.trimmingDown && (
      <CaseBlock key="trimmingDown" title="Trimming down the platform" media={paired("trimmingDown")}>
        <Prose text={project.trimmingDown} />
      </CaseBlock>
    ),
    project.engagementConsiderations && (
      <CaseBlock key="engagement" title="Designing for engagement">
        <CardGrid items={project.engagementConsiderations} columns={2} />
        {paired("engagement").length > 0 && <div className="mt-8"><MediaGroup items={paired("engagement")} /></div>}
      </CaseBlock>
    ),
    project.alternativeIntegrations && (
      <CaseBlock key="alternatives" title="Alternative placements considered">
        <CardGrid items={project.alternativeIntegrations} />
      </CaseBlock>
    ),
    ...phaseBlocks("exploration"),
    gallery("exploration"),
  ]);

  /* 5. Solution */
  flip = false;
  const appFeatures = project.features?.map((f) => ({ ...f, image: f.image ?? paired(`feature:${f.title}`)[0]?.src }));
  push("solution", "The Solution", [
    project.solutionIntro && (
      <CaseBlock key="solutionIntro" title="How it works" flip={alt()} media={paired("solutionIntro")}>
        <Prose text={project.solutionIntro} />
      </CaseBlock>
    ),
    project.howItWorks && (
      <CaseBlock key="howItWorks">
        <CardGrid items={project.howItWorks.map((s) => ({ eyebrow: s.step, title: s.title, desc: s.text, image: s.image }))} />
      </CaseBlock>
    ),
    project.buildingTheFeature && (
      <CaseBlock key="buildingTheFeature" title="Building the feature" media={paired("buildingTheFeature")}>
        <Prose text={project.buildingTheFeature} />
      </CaseBlock>
    ),
    project.tippingFlow && (
      <CaseBlock
        key="tippingFlow"
        title="The tipping flow"
        flip={alt()}
        media={project.tippingFlowGif ? [{ src: project.tippingFlowGif, alt: "Tipping flow animation" }] : paired("tippingFlow")}
      >
        <Prose text={project.tippingFlow} />
      </CaseBlock>
    ),
    project.solutionDetail && (
      <CaseBlock key="solutionDetail" title="The chosen placement" flip={alt()} media={paired("solutionDetail")}>
        <Prose text={project.solutionDetail} />
      </CaseBlock>
    ),
    project.atomicDesignSystem && (
      <CaseBlock key="atomic" title="An atomic design system" media={paired("atomic")}>
        <div className="grid gap-8 md:grid-cols-2">
          <Prose text={project.atomicDesignSystem} />
          {project.atomicDesignSystemRight && <Prose text={project.atomicDesignSystemRight} />}
        </div>
      </CaseBlock>
    ),
    project.displayingTours && (
      <CaseBlock key="displayingTours" title="Displaying tours" flip={alt()} media={paired("displayingTours")}>
        <Prose text={project.displayingTours} />
        {project.displayingToursTemplates && (
          <div className="mt-6">
            <BulletList items={project.displayingToursTemplates.map((t) => t.replace(/^([^—]+) —/, "**$1** —"))} />
          </div>
        )}
      </CaseBlock>
    ),
    project.activityDetailPage && (
      <CaseBlock key="activityDetail" title="Activity detail page" flip={alt()} media={paired("activityDetail")}>
        <Prose text={project.activityDetailPage} />
      </CaseBlock>
    ),
    (project.closingTextLeft || project.closingTextRight) && (
      <CaseBlock key="closing" title="Templates for every airline" media={paired("closing")}>
        <div className="grid gap-8 md:grid-cols-2">
          {project.closingTextLeft && <Prose text={project.closingTextLeft} />}
          {project.closingTextRight && <Prose text={project.closingTextRight} />}
        </div>
      </CaseBlock>
    ),
    project.coreFunctionality && (
      <CaseBlock key="coreFunctionality" title="Core functionality">
        <CardGrid items={project.coreFunctionality} columns={2} />
      </CaseBlock>
    ),
    project.designSystemDescription && (
      <CaseBlock key="designSystem" title="Design system" media={paired("designSystem")}>
        <Prose text={project.designSystemDescription} />
      </CaseBlock>
    ),
    project.coreDesignPrinciples && (
      <CaseBlock key="principles" title="Core design principles">
        <CardGrid items={project.coreDesignPrinciples} />
      </CaseBlock>
    ),
    project.mobileAdaptations && (
      <CaseBlock key="mobileAdaptations" title="Mobile adaptations">
        <CardGrid items={project.mobileAdaptations} />
      </CaseBlock>
    ),
    project.componentFocused && (
      <CaseBlock key="componentFocused" title="A component-focused build" media={paired("componentFocused")}>
        <Prose text={project.componentFocused} />
      </CaseBlock>
    ),
    project.componentLibrary && (
      <CaseBlock key="componentLibrary" title="Component library" flip={alt()} media={paired("componentLibrary")}>
        <Prose text={project.componentLibrary} />
      </CaseBlock>
    ),
    project.ecommerce && (
      <CaseBlock key="ecommerce" title="eCommerce" flip={alt()} media={paired("ecommerce")}>
        <Prose text={project.ecommerce} />
      </CaseBlock>
    ),
    ...phaseBlocks("solution"),
    appFeatures && (
      <CaseBlock key="features" title={project.id === "tipdirect-app" ? "Other app features" : "Key features"}>
        <CardGrid items={appFeatures} />
      </CaseBlock>
    ),
    project.vimeoEmbed && (
      <CaseBlock key="vimeo" title="Site walkthrough" media={<CaseEmbed src={project.vimeoEmbed} title={`${project.title} walkthrough`} />} />
    ),
    project.designSystemLinks && (
      <CaseBlock key="dsLinks" title="Explore the design system">
        <div className="flex flex-wrap gap-3">
          {project.designSystemLinks.map((link) => (
            <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary">
              {link.label !== "Design System" && <img src={figmaLogo} alt="" className="no-lightbox h-4 w-4 object-contain" width={16} height={16} loading="lazy" decoding="async" />}
              {link.label} ↗
            </a>
          ))}
        </div>
      </CaseBlock>
    ),
    gallery("solution"),
  ]);

  /* 6. Build, test & launch */
  flip = false;
  push("build", "Build, Test & Launch", [
    project.prototyping && (
      <CaseBlock key="prototyping" title="Prototyping" media={project.youtubeEmbed ? <CaseEmbed src={youtubeEmbedUrl(project.youtubeEmbed)} title={`${project.title} prototype video`} /> : undefined}>
        <Prose text={project.prototyping} />
        {project.prototypingDetails && <div className="mt-8"><CardGrid items={project.prototypingDetails} columns={2} /></div>}
        {project.prototypeLink && (
          <a href={project.prototypeLink} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary">
            View the Figma prototype ↗
          </a>
        )}
      </CaseBlock>
    ),
    ...phaseBlocks("build"),
    project.launchAnalytics && (
      <CaseBlock key="launch" title="Launch & analytics" media={paired("launch")}>
        {project.launchAnalytics.intro && <Prose text={project.launchAnalytics.intro} className="mb-8" />}
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h4 className="mb-3 text-base font-bold text-foreground">Documentation & outreach</h4>
            <BulletList items={project.launchAnalytics.documentation} />
          </div>
          <div>
            <h4 className="mb-3 text-base font-bold text-foreground">Analytics</h4>
            <BulletList items={project.launchAnalytics.analytics} />
          </div>
        </div>
      </CaseBlock>
    ),
    project.launchTraction && (
      <CaseBlock key="launchTraction" title="Launch & traction" flip={alt()} media={paired("launchTraction")}>
        <Prose text={project.launchTraction} />
      </CaseBlock>
    ),
    project.scalingPartnership && (
      <CaseBlock
        key="scaling"
        title="Scaling the white-label solution"
        flip={alt()}
        media={project.scalingVideo && videoMeta[project.scalingVideo] ? <CaseVideo src={project.scalingVideo} label="White-label product reel" {...videoMeta[project.scalingVideo]} /> : undefined}
      >
        <Prose text={project.scalingPartnership} />
      </CaseBlock>
    ),
    project.improvingProduct && (
      <CaseBlock key="improvingProduct" title="Improving the product" flip={alt()} media={paired("improvingProduct")}>
        <Prose text={project.improvingProduct} />
        {project.improvingProductReportLink && (
          <a href={project.improvingProductReportLink} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90">
            View the report ↗
          </a>
        )}
      </CaseBlock>
    ),
    gallery("build"),
  ]);

  /* 7. Outcome & reflection */
  const statItems = project.featureImpact
    ? project.featureImpact.map((f) => ({ eyebrow: f.period, value: f.value, label: f.label, desc: f.description }))
    : project.stats;
  push("outcome", "Outcome & Reflection", [
    project.headlineStat && (
      <CaseBlock key="headline">
        <p className="text-2xl font-black tracking-tight text-foreground md:text-4xl">
          <span className="text-primary">{project.headlineStat.value}</span> {project.headlineStat.label}
        </p>
      </CaseBlock>
    ),
    statItems && statItems.length > 0 && <CaseBlock key="stats"><StatGrid stats={statItems} /></CaseBlock>,
    project.result && (
      <CaseBlock key="result" title="The result">
        <Prose text={project.result} />
      </CaseBlock>
    ),
    project.releaseReception && (
      <CaseBlock key="release" title="Release & reception" flip media={paired("release")}>
        <Prose text={project.releaseReception} />
      </CaseBlock>
    ),
    project.quote && (
      <CaseBlock key="quote">
        <blockquote className="border-l-2 border-primary pl-6">
          <p className="text-lg italic text-foreground md:text-xl">"{project.quote.text}"</p>
          <cite className="mt-4 block text-sm font-semibold not-italic text-muted-foreground">— {project.quote.author}</cite>
        </blockquote>
      </CaseBlock>
    ),
    gallery("outcome"),
    project.newSkills && (
      <CaseBlock key="learned" title="What I learned">
        <Prose text={project.newSkills} />
      </CaseBlock>
    ),
    project.reflection && <Reflection key="reflection" text={project.reflection} />,
  ]);

  return stages;
}

const CaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");

  const handleMainClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "IMG") {
      const img = target as HTMLImageElement;
      if (img.naturalWidth < 200 || img.classList.contains("no-lightbox") || img.closest("nav") || img.closest("a")) return;
      setLightboxSrc(img.src);
      setLightboxAlt(img.alt || "");
    }
  }, []);

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Project not found</h1>
          <Link to="/work" className="mt-4 inline-block text-primary">← Back to Work</Link>
        </div>
      </main>
    );
  }

  const seoDescription = fitDescription(caseDescriptions[project.id] || project.subtitle, project.workDescription, project.description);
  const stages = buildStory(project);
  const meta = [
    ...(project.whatIWorkedOn ? [{ label: "Role", value: project.whatIWorkedOn.join(" · ") }] : []),
    { label: "Timeline", value: project.timeline },
    ...(project.toolsImage ? [{ label: "Tools", value: <ToolsStrip src={project.toolsImage} /> }] : []),
  ];

  return (
    <main className="overflow-x-hidden pt-24" onClick={handleMainClick}>
      <SEO title={project.title} description={seoDescription} image={project.pillImage.startsWith("http") ? project.pillImage : `https://www.lacunadigital.io${project.pillImage}`} />

      <CaseHero
        client={project.client}
        title={project.title}
        summary={project.heroSubtitle || project.subtitle}
        meta={meta}
        actions={
          project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
              View Live ↗
            </a>
          )
        }
        media={project.headerImage && <CaseImage src={project.headerImage} alt={project.title} eager />}
      />

      {stages.map((s) => (
        <CaseSection key={s.stage} label={s.label}>
          {s.blocks}
        </CaseSection>
      ))}

      <NextProject currentId={project.id} />

      <hr className="swiss-hr mx-6 md:mx-12 lg:mx-24" />
      <HiringCTA />

      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-background/95 backdrop-blur-sm"
            onClick={() => setLightboxSrc(null)}
          >
            <button onClick={() => setLightboxSrc(null)} className="absolute right-6 top-6 z-10 text-muted-foreground transition-colors hover:text-foreground" aria-label="Close lightbox">
              <X className="h-8 w-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={lightboxSrc}
              alt={lightboxAlt}
              className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default CaseStudy;
