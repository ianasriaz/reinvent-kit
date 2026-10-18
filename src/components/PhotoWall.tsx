import MeshBackground from "./MeshBackground"
import IslamabadHorizon from "./IslamabadHorizon"
import AwsReinventLogo from "./AwsReinventLogo"
import AwsLogo from "./AwsLogo"

interface PhotoWallProps {
  edition?: string
}

export default function PhotoWall({
  edition = "2026",
}: PhotoWallProps) {
  return (
    <div className="@container relative w-full aspect-video select-none overflow-hidden rounded-sm bg-white">
      <MeshBackground>
        <IslamabadHorizon
          opacity={0.92}
          height="clamp(120px, 28cqi, 340px)"
          objectFit="cover"
        />
      </MeshBackground>

      {/* Clean content overlay */}
      <div
        className="absolute inset-0 z-10 flex w-full flex-col items-center text-center"
        style={{
          padding: "clamp(28px, 4.4cqi, 84px) clamp(36px, 5.8cqi, 110px)",
        }}
      >
        {/* Top corner row */}
        <div className="flex w-full items-center justify-between">
          <AwsLogo size={58} />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(10px, 1.2cqi, 15px)",
              letterSpacing: "0.14em",
              color: "rgba(255, 255, 255, 0.85)",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Islamabad, Pakistan
          </span>
        </div>

        {/* Lockup only */}
        <div
          className="flex flex-col items-center"
          style={{ marginTop: "clamp(28px, 5cqi, 72px)" }}
        >
          <AwsReinventLogo
            size="hero"
            subline={`WATCH & BUILD PARTY ${edition}`}
            sublineStyle={{ fontWeight: 500 }}
          />
        </div>

        {/* Nothing at the bottom — skyline stays clean */}
      </div>
    </div>
  )
}
