import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const alt = "Jared Shum"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/* Generated rather than a committed file. The old og.png was a picture of the
   previous design and went stale the moment the site changed; this one is built
   from the same palette and art the site actually uses.

   The skull is its own asset rather than a window onto the sprite sheet. The
   sheet's crop coordinates move every time the artwork is redrawn, and a card
   nobody looks at while developing is exactly where that goes unnoticed. It is
   also flattened onto the paper colour, which keeps the whole card well inside
   the 500KB budget the generator allows for JSX, fonts and images together.

   Everything sits in app/_og rather than assets/, which .gitignore excludes —
   files the build reads from disk have to be committed or the deploy fails.
   The underscore keeps the folder out of the router. */
export default async function OpengraphImage() {
  const [skull, playfair, krona] = await Promise.all([
    readFile(join(process.cwd(), "app/_og/og-skull.png")),
    readFile(join(process.cwd(), "app/_og/PlayfairDisplay.ttf")),
    readFile(join(process.cwd(), "app/_og/KronaOne.ttf")),
  ])
  const skullSrc = `data:image/png;base64,${skull.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#f4e9d5",
          padding: "0 88px",
          position: "relative",
        }}
      >
        <img src={skullSrc} width={476} height={248} alt="" style={{ position: "absolute", top: 88, right: 74 }} />

        <div
          style={{
            display: "flex",
            fontFamily: "Playfair Display",
            fontSize: 104,
            color: "#241c14",
            letterSpacing: "-0.02em",
          }}
        >
          Jared Shum
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Krona One",
            marginTop: 30,
            fontSize: 24,
            letterSpacing: "0.02em",
            color: "#5a4a37",
          }}
        >
          Exploring the world through people &amp; tech.
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Krona One",
            marginTop: 54,
            fontSize: 19,
            letterSpacing: "0.14em",
            color: "#a85a2c",
          }}
        >
          VENTURES · PROJECTS · INTERNSHIPS · TEACHING · FUN
        </div>
      </div>
    ),
    {
      ...size,
      /* Satori reads ttf/otf/woff only, and next/font leaves nothing but woff2
         in the build, so the card carries its own copies. */
      fonts: [
        { name: "Playfair Display", data: playfair, weight: 400, style: "normal" },
        { name: "Krona One", data: krona, weight: 400, style: "normal" },
      ],
    },
  )
}
