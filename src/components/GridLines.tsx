// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function CrosshairDot(_: { style?: React.CSSProperties }) {
  return null
}

// 2 cols × 6 rows grid panel
// exclude: percentages (0-100) of the SVG area — interior lines inside this rect are omitted
export function ThinGrid({
  cols = 2,
  rows = 6,
  color = "rgba(255,255,255,0.28)",
  exclude,
}: {
  cols?: number
  rows?: number
  color?: string
  exclude?: { x: number; y: number; w: number; h: number }
}) {
  const ex = exclude

  // For a vertical line at xPct, split it into segments that skip the excluded interior
  function vSegs(xPct: number): { y1: string; y2: string }[] {
    if (!ex) return [{ y1: "0", y2: "100%" }]
    const inside = xPct > ex.x && xPct < ex.x + ex.w
    if (!inside) return [{ y1: "0", y2: "100%" }]
    const segs: { y1: string; y2: string }[] = []
    if (ex.y > 0) segs.push({ y1: "0", y2: `${ex.y}%` })
    if (ex.y + ex.h < 100) segs.push({ y1: `${ex.y + ex.h}%`, y2: "100%" })
    return segs
  }

  // For a horizontal line at yPct, split it into segments that skip the excluded interior
  function hSegs(yPct: number): { x1: string; x2: string }[] {
    if (!ex) return [{ x1: "0", x2: "100%" }]
    const inside = yPct > ex.y && yPct < ex.y + ex.h
    if (!inside) return [{ x1: "0", x2: "100%" }]
    const segs: { x1: string; x2: string }[] = []
    if (ex.x > 0) segs.push({ x1: "0", x2: `${ex.x}%` })
    if (ex.x + ex.w < 100) segs.push({ x1: `${ex.x + ex.w}%`, x2: "100%" })
    return segs
  }

  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        display: "block",
      }}
      preserveAspectRatio="none"
    >
      {Array.from({ length: cols + 1 }).map((_, i) => {
        const xPct = (i / cols) * 100
        return vSegs(xPct).map((seg, si) => (
          <line
            key={`v${i}-${si}`}
            x1={`${xPct}%`}
            y1={seg.y1}
            x2={`${xPct}%`}
            y2={seg.y2}
            stroke={color}
            strokeWidth="1"
          />
        ))
      })}
      {Array.from({ length: rows + 1 }).map((_, i) => {
        const yPct = (i / rows) * 100
        return hSegs(yPct).map((seg, si) => (
          <line
            key={`h${i}-${si}`}
            x1={seg.x1}
            y1={`${yPct}%`}
            x2={seg.x2}
            y2={`${yPct}%`}
            stroke={color}
            strokeWidth="1"
          />
        ))
      })}
    </svg>
  )
}
