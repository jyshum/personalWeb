import type { Metadata } from "next"
import ProjectPage from "../components/ProjectPage"

export const metadata: Metadata = {
  title: "Internships — Jared Shum",
  description: "Data engineering intern at Graze AI in San Francisco, January to March 2026.",
}

export default function Internships() {
  return (
    <ProjectPage
      title="Graze AI"
      titleHref="https://graze.ai/"
      logo={{ src: "/logos-graze.png", alt: "Graze AI" }}
      meta="Data engineering intern · San Francisco · Jan to Mar 2026"
    >
      <p>
        I preprocessed over 3,000 strings for an LLM pipeline, handling deduplication and
        normalization so the model downstream was not learning from noise.
      </p>
      <p>
        The main build was a conference to company matching pipeline. It used LLM calls to work out
        which events were actually worth a given client&apos;s time, alongside an extraction script
        that parsed conference and company websites into structured JSON.
      </p>
      <p>
        I also wrote the internal documentation for it, which is the part I am most pleased with.
        Non technical teammates could run the data workflows themselves afterwards without coming
        to me.
      </p>
    </ProjectPage>
  )
}
