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
      {/* Card content */}
      <div className="relative w-full h-full z-10 flex flex-col justify-between">
        {children}
      </div>
    </div>
  )
}
