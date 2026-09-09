import Image from "next/image"
import ChangeDinosaur from "./components/ChangeDinosaur"
import FossilNav from "./components/FossilNav"
import SocialLinks from "./components/SocialLinks"

export default function Home() {
  return (
    /* A phone has far more vertical room than the composition needs, so the
       block starts lower there and sits nearer the middle. */
    <main className="mx-auto flex min-h-screen w-full max-w-[940px] flex-col px-[clamp(12px,4vw,32px)] pt-[36vh] sm:pt-[10vh]">
      {/* The fossil arrangement stops short of its own field's right edge, so
          the block's visual centre sits left of the layout centre. That gap is
          the same fraction of the row at every width, so one nudge re-centres
          the whole composition on phone, laptop and monitor alike. Header moves
          with it, keeping the name aligned to the photo's left edge. */}
      <div className="translate-x-[6%]">
        {/* Sized so the pair stays on one line at 320px and up — nowrap, since
            wrapping is the thing that breaks the composition. */}
        <div className="rise flex flex-nowrap items-baseline gap-x-[clamp(8px,2.5vw,16px)] whitespace-nowrap">
        <h1 className="font-display text-[clamp(1.2rem,6vw,3rem)] font-normal tracking-tight">
          Jared Shum
        </h1>
        {/* Krona is a wide face, so this needs a smaller vw factor than a serif
            would to keep the pair on one line at 393px. */}
        <p className="font-krona text-[clamp(6.5px,1.95vw,12px)] tracking-[0.02em] text-ink/75">
          Exploring the world through people &amp; tech.
        </p>
      </div>

      {/* Never stacks. Every part is sized in percentages or clamps so a phone
          gets the same composition at a smaller scale, not a different one. */}
      <div className="mt-[clamp(24px,5vw,48px)] flex items-stretch gap-x-[clamp(8px,2.4vw,36px)]">
        <div className="rise relative w-[30%] max-w-[270px] shrink-0" style={{ "--rise": "90ms" } as React.CSSProperties}>
          <div
            className="absolute inset-0 translate-x-[clamp(3px,0.9vw,8px)] translate-y-[clamp(3px,0.9vw,8px)] bg-[#bd7040]"
            aria-hidden="true"
          />
          <Image
            src="/croatia-hero.jpeg"
            alt="Jared Shum"
            fill
            priority
            sizes="(max-width: 768px) 34vw, 270px"
            className="object-cover object-[50%_70%]"
          />

          <div className="rise absolute left-0 top-full mt-[clamp(10px,2.4vw,28px)] flex items-center gap-x-[clamp(6px,1.6vw,16px)] whitespace-nowrap" style={{ "--rise": "620ms" } as React.CSSProperties}>
            <SocialLinks />
            <p className="font-krona text-[clamp(6px,1.5vw,10px)] tracking-[0.02em] text-ink/70">
              Always happy to chat!
            </p>
          </div>
        </div>

        {/* Sits level with the middle of the photo, pointing at the dig. */}
        <div className="rise flex shrink-0 flex-col items-center justify-center gap-1.5 self-center" style={{ "--rise": "170ms" } as React.CSSProperties}>
          <p className="font-krona text-[clamp(5px,1.3vw,9px)] tracking-[0.02em] text-[#a85a2c]">
            Who am I?
          </p>
          <svg
            viewBox="0 0 32 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-auto w-[clamp(16px,4vw,32px)] text-[#a85a2c]"
            aria-hidden="true"
          >
            <path d="M1 5h29" />
            <path d="M24.5 1 30 5l-5.5 4" />
          </svg>
        </div>

          <div className="min-w-0 flex-1">
            <FossilNav />
          </div>
        </div>
      </div>

      {/* Outside the centring nudge on purpose: this one sits on the page's own
          centre line, apart from the composition. */}
      <div className="rise mt-auto pt-16 pb-[7vh]" style={{ "--rise": "760ms" } as React.CSSProperties}>
        <ChangeDinosaur />
      </div>
    </main>
  )
}
