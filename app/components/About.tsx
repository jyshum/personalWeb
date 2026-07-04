import Image from "next/image"
import BallReel from "./BallReel"
import Reveal from "./Reveal"

const ballPics = [
  { src: "/ballpic1.jpeg", position: "object-center" },
  { src: "/ballpic2.jpeg", position: "object-center" },
  { src: "/ballpic3.jpeg", position: "object-top" },
]

export default function About() {
  return (
    <section id="about" className="border-t border-rule">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow mb-12">04 — About</p>
        </Reveal>
        <div className="grid gap-12 sm:grid-cols-[280px_1fr] sm:gap-16">
          <Reveal>
            <div className="flex flex-col gap-3">
              {ballPics.map(({ src, position }) => (
                <Image
                  key={src}
                  src={src}
                  alt="Basketball"
                  width={400}
                  height={400}
                  className={`aspect-square w-full max-w-[280px] border border-rule object-cover ${position} grayscale transition-all duration-500 hover:grayscale-0`}
                />
              ))}
            </div>
          </Reveal>
          <div>
            <Reveal delay={0.08}>
              <p className="eyebrow mb-8">Off the clock</p>
              <p className="text-lg leading-relaxed text-ink/80">
                Basketball — peaked in high school as a D&3 shooting guard, delaying
                retirement through UBC intramurals.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-ink/80">
                YouTube —{" "}
                <a
                  href="https://www.youtube.com/@CrocEdge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent transition-opacity hover:opacity-70"
                >
                  @CrocEdge
                </a>
                , filming and playing dinosaur games are my zen, subscribe!
              </p>
            </Reveal>
            <Reveal delay={0.14} className="mt-12">
              <BallReel />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
