import MeshBackground from "./MeshBackground"
import IslamabadHorizon from "./IslamabadHorizon"
import AwsReinventLogo from "./AwsReinventLogo"
import AwsLogo from "./AwsLogo"
import EventMeta from "./shared/EventMeta"
import type { EventConfig } from "../data/eventConfig"

interface MainEventCardProps {
  venue?: string
  dateRange?: string
  edition?: string
}

export default function MainEventCard({
  venue = "AIR UNIVERSITY",
  dateRange = "DEC, 2026",
  edition = "2026",
}: MainEventCardProps) {
  return (
    <div className="@container relative w-full aspect-[1200/630] overflow-hidden select-none rounded-lg shadow-2xl">
      <MeshBackground>
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
            <AwsLogo size={54} />

            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(10px, 1.2cqi, 13px)",
                letterSpacing: "0.14em",
                color: "rgba(255, 255, 255, 0.85)",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              Islamabad, Pakistan
            </div>
          </div>

          {/* Hero Core Block: Elevated into Upper-Middle Area so it NEVER mixes with the footer image */}
          <div
            className="flex flex-col items-center self-center text-center gap-3.5"
            style={{
              marginTop: "clamp(6px, 1.2cqi, 16px)",
              width: "fit-content",
            }}
          >
            {/* Signature AWS re:Invent Lockup — same treatment as the card headers */}
            <AwsReinventLogo
              size="hero"
              subline={`WATCH & BUILD PARTY ${edition}`}
              sublineStyle={{ fontWeight: 500 }}
            />

            {/* Date / Venue Pill */}
            <div
              className="flex w-full items-center justify-center"
              style={{
                padding: "clamp(7px, 1.2cqi, 12px) clamp(10px, 1.6cqi, 19px)",
                borderRadius: "9999px",
                border: "1.5px solid rgba(255, 255, 255, 0.85)",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.12)",
              }}
            >
              <EventMeta
                size="lg"
                dateRange={dateRange}
                venue={venue}
                className="w-full justify-center"
              />
            </div>

            {/* Highlights row — centered under the pill, inset from pill edges */}
            <div
              className="flex w-full items-center justify-center"
              style={{ gap: "clamp(22px, 3.4cqi, 40px)" }}
            >
              {["NETWORKING", "REFRESHMENT", "SWAGS"].map((label) => (
                <div
                  key={label}
                  className="flex items-center"
                  style={{
                    gap: "clamp(4px, 0.7cqi, 8px)",
                  }}
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
                      style={{
                        width: "60%",
                        height: "60%",
                      }}
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
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

          {/* Bottom space reserved for the skyline without text collision */}
          <div style={{ height: "clamp(140px, 18cqi, 195px)" }} />
        </div>
      </MeshBackground>
    </div>
  )
}
