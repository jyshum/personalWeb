"use client"

import { motion, AnimatePresence } from "framer-motion"

interface PanelProps {
  id: string | null
  onClose: () => void
  direction?: "left" | "right"
}

export default function Panel({ id, onClose, direction = "right" }: PanelProps) {
  const startX = direction === "right" ? "100%" : "-100%"

  return (
    <AnimatePresence>
      {id && (
        <motion.div
          key="panel"
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "white", zIndex: 9999, overflowY: "auto" }}
          initial={{ x: startX }}
          animate={{ x: 0 }}
          exit={{ x: startX }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <button
            onClick={onClose}
            style={{ position: "absolute", top: 24, left: 24, fontSize: 14, color: "gray", cursor: "pointer", background: "none", border: "none" }}
          >
            ← back
          </button>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
            <h1 style={{ fontSize: 32, color: "#ccc" }}>{id}</h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}