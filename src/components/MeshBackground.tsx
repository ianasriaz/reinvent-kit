import React from "react"

interface MeshBackgroundProps {
  children?: React.ReactNode
  variant?: "main" | "speaker" | "sponsor" | "partner"
  className?: string
  style?: React.CSSProperties
}

// Clean smooth gradients matching the reference — pure linear, no radial blobs
// Purple-lavender (left) → soft rose-pink (center) → bright cyan-teal (right)
const GRADIENTS = {
  main:    "linear-gradient(125deg, #9272F0 0%, #B468D4 28%, #D470B0 52%, #38C8E8 78%, #18D4D0 100%)",
  speaker: "linear-gradient(125deg, #8868E8 0%, #AA64CC 28%, #CC6CAC 52%, #30C4E4 78%, #10D0CC 100%)",
  sponsor: "linear-gradient(125deg, #9070EC 0%, #B264D0 28%, #D068A8 52%, #34C6E6 78%, #14D2CE 100%)",
  partner: "linear-gradient(125deg, #8A6AEA 0%, #AC66CE 28%, #CE6AAA 52%, #2EC2E4 78%, #12CECC 100%)",
}

export default function MeshBackground({
  children,
  variant = "main",
  className = "",
  style = {},
}: MeshBackgroundProps) {
  const baseGrad = GRADIENTS[variant] || GRADIENTS.main

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{
        background: baseGrad,
        ...style,
      }}
    >
      {/* Single very subtle white diagonal shimmer — keeps it from looking completely flat */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(125deg, rgba(255,255,255,0.07) 0%, transparent 50%, rgba(255,255,255,0.04) 100%)",
        }}
      />

      {/* Card Content */}
      <div className="relative w-full h-full z-10 flex flex-col justify-between">
        {children}
      </div>
    </div>
  )
}
