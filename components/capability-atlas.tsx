"use client"

import { useState, type CSSProperties, type PointerEvent } from "react"
import { Braces, Database, Gauge, Palette, Presentation, Smartphone } from "lucide-react"

const domains = [
  {
    id: "mobile", number: "01", title: "Mobile", eyebrow: "Mobile engineering", short: "Native + cross-platform",
    statement: "Responsive mobile products with durable state, clear navigation, local memory, and motion tuned for real devices.",
    signal: "Architecture → interaction → shipped build", icon: Smartphone,
    skills: ["Kotlin", "Jetpack Compose", "Flutter", "Dart", "MVVM", "Riverpod", "GoRouter", "Room", "Offline-first"],
  },
  {
    id: "web", number: "02", title: "Full-stack", eyebrow: "Web engineering", short: "Interface + backend",
    statement: "Production-minded web systems with reusable interfaces, typed data, role-aware access, and maintainable boundaries.",
    signal: "UI → API → database → deployment", icon: Braces,
    skills: ["Next.js", "React", "TypeScript", "JavaScript", "SAPUI5", "HTML", "CSS", "Tailwind CSS", "REST APIs"],
  },
  {
    id: "data", number: "03", title: "Systems", eyebrow: "Data & infrastructure", short: "Models + integrations",
    statement: "Practical data layers and integrations designed around ownership, synchronization, security, and recovery.",
    signal: "Reliable state across every surface", icon: Database,
    skills: ["PostgreSQL", "Prisma", "Firebase Auth", "Cloud Firestore", "Cloud Functions", "FCM", "Docker", "Google Maps API", "Git/GitHub"],
  },
  {
    id: "design", number: "04", title: "Design", eyebrow: "Product design", short: "Clarity + feeling",
    statement: "Complex workflows translated into calm, responsive interfaces that remain expressive without sacrificing usability.",
    signal: "Research → flow → system → prototype", icon: Palette,
    skills: ["UI/UX Design", "Figma", "User Flows", "Wireframing", "Prototyping", "Design Systems", "Information Architecture", "Interaction Design", "Motion Design"],
  },
  {
    id: "communication", number: "05", title: "Delivery", eyebrow: "Communication & delivery", short: "Ideas + alignment",
    statement: "Clear product narratives that connect business requirements, design decisions, implementation, and proof.",
    signal: "Make the thinking visible", icon: Presentation,
    skills: ["Presentation Skills", "Product Storytelling", "Requirements Translation", "Technical Documentation", "Team Leadership", "Stakeholder Communication"],
  },
]

const totalSkills = domains.reduce((count, item) => count + item.skills.length, 0)

export function CapabilityAtlas() {
  const [activeDomain, setActiveDomain] = useState(0)
  const domain = domains[activeDomain]

  const selectOnHover = (event: PointerEvent<HTMLButtonElement>, index: number) => {
    if (event.pointerType === "mouse") setActiveDomain(index)
  }

  return (
    <div className="capability-mixer" data-domain={domain.id}>
      <div className="mixer-grid" aria-hidden="true" />
      <header className="mixer-header">
        <div>
          <span>Product signal mixer / live</span>
          <strong>Five disciplines. One connected product system.</strong>
        </div>
        <p><i /> {totalSkills} signals available</p>
      </header>

      <div className="mixer-console">
        <nav className="mixer-channels" aria-label="Capability channels" role="tablist">
          {domains.map((item, index) => {
            const Icon = item.icon
            const distance = Math.abs(activeDomain - index)
            const level = index === activeDomain ? 94 : Math.max(20, 54 - distance * 11)

            return (
              <button
                type="button"
                role="tab"
                aria-selected={index === activeDomain}
                aria-controls="capability-mixer-output"
                data-active={index === activeDomain}
                key={item.id}
                onPointerEnter={(event) => selectOnHover(event, index)}
                onFocus={() => setActiveDomain(index)}
                onClick={() => setActiveDomain(index)}
                style={{ "--channel-level": `${level}%`, "--channel-index": index } as CSSProperties}
              >
                <span className="mixer-channel-number">{item.number}</span>
                <div className="mixer-channel-meter" aria-hidden="true"><i /><b /></div>
                <Icon aria-hidden="true" />
                <strong>{item.title}</strong>
                <small>{item.short}</small>
              </button>
            )
          })}
        </nav>

        <section className="mixer-output" id="capability-mixer-output" role="tabpanel" aria-live="polite">
          <div className="mixer-output-signal" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <div className="mixer-output-meta">
            <span>{domain.number} / {domain.eyebrow}</span>
            <p><Gauge aria-hidden="true" /> {domain.signal}</p>
          </div>
          <h3>{domain.statement}</h3>
          <div className="mixer-skill-window" aria-label={`${domain.eyebrow} skills`}>
            <div className="mixer-skill-track">
              <div>{domain.skills.map((skill) => <span key={skill}><i />{skill}</span>)}</div>
              <div aria-hidden="true">{domain.skills.map((skill) => <span key={`${skill}-copy`}><i />{skill}</span>)}</div>
            </div>
          </div>
        </section>
      </div>

      <footer className="mixer-footer">
        <span>Design ↔ engineering</span><span>Real product work</span><span>Performance first</span>
      </footer>
    </div>
  )
}
