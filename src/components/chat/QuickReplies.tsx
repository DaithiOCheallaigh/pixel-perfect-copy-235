import { motion } from "framer-motion";

interface QuickRepliesProps {
  chips: string[];
  onSelect: (chip: string) => void;
  disabled?: boolean;
}

const QuickReplies = ({ chips, onSelect, disabled }: QuickRepliesProps) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.15 }}
    className="flex flex-wrap gap-2 pl-9"
  >
    {chips.map((chip) => (
      <button
        key={chip}
        onClick={() => onSelect(chip)}
        disabled={disabled}
        className="rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-sm text-white/70 transition-all hover:border-primary/40 hover:bg-primary/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-40"
      >
        {chip}
      </button>
    ))}
  </motion.div>
);

export default QuickReplies;
