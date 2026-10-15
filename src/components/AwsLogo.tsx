import awsLogoUrl from "../assets/aws-logo-clean.png"

interface AwsLogoProps {
  size?: number
  className?: string
  style?: React.CSSProperties
}

export default function AwsLogo({
  size = 40,
  className = "",
  style = {},
}: AwsLogoProps) {
  return (
    <img
      src={awsLogoUrl}
      alt="AWS Logo"
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
