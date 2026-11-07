import type { ReactNode } from "react"
import AwsLogo from "../AwsLogo"
import AwsSbgLogo from "../AwsSbgLogo"
import AwsReinventLogo from "../AwsReinventLogo"
import IslamabadHorizon from "../IslamabadHorizon"
import { BRAND_GRADIENT, ACCENT } from "../../data/brand"

export const PAGE_W = 794
export const PAGE_H = 1123

export const MUTED = "rgba(255, 255, 255, 0.72)"
export const DIM = "rgba(255, 255, 255, 0.55)"

export function Title({ children }: { children: ReactNode }) {
  return (
    <h1
      style={{
        fontSize: 40,
        fontWeight: 700,
        letterSpacing: "-0.02em",
        lineHeight: 1.05,
        color: "#FFFFFF",
      }}
    >
      {children}
    </h1>
  )
}

export function Lead({ children }: { children: ReactNode }) {
  return (
    <p style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.5, color: "#FFFFFF" }}>
      {children}
    </p>
  )
}

export function P({ children }: { children: ReactNode }) {
  return (
    <p style={{ fontSize: 15, fontWeight: 400, lineHeight: 1.62, color: MUTED }}>
      {children}
    </p>
  )
}

export function AccentRule() {
  return (
    <div
      style={{
        width: 56,
        height: 4,
        borderRadius: 2,
        background: `linear-gradient(to right, ${ACCENT}, #2EA8F0)`,
      }}
    />
  )
}

export function Card({
  title,
  children,
  accent = false,
}: {
  title?: ReactNode
  children?: ReactNode
  accent?: boolean
}) {
  return (
    <div
      style={{
        borderRadius: 14,
        border: accent
          ? `1.5px solid ${ACCENT}`
          : "1.5px solid rgba(255, 255, 255, 0.16)",
        background: "rgba(255, 255, 255, 0.04)",
        padding: "22px 24px",
      }}
    >
      {title ? (
        <div
          style={{
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: "-0.01em",
            color: accent ? ACCENT : "#FFFFFF",
            marginBottom: 8,
          }}
        >
          {title}
        </div>
      ) : null}
      <div style={{ fontSize: 14, lineHeight: 1.55, color: MUTED }}>{children}</div>
    </div>
  )
}

export function DeckPage({
  children,
  subtitle = "Watch & Build Party 2026",
}: {
  children: ReactNode
  subtitle?: string
}) {
  return (
    <div
      className="@container"
      style={{
        position: "relative",
        width: PAGE_W,
        height: PAGE_H,
        background: "#06040C",
        color: "#FFFFFF",
        fontFamily: "var(--font-brand)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.08)",
      }}
    >
      {/* Kit gradient band — top 12% */}
      <div
        style={{
          height: "12%",
          flexShrink: 0,
          background: BRAND_GRADIENT,
        }}
      />

      {/* Header — logos left, re:Invent right */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "22px 56px",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <AwsLogo size={46} />
          <AwsSbgLogo size={34} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <AwsReinventLogo size="sm" />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.03em",
              color: "rgba(255, 255, 255, 0.85)",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              lineHeight: 1,
            }}
          >
            {subtitle}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: "20px 56px 8px", overflow: "hidden" }}>
        {children}
      </div>

      {/* Skyline footer */}
      <div style={{ position: "relative", height: 138, flexShrink: 0 }}>
        <IslamabadHorizon opacity={1} height={138} objectFit="cover" />
      </div>
    </div>
  )
}
