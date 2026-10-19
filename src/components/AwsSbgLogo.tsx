import sbgLogoUrl from "../assets/AWS Student Builder Group_SVG_Program Icon.svg"

interface AwsSbgLogoProps {
  size?: number
  className?: string
  style?: React.CSSProperties
}

export default function AwsSbgLogo({
  size = 40,
  className = "",
  style = {},
}: AwsSbgLogoProps) {
  return (
    <img
      src={sbgLogoUrl}
      alt="AWS Student Builder Group"
      width={size}
      height={size}
      className={`block shrink-0 object-contain ${className}`}
      style={{
        width: `${size}px`,
        height: "auto",
        maxHeight: `${size}px`,
        filter: "brightness(0) invert(1)",
        ...style,
      }}
    />
  )
}
