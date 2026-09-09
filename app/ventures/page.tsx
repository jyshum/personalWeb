import type { Metadata } from "next"
import ProjectPage from "../components/ProjectPage"

export const metadata: Metadata = {
  title: "Ventures",
  description: "Victory Velocity, a GEO and SEO venture Jared co-founded.",
}

export default function Ventures() {
  return (
    <ProjectPage
      title="Victory Velocity"
      titleHref="https://www.victoryvelocity.ca/"
      logo={{ src: "/vvicon.png", alt: "Victory Velocity" }}
      meta="Co-founder and founding engineer"
    >
      <p>
        We use agentic and deterministic workflows that lift brand visibility across search and AI
        answers.
      </p>
      <p>
        Started with a friend in high school. We took it to Hong Kong, outreached to clients there,
        and have been shipping for paying customers since.
      </p>
    </ProjectPage>
  )
}
