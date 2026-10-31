export const BRAND_GRADIENT =
  "linear-gradient(135deg, #6B45E8 0%, #2E63E0 22%, #8749DC 52%, #9462E0 70%, #1F8CC8 86%, #0A8DC0 100%)"

export const ACCENT = "#00DFD8"

export interface GradientPreset {
  id: string
  name: string
  css: string
}

export const GRADIENT_PRESETS: GradientPreset[] = [
  { id: "aurora", name: "Aurora", css: BRAND_GRADIENT },
  {
    id: "watch-and-build",
    name: "Watch & Build",
    css: "linear-gradient(135deg, #A855F7 0%, #834AF6 22%, #3B61F6 48%, #2A7CF8 68%, #38D3F9 88%, #5EE0FA 100%)",
  },
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
  {
    id: "twilight-mesh",
    name: "Twilight Mesh",
    css: "linear-gradient(155deg, #171038 0%, #33277E 26%, #5F3EC2 48%, #4A6CC8 70%, #38AEC8 88%, #6FD9DC 100%)",
  },
  {
    id: "graphite-orchid",
    name: "Graphite Orchid",
    css: "linear-gradient(155deg, #1B1D28 0%, #312C44 24%, #4E4470 46%, #6E5F94 66%, #8A7FB4 84%, #A8A2C8 100%)",
  },
  {
    id: "ink-and-teal",
    name: "Ink & Teal",
    css: "linear-gradient(155deg, #10151C 0%, #1E2B3C 22%, #2C4A62 44%, #38748C 66%, #4FA8B4 84%, #7CCFD0 100%)",
  },
  {
    id: "dusk-jewel",
    name: "Dusk Jewel",
    css: "linear-gradient(155deg, #1E1636 0%, #3A2A70 24%, #6E44B8 46%, #8E5AC8 64%, #4E9EC8 82%, #8FE0D8 100%)",
  },
]

export const GRADIENT_STORAGE_KEY = "reinvent-kit-gradient-v1"

export const DEFAULT_GRADIENT_ID = "aurora"
