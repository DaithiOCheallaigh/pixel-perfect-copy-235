import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { businessOptions, priceLabel } from "@/data/pricing";

/** "Pages" dropdown for the Business Site card; options and prices come from the shared catalogue. */
export const BusinessPagesSelect = ({ pages, onChange }: { pages: number; onChange: (pages: number) => void }) => (
  <div className="w-full">
    <label className="mb-1.5 block text-xs font-medium text-muted-foreground" id="business-pages-label">Pages</label>
    <Select value={String(pages)} onValueChange={(v) => onChange(Number(v))}>
      <SelectTrigger aria-label="Pages" aria-labelledby="business-pages-label" className="h-auto w-full justify-between gap-3 rounded-md border border-border bg-background px-3 py-2 text-sm [&>svg]:mr-0.5">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="border-border bg-popover">
        {businessOptions.map((o) => (
          <SelectItem key={o.id} value={String(o.pages)}>{o.pages} pages — {priceLabel({ id: o.id, name: "", price: o.price, live: o.live })}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
