import { useEffect, useState, useContext } from "react"
import QRCode from "qrcode"
import AwsLogo from "./AwsLogo"
import AwsSbgLogo from "./AwsSbgLogo"
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

/**
 * Portrait 4:5 prompt family — one skeleton, three variants.
 * Layering: mesh gradient → cyan horizon glow → dark scrim → skyline →
 * glowing ISLAMABAD → content. The scrim guarantees type contrast on any
 * gradient preset.
 */
export default function PortraitPromptCard({
  variant,
  dateRange = "DEC, 2026",
  venue = "AIR UNIVERSITY",
  registerUrl = REGISTER_URL,
}: PortraitPromptCardProps) {
  const isOpen = variant === "open"
  const isTrailer = variant === "trailer"

  const kicker = isTrailer
    ? "COMING SOON"
    : isOpen
      ? "REGISTRATION NOW OPEN"
      : "AWS COMMUNITY ISLAMABAD IS BRINGING"
  const kickerColor =
    isTrailer || isOpen ? "#00DFD8" : "rgba(255, 255, 255, 0.82)"

  // QR for the Registration Open variant — inline SVG data-URL survives
  // html-to-image PNG export with no external requests.
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
        {/* Cyan horizon glow (behind scrim so it glows through softly) */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 bottom-0"
          style={{
            height: "40%",
            zIndex: 1,
            background:
              "radial-gradient(70% 100% at 50% 100%, rgba(0, 223, 216, 0.28) 0%, rgba(10, 141, 192, 0.14) 45%, rgba(0, 0, 0, 0) 78%)",
          }}
        />

        {/* Dark scrim — guarantees readable type on any gradient preset */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            zIndex: 2,
            background:
              "linear-gradient(180deg, rgba(6, 4, 12, 0.62) 0%, rgba(6, 4, 12, 0.30) 34%, rgba(6, 4, 12, 0.18) 62%, rgba(6, 4, 12, 0.66) 100%)",
          }}
        />

        {/* Islamabad skyline sitting on top of the scrim */}
        <IslamabadHorizon opacity={0.75} height="27%" />

        {/* Glow word just above the skyline */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 text-center"
          style={{
            bottom: "28.5%",
            zIndex: 4,
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(13px, 2.1cqi, 26px)",
            fontWeight: 700,
            letterSpacing: "0.5em",
            color: "#00DFD8",
            textShadow:
              "0 0 22px rgba(0, 223, 216, 0.9), 0 0 56px rgba(0, 223, 216, 0.45)",
          }}
        >
          ISLAMABAD
        </div>

        {/* Content */}
        <div
          className="relative w-full h-full flex flex-col items-center text-center"
          style={{
            zIndex: 10,
            padding: "clamp(28px, 5.2cqi, 60px)",
            paddingBottom: "clamp(84px, 19cqi, 210px)",
          }}
        >
          {/* Header corners: AWS left, SBG right */}
          <div
            className="w-full flex items-start justify-between"
            style={{ marginBottom: "clamp(8px, 1cqi, 16px)" }}
          >
            <AwsLogo size={46} />
            <AwsSbgLogo size={30} />
          </div>

          {/* Hero cluster — centered in the remaining space */}
          <div
            className="flex flex-col items-center"
            style={{ margin: "auto 0" }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(11px, 1.7cqi, 17px)",
                fontWeight: 700,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: kickerColor,
                marginBottom: "clamp(20px, 3.6cqi, 40px)",
                textShadow: "0 2px 18px rgba(6, 4, 12, 0.5)",
              }}
            >
              {kicker}
            </span>

            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(15px, 2.4cqi, 27px)",
                fontWeight: 700,
                letterSpacing: "0.22em",
                color: "#FFFFFF",
                lineHeight: 1,
                marginBottom: "clamp(8px, 1.4cqi, 16px)",
              }}
            >
              AWS
            </span>

            <span
              style={{
                fontFamily: "var(--font-brand)",
                fontSize: "clamp(58px, 14.5cqi, 165px)",
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                textShadow: "0 10px 44px rgba(6, 4, 12, 0.5)",
              }}
            >
              re:Invent
            </span>

            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(13px, 2.4cqi, 27px)",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(255, 255, 255, 0.92)",
                lineHeight: 1.3,
                marginTop: "clamp(10px, 1.8cqi, 22px)",
                textShadow: "0 2px 18px rgba(6, 4, 12, 0.55)",
              }}
            >
              Watch &amp; Build Party
            </span>

            <span
              style={{
                fontFamily: "var(--font-brand)",
                fontSize: "clamp(74px, 18cqi, 200px)",
                fontWeight: 700,
                lineHeight: 0.9,
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
                marginTop: "clamp(14px, 2.6cqi, 32px)",
                textShadow:
                  "0 12px 60px rgba(6, 4, 12, 0.55), 0 0 70px rgba(0, 223, 216, 0.3)",
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
                  background: "rgba(6, 4, 12, 0.5)",
                  border: "1px solid rgba(255, 255, 255, 0.16)",
                  borderRadius: "clamp(10px, 1.6cqi, 18px)",
                  padding: "clamp(12px, 1.9cqi, 22px) clamp(16px, 2.6cqi, 30px)",
                }}
              >
                <EventMeta size="lg" dateRange={dateRange} venue={venue} />
              </div>
            )}

            {isOpen && (
              <div
                className="w-full flex items-center justify-between"
                style={{
                  background: "rgba(6, 4, 12, 0.5)",
                  border: "1px solid rgba(255, 255, 255, 0.16)",
                  borderRadius: "clamp(12px, 1.8cqi, 20px)",
                  padding: "clamp(12px, 1.9cqi, 20px) clamp(16px, 2.4cqi, 28px)",
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
                    width: "clamp(96px, 15cqi, 160px)",
                    height: "clamp(96px, 15cqi, 160px)",
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
