const links = [
  { label: "Building", href: "#building" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export default function Masthead() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <a href="#top" className="font-serif text-lg font-semibold tracking-tight">
          Jared Shum
        </a>
        <nav className="flex items-center gap-5 sm:gap-8">
          {links.map(({ label, href }) => (
            <a key={label} href={href} className="meta-link">
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
