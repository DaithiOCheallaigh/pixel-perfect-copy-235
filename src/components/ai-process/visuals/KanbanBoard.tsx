import { motion } from "framer-motion";

const columns = [
  { title: "Backlog", accent: false, tasks: ["Research brief", "Competitor audit"] },
  { title: "In Progress", accent: true, tasks: ["Wireframes", "User flows", "Token spec"] },
  { title: "Done", accent: false, tasks: ["Stakeholder interview", "Heuristic review"] },
];

const KanbanBoard = () => (
  <div className="mx-auto flex max-w-[360px] gap-3">
    {columns.map((col) => (
      <div
        key={col.title}
        className="flex-1 rounded-xl p-3"
        style={{
          background: "#1A1628",
          border: "1px solid rgba(255,255,255,0.08)",
          borderLeft: col.accent ? "2px solid #F471B5" : undefined,
        }}
      >
        <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider"
          style={{ color: col.accent ? "#F471B5" : "rgba(255,255,255,0.4)" }}>
          {col.title}
        </span>
        <div className="space-y-2">
          {col.tasks.map((task) => (
            <motion.div
              key={task}
              className="rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-white"
              style={{ background: "rgba(255,255,255,0.05)" }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {task}
            </motion.div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default KanbanBoard;
