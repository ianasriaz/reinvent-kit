import { createContext } from "react"
import { BRAND_GRADIENT } from "./data/brand"

export interface GradientContextType {
  gradient: string
  showPattern: boolean
}

export const GradientContext = createContext<GradientContextType>({
  gradient: BRAND_GRADIENT,
  showPattern: true,
})
