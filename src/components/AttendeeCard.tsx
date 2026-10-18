import { useEffect, useState } from "react"
import QRCode from "qrcode"
import AwsReinventLogo from "./AwsReinventLogo"
import AwsLogo from "./AwsLogo"
import IslamabadHorizon from "./IslamabadHorizon"
import MeshBackground from "./MeshBackground"

export interface Attendee {
  name: string
  organization: string
  tier: string
  number: string
}

interface AttendeeCardProps {
  attendee: Attendee
}

const TIER_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  default: { bg: "#06040C", text: "#FFFFFF", border: "#06040C" },
}

export default function AttendeeCard({
  attendee,
}: AttendeeCardProps) {
  const verifyUrl = `https://awsairuniversity.com/verify/${attendee.number}`

  // QR is generated asynchronously to an SVG data-URL so it survives
  // html-to-image PNG export with no external requests
  const [qrSvg, setQrSvg] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    QRCode.toString(verifyUrl, {
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
  }, [verifyUrl])

  const tier = TIER_STYLES.default

  return (
    <div className="@container relative w-full aspect-[5/7] overflow-hidden select-none rounded-lg bg-white">
      {/* Top gradient header band (~26%) */}
      <div
        style={{
          position: "absolute",
          inset: "0 0 auto 0",
          height: "26%",
          overflow: "hidden",
          borderBottom: "1.5px solid rgba(6, 4, 12, 0.08)",
        }}
      >
        <MeshBackground className="h-full">
          {/* Content row */}
          <div
            className="relative z-10 flex items-start justify-between w-full"
            style={{ padding: "clamp(18px, 4cqi, 50px)", paddingTop: "clamp(20px, 4.6cqi, 56px)" }}
          >
            <AwsReinventLogo size="md" subline="WATCH & BUILD PARTY 2026" />
            <AwsLogo size={68} />
          </div>
        </MeshBackground>
      </div>

      {/* White middle (~58%) */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          bottom: "12%",
          left: 0,
          right: 0,
          background: "#FFFFFF",
        }}
      >
        <div
          className="w-full h-full flex flex-col items-center justify-between text-center"
          style={{ padding: "clamp(16px, 3.4cqi, 42px) clamp(28px, 6cqi, 72px)" }}
        >
          {/* Tier pill — the card's title */}
          <div
            style={{
              background: tier.bg,
              color: tier.text,
              borderRadius: "9999px",
              padding: "clamp(9px, 1.5cqi, 17px) clamp(20px, 3.4cqi, 38px)",
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(12px, 2cqi, 22px)",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            {attendee.tier}
          </div>

          {/* Name framed between two black rules */}
          <div
            style={{
              width: "88%",
              borderTop: "2.5px solid rgba(107, 111, 118, 0.5)",
              borderBottom: "2.5px solid rgba(107, 111, 118, 0.5)",
              padding: "clamp(14px, 2.6cqi, 28px) 0",
            }}
          >
            <h1
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(30px, 6.4cqi, 64px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.08,
                color: "#06040C",
                textTransform: "uppercase",
                margin: 0,
                maxWidth: "100%",
              }}
            >
              {attendee.name}
            </h1>
          </div>

          {/* Footer row: attendee number + QR */}
          <div
            className="flex items-end justify-between w-full"
            style={{ gap: "clamp(12px, 2cqi, 24px)" }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(17px, 3.6cqi, 36px)",
                fontWeight: 700,
                letterSpacing: "0.04em",
                color: "#06040C",
                lineHeight: 1,
                textAlign: "left",
                flexShrink: 0,
              }}
            >
              #{attendee.number}
            </div>

            {/* QR: verify scan target */}
            <div
              style={{
                width: "clamp(64px, 14cqi, 150px)",
                height: "clamp(64px, 14cqi, 150px)",
                padding: "clamp(5px, 0.9cqi, 10px)",
                background: "#FFFFFF",
                border: "2px solid #06040C",
                borderRadius: "clamp(8px, 1.4cqi, 16px)",
                flexShrink: 0,
              }}
            >
              <img
                src={qrSvg || undefined}
                alt={`Verify badge ${attendee.number}`}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  visibility: qrSvg ? "visible" : "hidden",
                  imageRendering: "pixelated",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Islamabad skyline footer (~10%) */}
      <div
        style={{
          position: "absolute",
          inset: "auto 0 0 0",
          height: "10%",
          overflow: "hidden",
          background: "#FFFFFF",
        }}
      >
        <IslamabadHorizon
          opacity={0.22}
          height="100%"
          objectFit="cover"
          className="[filter:brightness(0)]"
        />
      </div>
    </div>
  )
}
