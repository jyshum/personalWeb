const FRAMES = [1, 2, 3, 4, 5] as const

type Props = {
  label: string
  href?: string
}

export default function BoneButton({ label, href }: Props) {
  const frames = FRAMES.map((n) => (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img key={n} src={`/bones/femur-${n}.svg`} alt="" aria-hidden className={`f${n}`} />
  ))

  /* No href means the section isn't built yet — render it inert rather than
     giving it a hover it can't honour. */
  if (!href) {
    return (
      <div className="bone bone-soon" aria-disabled="true">
        {frames}
        <span className="bone-label">{label}</span>
      </div>
    )
  }

  return (
    <a href={href} className="bone">
      {frames}
      <span className="bone-label">{label}</span>
    </a>
  )
}
