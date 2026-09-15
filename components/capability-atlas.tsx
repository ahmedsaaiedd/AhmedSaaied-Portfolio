"use client"

import { useRef, useState, type CSSProperties, type PointerEvent } from "react"
import { Braces, Database, Gauge, Palette, Presentation, Smartphone } from "lucide-react"

const domains = [
  {
    id: "mobile",
    number: "01",
    title: "Mobile systems",
    short: "Native + cross-platform",
    statement: "Responsive mobile products with durable state, clear navigation, local memory, and motion tuned for real devices.",
    signal: "Architecture → interaction → shipped build",
    icon: Smartphone,
    skills: ["Kotlin", "Jetpack Compose", "Flutter", "Dart", "MVVM", "Riverpod", "GoRouter", "Room", "Offline-first"],
  },
  {
    id: "web",
    number: "02",
    title: "Web engineering",
    short: "Interface + backend",
    statement: "Production-minded web systems with reusable UI, typed data, role-aware access, and maintainable boundaries.",
    signal: "UI → API → database → deployment",
    icon: Braces,
    skills: ["Next.js", "React", "TypeScript", "JavaScript", "SAPUI5", "HTML", "CSS", "Tailwind CSS", "REST APIs"],
  },
  {
    id: "data",
    number: "03",
    title: "Data & infrastructure",
    short: "Models + integrations",
    statement: "Practical data layers and integrations designed around ownership, synchronization, security, and recovery.",
    signal: "Reliable state across every surface",
    icon: Database,
    skills: ["PostgreSQL", "Prisma", "Firebase Auth", "Cloud Firestore", "Cloud Functions", "FCM", "Docker", "Google Maps API", "Git/GitHub"],
  },
  {
    id: "design",
    number: "04",
    title: "Product design",
    short: "Clarity + feeling",
    statement: "Complex workflows translated into calm, responsive interfaces that remain expressive without sacrificing usability.",
    signal: "Research → flow → system → prototype",
    icon: Palette,
    skills: ["UI/UX Design", "Figma", "User Flows", "Wireframing", "Prototyping", "Design Systems", "Information Architecture", "Interaction Design", "Motion Design"],
  },
  {
    id: "communication",
    number: "05",
    title: "Communication",
    short: "Ideas + alignment",
    statement: "Clear product narratives that connect business requirements, design decisions, implementation, and proof.",
    signal: "Make the thinking visible",
    icon: Presentation,
    skills: ["Presentation Skills", "Product Storytelling", "Requirements Translation", "Technical Documentation", "Team Leadership", "Stakeholder Communication"],
  },
]

export function CapabilityAtlas() {
  const [activeDomain, setActiveDomain] = useState(0)
  const [activeSkill, setActiveSkill] = useState(0)
  const frame = useRef(0)
  const atlas = useRef<HTMLDivElement>(null)
  const domain = domains[activeDomain]

  const selectDomain = (index: number) => {
    setActiveDomain(index)
    setActiveSkill(0)
  }

  const moveLight = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return
    const target = atlas.current
    if (!target || frame.current) return
    const x = event.clientX
    const y = event.clientY
    frame.current = window.requestAnimationFrame(() => {
      const rect = target.getBoundingClientRect()
      target.style.setProperty("--atlas-x", `${((x - rect.left) / rect.width) * 100}%`)
      target.style.setProperty("--atlas-y", `${((y - rect.top) / rect.height) * 100}%`)
      frame.current = 0
    })
  }

  return (
    <div
      ref={atlas}
      className="capability-atlas"
      data-domain={domain.id}
      onPointerMove={moveLight}
      onPointerLeave={() => {
        window.cancelAnimationFrame(frame.current)
        frame.current = 0
        atlas.current?.style.setProperty("--atlas-x", "50%")
        atlas.current?.style.setProperty("--atlas-y", "42%")
      }}
    >
      <div className="atlas-grid" aria-hidden="true" />
      <header className="atlas-header">
        <div>
          <span>Capability atlas / live</span>
          <strong>Design, engineering, and communication—connected.</strong>
        </div>
        <p><i /> {domains.reduce((count, item) => count + item.skills.length, 0)} skills mapped</p>
      </header>

      <div className="atlas-body">
        <nav className="domain-rail" aria-label="Capability domains" role="tablist">
          {domains.map((item, index) => {
            const Icon = item.icon
            return (
              <button
                type="button"
                role="tab"
                aria-selected={index === activeDomain}
                data-active={index === activeDomain}
                key={item.id}
                onClick={() => selectDomain(index)}
              >
                <span>{item.number}</span>
                <Icon aria-hidden="true" />
                <strong>{item.title}</strong>
                <small>{item.short}</small>
              </button>
            )
          })}
        </nav>

        <section className="skill-stage" aria-live="polite">
          <div className="skill-radar" aria-hidden="true"><i /><i /><i /></div>
          <div className="skill-stage-copy">
            <span>{domain.number} / {domain.title}</span>
            <h3>{domain.statement}</h3>
            <p><Gauge aria-hidden="true" /> {domain.signal}</p>
          </div>

          <div className="skill-cloud" role="list" aria-label={`${domain.title} skills`}>
            {domain.skills.map((skill, index) => (
              <button
                type="button"
                role="listitem"
                data-active={index === activeSkill}
                key={skill}
                onPointerEnter={(event) => { if (event.pointerType === "mouse") setActiveSkill(index) }}
                onFocus={() => setActiveSkill(index)}
                onClick={() => setActiveSkill(index)}
                style={{ "--skill-index": index } as CSSProperties}
              >
                <i />{skill}<span>{String(index + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>

          <div className="skill-inspector">
            <span>Inspecting</span>
            <strong>{domain.skills[activeSkill]}</strong>
            <small>{domain.title} / used in real product work</small>
          </div>
        </section>
      </div>

      <footer className="atlas-footer">
        <span>06 product systems</span>
        <span>Mobile + web</span>
        <span>Design ↔ code</span>
        <span>Performance first</span>
      </footer>
    </div>
  )
}
