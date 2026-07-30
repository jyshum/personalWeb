import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import test from "node:test"

function read(relativePath) {
  const file = new URL(`../${relativePath}`, import.meta.url)
  assert.ok(existsSync(file), `${relativePath} should exist`)
  return readFileSync(file, "utf8")
}

function count(source, value) {
  return source.split(value).length - 1
}

function compact(source) {
  return source.replace(/\s+/g, " ").trim()
}

test("hero uses the approved motto and keeps the location line", () => {
  const source = read("app/components/Hero.tsx")

  assert.equal(count(source, "Exploring the world through people and tech."), 1)
  assert.equal(
    count(source, "Vancouver, BC — UBC Sauder BUCS, Class of 2030."),
    1,
  )
  assert.doesNotMatch(source, /I love building ML systems/)
})

test("masthead links to Building, About, and Contact", () => {
  const source = read("app/components/Masthead.tsx")

  assert.match(source, /\{ label: "Building", href: "#building"/)
  assert.match(source, /\{ label: "About", href: "#about"/)
  assert.match(source, /\{ label: "Contact", href: "#contact"/)
  assert.doesNotMatch(source, /\{ label: "Work"/)
})

test("Recently is one static diary entry", () => {
  const source = read("app/components/Recently.tsx")
  const entry =
    "Recently, I saw 2027 internships opening at places like Amazon and Databricks and immediately started stressing about applying—even while on vacation. Then I remembered I’m 17, haven’t taken a single university class, and couldn’t really explain why I wanted one. I think I just want to explore, meet interesting people, and learn, and assumed big tech was the best way to do that. Funny how we stress over things before asking why we want them. I guess figuring that out takes time and a bit of stupidity."

  assert.equal(count(compact(source), entry), 1)
  assert.match(source, /01 — Recently/)
  assert.doesNotMatch(source, /entries\.map|archive|publishedAt/)
})

test("Victory Velocity does not use a homepage screenshot", () => {
  assert.equal(
    existsSync(
      new URL("../public/victory-velocity-shot.png", import.meta.url),
    ),
    false,
  )
})

test("Victory Velocity is a concise feature with exactly one description", () => {
  const source = read("app/components/VictoryVelocity.tsx")
  const description = "Engineering how brands can appear in AI responses."

  assert.match(source, /id="building"/)
  assert.match(source, /02 — Building/)
  assert.equal(count(source, description), 1)
  assert.doesNotMatch(source, /victory-velocity-shot/)
  assert.match(source, /src="\/vvicon\.png"/)
  assert.match(source, /href="https:\/\/www\.victoryvelocity\.ca\/"/)
  assert.doesNotMatch(source, /Generative Engine Optimization|ChatGPT Ads|tech stack/i)
})

test("About keeps its personal content under section 03", () => {
  const source = read("app/components/About.tsx")

  assert.match(source, /03 — About/)
  assert.match(source, /Basketball — peaked in high school as a D&3 shooting guard/)
  assert.match(source, /@CrocEdge/)
  assert.match(source, /filming and playing dinosaur games are my zen, subscribe!/)
  assert.match(source, /<BallReel \/>/)
})

test("SickNote remains a complete demo without resume bullets", () => {
  const source = read("app/components/FeaturedSickNote.tsx")

  assert.match(source, /04 — Also built/)
  assert.match(source, /SickNote turns cough recordings into mel/)
  assert.match(source, /Grad-CAM heatmap/)
  assert.match(source, /Next\.js · TypeScript · FastAPI · PyTorch · Docker · Railway · Vercel/)
  assert.match(source, /src="\/sicknote-shot\.png"/)
  assert.match(source, /href="https:\/\/www\.sicknoteinc\.xyz\/"/)
  assert.match(source, /href="https:\/\/github\.com\/jyshum\/SickNote"/)
  assert.doesNotMatch(source, /const points|<ul|<li/)
})

test("homepage follows the approved interwoven order", () => {
  const source = read("app/page.tsx")
  const renderedSections = [
    ...source.matchAll(
      /<(Hero|Recently|VictoryVelocity|About|FeaturedSickNote|ContactFooter)\s*\/>/g,
    ),
  ].map((match) => match[1])

  assert.deepEqual(renderedSections, [
    "Hero",
    "Recently",
    "VictoryVelocity",
    "About",
    "FeaturedSickNote",
    "ContactFooter",
  ])
  assert.doesNotMatch(source, /NextTeaser|IndexTable/)
})

test("contact footer contains only the established contact routes", () => {
  const source = read("app/components/ContactFooter.tsx")

  assert.match(source, /id="contact"/)
  assert.match(source, /mailto:jaredshum101@gmail\.com/)
  assert.match(source, /https:\/\/github\.com\/jyshum/)
  assert.match(source, /https:\/\/www\.linkedin\.com\/in\/jared-shum-a9199034b\//)
  assert.doesNotMatch(source, /<form|resume|book a call/i)
})
