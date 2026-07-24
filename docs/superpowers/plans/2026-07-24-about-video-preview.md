# About Video Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make each About reel video preview its own first frame instead of an unrelated basketball photo.

**Architecture:** Preserve the existing `BallReel` component and two-item rotation. Generate a JPEG poster from the first frame of each existing MP4, store the posters beside the videos in `public`, and update only the poster paths in the clip configuration.

**Tech Stack:** Next.js 16.2.1, React 19.2.4, TypeScript, Node.js built-in test runner, macOS AVFoundation

## Global Constraints

- The rotation must contain exactly `/ballvid1.mp4` and `/ballvid2.mp4`, in the existing order.
- Each video must use a poster generated from its own first frame.
- Do not change the About layout, photos, labels, clip order, playback interactions, autoplay behavior, or video files.
- Follow the bundled Next.js video guidance in `node_modules/next/dist/docs/01-app/02-guides/videos.md`.

---

### Task 1: Replace photo posters with first-frame video posters

**Files:**
- Create: `tests/ball-reel-media.test.mjs`
- Create: `public/ballvid1-poster.jpg`
- Create: `public/ballvid2-poster.jpg`
- Modify: `app/components/BallReel.tsx:5-8`

**Interfaces:**
- Consumes: `/ballvid1.mp4` and `/ballvid2.mp4` from the existing `public` directory.
- Produces: `clips` entries shaped as `{ src: string, poster: string }`, with each video mapped to `/ballvidN-poster.jpg`.

- [ ] **Step 1: Write the failing regression test**

Create `tests/ball-reel-media.test.mjs`:

```js
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
```

- [ ] **Step 2: Run the test and verify the regression is reproduced**

Run:

```bash
node --test tests/ball-reel-media.test.mjs
```

Expected: FAIL because the component maps the videos to `ballpic1.jpeg` and
`ballpic3.jpeg`, and the two first-frame poster files do not exist.

- [ ] **Step 3: Generate the two poster files from the videos' first frames**

Run from the repository root:

```bash
swift - <<'SWIFT'
import AVFoundation
import AppKit

for index in 1...2 {
    let input = URL(fileURLWithPath: "public/ballvid\(index).mp4")
    let output = URL(fileURLWithPath: "public/ballvid\(index)-poster.jpg")
    let asset = AVURLAsset(url: input)
    let generator = AVAssetImageGenerator(asset: asset)
    generator.appliesPreferredTrackTransform = true
    let frame = try generator.copyCGImage(at: .zero, actualTime: nil)
    let bitmap = NSBitmapImageRep(cgImage: frame)
    guard let jpeg = bitmap.representation(
        using: .jpeg,
        properties: [.compressionFactor: 0.9]
    ) else {
        fatalError("Could not encode poster \(index)")
    }
    try jpeg.write(to: output)
}
SWIFT
```

Expected: `public/ballvid1-poster.jpg` and
`public/ballvid2-poster.jpg` are created from their corresponding MP4 files.

- [ ] **Step 4: Update the clip poster mappings**

In `app/components/BallReel.tsx`, replace the clip configuration with:

```tsx
const clips = [
  { src: "/ballvid1.mp4", poster: "/ballvid1-poster.jpg" },
  { src: "/ballvid2.mp4", poster: "/ballvid2-poster.jpg" },
]
```

- [ ] **Step 5: Run the focused test and verify it passes**

Run:

```bash
node --test tests/ball-reel-media.test.mjs
```

Expected: PASS with 2 passing tests and 0 failures.

- [ ] **Step 6: Inspect both generated posters**

Run:

```bash
sips -g pixelWidth -g pixelHeight -g format \
  public/ballvid1-poster.jpg public/ballvid2-poster.jpg
```

Expected: both files report JPEG format and non-zero width and height. Open both
with the workspace image viewer and confirm each image matches the opening frame
of its corresponding video.

- [ ] **Step 7: Run project verification**

Run:

```bash
npm run lint
npm run build
```

Expected: both commands exit successfully with no new errors or warnings.

- [ ] **Step 8: Commit the implementation**

```bash
git add app/components/BallReel.tsx \
  tests/ball-reel-media.test.mjs \
  public/ballvid1-poster.jpg \
  public/ballvid2-poster.jpg
git commit -m "fix: preview about videos with their first frames"
```
