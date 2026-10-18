import React, { useContext } from "react"
import { BRAND_GRADIENT } from "../data/brand"
import { GradientContext } from "../gradientContext"

interface MeshBackgroundProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function MeshBackground({
  children,
  className = "",
  style = {},
}: MeshBackgroundProps) {
  const gradient = useContext(GradientContext)
  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{
        background: gradient,
        ...style,
      }}
    >
      {/* Sheen layer — soft light blooms + fine silk shimmer, sits under content */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background: [
            "radial-gradient(120% 90% at 8% -6%, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0) 52%)",
            "radial-gradient(90% 70% at 96% 104%, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0) 55%)",
            "repeating-linear-gradient(115deg, rgba(255, 255, 255, 0.045) 0px, rgba(255, 255, 255, 0.045) 1px, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0) 7px)",
          ].join(", "),
          mixBlendMode: "screen",
        }}
      />

      {/* Card content */}
      <div className="relative w-full h-full z-10 flex flex-col justify-between">
        {children}
      </div>
    </div>
  )
}
