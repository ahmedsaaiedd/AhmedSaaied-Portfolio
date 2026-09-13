"use client"

import { useState } from "react"
import { Boxes, Braces, Database, Gauge } from "lucide-react"

const systems = [
  {
    id: "architecture",
    label: "Architecture",
    title: "Products that stay understandable as they grow.",
    text: "Feature-first boundaries, predictable state, role-aware navigation, and reusable design primitives keep complexity controlled.",
    proof: ["MVVM + Riverpod", "Typed navigation", "Reusable systems"],
    trace: ["intent.capture()", "state.resolve()", "ui.render()"],
  },
  {
    id: "data",
    label: "Data systems",
    title: "Interfaces connected to real product logic.",
    text: "Authentication, permissions, realtime data, relational models, and resilient local states are designed as one user experience.",
    proof: ["Firebase Auth", "Firestore", "PostgreSQL"],
    trace: ["identity.verify()", "policy.authorize()", "data.sync()"],
  },
  {
    id: "experience",
    label: "Product UX",
    title: "Every state earns its place on screen.",
    text: "Responsive layouts, bilingual journeys, accessible controls, and deliberate feedback turn complex workflows into calm decisions.",
    proof: ["Responsive UI", "Arabic + English", "Edge-case design"],
    trace: ["context.read()", "decision.reduce()", "feedback.confirm()"],
  },
  {
    id: "performance",
    label: "Performance",
    title: "Motion with a frame budget, not a visual tax.",
    text: "GPU-friendly transforms, requestAnimationFrame input, lazy surfaces, optimized images, and reduced-motion support keep the experience fluid.",
    proof: ["Frame-budgeted", "Lazy rendering", "Real-device QA"],
    trace: ["input.sample()", "frame.schedule()", "transform.commit()"],
  },
]

const icons = [Boxes, Database, Braces, Gauge]

export function EngineeringConsole() {
  const [active, setActive] = useState(0)
  const system = systems[active]

  return (
    <section className="engineering-console" aria-label="Engineering capabilities explorer">
      <div className="console-tabs" role="tablist" aria-label="Engineering capability">
        {systems.map((item, index) => {
          const Icon = icons[index]
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active === index}
              data-active={active === index}
              onClick={() => setActive(index)}
            >
              <Icon aria-hidden="true" />
              <span>{item.label}</span>
              <i>{String(index + 1).padStart(2, "0")}</i>
            </button>
          )
        })}
      </div>

      <div className="console-stage" role="tabpanel" key={system.id}>
        <div className="console-copy">
          <span className="console-status"><i /> System online</span>
          <h3>{system.title}</h3>
          <p>{system.text}</p>
          <div className="console-proof">
            {system.proof.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>

        <div className="console-runtime" aria-label={`${system.label} execution trace`}>
          <div className="runtime-head">
            <span>PRODUCT_ENGINE / {system.id.toUpperCase()}</span>
            <strong>READY</strong>
          </div>
          <ol>
            {system.trace.map((line, index) => (
              <li key={line}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <code>{line}</code>
                <i />
              </li>
            ))}
          </ol>
          <div className="runtime-flow" aria-hidden="true"><span /><span /><span /></div>
        </div>
      </div>
    </section>
  )
}
