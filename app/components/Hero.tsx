"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"] })

export default function Hero() {
  const [pfpHovered, setPfpHovered] = useState(false)
  const [pfpAlt, setPfpAlt] = useState(false)

  return (
    <section
      className="relative flex flex-row items-center justify-center min-h-screen gap-20 px-24 overflow-hidden"
      style={{ backgroundColor: "#374151" }}
    >
      {/* Grey panel slides in from left */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: "#4B5563", zIndex: 0 }}
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {/* Dot-grid texture — fades in after panel arrives */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          zIndex: 1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      />

      {/* Ambient orange glow behind name area */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 640px 480px at center, rgba(249,115,22,0.09) 0%, transparent 70%)",
          left: "28%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 1.2 }}
      />

      {/* String name = Jared / Shum */}
      <div className="relative flex items-start gap-5 shrink-0" style={{ zIndex: 10 }}>
        <motion.span
          className="font-mono text-2xl select-none tracking-wide"
          style={{ paddingTop: "52px" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.35 }}
        >
          <span style={{ color: "#4EC9B0" }}>String</span>
          <span style={{ color: "#9CDCFE" }}> name </span>
          <span style={{ color: "#C8C8C8" }}>=</span>
        </motion.span>

        <div className="flex flex-col">
          <motion.h1
            className={`${playfair.className} text-[8rem] font-bold leading-none`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.4 }}
          >
            <span style={{ color: "#f97316" }}>Jared</span><br />
            <span style={{ color: "#f97316" }}>Shum</span>
            <span style={{ color: "#C8C8C8" }} className="font-mono text-[5rem]">;</span>
          </motion.h1>

          <div className="flex gap-2 mt-5">
            {[
              { label: "17 years old", delay: 1.5 },
              { label: "Born in Hong Kong", delay: 1.65 },
              { label: "Lord Byng Secondary", delay: 1.8 },
            ].map(({ label, delay }) => (
              <motion.span
                key={label}
                className="font-mono select-none"
                style={{
                  fontSize: "10.5px",
                  letterSpacing: "0.08em",
                  padding: "5px 12px",
                  borderRadius: "9999px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: "#4EC9B0",
                  cursor: "default",
                  transition: "color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease",
                }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay, duration: 0.3 }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.color = "#f97316"
                  el.style.borderColor = "rgba(249,115,22,0.4)"
                  el.style.backgroundColor = "rgba(249,115,22,0.07)"
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.color = "#4EC9B0"
                  el.style.borderColor = "rgba(255,255,255,0.12)"
                  el.style.backgroundColor = "rgba(255,255,255,0.05)"
                }}
              >
                {label}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Profile picture */}
      <motion.div
        className="relative shrink-0 w-[500px] h-[500px]"
        style={{ zIndex: 10 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.55 }}
      >
        {/* Ring layer */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{
            boxShadow: pfpHovered ? "0 0 0 8px #f97316" : "0 0 0 0px #f97316",
            scale: pfpHovered ? 1.04 : 1,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
        {/* Image layer — clip-path restricts hitbox to circle */}
        <motion.div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{ clipPath: "circle(50%)", backgroundColor: "#6B7280", cursor: "pointer" }}
          animate={{ scale: pfpHovered ? 1.04 : 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onMouseEnter={() => setPfpHovered(true)}
          onMouseLeave={() => setPfpHovered(false)}
          onClick={() => setPfpAlt(prev => !prev)}
        >
          <Image src={pfpAlt ? "/mepic1.jpeg" : "/profile.jpg"} alt="Jared Shum" fill className="object-cover" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute flex flex-col items-center gap-2"
        style={{ bottom: "36px", left: "50%", transform: "translateX(-50%)", zIndex: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.7 }}
      >
        <span
          className="font-mono"
          style={{ color: "#9CA3AF", fontSize: "10px", letterSpacing: "0.3em" }}
        >
          SCROLL
        </span>
        <motion.div
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, #9CA3AF, transparent)",
          }}
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        />
      </motion.div>

    </section>
  )
}
