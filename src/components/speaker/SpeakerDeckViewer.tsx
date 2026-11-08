import { useState, useEffect, useRef, useCallback } from "react"
import { SPEAKER_DECK_SLIDES, type SpeakerDeckSlide } from "./SpeakerDeck"
import { PAGE_W, PAGE_H } from "../deck/DeckChrome"
import { ACCENT } from "../../data/brand"
import AwsLogo from "../AwsLogo"
import AwsSbgLogo from "../AwsSbgLogo"

export default function SpeakerDeckViewer() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [viewMode, setViewMode] = useState<"slides" | "scroll">("slides")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  })

  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  // Track window resize for responsive scale calculation
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Fullscreen change listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFsChange)
    return () => document.removeEventListener("fullscreenchange", handleFsChange)
  }, [])

  // Anti-download / anti-print shortcuts blocker
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block Ctrl+P / Cmd+P (Print) and Ctrl+S / Cmd+S (Save)
      if ((e.ctrlKey || e.metaKey) && (e.key === "p" || e.key === "s" || e.key === "P" || e.key === "S")) {
        e.preventDefault()
        e.stopPropagation()
        return false
      }

      // Slide navigation shortcuts (in slides view mode)
      if (viewMode === "slides") {
        if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " " || e.key === "PageDown") {
          e.preventDefault()
          setCurrentSlideIndex((prev) => Math.min(SPEAKER_DECK_SLIDES.length - 1, prev + 1))
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
          e.preventDefault()
          setCurrentSlideIndex((prev) => Math.max(0, prev - 1))
        } else if (e.key === "Home") {
          e.preventDefault()
          setCurrentSlideIndex(0)
        } else if (e.key === "End") {
          e.preventDefault()
          setCurrentSlideIndex(SPEAKER_DECK_SLIDES.length - 1)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [viewMode])

  // Mobile swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    if (viewMode !== "slides") return
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (viewMode !== "slides" || touchStartX.current === null || touchStartY.current === null) return
    const diffX = e.changedTouches[0].clientX - touchStartX.current
    const diffY = e.changedTouches[0].clientY - touchStartY.current

    // Detect horizontal swipe if delta X is greater than delta Y and exceeds 45px
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 45) {
      if (diffX < 0) {
        // Swiped left -> next
        setCurrentSlideIndex((prev) => Math.min(SPEAKER_DECK_SLIDES.length - 1, prev + 1))
      } else {
        // Swiped right -> prev
        setCurrentSlideIndex((prev) => Math.max(0, prev - 1))
      }
    }
    touchStartX.current = null
    touchStartY.current = null
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }

  const currentSlide = SPEAKER_DECK_SLIDES[currentSlideIndex]

  // Dynamic responsive scale calculation
  // In slides mode: scale to fit both width and height within viewport (accounting for header and footer)
  const headerHeight = 60
  const footerHeight = 64
  const paddingX = windowSize.width < 640 ? 16 : 32
  const paddingY = windowSize.width < 640 ? 12 : 24

  const availableWidth = Math.max(280, windowSize.width - paddingX * 2)
  const availableHeight = Math.max(320, windowSize.height - headerHeight - (viewMode === "slides" ? footerHeight : 0) - paddingY * 2)

  const slideScale = Math.min(
    1,
    availableWidth / PAGE_W,
    viewMode === "slides" ? availableHeight / PAGE_H : 1
  )

  const scrollScale = Math.min(1, availableWidth / PAGE_W)

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      style={{
        minHeight: "100vh",
        background: "#06040C",
        color: "#FFFFFF",
        fontFamily: "var(--font-brand, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
        display: "flex",
        flexDirection: "column",
        userSelect: "none",
        WebkitUserSelect: "none",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Strict anti-print CSS */}
      <style>{`
        @media print {
          html, body, #root, * {
            display: none !important;
            visibility: hidden !important;
          }
        }
        ::selection {
          background: rgba(0, 223, 216, 0.25);
          color: #ffffff;
        }
      `}</style>

      {/* Top Floating / Sticky Navigation Bar */}
      <header
        style={{
          height: headerHeight,
          background: "rgba(6, 4, 12, 0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(12px, 3vw, 24px)",
          gap: 12,
        }}
      >
        {/* Left: Branding & Invite-Only Tag */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <AwsLogo size={32} />
            <AwsSbgLogo size={24} />
          </div>
          <div
            style={{
              height: 20,
              width: 1,
              background: "rgba(255, 255, 255, 0.15)",
              flexShrink: 0,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "-0.01em",
                color: "#FFFFFF",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Call for Speakers
            </span>
            <span
              style={{
                fontSize: 10.5,
                color: "rgba(255, 255, 255, 0.55)",
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
              }}
            >
              AWS re:Invent 2026 · Islamabad
            </span>
          </div>

          <span
            style={{
              display: windowSize.width < 680 ? "none" : "inline-flex",
              alignItems: "center",
              padding: "2px 8px",
              borderRadius: 9999,
              background: "rgba(0, 223, 216, 0.08)",
              border: "1px solid rgba(0, 223, 216, 0.3)",
              color: ACCENT,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              flexShrink: 0,
            }}
          >
            Invite Only
          </span>
        </div>

        {/* Center: Slide Jump Selector (Slide Mode) */}
        {viewMode === "slides" && (
          <div
            style={{
              display: windowSize.width < 860 ? "none" : "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <select
              value={currentSlideIndex}
              onChange={(e) => setCurrentSlideIndex(Number(e.target.value))}
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.14)",
                borderRadius: 8,
                color: "#FFFFFF",
                padding: "6px 12px",
                fontSize: 12.5,
                fontFamily: "inherit",
                cursor: "pointer",
                outline: "none",
              }}
            >
              {SPEAKER_DECK_SLIDES.map((s, idx) => (
                <option key={s.id} value={idx} style={{ background: "#110D1B", color: "#FFFFFF" }}>
                  {s.number} · {s.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Right: View Mode Toggle & Fullscreen */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          {/* View Mode Segmented Switch */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(255, 255, 255, 0.06)",
              borderRadius: 8,
              padding: 2,
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <button
              onClick={() => setViewMode("slides")}
              title="Presentation Mode (One slide at a time)"
              style={{
                border: "none",
                background: viewMode === "slides" ? "rgba(255, 255, 255, 0.16)" : "transparent",
                color: viewMode === "slides" ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)",
                fontSize: 11.5,
                fontWeight: 600,
                padding: "5px 10px",
                borderRadius: 6,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              Slide View
            </button>
            <button
              onClick={() => setViewMode("scroll")}
              title="Continuous Scroll Mode (All slides stacked)"
              style={{
                border: "none",
                background: viewMode === "scroll" ? "rgba(255, 255, 255, 0.16)" : "transparent",
                color: viewMode === "scroll" ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)",
                fontSize: 11.5,
                fontWeight: 600,
                padding: "5px 10px",
                borderRadius: 6,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              All Pages
            </button>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: "1px solid rgba(255, 255, 255, 0.1)",
              background: "rgba(255, 255, 255, 0.04)",
              color: "#FFFFFF",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
            }}
          >
            {isFullscreen ? "✕" : "⛶"}
          </button>
        </div>
      </header>

      {/* Main Presentation Stage */}
      <main
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: viewMode === "slides" ? "center" : "flex-start",
          padding: `${paddingY}px ${paddingX}px`,
          position: "relative",
        }}
      >
        {viewMode === "slides" ? (
          /* Single Slide Presentation Mode */
          <div
            style={{
              width: Math.round(PAGE_W * slideScale),
              height: Math.round(PAGE_H * slideScale),
              overflow: "hidden",
              position: "relative",
              borderRadius: Math.round(12 * slideScale),
              boxShadow: "0 20px 50px -10px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)",
              background: "#06040C",
              transition: "transform 0.15s ease, width 0.15s ease, height 0.15s ease",
            }}
          >
            <div
              style={{
                width: PAGE_W,
                height: PAGE_H,
                transform: `scale(${slideScale})`,
                transformOrigin: "top left",
                pointerEvents: "auto",
              }}
            >
              <currentSlide.component />
            </div>
          </div>
        ) : (
          /* Continuous Scroll Mode (All 9 Slides Vertically) */
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 28,
              width: Math.round(PAGE_W * scrollScale),
              maxWidth: "100%",
            }}
          >
            {SPEAKER_DECK_SLIDES.map((slide, idx) => (
              <div
                key={slide.id}
                style={{
                  width: Math.round(PAGE_W * scrollScale),
                  height: Math.round(PAGE_H * scrollScale),
                  overflow: "hidden",
                  position: "relative",
                  borderRadius: Math.round(12 * scrollScale),
                  boxShadow: "0 18px 45px -10px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)",
                  background: "#06040C",
                }}
              >
                <div
                  style={{
                    width: PAGE_W,
                    height: PAGE_H,
                    transform: `scale(${scrollScale})`,
                    transformOrigin: "top left",
                    pointerEvents: "auto",
                  }}
                >
                  <slide.component />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Bottom Controller Bar (Active in Slide View Mode) */}
      {viewMode === "slides" && (
        <footer
          style={{
            height: footerHeight,
            background: "rgba(6, 4, 12, 0.9)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            position: "sticky",
            bottom: 0,
            zIndex: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 clamp(16px, 4vw, 32px)",
          }}
        >
          {/* Previous Button */}
          <button
            onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentSlideIndex === 0}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid rgba(255, 255, 255, 0.14)",
              background: currentSlideIndex === 0 ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.08)",
              color: currentSlideIndex === 0 ? "rgba(255, 255, 255, 0.3)" : "#FFFFFF",
              fontSize: 13,
              fontWeight: 600,
              cursor: currentSlideIndex === 0 ? "not-allowed" : "pointer",
              transition: "all 0.15s ease",
            }}
          >
            ← <span style={{ display: windowSize.width < 480 ? "none" : "inline" }}>Previous</span>
          </button>

          {/* Center Indicator */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: 13,
                  fontWeight: 700,
                  color: ACCENT,
                  letterSpacing: "0.04em",
                }}
              >
                {currentSlide.number} / {String(SPEAKER_DECK_SLIDES.length).padStart(2, "0")}
              </span>
              <span
                style={{
                  fontSize: 12.5,
                  color: "rgba(255, 255, 255, 0.75)",
                  fontWeight: 500,
                  display: windowSize.width < 540 ? "none" : "inline",
                }}
              >
                · {currentSlide.title}
              </span>
            </div>

            {/* Micro dots */}
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              {SPEAKER_DECK_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  title={`Jump to slide ${idx + 1}`}
                  style={{
                    width: currentSlideIndex === idx ? 16 : 6,
                    height: 5,
                    borderRadius: 3,
                    background: currentSlideIndex === idx ? ACCENT : "rgba(255, 255, 255, 0.2)",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={() => setCurrentSlideIndex((prev) => Math.min(SPEAKER_DECK_SLIDES.length - 1, prev + 1))}
            disabled={currentSlideIndex === SPEAKER_DECK_SLIDES.length - 1}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid rgba(255, 255, 255, 0.14)",
              background: currentSlideIndex === SPEAKER_DECK_SLIDES.length - 1 ? "rgba(255, 255, 255, 0.03)" : ACCENT,
              color: currentSlideIndex === SPEAKER_DECK_SLIDES.length - 1 ? "rgba(255, 255, 255, 0.3)" : "#06040C",
              fontSize: 13,
              fontWeight: 700,
              cursor: currentSlideIndex === SPEAKER_DECK_SLIDES.length - 1 ? "not-allowed" : "pointer",
              transition: "all 0.15s ease",
            }}
          >
            <span style={{ display: windowSize.width < 480 ? "none" : "inline" }}>Next</span> →
          </button>
        </footer>
      )}
    </div>
  )
}
