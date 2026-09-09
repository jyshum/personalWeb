import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const alt = "Jared Shum"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/* Generated rather than a committed file. The old og.png was a picture of the
   previous design and went stale the moment the site changed; this one is built
   from the same palette and art the site actually uses. */
export default async function OpengraphImage() {
  const skull = await readFile(join(process.cwd(), "public/fossil/anky-sheet.png"))
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
        {/* The sheet holds all five pieces; this window shows only the skull. */}
        <div
          style={{
            position: "absolute",
            top: 92,
            right: 74,
            width: 427,
            height: 238,
            display: "flex",
            backgroundImage: `url(${skullSrc})`,
            backgroundSize: "768px 512px",
            backgroundPosition: "-30px -35px",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div style={{ display: "flex", fontSize: 104, color: "#241c14", letterSpacing: "-0.02em" }}>
          Jared Shum
        </div>

        <div style={{ display: "flex", marginTop: 26, fontSize: 30, color: "#5a4a37" }}>
          Exploring the world through people &amp; tech.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 54,
            fontSize: 22,
            letterSpacing: "0.16em",
            color: "#a85a2c",
          }}
        >
          VENTURES · PROJECTS · INTERNSHIPS · TEACHING · FUN
        </div>
      </div>
    ),
    size,
  )
}
