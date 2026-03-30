"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] })

export default function SectionGrid() {
  const [hovered, setHovered] = useState<string | null>(null)

  const whoRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const experienceRef = useRef<HTMLDivElement>(null)
  const hobbiesRef = useRef<HTMLDivElement>(null)

  const handleLeave = (ref: React.RefObject<HTMLDivElement | null>) => {
    setHovered(null)
    ref.current?.scrollTo({ top: 0, behavior: "smooth" })
  }

  const cardClass = (id: string, clickable: boolean) => `
    relative bg-white rounded-3xl p-9
    transition-all duration-500
    ${clickable ? "cursor-pointer" : "cursor-default"}
    ${hovered === id
      ? "scale-[1.025] z-10"
      : "scale-100"
    }
    ${hovered && hovered !== id ? "opacity-40 scale-[0.99]" : ""}
  `

  const cardStyle = (id: string): React.CSSProperties => ({
    boxShadow: hovered === id
      ? "0 20px 60px rgba(0,0,0,0.13), 0 4px 16px rgba(0,0,0,0.08)"
      : "0 2px 20px rgba(0,0,0,0.07)",
    transition: "box-shadow 0.5s ease, transform 0.5s ease, opacity 0.5s ease",
  })

  return (
    <>
      <motion.section
        className="max-w-[920px] w-full mx-auto py-24 px-4 flex gap-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Left column */}
        <div className="flex flex-col gap-6 flex-1">

          {/* Who I am */}
          <div
            ref={whoRef}
            className={cardClass("who", false) + ` h-[269px] ${hovered === "who" ? "overflow-y-auto" : "overflow-hidden"}`}
            style={cardStyle("who")}
            onMouseEnter={() => setHovered("who")}
            onMouseLeave={() => handleLeave(whoRef)}
          >
            <h2 className={`${playfair.className} leading-none font-bold relative z-10 shrink-0`}
              style={{ fontSize: "64px", color: "#111827" }}>
              Who I am
            </h2>

            <div className={`mt-7 transition-all duration-700 select-none ${
              hovered === "who" ? "blur-0 opacity-100" : "blur-[2px] opacity-50"
            }`}>
              <p className="leading-relaxed" style={{ color: "#4B5563", fontSize: "14.5px" }}>
                Hey, my name is Jared! I&apos;m a high school student based in Vancouver, BC, passionate about building
                in AI, data, and any area where technology can create real value. Through internships, leadership roles,
                and coding projects, I&apos;ve learned how to adapt quickly, solve practical problems, and apply my
                skills where they can make the greatest impact.
              </p>
              <p className="leading-relaxed mt-4" style={{ color: "#4B5563", fontSize: "14.5px" }}>
                My current goal is to gain 1–2 technical internships, gradually expand into product-focused work, and
                ultimately pursue a career as an AI architect or Forward Deployed Engineer. If one of my projects go
                viral and I become a billionaire, I&apos;ll ditch this.
              </p>
            </div>
          </div>

          {/* What I've built */}
          <div
            ref={projectsRef}
            className={cardClass("projects", false) + ` h-[672px] ${hovered === "projects" ? "overflow-y-auto" : "overflow-hidden"}`}
            style={cardStyle("projects")}
            onMouseEnter={() => setHovered("projects")}
            onMouseLeave={() => handleLeave(projectsRef)}
          >
            <h2 className={`${playfair.className} leading-none font-bold relative z-10 shrink-0`}
              style={{ fontSize: "64px", color: "#111827" }}>
              What I&apos;ve built
            </h2>

            <div className={`mt-7 transition-all duration-700 select-none ${
              hovered === "projects" ? "blur-0 opacity-100" : "blur-[2px] opacity-50"
            }`}>
              {/* Project 1 */}
              <div className="mb-9">
                <div className="flex items-baseline justify-between mb-1">
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#f97316" }}>AI / Full-Stack</p>
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>Mar. 2026 – Present</p>
                </div>
                <a href="https://github.com/jyshum/UniPath" target="_blank" rel="noopener noreferrer" className="inline-block mb-1"
                  style={{ color: "#1F2937", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#f97316")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#1F2937")}
                >
                  <h3 className={`${playfair.className} text-[22px] font-bold`}>UniPath AI</h3>
                </a>
                <p className="text-xs mb-3 font-mono" style={{ color: "#9CA3AF" }}>Python · SQLAlchemy · spaCy · Pandas · SQLite</p>
                <ul className="space-y-2">
                  {[
                    "Built an ETL pipeline ingesting live Google Sheets admissions data into SQLite via SQLAlchemy ORM",
                    "Designed a two-layer NLP tagger using keyword matching and spaCy fallback to classify ECs and programs",
                    "Normalized messy inputs: IB grade conversion, school deduplication across 40+ variants, and grade imputation",
                    "Developing a Reddit scraping agent and Next.js frontend to surface accurate acceptance likelihood to users",
                  ].map((point, i) => (
                    <li key={i} className="flex gap-2" style={{ color: "#6B7280", fontSize: "13.5px", lineHeight: "1.6" }}>
                      <span style={{ color: "#FDBA74", marginTop: "2px", flexShrink: 0 }}>·</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ borderTop: "1px solid #F3F4F6", marginBottom: "36px" }} />

              {/* Project 2 */}
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#f97316" }}>ML / Data Science</p>
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>Feb. 2026 – Mar. 2026</p>
                </div>
                <a href="https://github.com/jyshum/Cycle-Regression-Project" target="_blank" rel="noopener noreferrer" className="inline-block mb-1"
                  style={{ color: "#1F2937", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#f97316")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#1F2937")}
                >
                  <h3 className={`${playfair.className} text-[22px] font-bold`}>Menstrual Cycle Length Prediction</h3>
                </a>
                <p className="text-xs mb-3 font-mono" style={{ color: "#9CA3AF" }}>Python · Scikit-Learn · Pandas · NumPy</p>
                <ul className="space-y-2">
                  {[
                    "Built a multiple linear regression pipeline predicting cycle length from lifestyle features across 895 records",
                    "Prevented data leakage using GroupShuffleSplit to split by user identity across 100 unique subjects",
                    "Evaluated model performance against a mean baseline using MAE, RMSE, and R² on held-out test data",
                    "Reported near-zero R² as a valid scientific finding; lifestyle features carry weak predictive signal for cycle length",
                    "Wrote 11 automated tests covering shape integrity, leakage checks, encoding correctness, and scaling validation",
                  ].map((point, i) => (
                    <li key={i} className="flex gap-2" style={{ color: "#6B7280", fontSize: "13.5px", lineHeight: "1.6" }}>
                      <span style={{ color: "#FDBA74", marginTop: "2px", flexShrink: 0 }}>·</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6 flex-1">

          {/* Work experience */}
          <div
            ref={experienceRef}
            className={cardClass("experience", false) + ` h-[672px] ${hovered === "experience" ? "overflow-y-auto" : "overflow-hidden"}`}
            style={cardStyle("experience")}
            onMouseEnter={() => setHovered("experience")}
            onMouseLeave={() => handleLeave(experienceRef)}
          >
            <h2 className={`${playfair.className} leading-none font-bold relative z-10 shrink-0`}
              style={{ fontSize: "64px", color: "#111827" }}>
              Work experience
            </h2>

            <div className={`mt-7 transition-all duration-700 select-none ${
              hovered === "experience" ? "blur-0 opacity-100" : "blur-[2px] opacity-50"
            }`}>
              {/* Entry 1 */}
              <div className="mb-9">
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#f97316" }}>Internship</p>
                <h3 className={`${playfair.className} text-[22px] font-bold mb-3`} style={{ color: "#1F2937" }}>
                  Growth-Stage Company
                </h3>
                <p className="leading-relaxed" style={{ color: "#6B7280", fontSize: "14px" }}>
                  Built data preprocessing pipelines that cleaned and standardized 3,000+ conference records to enhance
                  LLM-based matching, working across VBA and Python. Developed internal documentation to enable other
                  teams to adopt the workflows independently.
                </p>
                <p className="leading-relaxed mt-3 italic" style={{ color: "#9CA3AF", fontSize: "13.5px" }}>
                  The most valuable takeaway was learning to navigate a steep learning curve — asking questions,
                  seeking feedback, and improving with each iteration despite coming in with limited experience.
                </p>
              </div>

              <div style={{ borderTop: "1px solid #F3F4F6", marginBottom: "36px" }} />

              {/* Entry 2 */}
              <div className="mb-9">
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#f97316" }}>Instructor</p>
                <h3 className={`${playfair.className} text-[22px] font-bold mb-3`} style={{ color: "#1F2937" }}>
                  UTG Academy
                </h3>
                <p className="leading-relaxed" style={{ color: "#6B7280", fontSize: "14px" }}>
                  Taught coding to non-technical students, breaking down complex concepts into digestible steps. When
                  a student struggled, I slowed down, isolated each component, and rebuilt their understanding from the
                  ground up.
                </p>
                <p className="leading-relaxed mt-3 italic" style={{ color: "#9CA3AF", fontSize: "13.5px" }}>
                  This experience shaped how I think about communication — the ability to explain clearly is one of the
                  most valuable skills a programmer can have.
                </p>
              </div>

              <div style={{ borderTop: "1px solid #F3F4F6", marginBottom: "36px" }} />

              {/* Entry 3 */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#f97316" }}>Upcoming</p>
                <h3 className={`${playfair.className} text-[22px] font-bold mb-3`} style={{ color: "#1F2937" }}>
                  Repeat-Floral
                </h3>
                <p className="leading-relaxed italic" style={{ color: "#9CA3AF", fontSize: "14px" }}>
                  Full-Stack Developer — starting soon.
                </p>
              </div>
            </div>
          </div>

          {/* Hobbies */}
          <div
            ref={hobbiesRef}
            className={cardClass("hobbies", false) + ` h-[269px] ${hovered === "hobbies" ? "overflow-y-auto" : "overflow-hidden"}`}
            style={cardStyle("hobbies")}
            onMouseEnter={() => setHovered("hobbies")}
            onMouseLeave={() => handleLeave(hobbiesRef)}
          >
            <h2 className={`${playfair.className} leading-none font-bold relative z-10 shrink-0`}
              style={{ fontSize: "64px", color: "#111827" }}>
              Hobbies
            </h2>

            <div className={`mt-7 transition-all duration-700 select-none ${
              hovered === "hobbies" ? "blur-0 opacity-100" : "blur-[2px] opacity-50"
            }`}>

              {/* Basketball */}
              <div className="mb-2">
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#f97316" }}>Basketball</p>
                <div className="flex gap-4 items-start">
                  <p style={{ color: "#4B5563", fontSize: "13.5px", lineHeight: "1.75", flex: 1 }}>
                    Basketball has been one of the biggest parts of my life outside of academics and coding. It has taught me that improvement usually comes from repetition, discipline, and being honest with yourself about what needs work. There were times when I was not the best player on the court, but that pushed me to focus on consistency, effort, and learning from mistakes instead of just chasing quick results. Over time, basketball helped me build resilience, stay competitive, and understand the value of showing up every day even when progress feels slow.
                  </p>
                  <div className="flex flex-col gap-2" style={{ flexShrink: 0 }}>
                    <img src="/ballpic1.jpeg" alt="Basketball" style={{ width: "118px", height: "110px", objectFit: "cover", borderRadius: "14px" }} />
                    <img src="/ballpic2.jpeg" alt="Basketball 2" style={{ width: "118px", height: "110px", objectFit: "cover", borderRadius: "14px" }} />
                  </div>
                </div>
              </div>

              <div style={{ borderTop: "1px solid #F3F4F6", margin: "28px 0" }} />

              {/* YouTube & Gaming */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#f97316" }}>YouTube & Gaming</p>
                  <a href="https://www.youtube.com/@CrocEdge" target="_blank" rel="noopener noreferrer" style={{ lineHeight: 0, flexShrink: 0, opacity: 0.5, transition: "opacity 0.2s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "0.5"}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                </div>
                <p style={{ color: "#4B5563", fontSize: "13.5px", lineHeight: "1.75", marginBottom: "16px" }}>
                  Playing video games, especially Roblox dinosaur games, and making YouTube videos about them has been a more personal and creative hobby for me. It is something I genuinely enjoy, and I think that honesty matters because not every interest has to sound overly serious to still be meaningful. Through it, I learned how creativity, curiosity, and consistency can turn something fun into something more intentional. Making videos also taught me how to think about what other people find interesting, how to present ideas in an engaging way, and how to keep creating even when the results are small at first.
                </p>
                <img
                  src="/ytchannel.png"
                  alt="YouTube Channel"
                  style={{
                    width: "100%",
                    borderRadius: "14px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

            </div>
          </div>

        </div>
      </motion.section>

    </>
  )
}
