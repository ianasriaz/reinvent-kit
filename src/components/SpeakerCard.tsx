import MeshBackground from "./MeshBackground"
import IslamabadHorizon from "./IslamabadHorizon"
import AwsReinventLogo from "./AwsReinventLogo"
import AwsLogo from "./AwsLogo"

interface SpeakerCardProps {
  speakerName?: string
  speakerTitle?: string
  speakerCompany?: string
  speakerHandle?: string
  talkTitle?: string
  venue?: string
  city?: string
  dateRange?: string
  speakerPhoto?: string
}

export default function SpeakerCard({
  speakerName = "SUMAMA ZAEEM",
  speakerTitle = "DevOps Engineer",
  speakerCompany = "Tkxel",
  speakerHandle = "@sumama_dev",
  talkTitle = "BUILDING APPLICATION USING KIRO AND AWS CLI TECHNIQUES",
  venue = "AIR UNIVERSITY, MAIN CAMPUS",
  dateRange = "DEC, 2026",
  speakerPhoto = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=600&fit=crop&crop=face&auto=format&q=85",
}: SpeakerCardProps) {
  return (
    <div className="@container relative w-full aspect-square overflow-hidden select-none rounded-lg shadow-2xl">
      <MeshBackground variant="speaker">
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
          {/* Header Row: AWS Logo on Left, Perfectly Aligned AWS re:Invent on Right */}
          <div className="flex items-start justify-between w-full">
            <AwsLogo size={42} />

            {/* Top-Right: Aligned AWS re:Invent + Watch & Build Subline */}
            <AwsReinventLogo size="sm" subline="WATCH & BUILD PARTY 2026" />
          </div>

          {/* Middle Body Area: Kicker Placed Above the Image on Standalone Row */}
          <div className="my-auto w-full flex flex-col items-start gap-4">
            {/* MEET OUR SPEAKER: Placed on its own row ABOVE the image height */}
            <div
              className="inline-flex items-center gap-2"
              style={{
                background: "#FFFFFF",
                padding: "clamp(5px, 0.9cqi, 8px) clamp(12px, 1.8cqi, 18px)",
                borderRadius: "9999px",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.18)",
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#06040C"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "clamp(9px, 1.4cqi, 12px)",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#06040C",
                  lineHeight: 1,
                }}
              >
                MEET OUR SPEAKER
              </span>
            </div>

            {/* Split Section: Details on Left, Large Framed Portrait on Right */}
            <div className="flex items-center justify-between gap-5 w-full">
              {/* Left Column: Evenly Spaced Name, Designation, Topic & Date/Venue */}
              <div className="flex-1 flex flex-col justify-center gap-2.5 pr-1">
                {/* Speaker Name */}
                <h1
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "clamp(20px, 3.8cqi, 34px)",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    margin: 0,
                    textTransform: "uppercase",
                  }}
                >
                  {speakerName}
                </h1>

                {/* Designation & Company */}
                <p
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: "clamp(12px, 2cqi, 16px)",
                    fontWeight: 500,
                    color: "rgba(255, 255, 255, 0.95)",
                    lineHeight: 1.3,
                    margin: 0,
                  }}
                >
                  {speakerTitle}{" "}
                  <span style={{ color: "rgba(255, 255, 255, 0.75)" }}>
                    @ {speakerCompany}
                  </span>
                  {speakerHandle && (
                    <span
                      style={{
                        marginLeft: "6px",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "clamp(9px, 1.4cqi, 12px)",
                        color: "#00DFD8",
                        fontWeight: 700,
                      }}
                    >
                      ({speakerHandle})
                    </span>
                  )}
                </p>

                {/* Topic: Styled with Clean SOLID WHITE Vertical Line */}
                <div
                  style={{
                    borderLeft: "3.5px solid #FFFFFF",
                    paddingLeft: "clamp(10px, 1.6cqi, 16px)",
                    marginTop: "clamp(2px, 0.5cqi, 6px)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "clamp(10px, 1.6cqi, 14px)",
                      fontWeight: 700,
                      lineHeight: 1.35,
                      color: "#FFFFFF",
                      textTransform: "uppercase",
                      margin: 0,
                    }}
                  >
                    {talkTitle}
                  </p>
                </div>

                {/* Date and Venue placed DIRECTLY BELOW topic */}
                <div
                  className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-2"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "clamp(9px, 1.35cqi, 12px)",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  <div className="inline-flex items-center gap-1.5">
                    <svg
                      width="13"
                      height="13"
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

                  <div className="inline-flex items-center gap-1.5">
                    <svg
                      width="13"
                      height="13"
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

              {/* Right Column: Large Framed Portrait */}
              <div
                style={{
                  width: "clamp(145px, 32cqi, 250px)",
                  height: "clamp(160px, 35cqi, 270px)",
                  borderRadius: "26px",
                  border: "3.5px solid #FFFFFF",
                  overflow: "hidden",
                  flexShrink: 0,
                  boxShadow: "0 16px 40px rgba(0, 0, 0, 0.3)",
                  background: "rgba(255, 255, 255, 0.1)",
                }}
              >
                <img
                  src={speakerPhoto}
                  alt={speakerName}
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover object-top block"
                />
              </div>
            </div>
          </div>

          {/* Bottom Footer: NO date and venue covering the footer image */}
          <div className="h-2" />
        </div>
      </MeshBackground>
    </div>
  )
}
