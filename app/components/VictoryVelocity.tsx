import Image from "next/image"
import Reveal from "./Reveal"

export default function VictoryVelocity() {
  return (
    <section id="building" className="border-t border-rule">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow mb-12">02 — Building</p>
        </Reveal>
        <div className="max-w-3xl">
          <Reveal>
            <div className="flex items-center gap-4 sm:gap-5">
              <Image
                src="/vvicon.png"
                alt=""
                width={1074}
                height={930}
                className="h-12 w-auto sm:h-14"
              />
              <h2 className="font-serif text-5xl font-semibold tracking-tight sm:text-6xl">
                Victory Velocity
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 text-lg leading-relaxed text-ink/80">
              Engineering how brands can appear in AI responses.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <a
              href="https://www.victoryvelocity.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block font-mono text-[12px] font-medium uppercase tracking-[0.2em] text-accent transition-opacity hover:opacity-70"
            >
              Visit ↗︎
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
