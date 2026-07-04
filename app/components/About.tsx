import Image from "next/image"
import Reveal from "./Reveal"

export default function About() {
  return (
    <section id="about" className="border-t border-rule">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow mb-12">04 — About</p>
        </Reveal>
        <div className="grid gap-12 sm:grid-cols-[280px_1fr] sm:gap-16">
          <Reveal>
            <Image
              src="/profile.jpg"
              alt="Jared Shum"
              width={1366}
              height={2048}
              className="w-full max-w-[280px] border border-rule grayscale"
            />
            <p className="meta mt-3 normal-case tracking-[0.15em]">Jared Shum, Vancouver BC</p>
          </Reveal>
          <div>
            <Reveal delay={0.08}>
              <p className="text-lg leading-relaxed text-ink/80">
                I&apos;m Jared — a builder in Vancouver working across machine learning and
                full-stack web: training models, deploying them behind real APIs, and
                wrapping them in interfaces people actually use. I like owning things end
                to end — data, model, deployment, product — and explaining them clearly
                along the way.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-ink/80">
                I&apos;m finishing at Lord Byng Secondary and heading to UBC Sauder&apos;s
                Business + Computer Science program (BUCS), Class of 2030. Right now
                I&apos;m looking for technical internships where I can ship and learn fast.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mt-14 border-t border-rule pt-10">
                <p className="eyebrow mb-8">Off the clock</p>
                <p className="text-[15px] leading-relaxed text-ink/70">
                  Basketball — repetition, discipline, and showing up every day.
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
                  YouTube —{" "}
                  <a
                    href="https://www.youtube.com/@CrocEdge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent transition-opacity hover:opacity-70"
                  >
                    @CrocEdge
                  </a>
                  , where Roblox dinosaur games get more editorial rigor than they asked for.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {["/ballpic1.jpeg", "/ballpic2.jpeg", "/ballpic3.jpeg"].map((src) => (
                    <Image
                      key={src}
                      src={src}
                      alt="Basketball"
                      width={400}
                      height={400}
                      className="aspect-square w-full border border-rule object-cover grayscale transition-all duration-500 hover:grayscale-0"
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
