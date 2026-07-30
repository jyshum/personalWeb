import Reveal from "./Reveal"

const links = [
  { label: "Email", href: "mailto:jaredshum101@gmail.com" },
  { label: "GitHub", href: "https://github.com/jyshum" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jared-shum-a9199034b/",
  },
]

export default function ContactFooter() {
  return (
    <footer id="contact" className="border-t border-rule">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <Reveal>
          <p className="eyebrow mb-8">Contact</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map(({ label, href }) => {
              const external = href.startsWith("http")

              return (
                <a
                  key={label}
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="meta-link"
                >
                  {label} ↗︎
                </a>
              )
            })}
          </div>
        </Reveal>
      </div>
    </footer>
  )
}
