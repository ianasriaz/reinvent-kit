import { useState, useEffect, useRef } from "react"
import { SPEAKER_DECK_SLIDES } from "./SpeakerDeck"
import { PAGE_W, PAGE_H } from "../deck/DeckChrome"
import { ACCENT } from "../../data/brand"
import AwsLogo from "../AwsLogo"
import AwsSbgLogo from "../AwsSbgLogo"

export default function SpeakerDeckViewer() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  })

  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  // Track viewport dimensions accurately across mobile orientation / address bar changes
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

  // Fullscreen state listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFsChange)
    return () => document.removeEventListener("fullscreenchange", handleFsChange)
  }, [])

  // Keyboard navigation & anti-print / anti-save guards
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Strictly prevent Ctrl+P / Cmd+P (Print) and Ctrl+S / Cmd+S (Save)
      if ((e.ctrlKey || e.metaKey) && (e.key === "p" || e.key === "s" || e.key === "P" || e.key === "S")) {
        e.preventDefault()
        e.stopPropagation()
        return false
      }

      // Slide navigation shortcuts
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
      } else if (e.key === "Escape") {
        setIsDrawerOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Mobile swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const diffX = e.changedTouches[0].clientX - touchStartX.current
    const diffY = e.changedTouches[0].clientY - touchStartY.current

    // Trigger page flip if horizontal swipe exceeds 40px and is primarily horizontal
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
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

  const goToPrev = () => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))
  const goToNext = () => setCurrentSlideIndex((prev) => Math.min(SPEAKER_DECK_SLIDES.length - 1, prev + 1))

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }

  const isMobile = windowSize.width < 768
  const currentSlide = SPEAKER_DECK_SLIDES[currentSlideIndex]

  // Dynamic responsive scale calculation
  // Computes scale factor to fit slide completely inside visible viewport without horizontal or vertical clipping
  const headerHeight = isMobile ? 50 : 58
  const footerHeight = isMobile ? 66 : 70
  const horizontalPadding = isMobile ? 16 : 48
  const verticalPadding = isMobile ? 12 : 24

  const availableWidth = Math.max(260, windowSize.width - horizontalPadding * 2)
  const availableHeight = Math.max(300, windowSize.height - headerHeight - footerHeight - verticalPadding * 2)

  const slideScale = Math.min(
    1,
    availableWidth / PAGE_W,
    availableHeight / PAGE_H
  )

  const slideWidth = Math.round(PAGE_W * slideScale)
  const slideHeight = Math.round(PAGE_H * slideScale)

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      style={{
        minHeight: "100dvh",
        height: "100dvh",
        background: "#06040C",
        color: "#FFFFFF",
        fontFamily: "var(--font-brand, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
        display: "flex",
        flexDirection: "column",
        userSelect: "none",
        WebkitUserSelect: "none",
        position: "relative",
        overflow: "hidden",
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
      `}</style>

      {/* Top Header Bar - Clean, Minimal & Never Cluttered on Mobile */}
      <header
        style={{
          height: headerHeight,
          background: "rgba(6, 4, 12, 0.95)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "0 12px" : "0 24px",
          zIndex: 40,
        }}
      >
        {/* Left: Branding */}
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 12, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
            <AwsLogo size={isMobile ? 26 : 30} />
            <AwsSbgLogo size={isMobile ? 20 : 24} />
          </div>

          <div
            style={{
              height: 16,
              width: 1,
              background: "rgba(255, 255, 255, 0.15)",
              flexShrink: 0,
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
            <span
              style={{
                fontSize: isMobile ? 12 : 13.5,
                fontWeight: 700,
                color: "#FFFFFF",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: 1.2,
              }}
            >
              Call for Speakers
            </span>
            <span
              style={{
                fontSize: isMobile ? 9.5 : 10.5,
                color: "rgba(255, 255, 255, 0.55)",
                whiteSpace: "nowrap",
                lineHeight: 1.2,
              }}
            >
              AWS re:Invent 2026
            </span>
          </div>
        </div>

        {/* Right: Slide Counter Pill & Outline Drawer Trigger */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          {/* Slide Indicator Button / Drawer Opener */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            title="Open slides outline"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.14)",
              borderRadius: 8,
              padding: isMobile ? "5px 9px" : "6px 12px",
              color: "#FFFFFF",
              fontSize: isMobile ? 11 : 12.5,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                color: ACCENT,
                fontWeight: 700,
              }}
            >
              {currentSlide.number} / {String(SPEAKER_DECK_SLIDES.length).padStart(2, "0")}
            </span>
            <span style={{ fontSize: 11, color: "rgba(255, 255, 255, 0.6)" }}>
              {isMobile ? "☰" : "Slides ▾"}
            </span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            style={{
              width: isMobile ? 32 : 36,
              height: isMobile ? 32 : 36,
              borderRadius: 8,
              border: "1px solid rgba(255, 255, 255, 0.12)",
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

      {/* Main Presentation Canvas */}
      <main
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: `${verticalPadding}px ${horizontalPadding}px`,
        }}
      >
        {/* Slide Stage Wrapper */}
        <div
          style={{
            position: "relative",
            width: slideWidth,
            height: slideHeight,
            flexShrink: 0,
            borderRadius: Math.max(6, Math.round(14 * slideScale)),
            overflow: "hidden",
            boxShadow: "0 20px 60px -10px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.1)",
            background: "#06040C",
          }}
        >
          {/* Scaled A4 Content */}
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

          {/* Invisible Left / Right Tap Zones on Slide */}
          <div
            onClick={goToPrev}
            title="Previous Slide"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "35%",
              height: "100%",
              cursor: currentSlideIndex > 0 ? "pointer" : "default",
              zIndex: 10,
            }}
          />
          <div
            onClick={goToNext}
            title="Next Slide"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "45%",
              height: "100%",
              cursor: currentSlideIndex < SPEAKER_DECK_SLIDES.length - 1 ? "pointer" : "default",
              zIndex: 10,
            }}
          />
        </div>
      </main>

      {/* Bottom Floating Navigation Dock (Always Pinned, 100% Visible) */}
      <footer
        style={{
          height: footerHeight,
          background: "rgba(6, 4, 12, 0.95)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile
            ? "0 12px env(safe-area-inset-bottom, 0px)"
            : "0 24px",
          zIndex: 40,
        }}
      >
        {/* Previous Button */}
        <button
          onClick={goToPrev}
          disabled={currentSlideIndex === 0}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            minHeight: 44,
            padding: isMobile ? "0 12px" : "0 18px",
            borderRadius: 10,
            border: "1.5px solid rgba(255, 255, 255, 0.15)",
            background: currentSlideIndex === 0 ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.08)",
            color: currentSlideIndex === 0 ? "rgba(255, 255, 255, 0.25)" : "#FFFFFF",
            fontSize: isMobile ? 12.5 : 13.5,
            fontWeight: 600,
            cursor: currentSlideIndex === 0 ? "not-allowed" : "pointer",
            transition: "all 0.15s ease",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>Prev</span>
        </button>

        {/* Center Progress & Slide Title Indicator */}
        <div
          onClick={() => setIsDrawerOpen(true)}
          title="Click to view all slides"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            cursor: "pointer",
            padding: "4px 8px",
            borderRadius: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: isMobile ? 13 : 14,
                fontWeight: 700,
                color: ACCENT,
                letterSpacing: "0.04em",
              }}
            >
              {currentSlide.number} / {String(SPEAKER_DECK_SLIDES.length).padStart(2, "0")}
            </span>
            <span
              style={{
                fontSize: isMobile ? 11.5 : 13,
                color: "rgba(255, 255, 255, 0.75)",
                fontWeight: 500,
                maxWidth: isMobile ? 140 : 260,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              · {currentSlide.title}
            </span>
          </div>

          {/* Visual Progress Stepper Dots */}
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 4 : 5 }}>
            {SPEAKER_DECK_SLIDES.map((_, idx) => (
              <div
                key={idx}
                style={{
                  width: currentSlideIndex === idx ? (isMobile ? 14 : 18) : 5,
                  height: 4,
                  borderRadius: 2,
                  background: currentSlideIndex === idx ? ACCENT : "rgba(255, 255, 255, 0.2)",
                  transition: "all 0.2s ease",
                }}
              />
            ))}
          </div>
        </div>

        {/* Next Button (High-Contrast Cyan CTA) */}
        <button
          onClick={goToNext}
          disabled={currentSlideIndex === SPEAKER_DECK_SLIDES.length - 1}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            minHeight: 44,
            padding: isMobile ? "0 14px" : "0 20px",
            borderRadius: 10,
            border: "none",
            background: currentSlideIndex === SPEAKER_DECK_SLIDES.length - 1 ? "rgba(255, 255, 255, 0.05)" : ACCENT,
            color: currentSlideIndex === SPEAKER_DECK_SLIDES.length - 1 ? "rgba(255, 255, 255, 0.3)" : "#06040C",
            fontSize: isMobile ? 12.5 : 13.5,
            fontWeight: 700,
            cursor: currentSlideIndex === SPEAKER_DECK_SLIDES.length - 1 ? "not-allowed" : "pointer",
            boxShadow: currentSlideIndex < SPEAKER_DECK_SLIDES.length - 1 ? "0 2px 14px rgba(0, 223, 216, 0.35)" : "none",
            transition: "all 0.15s ease",
          }}
        >
          <span>Next</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </footer>

      {/* Slide Drawer Modal (Quick Navigation Across All 9 Pages) */}
      {isDrawerOpen && (
        <div
          onClick={() => setIsDrawerOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            zIndex: 100,
            display: "flex",
            justifyContent: "flex-end",
            animation: "fadeIn 0.2s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(360px, 85vw)",
              height: "100%",
              background: "#0D0917",
              borderLeft: "1px solid rgba(255, 255, 255, 0.12)",
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              boxShadow: "-10px 0 40px rgba(0, 0, 0, 0.8)",
            }}
          >
            {/* Drawer Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: 14 }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#FFFFFF" }}>Slide Navigation</span>
                <span style={{ fontSize: 11, color: "rgba(255, 255, 255, 0.5)" }}>Select any slide to jump</span>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "none",
                  borderRadius: 6,
                  color: "#FFFFFF",
                  width: 32,
                  height: 32,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                }}
              >
                ✕
              </button>
            </div>

            {/* Slide Items List */}
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
              {SPEAKER_DECK_SLIDES.map((slide, idx) => {
                const isActive = currentSlideIndex === idx
                return (
                  <button
                    key={slide.id}
                    onClick={() => {
                      setCurrentSlideIndex(idx)
                      setIsDrawerOpen(false)
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 14px",
                      borderRadius: 10,
                      border: isActive ? `1.5px solid ${ACCENT}` : "1px solid rgba(255, 255, 255, 0.06)",
                      background: isActive ? "rgba(0, 223, 216, 0.08)" : "rgba(255, 255, 255, 0.02)",
                      color: isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.75)",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: 12,
                        fontWeight: 700,
                        color: isActive ? ACCENT : "rgba(255, 255, 255, 0.4)",
                        width: 24,
                      }}
                    >
                      {slide.number}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 400, flex: 1 }}>
                      {slide.title}
                    </span>
                    {isActive && (
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
