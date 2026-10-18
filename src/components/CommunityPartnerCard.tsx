import MeshBackground from "./MeshBackground"
import IslamabadHorizon from "./IslamabadHorizon"
import AwsReinventLogo from "./AwsReinventLogo"
import AwsLogo from "./AwsLogo"

interface CommunityPartnerCardProps {
  partnerName?: string
  partnerType?: string
  partnerLogo?: string
  venue?: string
  city?: string
  dateRange?: string
}

export default function CommunityPartnerCard({
  partnerName = "MLSA Pakistan",
  partnerType = "Student Community",
  partnerLogo,
}: CommunityPartnerCardProps) {
  return (
    <div className="@container relative w-full aspect-square overflow-hidden select-none rounded-lg shadow-2xl">
      <MeshBackground>
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
          {/* Header Row: Aligned AWS re:Invent on Left, AWS Logo on Right */}
          <div className="flex items-start justify-between w-full">
            <AwsReinventLogo size="sm" subline="WATCH & BUILD PARTY 2026" />

            <AwsLogo size={54} />
          </div>

          {/* Centerpiece — Partner Logo + Name + Category */}
          <div className="flex flex-col items-center justify-center my-auto text-center gap-4">
            {/* Category Label */}
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(11px, 2cqi, 14px)",
                fontWeight: 700,
                color: "rgba(255, 255, 255, 0.9)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              Community Partner
            </p>

            {/* White Logo Container */}
            <div
              style={{
                width: "clamp(96px, 19cqi, 140px)",
                height: "clamp(96px, 19cqi, 140px)",
                background: "rgba(255, 255, 255, 0.96)",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                padding: "16px",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
              }}
            >
              {partnerLogo ? (
                <img
                  src={partnerLogo}
                  alt={partnerName}
                  crossOrigin="anonymous"
                  className="max-w-full max-h-full object-contain block"
                />
              ) : (
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
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

            {/* Partner Name in Space Mono */}
            <h1
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(22px, 4.4cqi, 38px)",
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              {partnerName}
            </h1>

            {/* Type Pill */}
            <div
              className="inline-flex items-center px-4 py-1 rounded-full"
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-brand)",
                  fontSize: "clamp(11px, 2cqi, 14px)",
                  fontWeight: 500,
                  color: "#FFFFFF",
                  letterSpacing: "0.04em",
                }}
              >
                {partnerType}
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
