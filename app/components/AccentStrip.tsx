"use client"

import { motion } from "framer-motion"

export default function AccentStrip() {
  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div
        style={{ height: "44px", backgroundColor: "#9CA3AF" }}
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        transition={{ delay: 2.5, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </div>
  )
}
