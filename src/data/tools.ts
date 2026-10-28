import claude from "@/assets/logos/claude.png";
import figma from "@/assets/logos/figma.svg";
import lovable from "@/assets/logos/lovable.png";
import confluence from "@/assets/logos/confluence.svg";
import jira from "@/assets/logos/jira.svg";
import github from "@/assets/logos/github.svg";
import notion from "@/assets/logos/notion.png";
import miro from "@/assets/logos/miro.svg";
import clickup from "@/assets/logos/clickup.svg";
import mixpanel from "@/assets/logos/mixpanel.svg";
import wordpress from "@/assets/logos/wordpress.svg";
import elementor from "@/assets/logos/elementor.svg";
import sketch from "@/assets/logos/sketch.svg";
import adobecreativecloud from "@/assets/logos/adobecreativecloud.svg";
import storybook from "@/assets/logos/storybook.svg";

/** Tool logos for case-study heroes. `icon` empty = label only; `invert` = near-black logo that needs inverting in dark mode. */
export const toolRegistry: Record<string, { name: string; icon: string; invert?: boolean }> = {
  claude: { name: "Claude", icon: claude },
  figma: { name: "Figma", icon: figma },
  lovable: { name: "Lovable", icon: lovable },
  confluence: { name: "Confluence", icon: confluence },
  jira: { name: "Jira", icon: jira },
  github: { name: "GitHub", icon: github, invert: true },
  notion: { name: "Notion", icon: notion, invert: true },
  miro: { name: "Miro", icon: miro, invert: true },
  zeplin: { name: "Zeplin", icon: "" },
  clickup: { name: "ClickUp", icon: clickup },
  mixpanel: { name: "Mixpanel", icon: mixpanel },
  wordpress: { name: "WordPress", icon: wordpress },
  elementor: { name: "Elementor", icon: elementor },
  sketch: { name: "Sketch", icon: sketch },
  adobecreativecloud: { name: "Adobe Creative Cloud", icon: adobecreativecloud },
  nuclino: { name: "Nuclino", icon: "" },
  storybook: { name: "Storybook", icon: storybook },
};

/** Resolves "slug" or "slug:Custom label" entries. */
export const resolveTool = (entry: string) => {
  const [slug, label] = entry.split(/:(.*)/s);
  const known = toolRegistry[slug];
  return { name: label || known?.name || slug, icon: known?.icon ?? "", invert: known?.invert ?? false };
};
