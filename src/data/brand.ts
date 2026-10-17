export type MeshVariant = "main" | "speaker" | "sponsor" | "partner"

export const BRAND_GRADIENTS: Record<MeshVariant, string> = {
  main: "linear-gradient(135deg, #5046E4 0%, #8B34CC 28%, #C84BC0 50%, #2AAEE0 78%, #10C4D4 100%)",
  speaker:
    "linear-gradient(135deg, #3B3DB8 0%, #7B34D4 35%, #B040B8 58%, #1AA0D8 85%, #06B6D4 100%)",
  sponsor:
    "linear-gradient(135deg, #4838CC 0%, #9034C8 30%, #C040B0 55%, #18AAD8 82%, #0CC8D4 100%)",
  partner:
    "linear-gradient(135deg, #3C2FB4 0%, #8030CC 32%, #BC3CB8 55%, #1298D0 82%, #08BDD0 100%)",
}

export const ACCENT = "#00DFD8"
