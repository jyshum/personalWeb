import Reveal from "./Reveal"

const rows = [
  {
    year: "2025",
    title: "ML startup internship",
    org: "Growth-stage ML startup",
    summary:
      "Data preprocessing pipelines cleaning and standardizing 3,000+ conference records to sharpen LLM-based matching, with internal documentation other teams adopted independently.",
    stack: "Python · VBA",
    href: null as string | null,
  },
  {
    year: "2026",
    title: "Cycle Length Prediction",
    org: "Independent ML study",
    summary:
      "Regression pipeline across 895 records. GroupShuffleSplit by subject to prevent leakage; near-zero R² reported honestly as the finding. Eleven automated tests.",
    stack: "Python · scikit-learn · pandas",
    href: "https://github.com/jyshum/Cycle-Regression-Project" as string | null,
  },
]

export default function IndexTable() {
  return (
    <section className="border-t border-rule">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow mb-12">03 — Index</p>
        </Reveal>
        <div>
          {rows.map((row, i) => (
            <Reveal key={row.title} delay={i * 0.06}>
              <div className="grid gap-3 border-t border-rule py-8 sm:grid-cols-[80px_1fr_1.4fr] sm:gap-8">
                <p className="meta pt-1">{row.year}</p>
                <div>
                  {row.href ? (
                    <a
                      href={row.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif text-2xl font-semibold tracking-tight transition-colors hover:text-accent"
                    >
                      {row.title} ↗
                    </a>
                  ) : (
                    <p className="font-serif text-2xl font-semibold tracking-tight">{row.title}</p>
                  )}
                  <p className="meta mt-2 normal-case tracking-[0.15em]">{row.org}</p>
                </div>
                <div>
                  <p className="text-[15px] leading-relaxed text-ink/70">{row.summary}</p>
                  <p className="meta mt-4">{row.stack}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
