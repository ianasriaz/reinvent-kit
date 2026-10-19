import type { SponsorState, PartnerState } from "../data/eventConfig"
import MeshBackground from "./MeshBackground"
import IslamabadHorizon from "./IslamabadHorizon"
import AwsReinventLogo from "./AwsReinventLogo"
import AwsLogo from "./AwsLogo"
import AwsSbgLogo from "./AwsSbgLogo"

interface PhotoWallProps {
  edition?: string
  sponsor?: SponsorState
  partner?: PartnerState
}

function StepRepeatBackground({
  sponsor,
  partner,
}: {
  sponsor?: SponsorState
  partner?: PartnerState
}) {
  const customLogos = [sponsor?.logo, partner?.logo].filter(
    (src): src is string => Boolean(src),
  )

  const useFallback = customLogos.length === 0
  const tiles = useFallback
    ? Array.from({ length: 24 }, (_, i) => i)
    : Array.from({ length: 24 }, (_, i) => customLogos[i % customLogos.length])

  return (
    <div
      className="absolute inset-0 z-[1] grid grid-cols-6 grid-rows-4 place-items-center p-[clamp(16px,3cqi,48px)]"
      style={{ opacity: 0.18 }}
    >
      {useFallback
        ? tiles.map((i) => (
            <div
              key={i}
              className="flex h-[clamp(28px,5cqi,72px)] w-auto max-w-[80%] items-center justify-center brightness-200"
            >
              {i % 2 === 0 ? <AwsLogo size={48} /> : <AwsSbgLogo size={36} />}
            </div>
          ))
        : tiles.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              crossOrigin="anonymous"
              className="h-[clamp(28px,5cqi,72px)] w-auto max-w-[80%] object-contain grayscale brightness-200"
            />
          ))}
    </div>
  )
}

export default function PhotoWall({
  edition = "2026",
  sponsor,
  partner,
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

      <StepRepeatBackground sponsor={sponsor} partner={partner} />

      {/* Vignette to keep the lockup readable over the step-and-repeat */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 55%, transparent 85%)",
        }}
      />

      {/* Clean content overlay */}
      <div
        className="absolute inset-0 z-10 flex w-full flex-col items-center text-center"
        style={{
          padding: "clamp(28px, 4.4cqi, 84px) clamp(36px, 5.8cqi, 110px)",
        }}
      >
        {/* Top corner row */}
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center" style={{ gap: "clamp(14px, 2.2cqi, 26px)" }}>
            <AwsLogo size={58} />
            <AwsSbgLogo size={40} />
          </div>
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
