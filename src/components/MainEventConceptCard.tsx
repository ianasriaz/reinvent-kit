import { useContext } from "react"
import type { CSSProperties } from "react"
import MeshBackground from "./MeshBackground"
import IslamabadHorizon from "./IslamabadHorizon"
import AwsLogo from "./AwsLogo"
import AwsSbgLogo from "./AwsSbgLogo"
import { GradientContext } from "../gradientContext"

interface MainEventConceptCardProps {
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

/**
 * Experimental 1200x630 banner — display hero, text-only pill and a faint
 * edge grid. Isolated from the shipping Main Event card.
 */
function SideGrid() {
  const cell = "clamp(34px, 4.4cqi, 52px)"
  const line = "rgba(255, 255, 255, 0.26)"
  const base: CSSProperties = {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "14%",
    zIndex: 0,
    pointerEvents: "none",
    opacity: 0.7,
    mixBlendMode: "screen",
    backgroundImage: [
      `repeating-linear-gradient(to right, ${line} 0 1px, transparent 1px ${cell})`,
      `repeating-linear-gradient(to bottom, ${line} 0 1px, transparent 1px ${cell})`,
    ].join(", "),
  }
  const fadeLeft =
    "linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0) 100%)"
  const fadeRight =
    "linear-gradient(to left, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0) 100%)"

  return (
    <>
      <div
        aria-hidden="true"
        style={{ ...base, left: 0, maskImage: fadeLeft, WebkitMaskImage: fadeLeft }}
      />
      <div
        aria-hidden="true"
        style={{ ...base, right: 0, maskImage: fadeRight, WebkitMaskImage: fadeRight }}
      />
    </>
  )
}

export default function MainEventConceptCard({
  city = "Islamabad",
  edition = "2026",
}: MainEventConceptCardProps) {
  const ctx = useContext(GradientContext)
  const showPattern = typeof ctx === "string" ? true : ctx.showPattern

  return (
    <div className="@container relative w-full aspect-[1200/630] overflow-hidden select-none rounded-lg shadow-2xl">
      <MeshBackground pattern={false}>
        {showPattern && <SideGrid />}

        <IslamabadHorizon
          opacity={0.92}
          height="clamp(118px, 14cqi, 172px)"
          objectFit="cover"
        />

        <div
          className="relative z-10 flex h-full w-full flex-col"
          style={{
            padding: "clamp(26px, 4.4cqi, 48px) clamp(36px, 5.8cqi, 68px)",
          }}
        >
          {/* Header */}
          <div className="flex w-full items-center justify-between">
            <div
              className="flex items-center"
              style={{ gap: "clamp(14px, 2.2cqi, 26px)" }}
            >
              <AwsLogo size={54} />
              <AwsSbgLogo size={36} />
            </div>

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

          {/* Hero block — lockup, pill and chips share one optical width */}
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="inline-flex flex-col items-stretch">
              <div>
                <div className="flex items-baseline">
                  <span style={{ position: "relative", display: "inline-block" }}>
                    {/* AWS left-flush (ink-aligned) above re:, ink top aligned to
                        Invent's ink top. Tuck constants are tuned for Amazon Ember
                        Display metrics (cap 0.703em, ascent 0.972em). */}
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        marginLeft: "0.106em",
                        bottom: "calc(100% - 0.087em)",
                        whiteSpace: "nowrap",
                        fontFamily: "var(--font-brand)",
                        fontSize: "clamp(12px, 3.55cqi, 44px)",
                        fontWeight: 500,
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
                        fontSize: "clamp(28px, 6cqi, 74px)",
                        fontWeight: 500,
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
                      fontSize: "clamp(44px, 11.2cqi, 142px)",
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                      lineHeight: 0.9,
                      color: "#FFFFFF",
                      marginLeft: "0.18em",
                    }}
                  >
                    Invent
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-brand)",
                      fontSize: "clamp(17px, 3.3cqi, 44px)",
                      fontWeight: 500,
                      letterSpacing: "0.005em",
                      lineHeight: 1,
                      color: "#FFFFFF",
                      marginLeft: "clamp(8px, 1.2cqi, 16px)",
                    }}
                  >
                    {edition}
                  </span>
                </div>
              </div>

              {/* Text-only pill, flush to the lockup width */}
              <div
                className="flex items-center justify-center"
                style={{
                  width: "100%",
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
                  style={{
                    fontFamily: "var(--font-brand)",
                    fontSize: "clamp(12px, 1.9cqi, 25px)",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    lineHeight: 1,
                    color: "#FFFFFF",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  Watch & Build Party {city}
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
      </MeshBackground>
    </div>
  )
}
