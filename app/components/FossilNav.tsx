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
     space (sw x sh) so they scale with the piece, and placed only where the
     sheet's alpha is opaque well past the stroke — the mask silently erases
     anything that strays over an edge or through the skull's fenestrae. */
  cracks: [string, string, string]
}

/* Every piece is drawn with the same ink weight in the source PNG, so the
   thickness you see is source-stroke x (rendered width / crop width). Widths
   below hold that ratio at ~0.259 for all five, which is the only way to make
   the linework match. Change one width and that piece's ink gets heavier or
   lighter than its neighbours. Left/top are set so each piece keeps the centre
   it had before the artwork was redrawn. */
const PIECES: Piece[] = [
  {
    id: "ventures",
    label: "Ventures",
    href: "/ventures",
    sx: 64, sy: 93, sw: 876, sh: 457,
    left: -0.4, top: 2.4, width: 29.85, rotate: -5,
    tag: "right",
    cracks: [
      "M739 305 L775 272 L821 265",
      "M32 137 L50 180 L95 202 M315 440 L307 387 L325 350",
      "M821 265 L841 289 M739 305 L766 315 M95 202 L128 204 M32 137 L74 123 M325 350 L288 327",
    ],
  },
  {
    id: "internships",
    label: "Internships",
    href: "/internships",
    sx: 1257, sy: 84, sw: 248, sh: 868,
    left: 3.2, top: 46.5, width: 8.45, rotate: -18,
    tag: "below",
    cracks: [
      "M68 752 L66 803 L71 850",
      "M91 28 L129 55 L151 99 M165 393 L178 435 L170 491",
      "M71 850 L98 838 M68 752 L90 774 M151 99 L122 132 M91 28 L120 32 M170 491 L191 512",
    ],
  },
  {
    id: "projects",
    label: "Projects",
    href: "/projects",
    sx: 984, sy: 317, sw: 219, sh: 583,
    left: 21.9, top: 33.6, width: 7.46, rotate: 24,
    tag: "below",
    cracks: [
      "M66 102 L69 129 L87 147",
      "M110 564 L134 542 L137 508 M72 335 L84 309 L111 282",
      "M87 147 L63 163 M66 102 L87 104 M137 508 L161 509 M110 564 L130 547 M111 282 L105 265",
    ],
  },
  {
    id: "teaching",
    label: "Teaching",
    href: "/teaching",
    sx: 47, sy: 606, sw: 616, sh: 356,
    left: 39.1, top: 41.4, width: 20.99, rotate: -8,
    /* Beside, not below — Fun! sits directly under this one. */
    tag: "right",
    cracks: [
      "M264 49 L305 52 L332 39",
      "M580 331 L592 299 L582 266 M21 96 L52 80 L76 58",
      "M332 39 L353 54 M264 49 L286 50 M582 266 L553 260 M580 331 L592 307 M76 58 L84 78",
    ],
  },
  {
    id: "fun",
    label: "Fun!",
    href: "/fun",
    sx: 728, sy: 665, sw: 225, sh: 286,
    left: 50.1, top: 70.5, width: 7.67, rotate: -40,
    tag: "below",
    cracks: [
      "M167 211 L169 227 L175 240",
      "M106 18 L93 31 L89 51 M68 136 L74 148 L90 155",
      "M175 240 L189 236 M167 211 L157 220 M89 51 L96 63 M106 18 L113 24 M90 155 L104 153",
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
