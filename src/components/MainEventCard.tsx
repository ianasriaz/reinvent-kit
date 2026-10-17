import MeshBackground from "./MeshBackground"
import IslamabadHorizon from "./IslamabadHorizon"
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
  const highlights = ["Keynotes", "Networking", "Swags"]

  return (
    <div className="@container relative w-full aspect-[1200/630] overflow-hidden select-none rounded-lg shadow-2xl">
      <MeshBackground variant="main">



        {/* Islamabad Landmark Footer at 80% opacity */}
        <IslamabadHorizon
          opacity={0.8}
          height="clamp(120px, 19cqi, 190px)"
          objectFit="cover"
        />

        {/* Card Content */}
        <div
          className="relative z-10 w-full h-full flex flex-col"
          style={{
            padding: "clamp(22px, 4cqi, 46px) clamp(30px, 5cqi, 60px)",
          }}
        >

          {/* TOP HEADER ROW */}
          <div className="flex items-center justify-between w-full">
            <AwsLogo size={40} />

            {/* Change 3: ISLAMABAD, PAKISTAN as frosted micro-pill with location icon */}
            <div
              className="inline-flex items-center"
              style={{
                gap: "clamp(5px, 0.7cqi, 8px)",
                padding: "clamp(5px, 0.75cqi, 8px) clamp(10px, 1.5cqi, 16px)",
                borderRadius: "9999px",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Location Pin Icon */}
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ color: "rgba(255,255,255,0.75)", flexShrink: 0 }}
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
              </svg>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "clamp(9px, 1.15cqi, 13px)",
                  letterSpacing: "0.13em",
                  color: "rgba(255, 255, 255, 0.92)",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                Islamabad, Pakistan
              </span>
            </div>
          </div>

          {/* Change 6: Content stack moved up with flex layout, more natural breathing room */}
          <div className="flex flex-col items-center text-center" style={{ marginTop: "clamp(12px, 2.8cqi, 36px)" }}>


            {/* Change 1: Tightened, unified AWS re:Invent lockup */}
            <div
              className="inline-flex items-end justify-center"
              style={{ gap: "clamp(4px, 0.7cqi, 10px)", lineHeight: 1 }}
            >
              {/* Stacked AWS / re: prefix */}
              <div
                className="flex flex-col items-start"
                style={{
                  paddingBottom: "clamp(4px, 0.75cqi, 10px)",
                  gap: "clamp(1px, 0.2cqi, 3px)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "clamp(13px, 2.1cqi, 28px)",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    color: "#FFFFFF",
                    lineHeight: 1,
                  }}
                >
                  AWS
                </span>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "clamp(18px, 2.85cqi, 38px)",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    color: "#FFFFFF",
                    lineHeight: 1,
                  }}
                >
                  re:
                </span>
              </div>

              {/* Hero word: Invent */}
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "clamp(52px, 8.6cqi, 112px)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 0.88,
                  color: "#FFFFFF",
                }}
              >
                Invent
              </span>
            </div>

            {/* Sub-Focus: WATCH & BUILD PARTY 2026 */}
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "clamp(10px, 1.55cqi, 18px)",
                fontWeight: 700,
                letterSpacing: "0.16em",
                color: "rgba(255, 255, 255, 0.9)",
                textTransform: "uppercase",
                marginTop: "clamp(6px, 1cqi, 12px)",
              }}
            >
              Watch &amp; Build Party 2026
            </div>

            {/* Change 5: Date & Venue pill with brighter border + glow shadow */}
            <div
              className="inline-flex items-center flex-wrap justify-center"
              style={{
                marginTop: "clamp(14px, 2cqi, 24px)",
                padding: "clamp(8px, 1.2cqi, 14px) clamp(18px, 2.8cqi, 34px)",
                borderRadius: "9999px",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1.5px solid rgba(255, 255, 255, 0.35)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 0 28px rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.2)",
                gap: "clamp(10px, 1.8cqi, 22px)",
              }}
            >
              {/* Date with Calendar Icon */}
              <div className="inline-flex items-center" style={{ gap: "clamp(5px, 0.8cqi, 9px)" }}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "rgba(255,255,255,0.85)", flexShrink: 0 }}
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "clamp(10px, 1.3cqi, 14px)",
                    fontWeight: 700,
                    letterSpacing: "0.07em",
                    color: "#FFFFFF",
                    textTransform: "uppercase",
                  }}
                >
                  {dateRange}
                </span>
              </div>

              {/* Divider */}
              <span style={{ color: "rgba(255, 255, 255, 0.3)", fontWeight: 200, fontSize: "16px" }}>|</span>

              {/* Venue with Map Pin */}
              <div className="inline-flex items-center" style={{ gap: "clamp(5px, 0.8cqi, 9px)" }}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ color: "rgba(255,255,255,0.85)", flexShrink: 0 }}
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                </svg>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "clamp(10px, 1.3cqi, 14px)",
                    fontWeight: 700,
                    letterSpacing: "0.07em",
                    color: "#FFFFFF",
                    textTransform: "uppercase",
                  }}
                >
                  {venue}
                </span>
              </div>
            </div>

            {/* Change 4: Highlights — clean, even separators, no trailing dot */}
            <div
              className="flex items-center justify-center"
              style={{
                marginTop: "clamp(12px, 1.7cqi, 20px)",
                gap: "clamp(12px, 2cqi, 26px)",
              }}
            >
              {highlights.map((item, idx) => (
                <div key={item} className="inline-flex items-center" style={{ gap: "clamp(18px, 2.8cqi, 32px)" }}>
                  <div className="inline-flex items-center" style={{ gap: "clamp(5px, 0.75cqi, 8px)" }}>
                    {/* Clean circular check icon */}
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "clamp(15px, 1.9cqi, 20px)",
                        height: "clamp(15px, 1.9cqi, 20px)",
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.12)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        flexShrink: 0,
                      }}
                    >
                      <svg
                        width="9"
                        height="9"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span
                      style={{
                        fontFamily: "'Instrument Sans', sans-serif",
                        fontSize: "clamp(11px, 1.45cqi, 16px)",
                        fontWeight: 600,
                        color: "rgba(255, 255, 255, 0.92)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {item}
                    </span>
                  </div>

                  {/* Separator dot — only between items, not after last */}
                  {idx < highlights.length - 1 && (
                    <span
                      style={{
                        color: "rgba(255, 255, 255, 0.28)",
                        fontSize: "clamp(10px, 1.1cqi, 13px)",
                        lineHeight: 1,
                        marginLeft: "clamp(-10px, -1.5cqi, -18px)",
                      }}
                    >
                      •
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Reserved breathing room above landmark footer */}
          <div style={{ flex: 1, minHeight: "clamp(80px, 12cqi, 130px)" }} />
        </div>
      </MeshBackground>
    </div>
  )
}
