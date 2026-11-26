import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { businessOptions, priceLabel } from "@/data/pricing";

export type BusinessPagesTone = "default" | "dark";

const tones: Record<BusinessPagesTone, { label: string; trigger: string; content: string }> = {
  default: { label: "text-muted-foreground", trigger: "border-border bg-background", content: "border-border bg-popover" },
  // Always-dark surfaces (the tier-details card) ignore the theme tokens.
  dark: { label: "text-white/60", trigger: "border-white/20 bg-white/10 text-white backdrop-blur-sm hover:border-white/40 focus:ring-white/50 focus:ring-offset-0 [&>svg]:opacity-80", content: "border-white/10 bg-neutral-950 text-white" },
};

/** "Pages" dropdown for the Business Site card; options and prices come from the shared catalogue. */
export const BusinessPagesSelect = ({ pages, onChange, tone = "default", labelId = "business-pages-label" }: { pages: number; onChange: (pages: number) => void; tone?: BusinessPagesTone; labelId?: string }) => {
  const t = tones[tone];
  return (
    <div className="w-full">
      <label className={`mb-1.5 block text-xs font-medium ${t.label}`} id={labelId}>Pages</label>
      <Select value={String(pages)} onValueChange={(v) => onChange(Number(v))}>
        <SelectTrigger aria-label="Pages" aria-labelledby={labelId} className={`h-auto w-full justify-between gap-3 rounded-md border px-3 py-2 min-h-12 text-base md:min-h-0 md:text-sm [&>svg]:mr-0.5 ${t.trigger}`}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className={t.content}>
          {businessOptions.map((o) => (
            <SelectItem key={o.id} value={String(o.pages)}>{o.pages} pages — {priceLabel({ id: o.id, name: "", price: o.price, live: o.live })}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
