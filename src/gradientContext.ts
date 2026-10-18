import { createContext } from "react"
import { BRAND_GRADIENT } from "./data/brand"

export const GradientContext = createContext<string>(BRAND_GRADIENT)
