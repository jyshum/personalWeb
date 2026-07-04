import Reveal from "./Reveal"

const links = [
  { label: "Email", href: "mailto:jaredshum101@gmail.com" },
  { label: "GitHub", href: "https://github.com/jyshum" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jared-shum-a9199034b/" },
  { label: "YouTube", href: "https://www.youtube.com/@CrocEdge" },
  {
    label: "Résumé",
    href: "https://drive.google.com/drive/folders/1IP5qzF3WJvllAlzVZyvNecpdpqAPS6w8",
  },
]

export default function Colophon() {
  return (
    <footer id="contact" className="border-t border-rule">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <Reveal>
          <h2 className="font-serif text-4xl font-semibold tracking-tight sm:text-6xl">
            Let&apos;s build{" "}
            <a
              href="mailto:jaredshum101@gmail.com"
              className="italic text-accent underline decoration-1 underline-offset-8 transition-opacity hover:opacity-70"
            >
              something
            </a>
            .
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-wrap gap-x-8 gap-y-4">
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                {...(href.startsWith("mailto:")
                  ? {}
                  : { target: "_blank", rel: "noopener noreferrer" })}
                className="meta-link text-[12px]"
              >
                {label} ↗
              </a>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="meta mt-16 normal-case tracking-[0.15em]">
            Set in Fraunces &amp; Inter · Built with Next.js · © 2026 Jared Shum
          </p>
        </Reveal>
      </div>
    </footer>
  )
}
