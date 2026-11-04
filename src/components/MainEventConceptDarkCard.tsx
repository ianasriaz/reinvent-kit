import { useRef } from "react"
import AwsLogo from "./AwsLogo"
import IslamabadHorizon from "./IslamabadHorizon"
import { useFitPillLabel } from "./MainEventConceptCard"

interface MainEventConceptDarkCardProps {
  city?: string
  edition?: string
}

const HIGHLIGHTS = ["NETWORKING", "REFRESHMENT", "SWAGS"]

const CHECK = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="#06040C"
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: "60%", height: "60%" }}
  >
    <path d="M5 13l4 4L19 7" />
  </svg>
)

const BLOCK_COLORS = ["#8C52FF", "#01E582", "#FC9904", "#FF57EA", "#42B4FF"]

const BLOCK_ROWS = [3, 13, 23, 33, 43]

function Rail({ side }: { side: "left" | "right" }) {
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
        width: "8cqi",
        backgroundImage: grid,
      }}
    >
      {BLOCK_ROWS.map((row, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: `${row}cqi`,
            width: "4cqi",
            height: "4cqi",
            background: BLOCK_COLORS[i % BLOCK_COLORS.length],
            left: isLeft ? 0 : undefined,
            right: isLeft ? undefined : 0,
          }}
        />
      ))}
    </div>
  )
}

/**
 * Dark "rail + blocks" concept — the 5 local-community colors on grid rails
 * against pure black, with the Main Event Concept typography and copy unchanged.
 */
export default function MainEventConceptDarkCard({
  city = "Islamabad",
  edition = "2026",
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
        className="absolute bottom-0 left-[8cqi] right-[8cqi]"
        style={{
          height: "clamp(140px, 18cqi, 210px)",
          background:
            "radial-gradient(60% 90% at 50% 100%, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 62%)",
        }}
      />

      <Rail side="left" />
      <Rail side="right" />

      {/* Skyline contained between the rails */}
      <div className="absolute bottom-0 left-[8cqi] right-[8cqi] z-[1]">
        <IslamabadHorizon
          opacity={0.92}
          height="clamp(118px, 14cqi, 172px)"
          objectFit="contain"
        />
      </div>

      <div
        className="relative z-10 flex h-full w-full flex-col"
        style={{
          padding: "clamp(26px, 4.4cqi, 48px) clamp(36px, 5.8cqi, 68px)",
        }}
      >
        {/* Header */}
        <div className="flex w-full items-center justify-between">
          <AwsLogo size={54} />

          <span
            style={{
              fontFamily: "var(--font-brand)",
              fontSize: "clamp(9px, 1.15cqi, 13px)",
              fontWeight: 500,
              letterSpacing: "0.16em",
              color: "rgba(255, 255, 255, 0.85)",
              textTransform: "uppercase",
            }}
          >
            Islamabad, Pakistan
          </span>
        </div>

        {/* Hero block */}
        <div className="flex flex-1 flex-col items-center justify-center">
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

            {/* Glass pill, spanning the lockup */}
            <div
              ref={pillRef}
              className="flex items-center justify-center"
              style={{
                margin: "0 -0.45cqi",
                marginTop: "clamp(12px, 2.2cqi, 26px)",
                padding:
                  "clamp(9px, 1.3cqi, 15px) clamp(16px, 2cqi, 26px)",
                borderRadius: "9999px",
                border: "1.5px solid rgba(255, 255, 255, 0.85)",
                background: "rgba(255, 255, 255, 0.08)",
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

            {/* Highlights */}
            <div
              className="flex items-center justify-center"
              style={{
                gap: "clamp(22px, 3.4cqi, 40px)",
                marginTop: "clamp(9px, 1.5cqi, 16px)",
              }}
            >
              {HIGHLIGHTS.map((label) => (
                <div
                  key={label}
                  className="flex items-center"
                  style={{ gap: "clamp(5px, 0.75cqi, 9px)" }}
                >
                  <span
                    className="flex items-center justify-center"
                    style={{
                      width: "clamp(10px, 1.45cqi, 15px)",
                      height: "clamp(10px, 1.45cqi, 15px)",
                      borderRadius: "9999px",
                      background: "rgba(255, 255, 255, 0.55)",
                      flexShrink: 0,
                    }}
                  >
                    {CHECK}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-brand)",
                      fontSize: "clamp(8px, 1.05cqi, 13px)",
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      color: "rgba(255, 255, 255, 0.92)",
                      textTransform: "uppercase",
                      lineHeight: 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Space reserved for the skyline */}
        <div style={{ height: "clamp(130px, 15.5cqi, 188px)" }} />
      </div>
    </div>
  )
}
