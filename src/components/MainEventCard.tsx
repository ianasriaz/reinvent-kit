import MeshBackground from "./MeshBackground"
import IslamabadHorizon from "./IslamabadHorizon"
import AwsReinventLogo from "./AwsReinventLogo"
import AwsLogo from "./AwsLogo"
import EventMeta from "./shared/EventMeta"
import type { EventConfig } from "../data/eventConfig"

interface MainEventCardProps {
  venue?: string
  city?: string
  dateRange?: string
  edition?: string
}

export default function MainEventCard({
  venue = "AIR UNIVERSITY, MAIN CAMPUS",
  city = "Islamabad",
  dateRange = "DEC, 2026",
  edition = "2026",
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
              Watch &amp; Build Party · {edition}
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
                WATCH &amp; BUILD PARTY {edition} | {city.toUpperCase()}
              </span>
            </div>

            {/* Date and Venue placed directly below the badge in clear open space */}
            <EventMeta
              size="lg"
              dateRange={dateRange}
              venue={venue}
              className="mt-1"
            />
          </div>

          {/* Bottom space reserved for the skyline without text collision */}
          <div style={{ height: "clamp(140px, 18cqi, 195px)" }} />
        </div>
      </MeshBackground>
    </div>
  )
}
