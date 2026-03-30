"use client"

import { useState } from "react"
import Panel from "./Panel"

export default function SectionGrid() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [active, setActive] = useState<string | null>(null)

  const cardClass = (id: string, clickable: boolean) => `
    bg-gray-50 border border-gray-200 rounded-2xl p-8
    transition-all duration-500
    ${clickable ? "cursor-pointer" : "cursor-default"}
    ${hovered === id ? "scale-[1.12] z-10 relative" : "scale-100"}
    ${hovered && hovered !== id ? "blur-[1.5px] opacity-60" : ""}
  `

  return (
    <>
      <section className="w-1/2 mx-auto py-20 flex gap-6">
        {/* Left column */}
        <div className="flex flex-col gap-6 flex-1">
          <div
            className={cardClass("who", false) + " h-32"}
            onMouseEnter={() => setHovered("who")}
            onMouseLeave={() => setHovered(null)}
          >
            <h2 className="text-xl font-semibold">Who I am</h2>
          </div>
          <div
            className={cardClass("projects", true) + " h-80"}
            onMouseEnter={() => setHovered("projects")}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setActive("projects")}
          >
            <h2 className="text-xl font-semibold">What I&apos;ve built</h2>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6 flex-1">
          <div
            className={cardClass("experience", true) + " h-80"}
            onMouseEnter={() => setHovered("experience")}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setActive("experience")}
          >
            <h2 className="text-xl font-semibold">Work experience</h2>
          </div>
          <div
            className={cardClass("hobbies", true) + " h-32"}
            onMouseEnter={() => setHovered("hobbies")}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setActive("hobbies")}
          >
            <h2 className="text-xl font-semibold">Hobbies</h2>
          </div>
        </div>
      </section>

      <Panel
        id={active}
        onClose={() => setActive(null)}
        direction={active === "projects" ? "left" : "right"}
      />
    </>
  )
}
