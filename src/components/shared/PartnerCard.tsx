import MeshBackground from "../MeshBackground"
import IslamabadHorizon from "../IslamabadHorizon"
import AwsReinventLogo from "../AwsReinventLogo"
import AwsLogo from "../AwsLogo"
import type { PartnerCardState, Tier } from "../../data/eventConfig"

type PartnerMode = "sponsor" | "partner"

interface PartnerCardProps {
  mode: PartnerMode
  sponsor?: PartnerCardState
  partner?: PartnerCardState
  venue?: string
  city?: string
  dateRange?: string
}

export default function PartnerCard({
  mode,
  sponsor,
  partner,
}: PartnerCardProps) {
  const isSponsor = mode === "sponsor"
  const state = isSponsor
    ? (sponsor ?? { name: "", tier: "Gold" as Tier })
    : (partner ?? { name: "", type: "" })
  const name = state.name
  const pillText = isSponsor
    ? `${("tier" in state && state.tier) || "Gold"} Sponsor`
    : "type" in state
      ? state.type
      : ""

  return (
    <div className="@container relative w-full aspect-square overflow-hidden select-none rounded-lg shadow-2xl">
      <MeshBackground variant={isSponsor ? "sponsor" : "partner"}>
        {/* Full Edge-to-Edge Panoramic Islamabad Skyline at 50% opacity */}
        <IslamabadHorizon opacity={0.5} />

        {/* Card Content */}
        <div
          className="relative z-10 w-full h-full flex flex-col justify-between"
          style={{
            padding: "clamp(26px, 5.2cqi, 52px)",
            boxSizing: "border-box",
          }}
        >
          {/* Header Row: AWS Logo on Left, Aligned AWS re:Invent on Right */}
          <div className="flex items-start justify-between w-full">
            <AwsLogo size={42} />

            <AwsReinventLogo size="sm" subline="WATCH & BUILD PARTY 2026" />
          </div>

          {/* Centerpiece — Logo + Name + Tier/Type Pill */}
          <div className="flex flex-col items-center justify-center my-auto text-center gap-4">
            {/* Category Label */}
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "clamp(11px, 2cqi, 14px)",
                fontWeight: 700,
                color: "rgba(255, 255, 255, 0.9)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              {isSponsor ? "Meet our Sponsor" : "Community Partner"}
            </p>

            {/* White Logo Container */}
            <div
              style={{
                width: isSponsor
                  ? "clamp(130px, 25cqi, 190px)"
                  : "clamp(96px, 19cqi, 140px)",
                height: isSponsor
                  ? "clamp(70px, 13.5cqi, 100px)"
                  : "clamp(96px, 19cqi, 140px)",
                background: "rgba(255, 255, 255, 0.96)",
                borderRadius: isSponsor ? "14px" : "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                padding: isSponsor ? "12px 20px" : "16px",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
              }}
            >
              {state.logo ? (
                <img
                  src={state.logo}
                  alt={name}
                  crossOrigin="anonymous"
                  className="max-w-full max-h-full object-contain block"
                />
              ) : (
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "clamp(12px, 2.4cqi, 16px)",
                    fontWeight: 700,
                    color: "#0F172A",
                    letterSpacing: "0.12em",
                  }}
                >
                  LOGO
                </span>
              )}
            </div>

            {/* Name in Space Mono */}
            <h1
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "clamp(22px, 4.4cqi, 38px)",
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              {name}
            </h1>

            {/* Tier / Type Pill */}
            <div
              className="inline-flex items-center px-4 py-1 rounded-full"
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <span
                style={{
                  fontFamily: isSponsor
                    ? "'Space Mono', monospace"
                    : "'Instrument Sans', sans-serif",
                  fontSize: "clamp(10px, 2cqi, 14px)",
                  fontWeight: isSponsor ? 700 : 500,
                  color: "#FFFFFF",
                  letterSpacing: isSponsor ? "0.16em" : "0.04em",
                  textTransform: isSponsor ? "uppercase" : "none",
                }}
              >
                {pillText}
              </span>
            </div>
          </div>

          {/* Bottom Footer: NO date and venue covering the footer image */}
          <div className="h-2" />
        </div>
      </MeshBackground>
    </div>
  )
}
