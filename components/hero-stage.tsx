"use client"

import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent } from "react"
import Image from "next/image"

import { projects, type Project } from "@/lib/portfolio"

const heroCopy: Record<string, { primary: number; mark: string; node: string; cursor: string; system: string }> = {
  squadtactics: { primary: 2, mark: "XI", node: "ST Pro", cursor: "Set formation", system: "11 players · 6 formations · live match logic" },
  helpdesk: { primary: 1, mark: "HD", node: "HelpDesk", cursor: "Route ticket", system: "3 roles · routed requests · real-time status" },
  spoton: { primary: 0, mark: "P", node: "SpotON", cursor: "Find space", system: "live availability · guided route · reserved arrival" },
  qnb: { primary: 2, mark: "be", node: "QNB", cursor: "Read balance", system: "clear balance · fast actions · spending context" },
  swizzle: { primary: 0, mark: "S", node: "Swizzle", cursor: "Mix flavor", system: "8 key slides · 2 core colors · launch system" },
  automate: { primary: 1, mark: "A", node: "AutoMate", cursor: "Wake machine", system: "5 rooms · 7 care systems · local-first memory" },
}

const constellation = [
  { x: "14%", y: "22%" },
  { x: "84%", y: "18%" },
  { x: "91%", y: "53%" },
  { x: "78%", y: "83%" },
  { x: "16%", y: "81%" },
  { x: "8%", y: "51%" },
]

const formation = [
  [50, 87, 0.5],
  [18, 67, 0.8], [38, 71, 1], [62, 71, 1], [82, 67, 0.8],
  [28, 48, 0.8], [50, 53, 1.1], [72, 48, 0.8],
  [20, 27, 0.8], [50, 20, 1.2], [80, 27, 0.8],
]

function ProductAtmosphere({ project }: { project: Project }) {
  if (project.id === "squadtactics") {
    return (
      <div className="hero-world-art hero-world-squad" aria-hidden="true">
        <div className="hero-pitch">
          <span className="pitch-half" /><span className="pitch-circle" />
          <span className="pitch-box pitch-box-top" /><span className="pitch-box pitch-box-bottom" />
          {formation.map(([x, y, depth], index) => (
            <i key={`${x}-${y}`} style={{ "--player-x": `${x}%`, "--player-y": `${y}%`, "--player-depth": depth } as CSSProperties}>
              {index === 0 ? "GK" : String(index).padStart(2, "0")}
            </i>
          ))}
        </div>
        <span className="hero-world-caption">4–3–3 · formation synchronized</span>
      </div>
    )
  }

  if (project.id === "helpdesk") {
    return (
      <div className="hero-world-art hero-world-helpdesk" aria-hidden="true">
        <svg viewBox="0 0 600 520" preserveAspectRatio="none">
          <path d="M100 122 C 210 122, 190 260, 300 260 S 410 395, 520 395" />
          <path d="M100 395 C 220 395, 190 260, 300 260 S 420 122, 520 122" />
        </svg>
        <span className="route-role role-employee">Employee</span>
        <span className="route-role role-support">Support</span>
        <span className="route-role role-manager">Manager</span>
        <div className="hero-ticket ticket-one"><strong>HD-204</strong><span>Login access</span><i>High</i></div>
        <div className="hero-ticket ticket-two"><strong>HD-218</strong><span>Device setup</span><i>Medium</i></div>
        <div className="ticket-state"><span>Open</span><span>Assigned</span><span>Resolved</span></div>
      </div>
    )
  }

  if (project.id === "spoton") {
    return (
      <div className="hero-world-art hero-world-spoton" aria-hidden="true">
        <div className="hero-map-grid" />
        <svg viewBox="0 0 600 520" preserveAspectRatio="none">
          <path d="M76 430 C 126 356, 205 405, 239 304 S 378 238, 418 153 S 500 118, 540 70" />
        </svg>
        <span className="map-origin">You</span><span className="map-destination"><i /> P-24</span>
        <div className="availability-card"><strong>87</strong><span>spaces live</span><i /></div>
      </div>
    )
  }

  if (project.id === "qnb") {
    return (
      <div className="hero-world-art hero-world-qnb" aria-hidden="true">
        <div className="hero-bank-card"><span>be</span><strong>•••• 4829</strong><i>VISA</i></div>
        <div className="hero-balance"><span>Available balance</span><strong>EGP 21,254.56</strong></div>
        <div className="hero-transactions">
          <span><i /> Figma subscription <strong>− EGP 1,200</strong></span>
          <span><i /> ATM withdrawal <strong>− EGP 3,500</strong></span>
          <span><i /> IPN transfer <strong>+ EGP 850</strong></span>
        </div>
      </div>
    )
  }

  if (project.id === "swizzle") return (
    <div className="hero-world-art hero-world-swizzle" aria-hidden="true">
      <strong className="swizzle-word">SWIZZLE</strong>
      <div className="flavor-wheel">
        <i style={{ "--flavor": "#ff5b87" } as CSSProperties}>Berry</i>
        <i style={{ "--flavor": "#ffb338" } as CSSProperties}>Mango</i>
        <i style={{ "--flavor": "#5de0ff" } as CSSProperties}>Ice</i>
        <i style={{ "--flavor": "#9b6cff" } as CSSProperties}>Grape</i>
      </div>
      <span className="hero-world-caption">Pick a flavor · build the mix</span>
    </div>
  )

  return (
    <div className="hero-world-art hero-world-automate" aria-hidden="true">
      <div className="machine-pulse">
        <i /><i /><i /><i />
        <span className="machine-glyph"><b /><b /><b /></span>
        <strong>IN RHYTHM</strong>
      </div>
      <div className="machine-readout"><span>ODOMETER</span><strong>5,000 km</strong><i>LOCAL / PRIVATE</i></div>
      <span className="hero-world-caption">Care · journey · memory</span>
    </div>
  )
}

export function HeroStage() {
  const gesture = useRef<{ x: number; y: number } | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const frame = useRef(0)
  const pointer = useRef({ x: 0, y: 0 })
  const [activeId, setActiveId] = useState(projects[0].id)

  const project = useMemo(() => projects.find((item) => item.id === activeId) ?? projects[0], [activeId])
  const config = heroCopy[project.id]
  const primaryImage = project.images[config.primary] ?? project.cover

  useEffect(() => {
    const hero = ref.current?.closest<HTMLElement>(".hero")
    if (!hero) return
    hero.dataset.heroProject = project.id
    hero.style.setProperty("--hero-accent", project.accent)
    hero.style.setProperty("--hero-soft", project.accentSoft)
    hero.style.setProperty("--hero-surface", project.surface)
  }, [project])

  const selectProject = (id: string) => {
    if (id === activeId) return
    setActiveId(id)
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || document.documentElement.dataset.motion !== "full") return
    pointer.current = { x: event.clientX, y: event.clientY }
    if (frame.current) return
    frame.current = window.requestAnimationFrame(() => {
      const node = ref.current
      if (node) {
        const bounds = node.getBoundingClientRect()
        node.style.setProperty("--hero-x", `${(pointer.current.x - bounds.left) / bounds.width - 0.5}`)
        node.style.setProperty("--hero-y", `${(pointer.current.y - bounds.top) / bounds.height - 0.5}`)
      }
      frame.current = 0
    })
  }

  const reset = () => {
    window.cancelAnimationFrame(frame.current)
    frame.current = 0
    ref.current?.style.setProperty("--hero-x", "0")
    ref.current?.style.setProperty("--hero-y", "0")
  }

  useEffect(() => () => window.cancelAnimationFrame(frame.current), [])

  return (
    <div
      ref={ref}
      className="hero-stage product-universe"
      data-project={project.id}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onPointerDown={(event) => {
        if (event.pointerType !== "touch" || (event.target as Element).closest("button")) return
        gesture.current = { x: event.clientX, y: event.clientY }
      }}
      onPointerCancel={() => { gesture.current = null }}
      onPointerUp={(event) => {
        const start = gesture.current
        gesture.current = null
        if (!start) return
        const dx = event.clientX - start.x
        const dy = event.clientY - start.y
        if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.5) return
        const index = projects.findIndex((item) => item.id === activeId)
        selectProject(projects[(index + (dx < 0 ? 1 : -1) + projects.length) % projects.length].id)
      }}
      style={{ "--hero-accent": project.accent, "--hero-soft": project.accentSoft, "--hero-surface": project.surface } as CSSProperties}
    >
      <ProductAtmosphere key={`atmosphere-${project.id}`} project={project} />
      <div className="universe-grid" aria-hidden="true" />

      <div className="product-reactor" aria-hidden="true">
        <div className="reactor-ring reactor-ring-product"><span>Product</span></div>
        <div className="reactor-ring reactor-ring-interface"><span>Interface</span></div>
        <div className="reactor-ring reactor-ring-engineering"><span>Engineering</span></div>
        <div className="reactor-core">
          <span>{project.number}</span>
          <strong>{config.mark}</strong>
          <i>live system</i>
        </div>
      </div>

      <div
        className={project.landscape ? "universe-device is-landscape" : "universe-device"}
      >
        <div className="universe-device-shell">
          <span className="product-camera" aria-hidden="true" />
          <Image
            key={primaryImage}
            className="universe-screen"
            src={primaryImage}
            alt={`${project.title} product interface`}
            fill
            sizes={project.landscape ? "30rem" : "18rem"}
            priority={project.id === "squadtactics"}
          />
        </div>
      </div>

      <div className="project-constellation" aria-label="Explore featured product systems">
        {projects.map((item, index) => (
          <button
            type="button"
            key={item.id}
            className="constellation-node"
            data-active={item.id === project.id}
            data-cursor={heroCopy[item.id].cursor}
            onPointerEnter={(event) => { if (event.pointerType === "mouse") selectProject(item.id) }}
            onFocus={() => selectProject(item.id)}
            onClick={() => selectProject(item.id)}
            aria-label={`Show ${item.title}`}
            aria-pressed={item.id === project.id}
            style={{ "--node-x": constellation[index].x, "--node-y": constellation[index].y } as CSSProperties}
          >
            <span>{heroCopy[item.id].node}</span>
            <i>{item.number}</i>
          </button>
        ))}
      </div>

      <div className="universe-identity" aria-live="polite">
        <span>{project.number} / {String(projects.length).padStart(2, "0")}</span>
        <strong>{project.title}</strong>
        <i>{config.system}</i>
      </div>

      <span className="universe-axis universe-axis-top" aria-hidden="true">Design ↔ Engineering</span>
      <span className="universe-axis universe-axis-bottom" aria-hidden="true">Product universe / active</span>
    </div>
  )
}
