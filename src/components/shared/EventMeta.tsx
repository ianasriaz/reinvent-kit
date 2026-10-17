import React from "react"

interface EventMetaProps {
  dateRange?: string
  venue?: string
  size?: "lg" | "sm"
  className?: string
}

export default function EventMeta({
  dateRange,
  venue,
  size = "lg",
  className = "",
}: EventMetaProps) {
  const iconSize = size === "lg" ? 15 : 13
  const fontSize =
    size === "lg" ? "clamp(10px, 1.35cqi, 14px)" : "clamp(9px, 1.35cqi, 12px)"
  const gap = size === "lg" ? "8px" : "6px"
  return (
    <div
      className={`flex items-center flex-wrap ${className}`}
      style={{
        columnGap: "12px",
        rowGap: "6px",
        fontFamily: "'Space Mono', monospace",
        fontSize,
        fontWeight: 700,
        color: "#FFFFFF",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
      }}
    >
      <div className="inline-flex items-center" style={{ gap }}>
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0.9 }}
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span>{dateRange}</span>
      </div>

      <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>|</span>

      <div className="inline-flex items-center" style={{ gap }}>
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ opacity: 0.95 }}
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
        </svg>
        <span style={{ color: "rgba(255, 255, 255, 0.95)" }}>{venue}</span>
      </div>
    </div>
  )
}
