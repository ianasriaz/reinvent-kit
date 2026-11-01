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

/**
 * Experimental 1200x630 banner — display-type hero, text-only pill and a
 * side grid that fades into the background. Isolated from the shipping
 * Main Event card so existing designs stay untouched.
 */
function SideGrid() {
  const cell = "clamp(72px, 10cqi, 120px)"
  const line = "rgba(255, 255, 255, 0.22)"
  const base: CSSProperties = {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "24%",
    zIndex: 2,
    pointerEvents: "none",
    opacity: 0.55,
    mixBlendMode: "screen",
    backgroundImage: [
      `repeating-linear-gradient(to right, ${line} 0 1px, transparent 1px ${cell})`,
      `repeating-linear-gradient(to bottom, ${line} 0 1px, transparent 1px ${cell})`,
    ].join(", "),
  }

  return (
    <>
      <div
        aria-hidden="true"
        style={{
          ...base,
          left: 0,
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          ...base,
          right: 0,
          maskImage:
            "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0) 100%)",
        }}
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
      <MeshBackground>
        {showPattern && <SideGrid />}

        <IslamabadHorizon
          opacity={0.95}
          height="clamp(150px, 20cqi, 215px)"
          objectFit="cover"
        />

        <div
          className="relative z-10 flex h-full w-full flex-col justify-between"
          style={{
            padding: "clamp(26px, 4.6cqi, 50px) clamp(36px, 5.8cqi, 68px)",
          }}
        >
          {/* Header: AWS + SBG lockup left, location right */}
          <div className="flex w-full items-center justify-between">
            <div
              className="flex items-center"
              style={{ gap: "clamp(14px, 2.2cqi, 26px)" }}
            >
              <AwsLogo size={54} />
              <AwsSbgLogo size={36} />
            </div>

            <div
              style={{
                fontFamily: "var(--font-brand)",
                fontSize: "clamp(10px, 1.2cqi, 13px)",
                letterSpacing: "0.14em",
                color: "rgba(255, 255, 255, 0.85)",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Islamabad, Pakistan
            </div>
          </div>

          {/* Hero: AWS / re:Invent / edition */}
          <div
            className="flex flex-col items-center self-center text-center"
            style={{ marginTop: "clamp(6px, 1.2cqi, 16px)" }}
          >
            <div
              className="inline-flex items-end"
              style={{ gap: "clamp(6px, 1.1cqi, 14px)" }}
            >
              <div className="flex flex-col items-start" style={{ textAlign: "left" }}>
                <span
                  style={{
                    fontFamily: "var(--font-brand)",
                    fontSize: "clamp(16px, 2.2cqi, 30px)",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    lineHeight: 1,
                    color: "#FFFFFF",
                  }}
                >
                  AWS
                </span>
                <div
                  className="flex items-baseline"
                  style={{
                    gap: "clamp(2px, 0.4cqi, 6px)",
                    marginTop: "clamp(2px, 0.4cqi, 6px)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-brand)",
                      fontSize: "clamp(34px, 5.4cqi, 78px)",
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      lineHeight: 0.9,
                      color: "#FFFFFF",
                    }}
                  >
                    re:
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-brand)",
                      fontSize: "clamp(56px, 9.6cqi, 140px)",
                      fontWeight: 800,
                      letterSpacing: "-0.035em",
                      lineHeight: 0.88,
                      color: "#FFFFFF",
                    }}
                  >
                    Invent
                  </span>
                </div>
              </div>

              <span
                style={{
                  fontFamily: "var(--font-brand)",
                  fontSize: "clamp(20px, 3.4cqi, 50px)",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  lineHeight: 1,
                  color: "#FFFFFF",
                  marginBottom: "clamp(6px, 1cqi, 16px)",
                }}
              >
                {edition}
              </span>
            </div>

            {/* Text-only pill */}
            <div
              className="flex items-center justify-center"
              style={{
                marginTop: "clamp(18px, 3cqi, 34px)",
                padding:
                  "clamp(10px, 1.5cqi, 15px) clamp(30px, 5.4cqi, 72px)",
                borderRadius: "9999px",
                border: "1.5px solid rgba(255, 255, 255, 0.9)",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-brand)",
                  fontSize: "clamp(13px, 2cqi, 26px)",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  lineHeight: 1,
                  color: "#FFFFFF",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                Watch & Build Party {city}
              </span>
            </div>

            {/* Highlights row */}
            <div
              className="flex w-full items-center justify-center"
              style={{
                gap: "clamp(22px, 3.4cqi, 40px)",
                marginTop: "clamp(12px, 2cqi, 22px)",
              }}
            >
              {HIGHLIGHTS.map((label) => (
                <div
                  key={label}
                  className="flex items-center"
                  style={{ gap: "clamp(4px, 0.7cqi, 8px)" }}
                >
                  <span
                    className="flex items-center justify-center"
                    style={{
                      width: "clamp(10px, 1.5cqi, 15px)",
                      height: "clamp(10px, 1.5cqi, 15px)",
                      borderRadius: "9999px",
                      background: "rgba(255, 255, 255, 0.55)",
                      flexShrink: 0,
                    }}
                  >
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
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-brand)",
                      fontSize: "clamp(8px, 1.15cqi, 13px)",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
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

          {/* Space reserved for the skyline */}
          <div style={{ height: "clamp(120px, 17cqi, 180px)" }} />
        </div>
      </MeshBackground>
    </div>
  )
}
