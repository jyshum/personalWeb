import type { Metadata } from "next"
import type { CSSProperties } from "react"
import BackBone from "../components/BackBone"

export const metadata: Metadata = {
  title: "Projects",
  description: "SickNote, a cough classifier, and Rookery, an annotation tool.",
}

const ORANGE = "text-[#a85a2c]"

const PROJECTS = [
  {
    href: "/rookery",
    title: "Rookery",
    meta: "Annotation tooling · 2026",
    blurb:
      "An annotation tool for image data. A four layer Canvas2D renderer, command pattern undo across vector and raster edits, RLE mask export, and 155 tests.",
  },
  {
    href: "/sicknote",
    title: "SickNote",
    meta: "Machine learning · 3rd place, XdHacks Vancouver",
    blurb:
      "A cough classifier. A three model CNN ensemble trained from scratch on 2,267 expert labeled clips, served from FastAPI.",
  },
]

export default function Projects() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[680px] px-4 pt-[8vh] pb-24 sm:px-6">
      <div className="rise">
        <BackBone />
      </div>

      <h1 className="rise font-display mt-10 text-[clamp(2rem,7vw,3.25rem)] font-normal tracking-tight">
        Projects
      </h1>
      <p className={`rise font-krona mt-4 text-[11px] tracking-[0.02em] ${ORANGE}`}>Things I built</p>

      <ul className="mt-12">
        {PROJECTS.map(({ href, title, meta, blurb }, i) => (
          <li
            key={href}
            className="rise border-t border-rule py-9 last:border-b"
            style={{ "--rise": `${140 + i * 90}ms` } as CSSProperties}
          >
            <a href={href} className="group block">
              <h2 className="font-display text-[28px] font-normal tracking-tight transition-colors group-hover:text-[#a85a2c]">
                {title}
                <span className="ml-2 align-middle text-[0.5em] tracking-normal" aria-hidden="true">
                  →
                </span>
              </h2>
              <p className={`font-krona mt-2 text-[10px] tracking-[0.02em] ${ORANGE}`}>{meta}</p>
              <div className="prose mt-4">
                <p>{blurb}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
