import { useRef } from "react"
import IslamabadHorizon from "./IslamabadHorizon"
import { useFitPillLabel } from "./MainEventConceptCard"

interface MainEventConceptDarkCardProps {
  city?: string
  edition?: string
  venue?: string
  dateRange?: string
}

const CALENDAR = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: "clamp(11px, 1.3cqi, 15px)", height: "clamp(11px, 1.3cqi, 15px)", flexShrink: 0 }}
  >
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M8 2v4M16 2v4M3 10h18" />
  </svg>
)

const PIN = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: "clamp(11px, 1.3cqi, 15px)", height: "clamp(11px, 1.3cqi, 15px)", flexShrink: 0 }}
  >
    <path d="M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)

const LEFT_BLOCKS = [
  { row: 12, col: 2, color: "#42B4FF" },
  { row: 10, col: 1, color: "#FF57EA" },
  { row: 8, col: 0, color: "#FC9904" },
  { row: 6, col: 2, color: "#01E582" },
  { row: 4, col: 1, color: "#8C52FF" },
  { row: 2, col: 0, color: "#42B4FF" },
  { row: 0, col: 2, color: "#FF57EA" },
]

const RIGHT_BLOCKS = [
  { row: 0, col: 0, color: "#8C52FF" },
  { row: 2, col: 1, color: "#01E582" },
  { row: 4, col: 2, color: "#FC9904" },
  { row: 6, col: 0, color: "#FF57EA" },
  { row: 8, col: 1, color: "#42B4FF" },
  { row: 10, col: 2, color: "#8C52FF" },
  { row: 12, col: 0, color: "#01E582" },
]

function Rail({
  side,
  blocks,
}: {
  side: "left" | "right"
  blocks: { row: number; col: number; color: string }[]
}) {
  const grid = [
    "repeating-linear-gradient(to right, rgba(255, 255, 255, 0.22) 0 1px, transparent 1px 4cqi)",
    "repeating-linear-gradient(to bottom, rgba(255, 255, 255, 0.22) 0 1px, transparent 1px 4cqi)",
  ].join(", ")
  const isLeft = side === "left"

  return (
    <div
      aria-hidden="true"
      className="absolute top-0 bottom-0 z-0 pointer-events-none"
      style={{
        left: isLeft ? 0 : undefined,
        right: isLeft ? undefined : 0,
        width: "12cqi",
        backgroundImage: grid,
        borderLeft: isLeft ? undefined : "1px solid rgba(255, 255, 255, 0.22)",
        borderRight: isLeft ? "1px solid rgba(255, 255, 255, 0.22)" : undefined,
      }}
    >
      {blocks.map((b, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: `${b.row * 4}cqi`,
            width: "4cqi",
            height: "4cqi",
            background: b.color,
            left: isLeft ? `${b.col * 4}cqi` : undefined,
            right: isLeft ? undefined : `${b.col * 4}cqi`,
          }}
        />
      ))}
    </div>
  )
}

/**
 * Dark "rail + blocks" concept — the 5 local-community colors scattered across
 * two-column grid rails against pure black, matching the community-branding
 * reference layout (lockup, pill, date/venue meta, contained skyline).
 */
export default function MainEventConceptDarkCard({
  city = "Islamabad",
  edition = "2026",
  venue = "AIR UNIVERSITY, MAIN CAMPUS",
  dateRange = "DECEMBER, 2026",
}: MainEventConceptDarkCardProps) {
  const pillRef = useRef<HTMLDivElement>(null)
  const pillLabelRef = useRef<HTMLSpanElement>(null)
  const pillLabel = `Watch & Build Party ${edition} | ${city}`
  useFitPillLabel(pillRef, pillLabelRef, pillLabel)

  return (
    <div className="@container relative w-full aspect-[1200/630] overflow-hidden select-none rounded-lg shadow-2xl">
      {/* Pure black base */}
      <div aria-hidden="true" className="absolute inset-0" style={{ background: "#000000" }} />

      {/* Soft glow behind the skyline, kept inside the rails */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-[12cqi] right-[12cqi]"
        style={{
          height: "clamp(160px, 18cqi, 216px)",
          background:
            "radial-gradient(55% 85% at 50% 100%, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0) 62%)",
        }}
      />

      <Rail side="left" blocks={LEFT_BLOCKS} />
      <Rail side="right" blocks={RIGHT_BLOCKS} />

      {/* Skyline contained between the rails */}
      <div className="absolute bottom-0 left-[12cqi] right-[12cqi] z-[1]">
        <IslamabadHorizon
          opacity={1}
          height="clamp(160px, 18cqi, 216px)"
          objectFit="cover"
        />
      </div>

      <div
        className="relative z-10 flex h-full w-full flex-col items-center"
        style={{
          padding: "clamp(26px, 4.4cqi, 48px) clamp(36px, 5.8cqi, 68px)",
        }}
      >
        <div
          className="flex flex-col items-center"
          style={{ marginTop: "clamp(24px, 4cqi, 48px)" }}
        >
          <div className="inline-flex flex-col items-stretch">
            <div>
              <div className="flex items-baseline">
                <span style={{ position: "relative", display: "inline-block" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      marginLeft: "0.116em",
                      bottom: "calc(100% - 0.072em)",
                      whiteSpace: "nowrap",
                      fontFamily: "var(--font-brand)",
                      fontSize: "clamp(12px, 4cqi, 47.5px)",
                      fontWeight: 300,
                      letterSpacing: "0.005em",
                      lineHeight: 1,
                      color: "#FFFFFF",
                    }}
                  >
                    AWS
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-brand)",
                      fontSize: "clamp(28px, 6.7cqi, 80.4px)",
                      fontWeight: 300,
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                      color: "#FFFFFF",
                    }}
                  >
                    re:
                  </span>
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-brand)",
                    fontSize: "clamp(48px, 12.5cqi, 150px)",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    lineHeight: 0.9,
                    color: "#FFFFFF",
                    marginLeft: "0.18em",
                  }}
                >
                  Invent
                </span>
              </div>
            </div>

            {/* Outline pill, spanning the lockup */}
            <div
              ref={pillRef}
              className="flex items-center justify-center"
              style={{
                margin: "0 -0.45cqi",
                marginTop: "clamp(12px, 2.2cqi, 26px)",
                padding:
                  "clamp(9px, 1.3cqi, 15px) clamp(16px, 2cqi, 26px)",
                borderRadius: "9999px",
                border: "2px solid rgba(255, 255, 255, 0.85)",
                background: "rgba(255, 255, 255, 0.06)",
                backdropFilter: "blur(10px)",
              }}
            >
              <span
                ref={pillLabelRef}
                style={{
                  fontFamily: "var(--font-brand)",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  lineHeight: 1,
                  color: "#FFFFFF",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                {pillLabel}
              </span>
            </div>
          </div>

          {/* Date + venue meta row, centered independently */}
          <div
            className="flex items-center"
            style={{
              marginTop: "clamp(12px, 1.8cqi, 22px)",
              gap: "clamp(8px, 1.1cqi, 13px)",
              fontFamily: "var(--font-brand)",
              fontSize: "clamp(10px, 1.3cqi, 16px)",
              fontWeight: 500,
              letterSpacing: "0.06em",
              color: "rgba(255, 255, 255, 0.62)",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {CALENDAR}
            <span>{dateRange}</span>
            <span style={{ opacity: 0.45 }}>|</span>
            {PIN}
            <span>{venue}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
