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
    stroke="#00DFD8"
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: "60%", height: "60%" }}
  >
    <path d="M5 13l4 4L19 7" />
  </svg>
)

const ACCENT = "rgba(0, 223, 216, 0.65)"

/**
 * Experimental dark "grid" concept — charcoal base, blueprint grid, Heavy hero.
 * Self-contained by design: ignores the app gradient/pattern switcher.
 */
export default function MainEventConceptDarkCard({
  city = "Islamabad",
  edition = "2026",
}: MainEventConceptDarkCardProps) {
  const pillRef = useRef<HTMLDivElement>(null)
  const pillLabelRef = useRef<HTMLSpanElement>(null)
  const pillLabel = `Watch & Build Party ${edition} | ${city}`
  useFitPillLabel(pillRef, pillLabelRef, pillLabel)

  const gridLayers = [
    "repeating-linear-gradient(to right, rgba(255, 255, 255, 0.05) 0 1px, transparent 1px 4cqi)",
    "repeating-linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 0 1px, transparent 1px 4cqi)",
    "repeating-linear-gradient(to right, rgba(255, 255, 255, 0.11) 0 1px, transparent 1px 16cqi)",
    "repeating-linear-gradient(to bottom, rgba(255, 255, 255, 0.11) 0 1px, transparent 1px 16cqi)",
  ].join(", ")
  const gridMask =
    "radial-gradient(115% 115% at 50% 42%, rgba(0, 0, 0, 1) 52%, rgba(0, 0, 0, 0.3) 100%)"
  const crosshairTile =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cpath d='M80 72v16M72 80h16' stroke='rgba(255,255,255,0.4)' stroke-width='1.5'/%3E%3C/svg%3E\")"

  return (
    <div className="@container relative w-full aspect-[1200/630] overflow-hidden select-none rounded-lg shadow-2xl">
      {/* Charcoal base + depth glows */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #16161A 0%, #0B0B0E 55%, #070709 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(90% 65% at 50% -5%, rgba(165, 175, 195, 0.13) 0%, rgba(0, 0, 0, 0) 60%)",
            "radial-gradient(75% 55% at 50% 108%, rgba(0, 223, 216, 0.09) 0%, rgba(0, 0, 0, 0) 55%)",
          ].join(", "),
        }}
      />

      <IslamabadHorizon
        opacity={0.3}
        height="clamp(118px, 14cqi, 172px)"
        objectFit="cover"
      />

      {/* Cyan horizon line at the skyline base */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 z-[3] pointer-events-none"
        style={{
          height: "2px",
          background: `linear-gradient(to right, rgba(0, 223, 216, 0) 0%, ${ACCENT} 18%, ${ACCENT} 82%, rgba(0, 223, 216, 0) 100%)`,
        }}
      />

      {/* Blueprint grid + crosshair ticks */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backgroundImage: gridLayers,
          maskImage: gridMask,
          WebkitMaskImage: gridMask,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backgroundImage: crosshairTile,
          backgroundSize: "16cqi 16cqi",
          backgroundPosition: "-8cqi -8cqi",
          maskImage: gridMask,
          WebkitMaskImage: gridMask,
        }}
      />

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
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(9px, 1.15cqi, 13px)",
              fontWeight: 400,
              letterSpacing: "0.18em",
              color: "rgba(255, 255, 255, 0.65)",
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
                    fontWeight: 700,
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

            {/* Flat bordered pill, spanning the lockup */}
            <div
              ref={pillRef}
              className="flex items-center justify-center"
              style={{
                margin: "0 -0.45cqi",
                marginTop: "clamp(12px, 2.2cqi, 26px)",
                padding:
                  "clamp(9px, 1.3cqi, 15px) clamp(16px, 2cqi, 26px)",
                borderRadius: "10px",
                border: `1px solid ${ACCENT}`,
                background: "rgba(10, 10, 13, 0.85)",
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
                      borderRadius: "3px",
                      border: "1px solid rgba(255, 255, 255, 0.5)",
                      flexShrink: 0,
                    }}
                  >
                    {CHECK}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "clamp(8px, 1.05cqi, 13px)",
                      fontWeight: 400,
                      letterSpacing: "0.14em",
                      color: "rgba(255, 255, 255, 0.88)",
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
