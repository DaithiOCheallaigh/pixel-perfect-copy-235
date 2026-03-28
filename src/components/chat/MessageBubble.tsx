import { motion } from "framer-motion";
import type { Message } from "@/lib/daveAI";

const MessageBubble = ({ message, index }: { message: Message; index: number }) => {
  const isBot = message.role === "bot";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`flex ${isBot ? "justify-start" : "justify-end"}`}
    >
      <div className={`flex max-w-[85%] items-end gap-2 ${isBot ? "" : "flex-row-reverse"}`}>
        {isBot && (
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-[10px] font-bold text-primary">
            LD
          </div>
        )}
        <div
          className={
            isBot
              ? "rounded-2xl rounded-tl-sm bg-white/[0.08] px-4 py-3 text-sm leading-relaxed text-white/90"
              : "rounded-2xl rounded-tr-sm border border-primary/30 bg-primary/20 px-4 py-3 text-sm leading-relaxed text-white/90"
          }
        >
          {message.content}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
