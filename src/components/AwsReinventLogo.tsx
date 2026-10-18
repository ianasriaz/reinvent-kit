import React from "react"

interface AwsReinventLogoProps {
  size?: "sm" | "md" | "lg" | "hero"
  subline?: string
  sublineStyle?: React.CSSProperties
  className?: string
  style?: React.CSSProperties
}

export default function AwsReinventLogo({
  size = "md",
  subline,
  sublineStyle = {},
  className = "",
  style = {},
}: AwsReinventLogoProps) {
  const SIZES = {
    sm: {
      awsSize: "clamp(12px, 1.7cqi, 16px)",
      reSize: "clamp(15px, 2.3cqi, 20px)",
      inventSize: "clamp(28px, 4.3cqi, 42px)",
      gap: "clamp(3px, 0.5cqi, 6px)",
      sublineSize: "clamp(8px, 1.05cqi, 11px)",
      stackTuck: "-0.2cqi",
    },
    md: {
      awsSize: "clamp(12px, 1.8cqi, 18px)",
      reSize: "clamp(16px, 2.4cqi, 24px)",
      inventSize: "clamp(32px, 4.8cqi, 48px)",
      gap: "clamp(4px, 0.7cqi, 8px)",
      sublineSize: "clamp(8px, 1.1cqi, 11px)",
      stackTuck: "0.22cqi",
    },
    lg: {
      awsSize: "clamp(16px, 2.5cqi, 26px)",
      reSize: "clamp(22px, 3.4cqi, 36px)",
      inventSize: "clamp(46px, 7cqi, 74px)",
      gap: "clamp(6px, 1cqi, 10px)",
      sublineSize: "clamp(10px, 1.4cqi, 14px)",
      stackTuck: "0.25cqi",
    },
    hero: {
      awsSize: "clamp(20px, 2.5cqi, 36px)",
      reSize: "clamp(28px, 3.6cqi, 50px)",
      inventSize: "clamp(58px, 7.5cqi, 100px)",
      gap: "clamp(8px, 1cqi, 14px)",
      sublineSize: "clamp(14px, 2.2cqi, 26px)",
      stackTuck: "-0.05cqi",
    },
  }

  const s = SIZES[size] || SIZES.md
  const bold = 400

  return (
    <div
      className={`inline-flex flex-col select-none ${className}`}
      style={{
        fontFamily: "var(--font-mono)",
        color: "#FFFFFF",
        ...style,
      }}
      aria-label="AWS re:Invent"
    >
      {/* Logo Top Row: re: and Invent share one baseline; AWS hangs above re: */}
      <div className="inline-flex items-baseline self-end" style={{ gap: s.gap }}>
        {/* Stacked Prefix — re: in flow (baseline anchor), AWS absolutely
            positioned directly above it */}
        <span
          className="relative inline-block"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: s.reSize,
            fontWeight: bold,
            letterSpacing: "-0.01em",
            lineHeight: 1,
            color: "#FFFFFF",
          }}
        >
          <span
            className="absolute left-0"
            style={{
              bottom: `calc(100% - ${s.stackTuck})`,
              fontFamily: "var(--font-mono)",
              fontSize: s.awsSize,
              fontWeight: bold,
              letterSpacing: "0.02em",
              lineHeight: 1,
              color: "#FFFFFF",
            }}
          >
            AWS
          </span>
          re:
        </span>

        {/* Hero Keyword: Invent */}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: s.inventSize,
            fontWeight: bold,
            letterSpacing: "-0.03em",
            lineHeight: 0.95,
            color: "#FFFFFF",
          }}
        >
          Invent
        </span>
      </div>

      {/* Subline centered across the full A→B width of the lockup */}
      {subline && (
        <span
          className="w-full text-center"
          style={{
            fontSize: s.sublineSize,
            fontWeight: 700,
            letterSpacing: "0.02em",
            color: "rgba(255, 255, 255, 0.88)",
            textTransform: "uppercase",
            ...sublineStyle,
            marginTop: "clamp(3px, 0.4cqi, 5px)",
            lineHeight: 1,
          }}
        >
          {subline}
        </span>
      )}
    </div>
  )
}
