export type Tier = "Platinum" | "Gold" | "Silver" | "Bronze"

export interface SpeakerData {
  id: string
  name: string
  title: string
  company: string
  handle?: string
  talk: string
  photo: string
}

export interface SponsorState {
  name: string
  tier: Tier
  logo?: string
}

export interface PartnerState {
  name: string
  type: string
  logo?: string
}

/** Shape accepted by PartnerCard — tiered sponsor or typed community partner. */
export type PartnerCardState = SponsorState | PartnerState

export interface EventConfig {
  venue: string
  city: string
  dateRange: string
  edition: string
  speaker: SpeakerData
  sponsor: SponsorState
  partner: PartnerState
}

export const SPEAKER_PRESETS: SpeakerData[] = [
  {
    id: "sumama",
    name: "SUMAMA ZAEEM",
    title: "DevOps Engineer",
    company: "Tkxel",
    handle: "@sumama_dev",
    talk: "BUILDING APPLICATION USING KIRO AND AWS CLI TECHNIQUES",
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=600&fit=crop&crop=face&auto=format&q=85",
  },
  {
    id: "aisha",
    name: "AISHA SIDDIQUI",
    title: "Senior Solutions Architect",
    company: "Amazon Web Services",
    handle: "@aisha_aws",
    talk: "BUILDING WITH SERVERLESS ON AWS: EVENTBRIDGE & STEP FUNCTIONS",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop&crop=face&auto=format&q=85",
  },
  {
    id: "zainab",
    name: "ZAINAB MALIK",
    title: "AI Research Lead",
    company: "Nexus Intelligence",
    handle: "@zainab_ml",
    talk: "PRODUCTION GENERATIVE AI WORKFLOWS WITH AMAZON BEDROCK",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=600&fit=crop&crop=face&auto=format&q=85",
  },
]

export const defaultEventConfig: EventConfig = {
  venue: "AIR UNIVERSITY",
  city: "Islamabad",
  dateRange: "DEC, 2026",
  edition: "2026",
  speaker: SPEAKER_PRESETS[0],
  sponsor: { name: "TechVentures Pakistan", tier: "Gold" },
  partner: { name: "MLSA Pakistan", type: "Student Community" },
}

const STORAGE_KEY = "reinvent-kit-config-v2"

export function loadEventConfig(): EventConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<EventConfig>
      return {
        ...defaultEventConfig,
        ...parsed,
        speaker: { ...defaultEventConfig.speaker, ...parsed.speaker },
        sponsor: { ...defaultEventConfig.sponsor, ...parsed.sponsor },
        partner: { ...defaultEventConfig.partner, ...parsed.partner },
      }
    }
  } catch {
    // Ignore corrupt storage and fall back to defaults
  }
  return defaultEventConfig
}

export function saveEventConfig(config: EventConfig) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  } catch {
    // Storage unavailable (private mode etc.) — customization just won't persist
  }
}

export function clearEventConfig() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // noop
  }
}
