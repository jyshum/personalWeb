"use client"

const links = [
  { label: "email", href: "mailto:jaredshum101@gmail.com", external: false },
  { label: "linkedin", href: "https://www.linkedin.com/in/jared-shum-a9199034b/", external: true },
  { label: "github", href: "https://github.com/jyshum", external: true },
  { label: "resume", href: "https://drive.google.com/drive/folders/1IP5qzF3WJvllAlzVZyvNecpdpqAPS6w8", external: true },
]

export default function TopBar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: "rgba(255,255,255,0.80)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
      }}
    >
      <div className="max-w-6xl mx-auto px-10 h-14 flex items-center justify-between">

        {/* Left: identity mark */}
        <span className="font-mono text-sm select-none" style={{ color: "#9CA3AF", letterSpacing: "0.08em" }}>
          jared<span style={{ color: "#f97316" }}>.</span>shum
        </span>

        {/* Right: nav links */}
        <div className="flex items-center gap-10">
          {links.map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="font-medium text-xs tracking-[0.15em] uppercase transition-colors duration-300"
              style={{ color: "#6B7280" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#4EC9B0")}
              onMouseLeave={e => (e.currentTarget.style.color = "#6B7280")}
            >
              {label}
            </a>
          ))}
        </div>

      </div>
    </nav>
  )
}
