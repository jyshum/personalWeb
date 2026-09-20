import type { Metadata } from "next"
import ProjectPage from "../components/ProjectPage"

export const metadata: Metadata = {
  title: "Internships",
  description: "Software engineer at Graze AI in San Francisco, January to March 2026.",
}

const ORANGE = "text-[#a85a2c]"

export default function Internships() {
  return (
    <ProjectPage
      title="Graze AI"
      titleHref="https://graze.ai/"
      logo={{ src: "/logos-graze.png", alt: "Graze AI" }}
      meta="Software Engineer · San Francisco · Jan to Mar 2026"
      reflection={
        <p>
          First internship was an eye-opener, especially since I was working when I was still in
          High School.
        </p>
      }
    >
      <p>
        Graze&apos;s mission is to help their clients find and connect with their ideal customers
        at conferences and their value proposition is{" "}
        <a
          href="https://www.elastic.co/search-labs/blog/entity-resolution-llm-elasticsearch"
          target="_blank"
          rel="noopener noreferrer"
          className={`${ORANGE} font-bold underline decoration-[#a85a2c]/35 underline-offset-4 transition-colors hover:decoration-[#a85a2c]`}
        >
          Entity Resolution
          <span className="ml-0.5 align-middle text-[0.75em]" aria-hidden="true">
            ↗
          </span>
        </a>
        .
      </p>
      <p>
        I was in the team working on the upstream pipeline that made this possible: a crawler to
        keep compiling new data, and a rule-based system to clean and resolve it, feeding into the
        models that matched companies to conferences.
      </p>
    </ProjectPage>
  )
}
