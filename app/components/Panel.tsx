"use client"

import { motion, AnimatePresence } from "framer-motion"

interface PanelProps {
  id: string | null
  onClose: () => void
  direction?: "left" | "right"
}

const titles: Record<string, string> = {
  projects: "What I've built",
  experience: "Work experience",
  hobbies: "Hobbies",
}

export default function Panel({ id, onClose, direction = "right" }: PanelProps) {
  const startX = direction === "right" ? "100%" : "-100%"

  return (
    <AnimatePresence>
      {id && (
        <motion.div
          key="panel"
          className="fixed inset-0 overflow-y-auto"
          style={{ backgroundColor: "#F0EFEC", zIndex: 9999 }}
          initial={{ x: startX }}
          animate={{ x: 0 }}
          exit={{ x: startX }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Back button */}
          <button
            onClick={onClose}
            className="fixed top-6 left-8 flex items-center gap-2 transition-colors duration-200 font-mono text-xs tracking-widest uppercase"
            style={{ color: "#9CA3AF", background: "none", border: "none", cursor: "pointer" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#f97316")}
            onMouseLeave={e => (e.currentTarget.style.color = "#9CA3AF")}
          >
            ← back
          </button>

          {/* Content area */}
          <div className="flex flex-col items-center justify-center min-h-screen px-16 py-24">
            <p className="font-mono text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "#f97316" }}>
              {id}
            </p>
            <h1
              className="font-serif text-5xl font-bold text-center"
              style={{ color: "#111827", fontFamily: "Georgia, serif" }}
            >
              {titles[id] ?? id}
            </h1>
            <div className="mt-6 w-12 h-px" style={{ backgroundColor: "#f97316" }} />
            <p className="mt-10 text-sm text-center max-w-md" style={{ color: "#9CA3AF" }}>
              Content coming soon.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
