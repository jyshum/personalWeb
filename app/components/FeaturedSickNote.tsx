import Image from "next/image"
import Reveal from "./Reveal"

const points = [
  "Ensemble inference: five independently trained CNNs with averaged predictions",
  "Grad-CAM heatmaps rendered over each mel spectrogram for explainability",
  "Records from the microphone or accepts uploads, with tiered confidence and session history",
  "Decoupled deployment: PyTorch + FastAPI in Docker on Railway; Next.js frontend on Vercel",
]

export default function FeaturedSickNote() {
  return (
    <section id="work" className="border-t border-rule">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow mb-12">01 — Featured work</p>
        </Reveal>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <h2 className="font-serif text-5xl font-semibold tracking-tight sm:text-6xl">
                SickNote
              </h2>
              <p className="meta mt-4">Binary cough classifier — 2026</p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-8 leading-relaxed text-ink/80">
                SickNote turns cough recordings into mel
                spectrograms and classifies them with an ensemble of five convolutional
                neural networks — returning a prediction alongside a Grad-CAM heatmap.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <ul className="mt-8 space-y-3">
                {points.map((point) => (
                  <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-ink/70">
                    <span className="mt-[2px] shrink-0 text-accent">·</span>
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="meta mt-10">
                Next.js · TypeScript · FastAPI · PyTorch · Docker · Railway · Vercel
              </p>
              <div className="mt-6 flex gap-8">
                <a
                  href="https://www.sicknoteinc.xyz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[12px] font-medium uppercase tracking-[0.2em] text-accent transition-opacity hover:opacity-70"
                >
                  Visit ↗
                </a>
                <a
                  href="https://github.com/jyshum/SickNote"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta-link"
                >
                  Source ↗
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <a
              href="https://www.sicknoteinc.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit SickNote — live site"
              className="block overflow-hidden border border-rule transition-colors hover:border-accent"
            >
              <Image
                src="/sicknote-shot.png"
                alt="SickNote — live site"
                width={1440}
                height={900}
                className="h-auto w-full"
              />
            </a>
            <p className="meta mt-3 normal-case tracking-[0.15em]">sicknoteinc.xyz — live</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
