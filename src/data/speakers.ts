export interface SpeakerData {
  id: string
  name: string
  title: string
  company: string
  handle?: string
  talk: string
  photo: string
}

export const DEFAULT_SPEAKERS: SpeakerData[] = [
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
