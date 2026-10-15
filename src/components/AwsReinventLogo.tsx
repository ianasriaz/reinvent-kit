import React from "react"

interface AwsReinventLogoProps {
  size?: "sm" | "md" | "lg" | "hero"
  subline?: string
  className?: string
  style?: React.CSSProperties
}

export default function AwsReinventLogo({
  size = "md",
  subline,
  className = "",
  style = {},
}: AwsReinventLogoProps) {
  const SIZES = {
    sm: {
      awsSize: "clamp(9px, 1.4cqi, 13px)",
      reSize: "clamp(12px, 1.9cqi, 17px)",
      inventSize: "clamp(24px, 3.6cqi, 34px)",
      gap: "clamp(3px, 0.5cqi, 6px)",
      sublineSize: "clamp(6.5px, 0.95cqi, 9px)",
    },
    md: {
      awsSize: "clamp(12px, 1.8cqi, 18px)",
      reSize: "clamp(16px, 2.4cqi, 24px)",
      inventSize: "clamp(32px, 4.8cqi, 48px)",
      gap: "clamp(4px, 0.7cqi, 8px)",
      sublineSize: "clamp(8px, 1.1cqi, 11px)",
    },
    lg: {
      awsSize: "clamp(16px, 2.5cqi, 26px)",
      reSize: "clamp(22px, 3.4cqi, 36px)",
      inventSize: "clamp(46px, 7cqi, 74px)",
      gap: "clamp(6px, 1cqi, 10px)",
      sublineSize: "clamp(10px, 1.4cqi, 14px)",
    },
    hero: {
      awsSize: "clamp(20px, 2.5cqi, 36px)",
      reSize: "clamp(28px, 3.6cqi, 50px)",
      inventSize: "clamp(58px, 7.5cqi, 100px)",
      gap: "clamp(8px, 1cqi, 14px)",
      sublineSize: "clamp(12px, 1.6cqi, 16px)",
    },
  }

  const s = SIZES[size] || SIZES.md

  return (
    <div
      className={`inline-flex flex-col items-end text-right select-none ${className}`}
      style={{
        fontFamily: "'Space Mono', monospace",
        color: "#FFFFFF",
        ...style,
      }}
      aria-label="AWS re:Invent"
    >
      {/* Logo Top Row: Stacked AWS re: + Invent */}
      <div className="inline-flex items-baseline" style={{ gap: s.gap }}>
        {/* Stacked Prefix: AWS / re: */}
        <div
          className="flex flex-col items-start leading-none"
          style={{
            alignSelf: "flex-end",
            paddingBottom: "clamp(2px, 0.4cqi, 5px)",
          }}
        >
          <span
            style={{
              fontSize: s.awsSize,
              fontWeight: 700,
              letterSpacing: "0.02em",
              lineHeight: 1,
              color: "#FFFFFF",
            }}
          >
            AWS
          </span>
          <span
            style={{
              fontSize: s.reSize,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              lineHeight: 1,
              marginTop: "clamp(2px, 0.3cqi, 4px)",
              color: "#FFFFFF",
            }}
          >
            re:
          </span>
        </div>

        {/* Hero Keyword: Invent */}
        <span
          style={{
            fontSize: s.inventSize,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 0.95,
            color: "#FFFFFF",
          }}
        >
          Invent
        </span>
      </div>

      {/* Optional perfectly aligned subline */}
      {subline && (
        <span
          style={{
            fontSize: s.sublineSize,
            fontWeight: 700,
            letterSpacing: "0.02em",
            color: "rgba(255, 255, 255, 0.88)",
            textTransform: "uppercase",
            marginTop: "clamp(3px, 0.4cqi, 5px)",
            lineHeight: 1,
            textAlign: "right",
          }}
        >
          {subline}
        </span>
      )}
    </div>
  )
}
