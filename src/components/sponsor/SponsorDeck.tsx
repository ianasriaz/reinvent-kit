import { useRef, useState } from "react"
import type { ReactNode } from "react"
import { jsPDF } from "jspdf"
import { toPng } from "html-to-image"
import AwsLogo from "../AwsLogo"
import AwsSbgLogo from "../AwsSbgLogo"
import AwsReinventLogo from "../AwsReinventLogo"
import IslamabadHorizon from "../IslamabadHorizon"
import { BRAND_GRADIENT, ACCENT } from "../../data/brand"
import { prepareRenderer } from "../../utils/exportImage"

const PAGE_W = 794
const PAGE_H = 1123

const MUTED = "rgba(255, 255, 255, 0.72)"
const DIM = "rgba(255, 255, 255, 0.55)"

function Title({ children }: { children: ReactNode }) {
  return (
    <h1
      style={{
        fontSize: 40,
        fontWeight: 700,
        letterSpacing: "-0.02em",
        lineHeight: 1.05,
        color: "#FFFFFF",
      }}
    >
      {children}
    </h1>
  )
}

function Lead({ children }: { children: ReactNode }) {
  return (
    <p style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.5, color: "#FFFFFF" }}>
      {children}
    </p>
  )
}

function P({ children }: { children: ReactNode }) {
  return (
    <p style={{ fontSize: 15, fontWeight: 400, lineHeight: 1.62, color: MUTED }}>
      {children}
    </p>
  )
}

function AccentRule() {
  return (
    <div
      style={{
        width: 56,
        height: 4,
        borderRadius: 2,
        background: `linear-gradient(to right, ${ACCENT}, #2EA8F0)`,
      }}
    />
  )
}

function Card({
  title,
  children,
  accent = false,
}: {
  title?: ReactNode
  children?: ReactNode
  accent?: boolean
}) {
  return (
    <div
      style={{
        borderRadius: 14,
        border: accent
          ? `1.5px solid ${ACCENT}`
          : "1.5px solid rgba(255, 255, 255, 0.16)",
        background: "rgba(255, 255, 255, 0.04)",
        padding: "22px 24px",
      }}
    >
      {title ? (
        <div
          style={{
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: "-0.01em",
            color: accent ? ACCENT : "#FFFFFF",
            marginBottom: 8,
          }}
        >
          {title}
        </div>
      ) : null}
      <div style={{ fontSize: 14, lineHeight: 1.55, color: MUTED }}>{children}</div>
    </div>
  )
}

function Check() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: "rgba(0, 223, 216, 0.16)",
        color: ACCENT,
        fontSize: 12,
        flexShrink: 0,
      }}
    >
      ✓
    </span>
  )
}

function Bullet({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      <Check />
      <span style={{ fontSize: 14.5, lineHeight: 1.5, color: "#FFFFFF" }}>
        {children}
      </span>
    </div>
  )
}

function SponsorPage({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div
      className="@container"
      style={{
        position: "relative",
        width: PAGE_W,
        height: PAGE_H,
        background: "#06040C",
        color: "#FFFFFF",
        fontFamily: "var(--font-brand)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.08)",
      }}
    >
      {/* Kit gradient band — top 12% */}
      <div
        style={{
          height: "12%",
          flexShrink: 0,
          background: BRAND_GRADIENT,
        }}
      />

      {/* Header — logos left, re:Invent right */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "22px 56px",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <AwsLogo size={46} />
          <AwsSbgLogo size={34} />
        </div>
        <AwsReinventLogo size="sm" />
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: "20px 56px 8px", overflow: "hidden" }}>
        {children}
      </div>

      {/* Skyline footer */}
      <div style={{ position: "relative", height: 138, flexShrink: 0 }}>
        <IslamabadHorizon opacity={1} height={138} objectFit="cover" />
      </div>
    </div>
  )
}

function CoverPage() {
  return (
    <SponsorPage>
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

        <div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: ACCENT,
            }}
          >
            Industry Partner Proposal
          </div>
        </div>
      </div>
    </SponsorPage>
  )
}

function AboutEventPage() {
  return (
    <SponsorPage>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <AccentRule />
        <Title>About the Event</Title>
        <Lead>
          Watch &amp; Build Party is an official AWS community event series,
          hosted alongside AWS re:Invent 2026 in Las Vegas.
        </Lead>
        <P>
          AWS is partnering with local communities in major cities worldwide to
          bring the re:Invent experience home. Every event brings together
          builders, students, and professionals to watch the keynote, build
          together, and explore the latest in cloud, AI, and emerging
          technology.
        </P>
        <P>
          The Islamabad edition brings that global moment to our city — a full
          day of live sessions, hands-on activities, and networking for the AWS
          community.
        </P>
      </div>
    </SponsorPage>
  )
}

function AboutOrganizerPage() {
  return (
    <SponsorPage>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <AccentRule />
        <Title>About the Organizer</Title>
        <Lead>
          AWS Student Builder Group, Air University is the officially approved
          host of the Islamabad edition of Watch &amp; Build Party 2026.
        </Lead>
        <P>
          With 1,000+ active community members and a strong track record of
          technical sessions, workshops, and community events, we connect the
          region&apos;s builders to AWS — from students and professionals to
          community leaders.
        </P>
      </div>
    </SponsorPage>
  )
}

function HighlightsPage() {
  const items = [
    { k: "400+", v: "Attendees expected" },
    { k: "Curated audience", v: "AWS enthusiasts, students, professionals & community leaders" },
    { k: "AWS, AI & emerging tech", v: "Sessions and hands-on workshops" },
    { k: "Activities & networking", v: "Structured networking and interactive activities" },
  ]
  return (
    <SponsorPage>
      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        <AccentRule />
        <Title>Event Highlights</Title>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {items.map((it) => (
            <Card key={it.k}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#FFFFFF", marginBottom: 6 }}>
                {it.k}
              </div>
              <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.5 }}>{it.v}</div>
            </Card>
          ))}
        </div>
      </div>
    </SponsorPage>
  )
}

function WhyCollaboratePage() {
  const items = [
    { t: "Global Visibility", d: "Align your brand with the AWS re:Invent 2026 global moment." },
    { t: "Local Community Visibility", d: "Reach the Islamabad AWS community directly." },
    { t: "Services Showcase", d: "Put your products and services in front of builders." },
    { t: "Networking", d: "Meet talent, peers, and AWS community leaders." },
    { t: "Social & On-stage Promotion", d: "Visibility across all social channels and during the event day." },
  ]
  return (
    <SponsorPage>
      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        <AccentRule />
        <Title>Why Collaborate</Title>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {items.map((it) => (
            <Card key={it.t} title={it.t}>
              {it.d}
            </Card>
          ))}
        </div>
      </div>
    </SponsorPage>
  )
}

function WaysPage() {
  const items = [
    { n: "01", t: "Become a Sponsor", d: "Fund the event and gain tiered visibility." },
    { n: "02", t: "In-kind Support", d: "Contribute food, swags, or any product." },
    { n: "03", t: "Technical Session", d: "Bring experts from your organization to present." },
  ]
  return (
    <SponsorPage>
      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        <AccentRule />
        <Title>Ways to Become Industry Partner</Title>
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
                <div style={{ fontSize: 14.5, color: MUTED, marginTop: 4 }}>{it.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SponsorPage>
  )
}

function IncludedPage() {
  const items = [
    { t: "Organization & Member Recognition", d: "An official shield for your organization, plus individual shields for each participating member." },
    { t: "AWS re:Invent Swags", d: "Official event swag kit for your team." },
    { t: "Refreshment", d: "Complimentary food & beverages for your team throughout the event." },
    { t: "Event Access", d: "Reserved entry to all sessions, activities, and the networking floor." },
  ]
  return (
    <SponsorPage>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <AccentRule />
        <Title>Event Day Perks for All Industry Partners</Title>
        <Lead>
          Whichever way you join us, your organization and team are recognized
          as official industry partners.
        </Lead>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((it) => (
            <Card key={it.t} title={it.t}>
              {it.d}
            </Card>
          ))}
        </div>
      </div>
    </SponsorPage>
  )
}

function PackagesPage() {
  const tiers = [
    {
      name: "Super",
      price: "150,000",
      accent: true,
      items: [
        "Title / “Powered by” branding",
        "Opening or keynote slot",
        "Stage-backdrop placement",
        "Everything in Premium",
        "10 passes",
        "Dedicated social campaign & newsletter feature",
        "Top placement across all materials",
      ],
    },
    {
      name: "Premium",
      price: "90,000",
      items: [
        "Logo across all promotion (social, website, on-screen)",
        "Booth or table space",
        "Everything in Active",
        "5 passes",
        "Spotlight social post",
        "Named recognition in sessions",
      ],
    },
    {
      name: "Active",
      price: "25,000",
      items: [
        "Logo on event-day materials",
        "Social media mention",
        "2 passes",
        "Thank-you in the closing",
      ],
    },
  ]
  return (
    <SponsorPage>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <AccentRule />
        <Title>Sponsor Packages</Title>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {tiers.map((t) => (
            <Card key={t.name} accent={t.accent} title={t.name}>
              <div style={{ fontSize: 26, fontWeight: 700, color: "#FFFFFF", margin: "4px 0 12px" }}>
                {t.price}
                <span style={{ fontSize: 13, fontWeight: 500, color: DIM }}> PKR</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {t.items.map((i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ color: ACCENT, fontSize: 12, lineHeight: 1.5 }}>✓</span>
                    <span style={{ fontSize: 13, lineHeight: 1.5, color: MUTED }}>{i}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </SponsorPage>
  )
}

function InKindTechPage() {
  return (
    <SponsorPage>
      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        <AccentRule />
        <Title>In-kind &amp; Technical Session</Title>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Card title="In-kind Support">
            Contribute food, swags, or any product. In-kind partners receive a
            dedicated standee to promote their brand, visibility across event
            backdrops, and mentions across social posts — alongside the full
            recognition baseline of shields and event access.
          </Card>
          <Card title="Technical Session">
            Bring experts from your organization to deliver a technical session.
            Your speakers gain community visibility and your organization is
            featured as a session partner.
          </Card>
        </div>

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
            anasriaz@awsairuniversity.com<br />+92 300 0790170
          </div>
        </div>
      </div>
    </SponsorPage>
  )
}

export default function SponsorDeck() {
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
      pdf.save("AWS-reInvent-Watch-and-Build-Party-Islamabad-Sponsorship-Proposal.pdf")
      setStatus("PDF downloaded!")
    } catch (err) {
      console.error("PDF export error:", err)
      setStatus("Export failed — please try again.")
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
        <div ref={pages[2]}><AboutOrganizerPage /></div>
        <div ref={pages[3]}><HighlightsPage /></div>
        <div ref={pages[4]}><WhyCollaboratePage /></div>
        <div ref={pages[5]}><WaysPage /></div>
        <div ref={pages[6]}><IncludedPage /></div>
        <div ref={pages[7]}><PackagesPage /></div>
        <div ref={pages[8]}><InKindTechPage /></div>
      </div>
    </div>
  )
}
