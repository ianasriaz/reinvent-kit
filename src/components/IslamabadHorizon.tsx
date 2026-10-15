import skylineUrl from "../assets/islamabad-skyline.png"

interface IslamabadHorizonProps {
  opacity?: number
  height?: string
  objectFit?: "cover" | "contain" | "fill"
  className?: string
}

export default function IslamabadHorizon({
  opacity = 0.5,
  height,
  objectFit = "cover",
  className = "",
}: IslamabadHorizonProps) {
  return (
    <div
      className={`pointer-events-none select-none absolute bottom-0 left-0 right-0 overflow-hidden w-full ${className}`}
      style={{
        height: height || undefined,
        opacity,
        zIndex: 1,
      }}
      aria-hidden="true"
    >
      <img
        src={skylineUrl}
        alt="Islamabad Skyline"
        crossOrigin="anonymous"
        className="w-full h-auto block"
        style={{
          width: "100%",
          height: height ? "100%" : "auto",
          objectFit,
          objectPosition: "bottom",
          mixBlendMode: "screen",
        }}
      />
    </div>
  )
}
