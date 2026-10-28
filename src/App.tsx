import { useState, useRef, useEffect, useCallback } from "react"
import {
  EventConfig,
  Tier,
  defaultEventConfig,
  loadEventConfig,
  saveEventConfig,
  clearEventConfig,
  SPEAKER_PRESETS,
} from "./data/eventConfig"
import {
  ACCENT,
  BRAND_GRADIENT,
  GRADIENT_PRESETS,
  GRADIENT_STORAGE_KEY,
  DEFAULT_GRADIENT_ID,
} from "./data/brand"
import { GradientContext } from "./gradientContext"
import {
  exportElementAsPng,
  copyElementToClipboard,
  fileToDataUrl,
} from "./utils/exportImage"
import MainEventCard from "./components/MainEventCard"
import SpeakerCard from "./components/SpeakerCard"
import PartnerCard from "./components/shared/PartnerCard"
import AttendeeCard, { type Attendee } from "./components/AttendeeCard"
import PhotoWall from "./components/PhotoWall"
import TextField, { ChoiceGroup } from "./components/ui/TextField"

const TABS = [
  { id: "Main Event", size: "1200 × 630" },
  { id: "Speaker", size: "1080 × 1080" },
  { id: "Sponsor", size: "1080 × 1080" },
  { id: "Community Partner", size: "1080 × 1080" },
  {
    id: "Attendees",
    size: "1063 × 1488",
  },
  { id: "Photo Wall", size: "1920 × 1080" },
] as const

type Tab = typeof TABS[number]["id"]

const TAB_WIDTH: Record<Tab, number> = {
  "Main Event": 1200,
  Speaker: 1080,
  Sponsor: 1080,
  "Community Partner": 1080,
  Attendees: 1063,
  "Photo Wall": 1920,
}

const FILE_PREFIX = "aws-reinvent-islamabad"

// Fake roster for the Attendees tab design preview (never real data)
const SAMPLE_ATTENDEES: Attendee[] = [
  { name: "Sumama Zaeem", organization: "AIR University Islamabad", tier: "ATTENDEE", number: "REINVENT-0001" },
  { name: "Maria Bibi", organization: "Quaid-i-Azam University", tier: "ATTENDEE", number: "REINVENT-0002" },
  { name: "Muhammad Abdullah Bin Tariq", organization: "COMSATS University Islamabad", tier: "SPEAKER", number: "REINVENT-0003" },
  { name: "Fatima Tahir", organization: "NUST School of Electrical Engineering & Computer Sciences", tier: "ATTENDEE", number: "REINVENT-0004" },
  { name: "Ali Raza", organization: "Hamdard University", tier: "ATTENDEE", number: "REINVENT-0005" },
  { name: "Hassan Muhammad Kamran", organization: "Bahria University Karachi Campus", tier: "SUPPORTER", number: "REINVENT-0006" },
  { name: "Ayesha Siddiqui", organization: "University of the Punjab", tier: "ATTENDEE", number: "REINVENT-0007" },
  { name: "Usman Ghani", organization: "Arlinux Technologies", tier: "ATTENDEE", number: "REINVENT-0008" },
  { name: "Zainab Khalid", organization: "The Millenium Universal College", tier: "ATTENDEE", number: "REINVENT-0009" },
  { name: "Muhammad Bilal Ahmed", organization: "Ghulam Ishaq Khan Institute", tier: "SPEAKER", number: "REINVENT-0010" },
]

interface BatchItem {
  tab: Tab
  scale: 1 | 2
}

function cardFor(tab: Tab, config: EventConfig, onPhoto: (file: File) => void) {
  switch (tab) {
    case "Main Event":
      return (
        <MainEventCard
          venue={config.venue}
          dateRange={config.dateRange}
          edition={config.edition}
        />
      )
    case "Speaker":
      return (
        <SpeakerCard
          speakerName={config.speaker.name}
          speakerTitle={config.speaker.title}
          speakerCompany={config.speaker.company}
          speakerHandle={config.speaker.handle}
          talkTitle={config.speaker.talk}
          speakerPhoto={config.speaker.photo}
          venue={config.venue}
          dateRange={config.dateRange}
        />
      )
    case "Sponsor":
      return <PartnerCard mode="sponsor" sponsor={config.sponsor} />
    case "Community Partner":
      return <PartnerCard mode="partner" partner={config.partner} />
    case "Attendees":
      return <AttendeeCard attendee={SAMPLE_ATTENDEES[0]} />
    case "Photo Wall":
      return (
        <PhotoWall
          edition={config.edition}
          sponsor={config.sponsor}
          partner={config.partner}
        />
      )
  }
}

function slugFor(tab: Tab, config: EventConfig) {
  switch (tab) {
    case "Speaker":
      return `speaker-${config.speaker.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
    case "Sponsor":
      return `sponsor-${config.sponsor.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
    case "Community Partner":
      return `partner-${config.partner.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
    default:
      return tab.toLowerCase().replace(/\s+/g, "-")
  }
}

export default function App() {
  const [active, setActive] = useState<Tab>("Main Event")
  const [showCustomizer, setShowCustomizer] = useState(false)
  const [config, setConfig] = useState<EventConfig>(() => loadEventConfig())
  const [gradientId, setGradientId] = useState<string>(() => {
    try {
      return (
        localStorage.getItem(GRADIENT_STORAGE_KEY) || DEFAULT_GRADIENT_ID
      )
    } catch {
      return DEFAULT_GRADIENT_ID
    }
  })

  useEffect(() => {
    saveEventConfig(config)
  }, [config])

  useEffect(() => {
    try {
      localStorage.setItem(GRADIENT_STORAGE_KEY, gradientId)
    } catch {}
  }, [gradientId])

  const gradientCss =
    GRADIENT_PRESETS.find((p) => p.id === gradientId)?.css || BRAND_GRADIENT

  const patch = useCallback(
    <K extends keyof EventConfig>(key: K, value: EventConfig[K]) =>
      setConfig((prev) => ({ ...prev, [key]: value })),
    [],
  )

  const resetConfig = () => {
    clearEventConfig()
    setConfig(defaultEventConfig)
  }

  const handlePhotoUpload = async (file: File) => {
    const dataUrl = await fileToDataUrl(file)
    setConfig((prev) => ({
      ...prev,
      speaker: { ...prev.speaker, photo: dataUrl },
    }))
  }

  // Card DOM ref for 1-click PNG exports
  const cardRef = useRef<HTMLDivElement>(null)
  // Offscreen clone used for batch exports (never touches the visible preview)
  const batchRef = useRef<HTMLDivElement>(null)
  const [exportScale, setExportScale] = useState<1 | 2>(1)
  const [isExporting, setIsExporting] = useState(false)
  const [exportStatus, setExportStatus] = useState<string | null>(null)
  const [batch, setBatch] = useState<{
    items: BatchItem[]
    index: number
  } | null>(null)

  const flash = useCallback((message: string, ms = 3500) => {
    setExportStatus(message)
    setTimeout(() => setExportStatus(null), ms)
  }, [])

  const current = TABS.find((t) => t.id === active)!
  const isSquare = active !== "Main Event"

  const targetWidth = isSquare ? 1080 : 1200

  const exportCard = useCallback(
    async (element: HTMLElement, tab: Tab, scale: 1 | 2, cfg: EventConfig) => {
      const scaleTag = scale === 2 ? "-2x-retina" : ""
      const filename = `${FILE_PREFIX}-${slugFor(tab, cfg)}${scaleTag}.png`
      await exportElementAsPng(element, {
        filename,
        scale,
        targetWidth: TAB_WIDTH[tab],
      })
      return filename
    },
    [],
  )

  const handleExportPng = async () => {
    if (!cardRef.current) return
    setIsExporting(true)
    flash("Generating high-resolution PNG...", 60000)
    try {
      const filename = await exportCard(
        cardRef.current,
        active,
        exportScale,
        config,
      )
      flash(`Saved ${filename}!`)
    } catch (err) {
      console.error("Export error:", err)
      flash("Export failed. Please check image permissions.", 4000)
    } finally {
      setIsExporting(false)
    }
  }

  const handleCopyImage = async () => {
    if (!cardRef.current) return
    setIsExporting(true)
    flash("Generating image for clipboard...", 60000)
    try {
      await copyElementToClipboard(cardRef.current, {
        targetWidth,
        scale: exportScale,
      })
      flash("Copied to clipboard! (Ctrl+V / Cmd+V to paste)")
    } catch (err) {
      console.error("Clipboard copy error:", err)
      flash("Could not copy directly. Please use Download PNG.", 4000)
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportAll = () => {
    const items: BatchItem[] = []
    for (const scale of [1, 2] as const) {
      for (const tab of TABS.map((t) => t.id)) {
        items.push({ tab, scale })
      }
    }
    setIsExporting(true)
    setBatch({ items, index: 0 })
  }

  // Walk the batch queue: render each card offscreen, export, advance
  useEffect(() => {
    if (!batch) return
    if (batch.index >= batch.items.length) {
      setBatch(null)
      setIsExporting(false)
      flash(`Batch complete! ${batch.items.length} files exported.`)
      return
    }
    const item = batch.items[batch.index]
    flash(
      `Exporting ${batch.index + 1} of ${batch.items.length} — ${item.tab} ${item.scale}x...`,
      120000,
    )
    const timer = setTimeout(async () => {
      try {
        if (batchRef.current) {
          await exportCard(batchRef.current, item.tab, item.scale, config)
        }
        setBatch((prev) => (prev ? { ...prev, index: prev.index + 1 } : null))
      } catch (err) {
        console.error("Batch export error:", err)
        setBatch(null)
        setIsExporting(false)
        flash("Batch export failed. Please check image permissions.", 4000)
      }
    }, 200)
    return () => clearTimeout(timer)
  }, [batch, config, exportCard, flash])

  return (
    <GradientContext.Provider value={gradientCss}>
      <div
        style={{
          minHeight: "100vh",
          background: "#06040C",
          color: "#FFFFFF",
          fontFamily: "var(--font-brand)",
        }}
      >
      <div
        style={{ maxWidth: "1040px", margin: "0 auto", padding: "48px 24px" }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <h1
            style={{
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            Brand Kit
          </h1>
          <button
            onClick={() => setShowCustomizer(!showCustomizer)}
            style={{
              padding: "8px 18px",
              borderRadius: "8px",
              background: showCustomizer
                ? "rgba(0, 223, 216, 0.15)"
                : "transparent",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: showCustomizer ? ACCENT : "rgba(255, 255, 255, 0.85)",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              letterSpacing: "0.04em",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {showCustomizer ? "Close" : "Edit Details"}
          </button>
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
                fontFamily: "var(--font-brand)",
                fontSize: "14px",
                fontWeight: active === tab.id ? 600 : 400,
                color:
                  active === tab.id ? "#FFFFFF" : "rgba(255, 255, 255, 0.4)",
                background: "none",
                border: "none",
                borderBottom:
                  active === tab.id
                    ? `2px solid ${ACCENT}`
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
                  fontFamily: "var(--font-mono)",
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

        {/* Background Gradient Switcher */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "16px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "rgba(255, 255, 255, 0.45)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginRight: "4px",
            }}
          >
            Background:
          </span>
          {GRADIENT_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => setGradientId(p.id)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "5px 12px 5px 5px",
                borderRadius: "9999px",
                background:
                  gradientId === p.id
                    ? "rgba(0, 223, 216, 0.15)"
                    : "rgba(255, 255, 255, 0.04)",
                border:
                  gradientId === p.id
                    ? `1px solid ${ACCENT}`
                    : "1px solid rgba(255, 255, 255, 0.1)",
                color:
                  gradientId === p.id
                    ? ACCENT
                    : "rgba(255, 255, 255, 0.6)",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <span
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  background: p.css,
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  flexShrink: 0,
                }}
              />
              {p.name}
            </button>
          ))}
        </div>

        {/* Export Action Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            padding: "14px 0",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={handleExportPng}
              disabled={isExporting}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                borderRadius: "8px",
                background: "#00DFD8",
                border: "none",
                color: "#06040C",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.04em",
                cursor: isExporting ? "wait" : "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>
                {isExporting
                  ? "Rendering..."
                  : `Download PNG (${current.size})`}
              </span>
            </button>

            <button
              onClick={handleExportAll}
              disabled={isExporting}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "10px 16px",
                borderRadius: "8px",
                background: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#FFFFFF",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 700,
                cursor: isExporting ? "wait" : "pointer",
                letterSpacing: "0.04em",
                transition: "all 0.15s ease",
              }}
            >
              {isExporting ? "Batch Running..." : `Export All (${TABS.length * 2} files)`}
            </button>

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
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 600,
                cursor: isExporting ? "wait" : "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>Copy Image</span>
            </button>

            <ChoiceGroup
              options={["1x Native", "2x Retina (2160px)"] as const}
              value={
                exportScale === 1
                  ? "1x Native" as const
                  : "2x Retina (2160px)" as const
              }
              onChange={(v) => setExportScale(v === "1x Native" ? 1 : 2)}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {exportStatus ? (
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: ACCENT,
                }}
              >
                {exportStatus}
              </span>
            ) : null}
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
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              transition: "width 0.2s ease",
            }}
          >
            <div ref={cardRef} style={{ width: "100%", height: "100%" }}>
              {cardFor(active, config, handlePhotoUpload)}
            </div>
          </div>
        </div>

        {/* Hidden offscreen stage for batch exports — visibly untouched preview stays live */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            left: "-10000px",
            top: 0,
            width: `${
              batch ? TAB_WIDTH[batch.items[batch.index].tab] : 1200
            }px`,
            pointerEvents: "none",
          }}
        >
          <div ref={batchRef} style={{ width: "100%" }}>
            {batch
              ? cardFor(batch.items[batch.index].tab, config, () => {})
              : null}
          </div>
        </div>

        {/* Props Editor */}
        {showCustomizer && (
          <div
            style={{
              marginTop: "4px",
              padding: "20px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <div style={{ fontSize: "13px", fontWeight: 700 }}>
                {active} Details
              </div>
              <button
                onClick={resetConfig}
                style={{
                  padding: "5px 12px",
                  borderRadius: "6px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                  color: "rgba(255, 255, 255, 0.7)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  cursor: "pointer",
                }}
              >
                Reset to defaults
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
                marginBottom: "20px",
              }}
            >
              <TextField
                label="Venue"
                value={config.venue}
                onChange={(v) => patch("venue", v)}
              />
              <TextField
                label="City"
                value={config.city}
                onChange={(v) => patch("city", v)}
              />
              <TextField
                label="Date Range"
                value={config.dateRange}
                onChange={(v) => patch("dateRange", v)}
              />
              {active === "Main Event" && (
                <TextField
                  label="Edition"
                  value={config.edition}
                  onChange={(v) => patch("edition", v)}
                />
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
                <div style={{ marginBottom: "14px" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      color: "rgba(255, 255, 255, 0.45)",
                      textTransform: "uppercase",
                      marginRight: "12px",
                    }}
                  >
                    Sample Speaker Presets:
                  </span>
                  {SPEAKER_PRESETS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() =>
                        setConfig((prev) => ({ ...prev, speaker: p }))
                      }
                      style={{
                        marginRight: "8px",
                        marginBottom: "6px",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        background:
                          config.speaker.name === p.name
                            ? "rgba(0, 223, 216, 0.2)"
                            : "rgba(255, 255, 255, 0.05)",
                        border:
                          config.speaker.name === p.name
                            ? `1px solid ${ACCENT}`
                            : "1px solid rgba(255, 255, 255, 0.1)",
                        color:
                          config.speaker.name === p.name
                            ? ACCENT
                            : "rgba(255, 255, 255, 0.7)",
                        fontFamily: "var(--font-mono)",
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
                  <TextField
                    label="Speaker Name"
                    value={config.speaker.name}
                    onChange={(v) =>
                      setConfig((prev) => ({
                        ...prev,
                        speaker: { ...prev.speaker, name: v },
                      }))
                    }
                  />
                  <TextField
                    label="Speaker Title"
                    value={config.speaker.title}
                    onChange={(v) =>
                      setConfig((prev) => ({
                        ...prev,
                        speaker: { ...prev.speaker, title: v },
                      }))
                    }
                  />
                  <TextField
                    label="Company"
                    value={config.speaker.company}
                    onChange={(v) =>
                      setConfig((prev) => ({
                        ...prev,
                        speaker: { ...prev.speaker, company: v },
                      }))
                    }
                  />
                  <TextField
                    label="Social Handle (Optional)"
                    value={config.speaker.handle ?? ""}
                    placeholder="@speaker_handle"
                    onChange={(v) =>
                      setConfig((prev) => ({
                        ...prev,
                        speaker: { ...prev.speaker, handle: v },
                      }))
                    }
                  />
                  <TextField
                    label="Session Talk Title"
                    value={config.speaker.talk}
                    onChange={(v) =>
                      setConfig((prev) => ({
                        ...prev,
                        speaker: { ...prev.speaker, talk: v },
                      }))
                    }
                  />
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        color: "rgba(255, 255, 255, 0.45)",
                        marginBottom: "6px",
                        textTransform: "uppercase",
                      }}
                    >
                      Speaker Photo (Upload Local File or Paste URL)
                    </label>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        label=""
                        flex="1 1 300px"
                        placeholder="https://..."
                        value={config.speaker.photo}
                        onChange={(v) =>
                          setConfig((prev) => ({
                            ...prev,
                            speaker: { ...prev.speaker, photo: v },
                          }))
                        }
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
                          color: ACCENT,
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          fontWeight: 700,
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
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
                            if (file) handlePhotoUpload(file)
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
                  <TextField
                    label="Sponsor Name"
                    value={config.sponsor.name}
                    onChange={(v) =>
                      setConfig((prev) => ({
                        ...prev,
                        sponsor: { ...prev.sponsor, name: v },
                      }))
                    }
                  />
                  <ChoiceGroup
                    label="Sponsor Tier"
                    accent={false}
                    options={["Platinum", "Gold", "Silver", "Bronze"] as const}
                    value={config.sponsor.tier}
                    onChange={(v) =>
                      setConfig((prev) => ({
                        ...prev,
                        sponsor: { ...prev.sponsor, tier: v as Tier },
                      }))
                    }
                  />
                  <TextField
                    label="Sponsor Logo URL"
                    value={config.sponsor.logo ?? ""}
                    placeholder="https://..."
                    onChange={(v) =>
                      setConfig((prev) => ({
                        ...prev,
                        sponsor: { ...prev.sponsor, logo: v },
                      }))
                    }
                  />
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
                  <TextField
                    label="Partner Name"
                    value={config.partner.name}
                    onChange={(v) =>
                      setConfig((prev) => ({
                        ...prev,
                        partner: { ...prev.partner, name: v },
                      }))
                    }
                  />
                  <TextField
                    label="Partner Category / Type"
                    value={config.partner.type}
                    onChange={(v) =>
                      setConfig((prev) => ({
                        ...prev,
                        partner: { ...prev.partner, type: v },
                      }))
                    }
                  />
                  <TextField
                    label="Partner Logo URL"
                    value={config.partner.logo ?? ""}
                    placeholder="https://..."
                    onChange={(v) =>
                      setConfig((prev) => ({
                        ...prev,
                        partner: { ...prev.partner, logo: v },
                      }))
                    }
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </GradientContext.Provider>
  )
}
