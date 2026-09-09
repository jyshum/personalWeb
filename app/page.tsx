import Image from "next/image"
import BoneButton from "./components/BoneButton"
import SocialLinks from "./components/SocialLinks"

/* Labels are kept short on purpose: the bone gives ~74px of readable width,
   so "Victory Velocity" overflows and "VV" does not. Entries without an href
   render inert. */
const BONES = [
  { id: "vv", label: "VV", href: "#" },
  { id: "rookery", label: "Rookery", href: "#" },
  { id: "sicknote", label: "SickNote", href: "/sicknote" },
  { id: "graze", label: "Graze", href: "#" },
  { id: "teaching", label: "Teaching", href: "#" },
  { id: "fun", label: "Fun!", href: "#" },
  { id: "soon-1", label: "Soon" },
  { id: "soon-2", label: "Soon" },
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-4 pt-[15vh] sm:px-6">
      {/* Full width on a phone so nothing can overflow; on wider screens the
          name row sets the block width and everything shares its left edge. */}
      <div className="w-full sm:w-fit">
        {/* Sized so the pair stays on one line at 320px and up — nowrap, since
            wrapping is the thing that breaks the composition. */}
        <div className="flex flex-nowrap items-baseline gap-x-4 whitespace-nowrap">
          <h1 className="font-display text-[clamp(1.35rem,6.6vw,3rem)] font-normal tracking-tight">
            Jared Shum
          </h1>
          <p className="font-tagline text-[clamp(10px,2.85vw,15px)] tracking-[0.04em] text-ink/75">
            Exploring the world through people &amp; tech
          </p>
        </div>

        {/* items-stretch pins the photo to the bone column's exact height, and
            object-cover trims to get there. object-position biases that trim
            toward the sky so the foreground survives. */}
        {/* The photo is flex-1 rather than a fixed width: it absorbs whatever
            the bones and the label leave, so the row fits any screen without
            stacking. The gap is what shrinks on a phone, not the arrangement. */}
        <div className="mt-10 flex w-full items-stretch gap-x-5 sm:gap-x-9">
          <div className="relative min-w-0 flex-1">
            {/* Offset slab reading as a hard shadow. Pokes out bottom-right
                only, so the left rule stays clean. */}
            <div
              className="absolute inset-0 translate-x-[8px] translate-y-[8px] bg-[#bd7040]"
              aria-hidden="true"
            />
            <div className="relative h-full w-full">
              <Image
                src="/croatia-hero.jpeg"
                alt="Jared Shum"
                fill
                priority
                sizes="(max-width: 640px) 60vw, 270px"
                className="object-cover object-[50%_70%]"
              />
            </div>

            {/* Absolute so the icons hang below the block without shortening
                the photo — the box keeps its full bone-column height. */}
            <div className="absolute left-0 top-full mt-8 flex items-center gap-x-4 whitespace-nowrap">
              <SocialLinks />
              <p className="font-tagline text-[13px] tracking-[0.03em] text-ink/70">
                Always happy to chat!
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-center justify-center gap-2">
            <p className="font-tagline text-[12px] tracking-[0.03em] text-[#a85a2c]">Who am I?</p>
            <svg
              width="32"
              height="10"
              viewBox="0 0 32 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#a85a2c]"
              aria-hidden="true"
            >
              <path d="M1 5h29" />
              <path d="M24.5 1 30 5l-5.5 4" />
            </svg>
          </div>

          <nav className="flex shrink-0 flex-col items-center" aria-label="Sections">
            {BONES.map(({ id, label, href }) => (
              <BoneButton key={id} label={label} href={href} />
            ))}
          </nav>
        </div>
      </div>
    </main>
  )
}
