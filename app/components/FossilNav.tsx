/* One sprite sheet, five pieces. Bounding boxes measured off the alpha channel
   of anky-sheet.png (1536x1024), so nothing is sliced and the whole nav is a
   single request. */
const SHEET = { w: 1536, h: 1024, src: "/fossil/anky-sheet.png" }

type Piece = {
  id: string
  label: string
  href?: string
  /* crop within the sheet */
  sx: number
  sy: number
  sw: number
  sh: number
  /* placement within the field, as percentages */
  left: number
  top: number
  width: number
  rotate: number
  /* where the tag sits relative to the piece */
  tag: "right" | "left" | "below"
  /* Three cracks that spread in sequence. Drawn in the crop's own coordinate
     space (sw x sh) so they scale with the piece. */
  cracks: [string, string, string]
}

/* Every piece is drawn with the same outline weight in the source PNG, so the
   thickness you see is source-stroke x (rendered width / crop width). Widths
   below are set to hold that ratio at ~0.16 for all five, which is the only way
   to make the outlines match. Change one width and that piece's outline gets
   heavier or lighter than its neighbours. */
const PIECES: Piece[] = [
  {
    id: "ventures",
    label: "Ventures",
    href: "/ventures",
    sx: 60, sy: 70, sw: 854, sh: 476,
    left: 0, top: 2, width: 29, rotate: -5,
    tag: "right",
    /* Routed around the orbit (roughly x 300-420, y 180-300) and the naris,
       and spread across cranium, jaw and snout so more of them survive. */
    cracks: [
      "M160 158 L200 214 L156 262 M470 60 L508 104",
      "M200 214 L264 194 M156 262 L112 292 M690 250 L724 292 M508 104 L556 90 M330 430 L380 450",
      "M264 194 L306 148 M112 292 L88 332 M724 292 L762 320 M420 380 L470 410 M556 90 L604 116 M380 450 L424 434 M660 350 L706 372 M596 142 L636 180",
    ],
  },
  {
    id: "internships",
    label: "Internships",
    href: "/internships",
    sx: 1244, sy: 78, sw: 260, sh: 882,
    left: 3, top: 46, width: 8.9, rotate: -18,
    tag: "below",
    cracks: [
      "M132 300 L104 372 L136 432",
      "M136 432 L108 502 M132 300 L152 238",
      "M104 372 L66 350 M136 432 L174 462",
    ],
  },
  {
    id: "projects",
    label: "Projects",
    href: "/projects",
    sx: 972, sy: 322, sw: 270, sh: 566,
    left: 21, top: 34, width: 9.2, rotate: 24,
    tag: "below",
    cracks: [
      "M136 208 L108 266 L142 312",
      "M142 312 L118 362 M136 208 L158 162",
      "M108 266 L76 248 M142 312 L178 332",
    ],
  },
  {
    id: "teaching",
    label: "Teaching",
    href: "/teaching",
    sx: 60, sy: 618, sw: 566, sh: 330,
    left: 40, top: 42, width: 19.3, rotate: -8,
    /* Beside, not below — Fun! sits directly under this one. */
    tag: "right",
    /* The rib is a thin arc — most of this box is the empty space inside the
       curve. Cracks are placed on the opaque band, measured per column. */
    cracks: [
      "M196 14 L208 44 L194 76",
      "M296 22 L308 56 L294 88 M118 42 L128 70 L114 100",
      "M394 58 L406 92 L392 122 M452 104 L466 142",
    ],
  },
  {
    id: "fun",
    label: "Fun!",
    href: "/fun",
    sx: 698, sy: 642, sw: 230, sh: 308,
    left: 50, top: 70, width: 7.8, rotate: -40,
    tag: "below",
    cracks: [
      "M116 128 L94 166 L122 196",
      "M122 196 L106 228 M116 128 L132 98",
      "M94 166 L68 158 M122 196 L152 208",
    ],
  },
]

const FIELD_W = 760
const FIELD_H = 520

/* Percentage background-position aligns the image's P% point with the box's
   P% point — it is not a pixel offset. For a crop starting at sx, that means
   sx / (sheetWidth - cropWidth), positive. */
function crop(p: Piece) {
  return {
    size: `${(SHEET.w / p.sw) * 100}% ${(SHEET.h / p.sh) * 100}%`,
    pos: `${(p.sx / (SHEET.w - p.sw)) * 100}% ${(p.sy / (SHEET.h - p.sh)) * 100}%`,
  }
}

function artStyle(p: Piece): React.CSSProperties {
  const c = crop(p)
  return {
    backgroundImage: `url(${SHEET.src})`,
    backgroundSize: c.size,
    backgroundPosition: c.pos,
    ["--rot" as string]: `${p.rotate}deg`,
  }
}

/* The crack layer is masked by the sheet's own alpha, so a crack can never
   stray outside the bone it belongs to. */
function crackStyle(p: Piece): React.CSSProperties {
  const c = crop(p)
  return {
    maskImage: `url(${SHEET.src})`,
    maskSize: c.size,
    maskPosition: c.pos,
    maskRepeat: "no-repeat",
    WebkitMaskImage: `url(${SHEET.src})`,
    WebkitMaskSize: c.size,
    WebkitMaskPosition: c.pos,
    WebkitMaskRepeat: "no-repeat",
    ["--rot" as string]: `${p.rotate}deg`,
  }
}

export default function FossilNav() {
  return (
    <div className="fossil-field" style={{ aspectRatio: `${FIELD_W} / ${FIELD_H}` }}>
      {PIECES.map((p) => (
        <a
          key={p.id}
          href={p.href ?? "#"}
          className={`fossil fossil-tag-${p.tag}`}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.width}%`,
            aspectRatio: `${p.sw} / ${p.sh}`,
          }}
        >
          {/* Only the art and cracks transform. The label is a sibling inside
              the same link, so it stays put while the fossil settles. */}
          <span className="fossil-art" style={artStyle(p)} aria-hidden="true" />
          <span className="fossil-cracks" style={crackStyle(p)} aria-hidden="true">
            <svg viewBox={`0 0 ${p.sw} ${p.sh}`} preserveAspectRatio="none">
              {p.cracks.map((d, i) => (
                <path key={d} className={`ck ck${i + 1}`} d={d} vectorEffect="non-scaling-stroke" />
              ))}
            </svg>
          </span>
          <span className="fossil-label">{p.label}</span>
        </a>
      ))}
    </div>
  )
}
