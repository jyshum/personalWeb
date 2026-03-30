"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="relative">
        <motion.div
          className="relative w-[520px] h-[520px] rounded-full overflow-hidden bg-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image src="/profile.jpg" alt="Jared Shum" fill className="object-cover" />
        </motion.div>

        <motion.h1
          className="absolute bottom-0 left-0 right-0 text-center text-7xl font-bold tracking-tight text-white"
          style={{ textShadow: "2px 2px 0px rgba(251,146,60,1), -2px -2px 0px rgba(251,146,60,1), 2px -2px 0px rgba(251,146,60,1), -2px 2px 0px rgba(251,146,60,1)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Jared Shum
        </motion.h1>
      </div>

      <motion.p
        className="mt-2 text-xl text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        Nice to meet you!
      </motion.p>
    </section>
  )
}
