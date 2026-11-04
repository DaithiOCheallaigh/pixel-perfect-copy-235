import { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import HiringCTA from "../components/HiringCTA";
import { Thumb } from "../components/spark-components/Thumbs";
import { sparkComponents } from "../data/sparkComponents";

export default function SparkComponents() {
  const [live, setLive] = useState<string | null>(null);
  return (
    <main className="overflow-x-hidden pt-24">
      <SEO title="MedEd Workspace Components" description="Pieces of the MedEd Workspace prototype shown on their own, with what each is for and why it works." noindex />
      <section className="px-6 pb-24 pt-12 md:px-12 md:pb-32 md:pt-20 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-black tracking-tighter md:text-6xl">Components</h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Small, well-made pieces of the MedEd Workspace, lifted out of the product so you can see how each one behaves and why it's there.
          </p>
          <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-16 md:gap-6 lg:grid-cols-3">
            {sparkComponents.map((c) => (
              <li key={c.id}>
                <Link
                  to={`/work/spark/components/${c.id}`}
                  onMouseEnter={() => setLive(c.id)}
                  onMouseLeave={() => setLive((v) => (v === c.id ? null : v))}
                  onFocus={() => setLive(c.id)}
                  onBlur={() => setLive((v) => (v === c.id ? null : v))}
                  className="group block rounded-2xl border border-border bg-card p-1.5 transition-colors hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                    <div className="absolute inset-0 transition-transform duration-300 motion-safe:group-hover:scale-[1.01]">
                      <Thumb id={c.id} live={live === c.id} />
                    </div>
                  </div>
                  <div className="px-3 pb-3 pt-4">
                    <h2 className="text-lg font-semibold">{c.title}</h2>
                    <p className="line-clamp-1 text-sm text-muted-foreground">{c.summary}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <hr className="swiss-hr mx-6 md:mx-12 lg:mx-24" />
      <HiringCTA />
    </main>
  );
}
