import MeshBackground from "./MeshBackground"
import IslamabadHorizon from "./IslamabadHorizon"
import AwsReinventLogo from "./AwsReinventLogo"
import AwsLogo from "./AwsLogo"

interface MainEventCardProps {
  venue?: string
  city?: string
  dateRange?: string
  edition?: string
}

export default function MainEventCard({
  venue = "AIR UNIVERSITY, MAIN CAMPUS",
  dateRange = "DEC, 2026",
}: MainEventCardProps) {
  return (
    <div className="@container relative w-full aspect-[1200/630] overflow-hidden select-none rounded-lg shadow-2xl">
      <MeshBackground variant="main">
        {/* Full Edge-to-Edge Panoramic Islamabad Skyline at full vibrant opacity (not 50%) */}
        <IslamabadHorizon
          opacity={0.95}
          height="clamp(150px, 20cqi, 215px)"
          objectFit="cover"
        />

        {/* Card Content: Text area clearly elevated above the footer skyline */}
        <div
          className="relative z-10 w-full h-full flex flex-col justify-between"
          style={{
            padding: "clamp(26px, 4.6cqi, 50px) clamp(36px, 5.8cqi, 68px)",
          }}
        >
          {/* Top Header Row */}
          <div className="flex items-center justify-between w-full">
            <AwsLogo size={42} />

            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "clamp(10px, 1.2cqi, 13px)",
                letterSpacing: "0.14em",
                color: "rgba(255, 255, 255, 0.85)",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              Watch &amp; Build Party · 2026
            </div>
          </div>

          {/* Hero Core Block: Elevated into Upper-Middle Area so it NEVER mixes with the footer image */}
          <div
            className="flex flex-col items-start gap-3.5"
            style={{
              marginTop: "clamp(6px, 1.2cqi, 16px)",
              marginBottom: "auto",
              maxWidth: "850px",
            }}
          >
            {/* Signature AWS re:Invent Lockup */}
            <AwsReinventLogo size="hero" />

            {/* Pill Badge */}
            <div
              className="inline-flex items-center"
              style={{
                padding: "clamp(6px, 1.1cqi, 11px) clamp(16px, 2.6cqi, 28px)",
                borderRadius: "9999px",
                border: "1.5px solid rgba(255, 255, 255, 0.85)",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.12)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "clamp(11px, 1.6cqi, 18px)",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                WATCH &amp; BUILD PARTY 2026 | ISLAMABAD
              </span>
            </div>

            {/* Date and Venue placed directly below the badge in clear open space */}
            <div
              className="flex items-center flex-wrap gap-x-3 gap-y-1.5 mt-1"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "clamp(10px, 1.35cqi, 14px)",
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              <div className="inline-flex items-center gap-2">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: 0.9 }}
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>{dateRange}</span>
              </div>

              <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>|</span>

              <div className="inline-flex items-center gap-2">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ opacity: 0.95 }}
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                </svg>
                <span style={{ color: "rgba(255, 255, 255, 0.95)" }}>
                  {venue}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom space reserved for the skyline without text collision */}
          <div style={{ height: "clamp(140px, 18cqi, 195px)" }} />
        </div>
      </MeshBackground>
    </div>
  )
}
