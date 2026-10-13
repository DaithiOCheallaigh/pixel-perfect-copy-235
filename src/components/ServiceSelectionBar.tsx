import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { eur, VAT_REGISTERED } from "@/data/pricing";
import { SELECTION_STORAGE_KEY, selectionItems, selectionTotals } from "@/data/serviceEstimates";

/** Floating running total. Prices come from the catalogue by ID, never from the event payload. */
const ServiceSelectionBar = () => {
  const [ids, setIds] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const onChange = (e: CustomEvent<{ id: string }[] | null>) => setIds((e.detail || []).map((s) => s.id));
    window.addEventListener("service-selection-change", onChange as EventListener);
    return () => window.removeEventListener("service-selection-change", onChange as EventListener);
  }, []);

  const items = selectionItems(ids.map((id) => ({ id })));
  const totals = selectionTotals(items);
  const v = VAT_REGISTERED ? " + VAT" : "";

  const handleStart = () => {
    sessionStorage.setItem(SELECTION_STORAGE_KEY, JSON.stringify(items.map((s) => s.id)));
    navigate("/services/start-project");
  };

  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-[200] flex items-center justify-end p-4 md:p-6">
      <AnimatePresence>
        {items.length > 0 && (
          <motion.button
            key="selection-bar"
            type="button"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            onClick={handleStart}
            aria-label={`Get a fixed quote for ${items.length} selected ${items.length === 1 ? "item" : "items"}`}
            className="pointer-events-auto flex items-center gap-3 rounded-full border border-primary/30 bg-background/95 py-2.5 pl-4 pr-2.5 shadow-2xl shadow-primary/20 backdrop-blur-xl transition-all hover:border-primary/50 hover:shadow-primary/30"
            whileTap={{ scale: 0.97 }}
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{items.length}</div>
            <span className="text-left text-sm font-semibold text-foreground">
              <span className="block" data-testid="selection-oneoff">Setup {eur(totals.oneOff)}{v}</span>
              {totals.monthly > 0 && <span className="block text-xs text-muted-foreground" data-testid="selection-monthly">Monthly {eur(totals.monthly)}/mo{v}</span>}
            </span>
            <span className="hidden text-sm font-semibold text-primary sm:inline">Get a fixed quote</span>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <ArrowRight className="h-5 w-5" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceSelectionBar;
