import { SEO } from "./SEO";
import type { ComponentProps } from "react";
import { PERSON_NAME, ROLE } from "@/data/profile";

export function PortfolioSEO(props: ComponentProps<typeof SEO>) {
  return <SEO {...props} brand={`${PERSON_NAME} — ${ROLE}`} />;
}