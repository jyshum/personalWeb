import type { ReactNode } from "react"
import BackBone from "./BackBone"

type Props = {
  title: string
  /* When set, the title itself becomes the link to the live thing. */
  titleHref?: string
  meta: string
  codeHref?: string
  reflection?: ReactNode
  children: ReactNode
}

const ORANGE = "text-[#a85a2c]"

export default function ProjectPage({
  title,
  titleHref,
  meta,
  codeHref,
  reflection,
  children,
}: Props) {
  const heading = (
    <h1 className="font-display mt-10 text-[clamp(2rem,7vw,3.25rem)] font-normal tracking-tight">
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
      <BackBone />

      {heading}

      <p className={`font-tagline mt-3 text-[15px] tracking-[0.04em] ${ORANGE}`}>{meta}</p>

      <div className="prose mt-10">{children}</div>

      {codeHref && (
        <p className="mt-10">
          <a
            href={codeHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-tagline text-[15px] tracking-[0.04em] ${ORANGE} underline decoration-[#a85a2c]/35 underline-offset-4 transition-colors hover:decoration-[#a85a2c]`}
          >
            Codebase
            <span className="ml-1 text-[0.85em]" aria-hidden="true">
              ↗
            </span>
          </a>
        </p>
      )}

      {reflection && (
        <div className={`prose prose-reflection mt-14 ${ORANGE}`}>{reflection}</div>
      )}
    </main>
  )
}
