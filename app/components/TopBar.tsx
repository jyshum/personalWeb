"use client"

const links = [
  { label: "email", href: "mailto:jaredshum101@gmail.com", external: false },
  { label: "linkedin", href: "https://www.linkedin.com/in/jared-shum-a9199034b/", external: true },
  { label: "github", href: "https://github.com/jyshum", external: true },
  { label: "resume", href: "https://drive.google.com/drive/folders/1IP5qzF3WJvllAlzVZyvNecpdpqAPS6w8", external: true },
]

export default function TopBar() {
  return (
    <div style={{ background: "linear-gradient(to bottom, #3b82f6 0%, #bfdbfe 40%, rgba(219,234,254,0.15) 75%, transparent 100%)" }}
      className="w-full pt-8 pb-24 px-8 flex gap-12 justify-center items-center">
      {links.map(({ label, href, external }) => (
        <a key={label} href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="text-orange-400 font-semibold text-sm tracking-widest uppercase hover:text-white transition-colors duration-200">
          {label}
        </a>
      ))}
    </div>
  )
}