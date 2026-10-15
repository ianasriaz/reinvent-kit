import { useState, useRef } from "react"
import { DEFAULT_SPEAKERS, SpeakerData } from "./data/speakers"
import { exportElementAsPng, copyElementToClipboard } from "./utils/exportImage"
import MainEventCard from "./components/MainEventCard"
import SpeakerCard from "./components/SpeakerCard"
import SponsorCard from "./components/SponsorCard"
import CommunityPartnerCard from "./components/CommunityPartnerCard"

const TABS = [
  {
    id: "Main Event",
    size: "1200 × 630",
    description: "Wide landscape banner for Twitter/X, LinkedIn & Web",
  },
  {
    id: "Speaker",
    size: "1080 × 1080",
    description: "Square card spotlighting keynote and session speakers",
  },
  {
    id: "Sponsor",
    size: "1080 × 1080",
    description: "Square card recognizing event sponsors and tiers",
  },
  {
    id: "Community Partner",
    size: "1080 × 1080",
    description: "Square card featuring student & developer alliances",
  },
] as const

type Tab = typeof TABS[number]["id"]

const SPEAKER_PRESETS = [
  {
    name: "Aisha Siddiqui",
    title: "Senior Solutions Architect",
    company: "Amazon Web Services",
    talk: "Building with Serverless on AWS",
    photo:
      "https://images.unsplash.com/photo-1560439514-e960a3ef5019?w=500&h=500&fit=crop&auto=format&q=80",
  },
  {
    name: "Hamza Tariq",
    title: "Staff Platform Engineer",
    company: "CloudForge Labs",
    talk: "Scale to Millions: Kubernetes on EKS",
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop&auto=format&q=80",
  },
  {
    name: "Zainab Malik",
    title: "AI Research Lead",
    company: "Nexus Intelligence",
    talk: "Generative AI Workflows with Amazon Bedrock",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=500&fit=crop&auto=format&q=80",
  },
]

export default function App() {
  const [active, setActive] = useState<Tab>("Main Event")
  const [showCustomizer, setShowCustomizer] = useState(false)

  // Shared Event Props
  const [venue, setVenue] = useState("AIR UNIVERSITY, MAIN CAMPUS")
  const [city, setCity] = useState("Islamabad")
  const [dateRange, setDateRange] = useState("DEC, 2026")
  const [edition, setEdition] = useState("Islamabad 2026")

  // Card DOM ref for 1-click PNG exports
  const cardRef = useRef<HTMLDivElement>(null)
  const [exportScale, setExportScale] = useState<1 | 2>(1)
  const [isExporting, setIsExporting] = useState(false)
  const [exportStatus, setExportStatus] = useState<string | null>(null)

  // Speaker Props
  const [speakerName, setSpeakerName] = useState(DEFAULT_SPEAKERS[0].name)
  const [speakerHandle, setSpeakerHandle] = useState(DEFAULT_SPEAKERS[0].handle || "")
  const [speakerTitle, setSpeakerTitle] = useState(DEFAULT_SPEAKERS[0].title)
  const [speakerCompany, setSpeakerCompany] = useState(DEFAULT_SPEAKERS[0].company)
  const [talkTitle, setTalkTitle] = useState(DEFAULT_SPEAKERS[0].talk)
  const [speakerPhoto, setSpeakerPhoto] = useState(DEFAULT_SPEAKERS[0].photo)

  // Sponsor Props
  const [sponsorName, setSponsorName] = useState("TechVentures Pakistan")
  const [sponsorTier, setSponsorTier] =
    useState<"Platinum" | "Gold" | "Silver" | "Bronze">("Gold")

  // Community Partner Props
  const [partnerName, setPartnerName] = useState("MLSA Pakistan")
  const [partnerType, setPartnerType] = useState("Student Community")

  const current = TABS.find((t) => t.id === active)!
  const isSquare = active !== "Main Event"

  const handleSpeakerPreset = (p: { name: string; title: string; company: string; talk: string; photo: string; handle?: string }) => {
    setSpeakerName(p.name)
    setSpeakerTitle(p.title)
    setSpeakerCompany(p.company)
    setSpeakerHandle(p.handle || "")
    setTalkTitle(p.talk)
    setSpeakerPhoto(p.photo)
  }

  const handleExportPng = async () => {
    if (!cardRef.current) return
    setIsExporting(true)
    setExportStatus("Generating high-resolution PNG...")
    try {
      const targetWidth = isSquare ? 1080 : 1200
      const targetHeight = isSquare ? 1080 : 630
      const prefix = "aws-reinvent-islamabad"
      let slug = active.toLowerCase().replace(/\s+/g, "-")
      if (active === "Speaker") {
        slug = `speaker-${speakerName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
      } else if (active === "Sponsor") {
        slug = `sponsor-${sponsorName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
      } else if (active === "Community Partner") {
        slug = `partner-${partnerName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
      }
      const scaleTag = exportScale === 2 ? "-2x-retina" : ""
      const filename = `${prefix}-${slug}${scaleTag}.png`

      await exportElementAsPng(cardRef.current, {
        filename,
        scale: exportScale,
        targetWidth,
        targetHeight,
      })
      setExportStatus(`Saved ${filename}!`)
      setTimeout(() => setExportStatus(null), 3500)
    } catch (err) {
      console.error("Export error:", err)
      setExportStatus("Export failed. Please check image permissions.")
      setTimeout(() => setExportStatus(null), 4000)
    } finally {
      setIsExporting(false)
    }
  }

  const handleCopyImage = async () => {
    if (!cardRef.current) return
    setIsExporting(true)
    setExportStatus("Generating image for clipboard...")
    try {
      const targetWidth = isSquare ? 1080 : 1200
      await copyElementToClipboard(cardRef.current, {
        targetWidth,
        scale: exportScale,
      })
      setExportStatus("Copied to clipboard! (Ctrl+V / Cmd+V to paste)")
      setTimeout(() => setExportStatus(null), 3500)
    } catch (err) {
      console.error("Clipboard copy error:", err)
      setExportStatus("Could not copy directly. Please use Download PNG.")
      setTimeout(() => setExportStatus(null), 4000)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#06040C",
        color: "#FFFFFF",
        fontFamily: "'Instrument Sans', sans-serif",
      }}
    >
      <div
        style={{ maxWidth: "1040px", margin: "0 auto", padding: "48px 24px" }}
      >
        {/* Header Bar */}
        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 12px",
              borderRadius: "9999px",
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              marginBottom: "12px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#00DFD8",
                boxShadow: "0 0 8px #00DFD8",
              }}
            />
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "11px",
                color: "rgba(255, 255, 255, 0.75)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              AWS re:Invent 2026 · Watch &amp; Build Party · Islamabad
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "clamp(24px, 3.2vw, 32px)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                Brand Kit &amp; Social Templates
              </h1>
              <p
                style={{
                  fontSize: "13px",
                  color: "rgba(255, 255, 255, 0.45)",
                  marginTop: "4px",
                }}
              >
                Ultra-minimal editorial direction · Zero grid lines · Diffused
                purple-to-cyan mesh · Islamabad skyline horizon
              </p>
            </div>

            {/* Toggle Live Customizer */}
            <button
              onClick={() => setShowCustomizer(!showCustomizer)}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                background: showCustomizer
                  ? "rgba(0, 223, 216, 0.15)"
                  : "rgba(255, 255, 255, 0.06)",
                border: showCustomizer
                  ? "1px solid rgba(0, 223, 216, 0.4)"
                  : "1px solid rgba(255, 255, 255, 0.12)",
                color: showCustomizer ? "#00DFD8" : "rgba(255, 255, 255, 0.8)",
                fontFamily: "'Space Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.08em",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {showCustomizer ? "Close Editor" : "Customize Props"}
            </button>
          </div>
        </div>

        {/* Template Tabs */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            marginBottom: "20px",
            overflowX: "auto",
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              style={{
                padding: "12px 18px",
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "14px",
                fontWeight: active === tab.id ? 600 : 400,
                color:
                  active === tab.id ? "#FFFFFF" : "rgba(255, 255, 255, 0.4)",
                background: "none",
                border: "none",
                borderBottom:
                  active === tab.id
                    ? "2px solid #00DFD8"
                    : "2px solid transparent",
                cursor: "pointer",
                marginBottom: "-1px",
                transition: "all 0.15s ease",
                whiteSpace: "nowrap",
              }}
            >
              {tab.id}
              <span
                style={{
                  marginLeft: "8px",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "10px",
                  color:
                    active === tab.id
                      ? "rgba(0, 223, 216, 0.9)"
                      : "rgba(255, 255, 255, 0.25)",
                }}
              >
                {tab.size}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Description */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "'Space Mono', monospace",
            fontSize: "11px",
            color: "rgba(255, 255, 255, 0.35)",
            marginBottom: "16px",
            letterSpacing: "0.06em",
          }}
        >
          <span>{current.description}</span>
          <span>{current.size}</span>
        </div>

        {/* Prominent Export Action Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            padding: "14px 20px",
            background: "linear-gradient(135deg, rgba(0, 223, 216, 0.08) 0%, rgba(124, 58, 237, 0.12) 100%)",
            border: "1px solid rgba(0, 223, 216, 0.3)",
            borderRadius: "14px",
            marginBottom: "16px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            {/* Primary Download Button */}
            <button
              onClick={handleExportPng}
              disabled={isExporting}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #00DFD8 0%, #00B4D8 100%)",
                border: "none",
                color: "#06040C",
                fontFamily: "'Space Mono', monospace",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.04em",
                cursor: isExporting ? "wait" : "pointer",
                boxShadow: "0 0 24px rgba(0, 223, 216, 0.45)",
                transition: "all 0.15s ease",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>{isExporting ? "Rendering..." : `Download PNG (${isSquare ? "1080×1080" : "1200×630"})`}</span>
            </button>

            {/* Copy Image Button */}
            <button
              onClick={handleCopyImage}
              disabled={isExporting}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "10px 16px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                color: "#FFFFFF",
                fontFamily: "'Space Mono', monospace",
                fontSize: "11px",
                fontWeight: 600,
                cursor: isExporting ? "wait" : "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>Copy Image</span>
            </button>

            {/* Scale Selector */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "rgba(255, 255, 255, 0.05)", padding: "3px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <button
                onClick={() => setExportScale(1)}
                style={{
                  padding: "6px 10px",
                  borderRadius: "5px",
                  background: exportScale === 1 ? "rgba(0, 223, 216, 0.25)" : "transparent",
                  border: exportScale === 1 ? "1px solid rgba(0, 223, 216, 0.6)" : "1px solid transparent",
                  color: exportScale === 1 ? "#00DFD8" : "rgba(255, 255, 255, 0.55)",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "10px",
                  fontWeight: exportScale === 1 ? 700 : 400,
                  cursor: "pointer",
                }}
              >
                1x Native
              </button>
              <button
                onClick={() => setExportScale(2)}
                style={{
                  padding: "6px 10px",
                  borderRadius: "5px",
                  background: exportScale === 2 ? "rgba(0, 223, 216, 0.25)" : "transparent",
                  border: exportScale === 2 ? "1px solid rgba(0, 223, 216, 0.6)" : "1px solid transparent",
                  color: exportScale === 2 ? "#00DFD8" : "rgba(255, 255, 255, 0.55)",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "10px",
                  fontWeight: exportScale === 2 ? 700 : 400,
                  cursor: "pointer",
                }}
              >
                2x Retina ({isSquare ? "2160px" : "2400px"})
              </button>
            </div>
          </div>

          {/* Status or Upload note */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {exportStatus ? (
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "11px",
                  color: "#00DFD8",
                  padding: "5px 12px",
                  borderRadius: "6px",
                  background: "rgba(0, 223, 216, 0.15)",
                  border: "1px solid rgba(0, 223, 216, 0.4)",
                  boxShadow: "0 0 12px rgba(0, 223, 216, 0.25)",
                }}
              >
                {exportStatus}
              </span>
            ) : (
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "10px",
                  color: "rgba(255, 255, 255, 0.45)",
                  letterSpacing: "0.06em",
                }}
              >
                Ready for LinkedIn, X &amp; Instagram
              </span>
            )}
          </div>
        </div>

        {/* Card Preview Container */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px 0 24px 0",
          }}
        >
          <div
            style={{
              width: isSquare ? "min(100%, 540px)" : "100%",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow:
                "0 30px 100px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.08)",
              transition: "width 0.2s ease",
            }}
          >
            <div ref={cardRef} style={{ width: "100%", height: "100%" }}>
            {active === "Main Event" && (
              <MainEventCard
                venue={venue}
                city={city}
                dateRange={dateRange}
                edition={edition}
              />
            )}
            {active === "Speaker" && (
              <SpeakerCard
                speakerName={speakerName}
                speakerTitle={speakerTitle}
                speakerCompany={speakerCompany}
                speakerHandle={speakerHandle}
                talkTitle={talkTitle}
                speakerPhoto={speakerPhoto}
                venue={venue}
                city={city}
                dateRange={dateRange}
              />
            )}
            {active === "Sponsor" && (
              <SponsorCard
                sponsorName={sponsorName}
                sponsorTier={sponsorTier}
                venue={venue}
                city={city}
                dateRange={dateRange}
              />
            )}
            {active === "Community Partner" && (
              <CommunityPartnerCard
                partnerName={partnerName}
                partnerType={partnerType}
                venue={venue}
                city={city}
                dateRange={dateRange}
              />
            )}
            </div>
          </div>
        </div>

        {/* Live Interactive Props Customizer Drawer */}
        {showCustomizer && (
          <div
            style={{
              marginTop: "28px",
              padding: "24px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "16px",
              backdropFilter: "blur(16px)",
            }}
          >
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "12px",
                fontWeight: 700,
                color: "#00DFD8",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Interactive Prop Controls · {active}
            </div>

            {/* General Event Props */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
                marginBottom: "20px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "10px",
                    color: "rgba(255, 255, 255, 0.45)",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                  }}
                >
                  Venue
                </label>
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#FFFFFF",
                    fontSize: "13px",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "10px",
                    color: "rgba(255, 255, 255, 0.45)",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                  }}
                >
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#FFFFFF",
                    fontSize: "13px",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "10px",
                    color: "rgba(255, 255, 255, 0.45)",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                  }}
                >
                  Date Range
                </label>
                <input
                  type="text"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#FFFFFF",
                    fontSize: "13px",
                  }}
                />
              </div>

              {active === "Main Event" && (
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "10px",
                      color: "rgba(255, 255, 255, 0.45)",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                    }}
                  >
                    Edition
                  </label>
                  <input
                    type="text"
                    value={edition}
                    onChange={(e) => setEdition(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      color: "#FFFFFF",
                      fontSize: "13px",
                    }}
                  />
                </div>
              )}
            </div>

            {/* Speaker Specific Controls */}
            {active === "Speaker" && (
              <div
                style={{
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  paddingTop: "16px",
                }}
              >
                {/* AI Agent Callout Notice */}
                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: "10px",
                    background: "rgba(0, 223, 216, 0.08)",
                    border: "1px solid rgba(0, 223, 216, 0.25)",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <span style={{ fontSize: "16px" }}>⚡</span>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#00DFD8",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      AI Agent Automation Ready
                    </div>
                    <p
                      style={{
                        margin: "2px 0 0 0",
                        fontSize: "12px",
                        color: "rgba(255, 255, 255, 0.75)",
                        lineHeight: 1.4,
                      }}
                    >
                      Whenever you have a new speaker, just give me their photo, name, and talk topic in chat. I will instantly update the design and output the ready-to-upload visual.
                    </p>
                  </div>
                </div>

                <div style={{ marginBottom: "14px" }}>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "10px",
                      color: "rgba(255, 255, 255, 0.45)",
                      textTransform: "uppercase",
                      marginRight: "12px",
                    }}
                  >
                    Sample Speaker Presets:
                  </span>
                  {DEFAULT_SPEAKERS.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => handleSpeakerPreset(p)}
                      style={{
                        marginRight: "8px",
                        marginBottom: "6px",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        background:
                          speakerName === p.name
                            ? "rgba(0, 223, 216, 0.2)"
                            : "rgba(255, 255, 255, 0.05)",
                        border:
                          speakerName === p.name
                            ? "1px solid #00DFD8"
                            : "1px solid rgba(255, 255, 255, 0.1)",
                        color:
                          speakerName === p.name
                            ? "#00DFD8"
                            : "rgba(255, 255, 255, 0.7)",
                        fontSize: "11px",
                        cursor: "pointer",
                      }}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "16px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "10px",
                        color: "rgba(255, 255, 255, 0.45)",
                        marginBottom: "6px",
                        textTransform: "uppercase",
                      }}
                    >
                      Speaker Name
                    </label>
                    <input
                      type="text"
                      value={speakerName}
                      onChange={(e) => setSpeakerName(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: "#FFFFFF",
                        fontSize: "13px",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "10px",
                        color: "rgba(255, 255, 255, 0.45)",
                        marginBottom: "6px",
                        textTransform: "uppercase",
                      }}
                    >
                      Speaker Title
                    </label>
                    <input
                      type="text"
                      value={speakerTitle}
                      onChange={(e) => setSpeakerTitle(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: "#FFFFFF",
                        fontSize: "13px",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "10px",
                        color: "rgba(255, 255, 255, 0.45)",
                        marginBottom: "6px",
                        textTransform: "uppercase",
                      }}
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      value={speakerCompany}
                      onChange={(e) => setSpeakerCompany(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: "#FFFFFF",
                        fontSize: "13px",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "10px",
                        color: "rgba(255, 255, 255, 0.45)",
                        marginBottom: "6px",
                        textTransform: "uppercase",
                      }}
                    >
                      Social Handle (Optional)
                    </label>
                    <input
                      type="text"
                      value={speakerHandle}
                      onChange={(e) => setSpeakerHandle(e.target.value)}
                      placeholder="@speaker_handle"
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: "#FFFFFF",
                        fontSize: "13px",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "10px",
                        color: "rgba(255, 255, 255, 0.45)",
                        marginBottom: "6px",
                        textTransform: "uppercase",
                      }}
                    >
                      Session Talk Title
                    </label>
                    <input
                      type="text"
                      value={talkTitle}
                      onChange={(e) => setTalkTitle(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: "#FFFFFF",
                        fontSize: "13px",
                      }}
                    />
                  </div>

                  <div style={{ gridColumn: "1 / -1" }}>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "10px",
                        color: "rgba(255, 255, 255, 0.45)",
                        marginBottom: "6px",
                        textTransform: "uppercase",
                      }}
                    >
                      Speaker Photo (Upload Local File or Paste URL)
                    </label>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                      <input
                        type="text"
                        value={speakerPhoto}
                        onChange={(e) => setSpeakerPhoto(e.target.value)}
                        placeholder="https://..."
                        style={{
                          flex: "1 1 300px",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          color: "#FFFFFF",
                          fontSize: "13px",
                        }}
                      />
                      <label
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "8px 14px",
                          borderRadius: "6px",
                          background: "rgba(0, 223, 216, 0.15)",
                          border: "1px solid rgba(0, 223, 216, 0.4)",
                          color: "#00DFD8",
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "11px",
                          fontWeight: 700,
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        Upload Photo
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              const url = URL.createObjectURL(file)
                              setSpeakerPhoto(url)
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sponsor Specific Controls */}
            {active === "Sponsor" && (
              <div
                style={{
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  paddingTop: "16px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "16px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "10px",
                        color: "rgba(255, 255, 255, 0.45)",
                        marginBottom: "6px",
                        textTransform: "uppercase",
                      }}
                    >
                      Sponsor Name
                    </label>
                    <input
                      type="text"
                      value={sponsorName}
                      onChange={(e) => setSponsorName(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: "#FFFFFF",
                        fontSize: "13px",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "10px",
                        color: "rgba(255, 255, 255, 0.45)",
                        marginBottom: "6px",
                        textTransform: "uppercase",
                      }}
                    >
                      Sponsor Tier
                    </label>
                    <div style={{ display: "flex", gap: "8px" }}>
                      {(["Platinum", "Gold", "Silver", "Bronze"] as const).map(
                        (tier) => (
                          <button
                            key={tier}
                            onClick={() => setSponsorTier(tier)}
                            style={{
                              flex: 1,
                              padding: "8px 4px",
                              borderRadius: "6px",
                              background:
                                sponsorTier === tier
                                  ? "rgba(255, 255, 255, 0.15)"
                                  : "rgba(255, 255, 255, 0.04)",
                              border:
                                sponsorTier === tier
                                  ? "1px solid #FFFFFF"
                                  : "1px solid rgba(255, 255, 255, 0.1)",
                              color:
                                sponsorTier === tier
                                  ? "#FFFFFF"
                                  : "rgba(255, 255, 255, 0.6)",
                              fontFamily: "'Space Mono', monospace",
                              fontSize: "11px",
                              cursor: "pointer",
                            }}
                          >
                            {tier}
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Community Partner Specific Controls */}
            {active === "Community Partner" && (
              <div
                style={{
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  paddingTop: "16px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "16px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "10px",
                        color: "rgba(255, 255, 255, 0.45)",
                        marginBottom: "6px",
                        textTransform: "uppercase",
                      }}
                    >
                      Partner Name
                    </label>
                    <input
                      type="text"
                      value={partnerName}
                      onChange={(e) => setPartnerName(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: "#FFFFFF",
                        fontSize: "13px",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "10px",
                        color: "rgba(255, 255, 255, 0.45)",
                        marginBottom: "6px",
                        textTransform: "uppercase",
                      }}
                    >
                      Partner Category / Type
                    </label>
                    <input
                      type="text"
                      value={partnerType}
                      onChange={(e) => setPartnerType(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: "#FFFFFF",
                        fontSize: "13px",
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Feature Highlights & Specifications Bar */}
        <div
          style={{
            marginTop: "28px",
            padding: "16px 20px",
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "11px",
                color: "#00DFD8",
                letterSpacing: "0.06em",
                fontWeight: 700,
              }}
            >
              REDESIGN SUMMARY:
            </span>
            <span
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.55)",
              }}
            >
              Zero Grid Lines · Diffused Mesh Palette · Floating Glass Panels ·
              Bottom Horizon Silhouette
            </span>
          </div>

          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              color: "rgba(255, 255, 255, 0.3)",
              letterSpacing: "0.06em",
            }}
          >
            November 30 – December 4, 2026 · Islamabad
          </div>
        </div>
      </div>
    </div>
  )
}
