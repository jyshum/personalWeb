const FRAMES = [1, 2, 3, 4, 5] as const

/* The same femur art, clipped to its left end — two knobs and a stub of shaft.
   Nothing new was drawn; the wrapper just hides the right 40%. */
export default function BackBone() {
  return (
    <a href="/" className="bone-back" aria-label="Back to home">
      {FRAMES.map((n) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img key={n} src={`/bones/femur-${n}.svg`} alt="" aria-hidden className={`f${n}`} />
      ))}
      <span className="bone-label">Back</span>
    </a>
  )
}
