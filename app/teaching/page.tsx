import type { Metadata } from "next"
import ProjectPage from "../components/ProjectPage"

export const metadata: Metadata = {
  title: "Teaching",
  description:
    "Teaching Python and Java at UTG Academy, and leading student council and the business club at Lord Byng.",
}

export default function Teaching() {
  return (
    <ProjectPage
      title="Teaching"
      titleHref="https://utgacademy.com/"
      logo={{ src: "/logos-utg.png", alt: "UTG Academy" }}
      meta="Instructing and leading · 2023 to 2025"
      reflection={<p>These were my roots.</p>}
    >
      <p>
        I taught Python and Java at UTG Academy from 2024 to 2025. Lesson plans covered object
        oriented programming and recursion, built around projects students could actually run
        rather than exercises they could only submit.
      </p>
      <p>
        During high school I was president of student council at Lord Byng, leading a council of 25
        and growing event participation by 68 percent, mostly by fixing how we marketed things
        rather than changing the events themselves.
      </p>
      <p>
        I also ran the business club, where membership grew 186 percent in two months on the back
        of weekly startup simulation workshops.
      </p>
      <p>
        Teaching is the thing I keep coming back to. I got into the tech industry pretty late, so I
        remember clearly what it feels like to be the person in the room who does not get it yet.
      </p>
    </ProjectPage>
  )
}
