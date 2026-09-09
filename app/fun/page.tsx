import type { Metadata } from "next"
import Image from "next/image"
import BackBone from "../components/BackBone"
import BallReel from "../components/BallReel"

export const metadata: Metadata = {
  title: "Fun",
  description:
    "Basketball, a vertical jump grind, and a YouTube channel about dinosaur games.",
}

const ORANGE = "text-[#a85a2c]"

export default function Fun() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[940px] px-4 pt-[8vh] pb-24 sm:px-8">
      <BackBone />

      <h1 className="font-display mt-10 text-[clamp(2rem,7vw,3.25rem)] font-normal tracking-tight">
        Fun!
      </h1>
      <p className={`font-krona mt-4 text-[11px] tracking-[0.02em] ${ORANGE}`}>Off the clock</p>

      <div className="mt-12 grid gap-12 sm:grid-cols-[280px_1fr] sm:gap-14">
        <div className="flex flex-col gap-3">
          <Image
            src="/ballpic1.jpeg"
            alt="Playing basketball"
            width={400}
            height={400}
            className="aspect-square w-full max-w-[280px] border border-rule object-cover"
          />
          <Image
            src="/ballpic3.jpeg"
            alt="Playing basketball"
            width={839}
            height={1287}
            className="aspect-[2/3] w-full max-w-[280px] border border-rule object-cover object-[center_35%]"
          />
        </div>

        <div className="flex flex-col">
          {/* Jared's own copy from the previous build, semicolons in place of
              the original em dashes. */}
          <div className="prose">
            <p>
              Basketball; peaked in high school as a D&amp;3 shooting guard, delaying retirement
              through UBC intramurals.
            </p>
            <p>
              Went on a vertical jump grind; plateaued at 38 inches, started from 29 inches, though
              the community and the skills I picked up in the middle were worth more than the
              number. Documented at{" "}
              <a
                href="https://www.instagram.com/jshum.vert/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${ORANGE} underline decoration-[#a85a2c]/35 underline-offset-4 transition-colors hover:decoration-[#a85a2c]`}
              >
                @jshum.vert
              </a>
              .
            </p>
            <p>
              YouTube;{" "}
              <a
                href="https://www.youtube.com/@CrocEdge"
                target="_blank"
                rel="noopener noreferrer"
                className={`${ORANGE} underline decoration-[#a85a2c]/35 underline-offset-4 transition-colors hover:decoration-[#a85a2c]`}
              >
                @CrocEdge
              </a>
              , filming and playing dinosaur games are my zen, subscribe!
            </p>
          </div>

          <div className="mt-12 flex flex-1 flex-col">
            <BallReel />
          </div>
        </div>
      </div>
    </main>
  )
}
