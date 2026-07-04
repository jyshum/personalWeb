import Image from "next/image"
import Reveal from "./Reveal"

export default function NextTeaser() {
  return (
    <section className="border-t border-rule">
      <a
        href="https://www.victoryvelocity.ca/"
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow mb-6">02 — Next</p>
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
              <div className="flex items-center gap-4 sm:gap-5">
                <Image
                  src="/vvicon.png"
                  alt="Victory Velocity mark"
                  width={1074}
                  height={930}
                  className="h-10 w-auto sm:h-12"
                />
                <h2 className="font-serif text-4xl font-medium italic tracking-tight sm:text-5xl">
                  Victory Velocity
                </h2>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint transition-colors group-hover:text-accent">
                victoryvelocity.ca ↗
              </p>
            </div>
            <p className="mt-6 text-ink/70">Something new, in production — 2026.</p>
          </Reveal>
        </div>
      </a>
    </section>
  )
}
