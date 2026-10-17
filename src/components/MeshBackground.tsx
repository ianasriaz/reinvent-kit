import React from "react"
import { BRAND_GRADIENTS, type MeshVariant } from "../data/brand"

interface MeshBackgroundProps {
  children?: React.ReactNode
  variant?: MeshVariant
  className?: string
  style?: React.CSSProperties
}

export default function MeshBackground({
  children,
  variant = "main",
  className = "",
  style = {},
}: MeshBackgroundProps) {
  const baseGrad = BRAND_GRADIENTS[variant]

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{
        background: baseGrad,
        ...style,
      }}
    >
      {/* Enhanced Layer 1: Vivid Magenta/Fuchsia Light Bloom (Center-Top) */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "-10%",
          right: "15%",
          width: "70%",
          height: "70%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(236, 72, 153, 0.38) 0%, rgba(192, 38, 211, 0.18) 45%, transparent 70%)",
          filter: "blur(45px)",
        }}
      />

      {/* Enhanced Layer 2: Radiant Electric Cyan Bloom (Lower-Right) */}
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: "-15%",
          right: "-8%",
          width: "65%",
          height: "65%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0, 240, 255, 0.42) 0%, rgba(14, 165, 233, 0.2) 45%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />

      {/* Enhanced Layer 3: Brilliant Indigo Light Bloom (Upper-Left) */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "-15%",
          left: "-10%",
          width: "60%",
          height: "60%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.45) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      {/* Enhanced Layer 4: Subtle Luminous Angled Shimmer */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(130deg, rgba(255, 255, 255, 0.14) 0%, transparent 40%, rgba(255, 255, 255, 0.08) 100%)",
        }}
      />

      {/* Card Content with Crisp White Elements */}
      <div className="relative w-full h-full z-10 flex flex-col justify-between">
        {children}
      </div>
    </div>
  )
}
