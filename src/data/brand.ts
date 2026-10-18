export const BRAND_GRADIENT =
  "linear-gradient(135deg, #7B57FE 0%, #3B76F8 22%, #9C5FF5 52%, #A873F8 70%, #35A6E0 86%, #0FA8D8 100%)"

export const ACCENT = "#00DFD8"

export interface GradientPreset {
  id: string
  name: string
  css: string
}

export const GRADIENT_PRESETS: GradientPreset[] = [
  { id: "aurora", name: "Aurora", css: BRAND_GRADIENT },
  {
    id: "deep-space",
    name: "Deep Space",
    css: "linear-gradient(150deg, #0F1240 0%, #3B2E8C 24%, #7C3AED 50%, #2D9CDB 76%, #22D3EE 100%)",
  },
  {
    id: "magenta-ember",
    name: "Magenta Ember",
    css: "linear-gradient(150deg, #3B0764 0%, #86198F 26%, #C026D3 48%, #7838D3 72%, #2AAEE0 100%)",
  },
  {
    id: "arctic-horizon",
    name: "Arctic Horizon",
    css: "linear-gradient(150deg, #1E3A8A 0%, #4338CA 30%, #6D67E4 52%, #38BDF8 78%, #67E8F9 100%)",
  },
  {
    id: "neon-orchid",
    name: "Neon Orchid",
    css: "linear-gradient(140deg, #ad5dfe 0%, #ff57ea 52%, #fe9900 100%)",
  },
  {
    id: "spring-splash",
    name: "Spring Splash",
    css: "linear-gradient(140deg, #fe9900 0%, #00e482 38%, #ad5dfe 72%, #ff57ea 100%)",
  },
  {
    id: "full-spectrum",
    name: "Full Spectrum",
    css: "linear-gradient(140deg, #ad5dfe 0%, #ff57ea 34%, #fe9900 66%, #00e482 100%)",
  },
]

export const GRADIENT_STORAGE_KEY = "reinvent-kit-gradient-v1"

export const DEFAULT_GRADIENT_ID = "aurora"
