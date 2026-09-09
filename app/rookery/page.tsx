import type { Metadata } from "next"
import ProjectPage from "../components/ProjectPage"

export const metadata: Metadata = {
  title: "Rookery",
  description:
    "An annotation tool built on a four layer Canvas2D renderer, with command pattern undo and RLE mask export.",
}

export default function Rookery() {
  return (
    <ProjectPage
      title="Rookery"
      backHref="/projects"
      backLabel="Back to projects"
      meta="Annotation tooling · 2026"
      shot={{
        src: "/rookery-shot.png",
        alt: "Rookery annotating a lab bench photo, with the label schema on the right",
        width: 1800,
        height: 1022,
        caption: "Masking a pipette tip across a lab bench dataset",
      }}
      codeHref="https://github.com/jyshum/Rookery"
      reflection={
        <p>
          I might begin improving this by adding in object detection tracking, so the app can take
          videos rather than only stills.
        </p>
      }
    >
      <p>
        An annotation tool for image data. The renderer is four Canvas2D layers split by how often
        each one actually needs repainting, which cut 1,800 redraws a second down to something a
        laptop can hold sixty frames through.
      </p>
      <p>
        Undo is command pattern rather than stored snapshots, covering both vector and raster
        edits, with snapshots used only to bound how far a replay has to walk back. Labels come
        from a schema, so attribute controls are built at runtime instead of hardcoded per label
        type.
      </p>
      <p>
        Six Next.js API routes sit over Prisma and Postgres with validated payloads and
        transactional writes. Export produces per instance state and RLE masks as JSON, verified by
        155 tests.
      </p>
    </ProjectPage>
  )
}
