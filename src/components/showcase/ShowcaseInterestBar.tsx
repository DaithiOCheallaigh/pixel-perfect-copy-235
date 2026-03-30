import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface Props {
  businessName: string;
  declined: boolean;
  submitted: boolean;
  submittedName: string;
  onInterested: () => void;
  onDecline: () => void;
}

const ShowcaseInterestBar = ({
  businessName,
  declined,
  submitted,
  submittedName,
  onInterested,
  onDecline,
}: Props) => {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-background/80 backdrop-blur-xl shadow-[0_-4px_30px_rgba(0,0,0,0.08)]"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="submitted"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-2 text-sm font-medium text-foreground"
            >
              <Check className="h-4 w-4 text-green-500" />
              Thanks {submittedName} — Dave will be in touch shortly.
            </motion.div>
          ) : declined ? (
            <motion.div
              key="declined"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-4 text-sm"
            >
              <span className="text-muted-foreground">
                No problem — thanks for taking a look.
              </span>
              <a
                href="mailto:dave@lacunadigital.io"
                className="text-xs text-muted-foreground/60 underline hover:text-foreground transition-colors"
              >
                Changed your mind?
              </a>
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="text-sm font-medium text-foreground">
                Like what you see, {businessName}?
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={onInterested}
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Yes, I'm interested
                </Button>
                <Button
                  onClick={onDecline}
                  variant="outline"
                  size="sm"
                  className="text-foreground/70 border-foreground/30 hover:bg-foreground/10 hover:text-foreground"
                >
                  Not for us
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ShowcaseInterestBar;
