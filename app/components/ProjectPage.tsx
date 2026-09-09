import type { ReactNode } from "react"
import Image from "next/image"
import BackBone from "./BackBone"

type Props = {
  title: string
  /* When set, the title itself becomes the link to the live thing. */
  titleHref?: string
  /* Organisation mark, sat to the left of the title. */
  logo?: { src: string; alt: string }
  meta: string
  shot?: { src: string; alt: string; width: number; height: number; caption?: string }
  codeHref?: string
  /* Where the back bone points. Defaults home. */
  backHref?: string
  backLabel?: string
  reflection?: ReactNode
  children: ReactNode
}

const ORANGE = "text-[#a85a2c]"

export default function ProjectPage({
  title,
  titleHref,
  logo,
  meta,
  shot,
  codeHref,
  backHref,
  backLabel,
  reflection,
  children,
}: Props) {
  const heading = (
    <h1 className="font-display text-[clamp(1.75rem,6vw,2.75rem)] leading-[1.15] font-normal tracking-tight">
      {/* The mark rides inside the heading as an inline image on align-middle,
          so it centres against the letters rather than against a line box, and
          the heading keeps a normal line-height. That matters because a squashed
          line-height moves where flex reports the baseline, which is what the
          Codebase link aligns to. */}
      {logo && (
        <Image
          src={logo.src}
          alt={logo.alt}
          width={256}
          height={256}
          quality={95}
          className="mr-3.5 inline-block h-[0.86em] w-auto align-[-0.06em] object-contain"
        />
      )}
      {titleHref ? (
        <a
          href={titleHref}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-[#a85a2c]"
        >
          {title}
          <span className="ml-2 align-middle text-[0.4em] tracking-normal" aria-hidden="true">
            ↗
          </span>
        </a>
      ) : (
        title
      )}
    </h1>
  )

  return (
    <main className="mx-auto min-h-screen w-full max-w-[680px] px-4 pt-[8vh] pb-24 sm:px-6">
      <BackBone href={backHref} label={backLabel} />

      {/* leading-none on the title trims the half-leading above the caps, so
          items-center actually centres the mark against the letters rather
          than against an oversized line box. */}
      {/* items-baseline sits the Codebase link on the title's own baseline
          rather than centring it against the title's full height. */}
      <div className="mt-10 flex flex-wrap items-baseline gap-x-3.5 gap-y-2">
        {heading}
        {codeHref && (
          <a
            href={codeHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-krona ml-1 text-[10px] tracking-[0.02em] ${ORANGE} underline decoration-[#a85a2c]/35 underline-offset-4 transition-colors hover:decoration-[#a85a2c]`}
          >
            Codebase
            <span className="ml-1" aria-hidden="true">
              ↗
            </span>
          </a>
        )}
      </div>

      <p className={`font-tagline mt-3 text-[13.5px] tracking-[0.04em] ${ORANGE}`}>{meta}</p>

      <div className="prose mt-8">{children}</div>

      {shot && (
        <figure className="mt-10">
          <Image
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            className="h-auto w-full border border-rule"
          />
          {shot.caption && (
            <figcaption className={`font-krona mt-3 text-[10px] tracking-[0.02em] ${ORANGE}`}>
              {shot.caption}
            </figcaption>
          )}
        </figure>
      )}

      {reflection && (
        <div className={`prose prose-reflection mt-14 ${ORANGE}`}>{reflection}</div>
      )}
    </main>
  )
}
