import React from "react"
import { ACCENT } from "../../data/brand"

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  color: "rgba(255, 255, 255, 0.45)",
  marginBottom: "6px",
  textTransform: "uppercase",
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 12px",
  borderRadius: "6px",
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  color: "#FFFFFF",
  fontSize: "13px",
  outline: "none",
}

interface TextFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  flex?: string
}

export default function TextField({
  label,
  value,
  onChange,
  placeholder,
  flex,
}: TextFieldProps) {
  return (
    <div style={{ flex }}>
      <label style={labelStyle}>{label}</label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={inputStyle}
      />
    </div>
  )
}

interface ChoiceGroupProps<T extends string> {
  options: readonly T[]
  value: T
  onChange: (value: T) => void
  accent?: boolean
  label?: string
}

export function ChoiceGroup<T extends string>({
  options,
  value,
  onChange,
  accent = true,
  label,
}: ChoiceGroupProps<T>) {
  return (
    <div>
      {label && <label style={labelStyle}>{label}</label>}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {options.map((option) => {
          const isActive = value === option
          return (
            <button
              key={option}
              onClick={() => onChange(option)}
              style={{
                flex: label ? 1 : undefined,
                padding: "6px 10px",
                borderRadius: "6px",
                background: isActive
                  ? accent
                    ? "rgba(0, 223, 216, 0.2)"
                    : "rgba(255, 255, 255, 0.15)"
                  : "rgba(255, 255, 255, 0.05)",
                border: isActive
                  ? accent
                    ? `1px solid ${ACCENT}`
                    : "1px solid #FFFFFF"
                  : "1px solid rgba(255, 255, 255, 0.1)",
                color: isActive
                  ? accent
                    ? ACCENT
                    : "#FFFFFF"
                  : "rgba(255, 255, 255, 0.7)",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}
