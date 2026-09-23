/* The ↗ character sits in Unicode's emoji arrow block, so iOS renders it as a
   colour emoji and the quiet text cue turns into a cartoon. Drawing it keeps
   the same mark on every platform and lets it inherit the link's colour.

   Sized in em by the caller so it scales with whatever text it sits in. */
export default function ArrowOut({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`inline-block align-middle ${className}`}
    >
      <path d="M2.2 7.8 7.8 2.2" />
      <path d="M3.6 2.2h4.2v4.2" />
    </svg>
  )
}
