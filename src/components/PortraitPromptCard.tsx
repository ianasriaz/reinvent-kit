import { useEffect, useState, useContext } from "react"
import QRCode from "qrcode"
import AwsLogo from "./AwsLogo"
import AwsSbgLogo from "./AwsSbgLogo"
import AwsReinventLogo from "./AwsReinventLogo"
import IslamabadHorizon from "./IslamabadHorizon"
import MeshBackground from "./MeshBackground"
import EventMeta from "./shared/EventMeta"
import { GradientContext } from "../gradientContext"

export type PortraitVariant = "main" | "trailer" | "open"

interface PortraitPromptCardProps {
  variant: PortraitVariant
  dateRange?: string
  venue?: string
  registerUrl?: string
}

const REGISTER_URL = "https://awsairuniversity.com/aws-reinvent/"

/** Portrait 4:5 prompt family — one skeleton, three variants (Main / Trailer / Open). */
export default function PortraitPromptCard({
  variant,
  dateRange = "DEC, 2026",
  venue = "AIR UNIVERSITY",
  registerUrl = REGISTER_URL,
}: PortraitPromptCardProps) {
  const gradient = useContext(GradientContext)

  const isTrailer = variant === "trailer"
  const isOpen = variant === "open"

  // Trailer stays 100% pure: no CTA, no community mention
  const kicker = isTrailer
    ? "COMING SOON"
    : isOpen
      ? "REGISTRATION NOW OPEN"
      : "AWS COMMUNITY ISLAMABAD IS BRINGING"
  const kickerColor = isTrailer || isOpen ? "#00DFD8" : "rgba(255, 255, 255, 0.75)"

  // QR for the Registration Open variant — generated to an inline SVG data-URL
  // so it survives html-to-image PNG export with zero external requests.
  const [qrSvg, setQrSvg] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) return
    let cancelled = false
    QRCode.toString(registerUrl, {
      type: "svg",
      margin: 0,
      color: { dark: "#06040C", light: "#FFFFFF" },
      errorCorrectionLevel: "M",
    })
      .then((svg) => {
        if (!cancelled) {
          setQrSvg(
            "data:image/svg+xml;utf8," + window.encodeURIComponent(svg),
          )
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [isOpen, registerUrl])

  return (
    <div className="@container relative w-full aspect-[4/5] overflow-hidden select-none rounded-lg shadow-2xl">
      <MeshBackground>
        {/* Horizon glow behind the skyline */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 bottom-0"
          style={{
            height: "42%",
            zIndex: 1,
            background:
              "radial-gradient(70% 100% at 50% 100%, rgba(0, 223, 216, 0.3) 0%, rgba(10, 141, 192, 0.14) 45%, rgba(0, 0, 0, 0) 78%)",
          }}
        />

        {/* Islamabad skyline */}
        <IslamabadHorizon opacity={isTrailer ? 0.58 : 0.46} height="34%" />

        {/* ISLAMABAD — glowing closing beat just above the skyline */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 text-center"
          style={{
            bottom: "31.5%",
            zIndex: 5,
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(13px, 2.3cqi, 28px)",
            fontWeight: 700,
            letterSpacing: "0.42em",
            color: "#00DFD8",
            textShadow:
              "0 0 26px rgba(0, 223, 216, 0.85), 0 0 60px rgba(0, 223, 216, 0.4)",
          }}
        >
          ISLAMABAD
        </div>

        {/* Content column */}
        <div
          className="relative z-10 w-full h-full flex flex-col items-center"
          style={{
            padding: "clamp(28px, 5.2cqi, 60px)",
            paddingBottom: "clamp(90px, 22cqi, 240px)", // clears the skyline
          }}
        >
          {/* Header corners: AWS left, SBG right */}
          <div
            className="w-full flex items-start justify-between"
            style={{ marginBottom: "clamp(20px, 4.5cqi, 52px)" }}
          >
            <AwsLogo size={48} />
            <AwsSbgLogo size={30} />
          </div>

          {/* Kicker */}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(11px, 1.7cqi, 17px)",
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: kickerColor,
              marginBottom: "clamp(26px, 6cqi, 64px)",
              textAlign: "center",
            }}
          >
            {kicker}
          </span>

          {/* Stacked lockup */}
          <div className="flex flex-col items-center">
            <AwsReinventLogo size="hero" subline="WATCH & BUILD PARTY" />
            <span
              style={{
                fontFamily: "var(--font-brand)",
                fontSize: "clamp(64px, 14cqi, 170px)",
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-0.04em",
                marginTop: "clamp(10px, 2cqi, 24px)",
                backgroundImage: gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              2026
            </span>
          </div>

          {/* Bottom information strip */}
          <div
            className="flex items-center justify-center"
            style={{
              marginTop: "auto",
              width: "100%",
              maxWidth: "min(100%, 860px)",
            }}
          >
            {variant === "main" && (
              <div
                style={{
                  display: "inline-flex",
                  background: "rgba(6, 4, 12, 0.42)",
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                  borderRadius: "clamp(10px, 1.6cqi, 18px)",
                  padding: "clamp(12px, 1.9cqi, 22px) clamp(16px, 2.6cqi, 30px)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                <EventMeta size="lg" dateRange={dateRange} venue={venue} />
              </div>
            )}

            {isOpen && (
              <div
                className="w-full flex items-center justify-between"
                style={{
                  background: "rgba(6, 4, 12, 0.42)",
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                  borderRadius: "clamp(12px, 1.8cqi, 20px)",
                  padding: "clamp(12px, 1.9cqi, 20px) clamp(16px, 2.4cqi, 28px)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  gap: "clamp(14px, 2.4cqi, 28px)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "clamp(12px, 1.9cqi, 20px)",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    color: "#FFFFFF",
                    textAlign: "left",
                  }}
                >
                  <div style={{ opacity: 0.75, marginBottom: "4px" }}>
                    Scan or visit
                  </div>
                  awsairuniversity.com
                  <div style={{ color: "#00DFD8" }}>/aws-reinvent</div>
                </div>

                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "clamp(10px, 1.5cqi, 16px)",
                    padding: "clamp(9px, 1.3cqi, 15px)",
                    flexShrink: 0,
                    width: "clamp(96px, 16cqi, 170px)",
                    height: "clamp(96px, 16cqi, 170px)",
                  }}
                >
                  {qrSvg && (
                    <img
                      src={qrSvg}
                      alt="Registration QR"
                      crossOrigin="anonymous"
                      style={{ width: "100%", height: "100%", display: "block" }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </MeshBackground>
    </div>
  )
}
