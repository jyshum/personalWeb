import Image from "next/image"
import Reveal from "./Reveal"

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pb-20 pt-16 sm:pb-28 sm:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_340px] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow mb-8">My DMs are open.</p>
          </Reveal>
      <Reveal delay={0.08}>
        <h1 className="font-serif text-[clamp(3.5rem,12vw,8.5rem)] font-semibold leading-[0.95] tracking-tight">
          Jared
          <br />
          Shum
        </h1>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mt-10 max-w-xl text-lg leading-relaxed text-ink/80 sm:text-xl">
          I love building ML systems and impactful products.{" "}
          <span className="font-serif italic">
            Vancouver, BC — UBC Sauder BUCS, Class of 2030.
          </span>
        </p>
      </Reveal>
      <Reveal delay={0.24}>
        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          <a href="mailto:jaredshum101@gmail.com" className="meta-link">
            Email ↗︎
          </a>
          <a
            href="https://github.com/jyshum"
            target="_blank"
            rel="noopener noreferrer"
            className="meta-link"
          >
            GitHub ↗︎
          </a>
          <a
            href="https://www.linkedin.com/in/jared-shum-a9199034b/"
            target="_blank"
            rel="noopener noreferrer"
            className="meta-link"
          >
            LinkedIn ↗︎
          </a>
        </div>
      </Reveal>
        </div>
        <Reveal delay={0.3}>
          <Image
            src="/croatia-hero.jpeg"
            alt="Jared Shum on the Adriatic coast, Croatia"
            width={1200}
            height={1600}
            priority
            className="aspect-[4/5] w-full border border-rule object-cover object-[center_30%]"
          />
        </Reveal>
      </div>
    </section>
  )
}
