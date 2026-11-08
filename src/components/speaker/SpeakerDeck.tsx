import { useRef, useState } from "react"
import { jsPDF } from "jspdf"
import { toPng } from "html-to-image"
import {
  DeckPage,
  Title,
  Lead,
  P,
  AccentRule,
  Card,
  PAGE_W,
  MUTED,
} from "../deck/DeckChrome"
import { ACCENT } from "../../data/brand"
import { prepareRenderer } from "../../utils/exportImage"

export function CoverPage() {
  return (
    <DeckPage>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 28,
        }}
      >
        <div className="flex items-baseline">
          <span style={{ position: "relative", display: "inline-block" }}>
            <span
              style={{
                position: "absolute",
                left: 0,
                marginLeft: "0.116em",
                bottom: "calc(100% - 0.072em)",
                whiteSpace: "nowrap",
                fontSize: 34,
                fontWeight: 300,
                letterSpacing: "0.005em",
                lineHeight: 1,
                color: "#FFFFFF",
              }}
            >
              AWS
            </span>
            <span
              style={{
                fontSize: 57,
                fontWeight: 300,
                letterSpacing: "-0.02em",
                lineHeight: 1,
                color: "#FFFFFF",
              }}
            >
              re:
            </span>
          </span>
          <span
            style={{
              fontSize: 106,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 0.9,
              color: "#FFFFFF",
              marginLeft: "0.18em",
            }}
          >
            Invent
          </span>
        </div>

        <div
          style={{
            padding: "13px 30px",
            borderRadius: 9999,
            border: "2px solid rgba(255, 255, 255, 0.85)",
            background: "rgba(255, 255, 255, 0.06)",
            fontSize: 17,
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Watch &amp; Build Party 2026&nbsp;|&nbsp;Islamabad
        </div>

        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: ACCENT,
          }}
        >
          Call for Speakers
        </div>
      </div>
    </DeckPage>
  )
}

export function AboutEventPage() {
  return (
    <DeckPage>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <AccentRule />
        <Title>About the Event</Title>
        <Lead>
          AWS re:Invent Watch &amp; Build Party is one of 44 global
          gatherings happening in major cities to bring AWS re:Invent 2026
          Las Vegas to local communities.
        </Lead>
        <P>
          The Islamabad edition brings the global moment home with a full day of
          live sessions, product demos, and networking for the AWS community.
        </P>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Card title="Date">1 December 2026</Card>
          <Card title="Time">11:00 AM - 4:00 PM</Card>
          <Card title="Venue">Islamabad (to be announced)</Card>
        </div>
      </div>
    </DeckPage>
  )
}

export function WhySpeakPage() {
  const items = [
    { t: "Share Expertise", d: "Present your AWS experience to a technical, engaged audience of builders and professionals." },
    { t: "Community Recognition", d: "Be recognized as an official event speaker across the chapter's website and social channels." },
    { t: "Network with Peers", d: "Connect with AWS certified experts, product owners, and community leaders." },
    { t: "Portfolio Content", d: "Session recording and event photos for your professional profile." },
    { t: "Shape the Conversation", d: "Influence how the community approaches cloud, AI, and careers." },
  ]
  return (
    <DeckPage>
      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        <AccentRule />
        <Title>Why Speak</Title>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {items.map((it) => (
            <Card key={it.t} title={it.t}>
              {it.d}
            </Card>
          ))}
        </div>
      </div>
    </DeckPage>
  )
}

export function WhoPage() {
  return (
    <DeckPage>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <AccentRule />
        <Title>Who We&apos;re Looking For</Title>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Card title="Experienced Professionals">
            Practitioners who work with AWS day to day and speak from real
            projects.
          </Card>
          <Card title="AWS Certified Experts">
            Certified engineers, architects, and specialists across AWS
            disciplines.
          </Card>
          <Card title="Product Owners">
            People who have shipped products or services on AWS.
          </Card>
        </div>
        <P>Hands-on AWS cloud expertise is the priority across every session.</P>
      </div>
    </DeckPage>
  )
}

export function PerksPage() {
  const perks = [
    { t: "Shield of Recognition", d: "An exclusive printed shield with your name." },
    { t: "AWS Swag Kit", d: "Official event swag." },
    { t: "Refreshments", d: "Complimentary food and beverages throughout the event." },
    { t: "Featured Profile", d: "Photo, bio, and session featured on our website and social channels." },
    { t: "Recording & Photos", d: "Session recording and event photos for your portfolio." },
    { t: "Priority Networking", d: "Direct access to AWS community builders, experts, and organizers." },
    { t: "Travel Allowance", d: "Up to 10,000 PKR for speakers outside Islamabad/Rawalpindi, subject to availability." },
  ]
  return (
    <DeckPage>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <AccentRule />
        <Title>Speaker Perks</Title>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {perks.map((p) => (
            <Card key={p.t} title={p.t}>
              {p.d}
            </Card>
          ))}
        </div>
      </div>
    </DeckPage>
  )
}

export function SessionTypesPage() {
  const items = [
    {
      n: "01",
      t: "Technical Session",
      meta: "20-30 min",
      d: "An advanced deep dive on AWS, AI, or emerging technology. AWS topics are prioritized.",
    },
    {
      n: "02",
      t: "Product Demo",
      meta: "30-40 min",
      d: "Walk through a real product or workload built on AWS services. Show it working, not just slides.",
    },
    {
      n: "03",
      t: "Panel Talk",
      meta: "40-50 min",
      d: "Three to four experts and a moderator on the current AI era, the job market, and student opportunities.",
    },
  ]
  return (
    <DeckPage>
      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        <AccentRule />
        <Title>Session Types</Title>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {items.map((it) => (
            <div
              key={it.n}
              style={{
                display: "flex",
                gap: 20,
                alignItems: "center",
                borderRadius: 14,
                border: "1.5px solid rgba(255, 255, 255, 0.16)",
                background: "rgba(255, 255, 255, 0.04)",
                padding: "24px 28px",
              }}
            >
              <span style={{ fontSize: 30, fontWeight: 700, color: ACCENT, opacity: 0.9 }}>
                {it.n}
              </span>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#FFFFFF" }}>{it.t}</div>
                <div style={{ fontSize: 12, letterSpacing: "0.04em", textTransform: "uppercase", color: ACCENT, marginTop: 2 }}>
                  {it.meta}
                </div>
                <div style={{ fontSize: 14.5, color: MUTED, marginTop: 6 }}>{it.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DeckPage>
  )
}

export function TopicsPage() {
  const groups = [
    { t: "AWS Core", d: "Serverless, DevOps, data, security, networking, scalability, and AWS cost optimization.", accent: true },
    { t: "AI & ML", d: "Generative AI with Amazon Bedrock, SageMaker, and LLM applications." },
    { t: "Emerging Tech", d: "Edge, IoT, and quantum workloads on AWS services." },
    { t: "Careers", d: "Cloud careers, certifications, and the current job market." },
  ]
  return (
    <DeckPage>
      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        <AccentRule />
        <Title>Suggested Topics</Title>
        <Lead>AWS-focused topics are prioritized.</Lead>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {groups.map((g) => (
            <Card key={g.t} title={g.t} accent={g.accent}>
              {g.d}
            </Card>
          ))}
        </div>
      </div>
    </DeckPage>
  )
}

export function ProcessPage() {
  const steps = [
    { n: "01", t: "Apply", d: "Send your session title, preferred format, and a short outline." },
    { n: "02", t: "Review", d: "The organizing team reviews submissions for fit and AWS depth." },
    { n: "03", t: "Confirm", d: "Selected speakers are invited and scheduled." },
  ]
  return (
    <DeckPage>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <AccentRule />
        <Title>Selection &amp; Process</Title>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {steps.map((s) => (
            <div
              key={s.n}
              style={{
                display: "flex",
                gap: 20,
                alignItems: "center",
                borderRadius: 14,
                border: "1.5px solid rgba(255, 255, 255, 0.16)",
                background: "rgba(255, 255, 255, 0.04)",
                padding: "24px 28px",
              }}
            >
              <span style={{ fontSize: 30, fontWeight: 700, color: ACCENT, opacity: 0.9 }}>
                {s.n}
              </span>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#FFFFFF" }}>{s.t}</div>
                <div style={{ fontSize: 14.5, color: MUTED, marginTop: 4 }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
        <Card title="What makes a strong submission">
          A clear AWS focus, a real demo over slides, and a concrete takeaway
          for attendees.
        </Card>
      </div>
    </DeckPage>
  )
}

export function ApplyPage() {
  return (
    <DeckPage>
      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        <AccentRule />
        <Title>Apply to Speak</Title>
        <P>For more details and discussion, contact the organizing team.</P>
        <div
          style={{
            borderRadius: 14,
            border: `1.5px solid ${ACCENT}`,
            background: "rgba(0, 223, 216, 0.06)",
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <div style={{ fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: ACCENT }}>
            Organizing Lead
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#FFFFFF" }}>
            Anas Riaz
          </div>
          <div style={{ fontSize: 14, color: MUTED }}>AWS Student Builder Group Leader</div>
          <div style={{ marginTop: 8, fontSize: 15, color: "#FFFFFF", lineHeight: 1.7 }}>
            <a
              href="mailto:anasriaz@awsairuniversity.com"
              style={{ color: "#FFFFFF", textDecoration: "none" }}
            >
              anasriaz@awsairuniversity.com
            </a>
            <br />
            <a
              href="https://wa.me/923000790170"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#FFFFFF", textDecoration: "none" }}
            >
              +92 300 0790170
            </a>
          </div>
        </div>
      </div>
    </DeckPage>
  )
}

export interface SpeakerDeckSlide {
  id: string
  number: string
  title: string
  component: () => React.JSX.Element
}

export const SPEAKER_DECK_SLIDES: SpeakerDeckSlide[] = [
  { id: "cover", number: "01", title: "Cover", component: CoverPage },
  { id: "about", number: "02", title: "About the Event", component: AboutEventPage },
  { id: "why-speak", number: "03", title: "Why Speak", component: WhySpeakPage },
  { id: "who", number: "04", title: "Who We're Looking For", component: WhoPage },
  { id: "perks", number: "05", title: "Speaker Perks", component: PerksPage },
  { id: "session-types", number: "06", title: "Session Types", component: SessionTypesPage },
  { id: "topics", number: "07", title: "Suggested Topics", component: TopicsPage },
  { id: "process", number: "08", title: "Selection & Process", component: ProcessPage },
  { id: "apply", number: "09", title: "Apply to Speak", component: ApplyPage },
]

export default function SpeakerDeck() {
  const pages = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]
  const [exporting, setExporting] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  const downloadPdf = async () => {
    setExporting(true)
    setStatus("Generating PDF…")
    try {
      const nodes = pages.map((r) => r.current).filter((n): n is HTMLDivElement => !!n)
      const prepped = await prepareRenderer(nodes[0])
      const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" })
      for (let i = 0; i < nodes.length; i++) {
        const dataUrl = await toPng(nodes[i], { ...prepped, pixelRatio: 2 })
        if (i > 0) pdf.addPage()
        pdf.addImage(dataUrl, "PNG", 0, 0, 210, 297, undefined, "FAST")
      }
      pdf.save("AWS-reInvent-Watch-and-Build-Party-Islamabad-Speaker-Proposal.pdf")
      setStatus("PDF downloaded!")
    } catch (err) {
      console.error("PDF export error:", err)
      setStatus("Export failed. Please try again.")
    } finally {
      setExporting(false)
    }
  }

  return (
    <div style={{ width: PAGE_W, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
        <button
          onClick={downloadPdf}
          disabled={exporting}
          style={{
            padding: "12px 22px",
            borderRadius: 8,
            background: ACCENT,
            border: "none",
            color: "#06040C",
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            fontWeight: 700,
            cursor: exporting ? "wait" : "pointer",
          }}
        >
          {exporting ? "Rendering…" : "Download PDF (A4)"}
        </button>
        {status ? (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: ACCENT }}>{status}</span>
        ) : null}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div ref={pages[0]}><CoverPage /></div>
        <div ref={pages[1]}><AboutEventPage /></div>
        <div ref={pages[2]}><WhySpeakPage /></div>
        <div ref={pages[3]}><WhoPage /></div>
        <div ref={pages[4]}><PerksPage /></div>
        <div ref={pages[5]}><SessionTypesPage /></div>
        <div ref={pages[6]}><TopicsPage /></div>
        <div ref={pages[7]}><ProcessPage /></div>
        <div ref={pages[8]}><ApplyPage /></div>
      </div>
    </div>
  )
}
