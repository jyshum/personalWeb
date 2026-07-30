import Reveal from "./Reveal"

export default function Recently() {
  return (
    <section className="border-t border-rule">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <Reveal>
          <p className="eyebrow mb-8">01 — Recently</p>
          <p className="max-w-3xl text-lg leading-relaxed text-ink/80">
            Recently, I saw 2027 internships opening at places like Amazon and
            Databricks and immediately started stressing about applying—even while
            on vacation. Then I remembered I’m 17, haven’t taken a single university
            class, and couldn’t really explain why I wanted one. I think I just want
            to explore, meet interesting people, and learn, and assumed big tech was
            the best way to do that. Funny how we stress over things before asking
            why we want them. I guess figuring that out takes time and a bit of
            stupidity.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
