import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import test from "node:test"

const componentSource = readFileSync(
  new URL("../app/components/BallReel.tsx", import.meta.url),
  "utf8",
)

const clips = Array.from(
  componentSource.matchAll(
    /\{ src: "(\/ballvid\d+\.mp4)", poster: "(\/[^"]+)" \}/g,
  ),
  ([, src, poster]) => ({ src, poster }),
)

const expectedClips = [
  { src: "/ballvid1.mp4", poster: "/ballvid1-poster.jpg" },
  { src: "/ballvid2.mp4", poster: "/ballvid2-poster.jpg" },
]

test("the reel contains only the two videos with matching first-frame posters", () => {
  assert.deepEqual(clips, expectedClips)
})

test("both first-frame poster files exist", () => {
  for (const { poster } of expectedClips) {
    const posterUrl = new URL(`../public${poster}`, import.meta.url)
    assert.equal(existsSync(posterUrl), true, `${poster} should exist`)
  }
})
