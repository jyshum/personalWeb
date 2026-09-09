/* LinkedIn and GitHub are the official single-path glyphs from Simple Icons
   (CC0) in their brand colours. Gmail is the real four-colour 2020 mark, which
   is why it carries its own viewBox and path list. */
type Link = {
  label: string
  href: string
  viewBox: string
  height: number
  width: number
  paths: { d: string; fill: string }[]
}

const SIZE = 22

const LINKS: Link[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jared-shum-a9199034b/",
    viewBox: "0 0 24 24",
    height: SIZE,
    width: SIZE,
    paths: [
      {
        fill: "#0A66C2",
        d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
      },
    ],
  },
  {
    label: "GitHub",
    href: "https://github.com/jyshum",
    viewBox: "0 0 24 24",
    height: SIZE,
    width: SIZE,
    paths: [
      {
        fill: "#181717",
        d: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
      },
    ],
  },
  {
    label: "Email",
    href: "mailto:jaredshum101@gmail.com",
    viewBox: "52 42 88 66",
    height: SIZE,
    width: Math.round((SIZE * 88) / 66),
    paths: [
      { fill: "#4285f4", d: "M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6" },
      { fill: "#34a853", d: "M120 108h14c3.32 0 6-2.69 6-6V59l-20 15" },
      { fill: "#fbbc04", d: "M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2" },
      { fill: "#ea4335", d: "M72 74V48l24 18 24-18v26L96 92" },
      { fill: "#c5221f", d: "M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2" },
    ],
  },
]

export default function SocialLinks() {
  return (
    <ul className="flex items-center gap-[18px]">
      {LINKS.map(({ label, href, viewBox, width, height, paths }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            aria-label={label}
            className="block opacity-85 transition-opacity hover:opacity-100"
          >
            <svg width={width} height={height} viewBox={viewBox} aria-hidden="true">
              {paths.map((p) => (
                <path key={p.d} d={p.d} fill={p.fill} />
              ))}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  )
}
