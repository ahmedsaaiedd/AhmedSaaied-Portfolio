"use client"

import { useState } from "react"
import { ArrowRight, Crosshair, Eye, Gauge, Sparkles } from "lucide-react"

const stages = [
  { number: "01", short: "Frame", title: "Find the real problem", text: "Map the people, decisions, edge cases, and constraints before the interface starts pretending everything is simple.", signal: "Context → constraint → opportunity", icon: Crosshair },
  { number: "02", short: "Model", title: "Make the system visible", text: "Turn flows, hierarchy, and states into one clear product model. The visual language grows from that structure.", signal: "Flow → hierarchy → shared language", icon: Eye },
  { number: "03", short: "Craft", title: "Build the feeling", text: "Use responsive components, precise motion, and careful feedback to make the product feel alive without losing clarity.", signal: "Interface → motion → feedback", icon: Sparkles },
  { number: "04", short: "Prove", title: "Pressure-test the details", text: "Test failure states, long content, touch targets, performance, and real devices until the experience stays calm under pressure.", signal: "Edge case → real device → confidence", icon: Gauge },
]

export function ApproachLens() {
  const [active, setActive] = useState(0)
  const stage = stages[active]
  const Icon = stage.icon

  return (
    <div className="decision-lens" data-stage={active + 1}>
      <div className="lens-topline">
        <span>Decision lens / live</span>
        <p><i /> clarity signal {String((active + 1) * 25).padStart(2, "0")}%</p>
      </div>
      <div className="lens-workspace">
        <div className="lens-orbit" aria-hidden="true">
          <div className="lens-rings"><i /><i /><i /></div>
          <div className="lens-core"><small>Active stage</small><strong>{stage.number}</strong><span>{stage.short}</span></div>
        </div>
        <div className="lens-controls" role="tablist" aria-label="Product approach stages">
          {stages.map((item, index) => {
            const StageIcon = item.icon
            return (
              <button key={item.number} type="button" role="tab" aria-selected={active === index} data-active={active === index}
                onClick={() => setActive(index)} onPointerEnter={(event) => { if (event.pointerType === "mouse") setActive(index) }}>
                <span>{item.number}</span><StageIcon aria-hidden="true" /><strong>{item.short}</strong>
              </button>
            )
          })}
        </div>
        <section className="lens-output" role="tabpanel" aria-live="polite">
          <span><Icon aria-hidden="true" /> Stage {stage.number} / {stage.short}</span>
          <h3>{stage.title}</h3>
          <p>{stage.text}</p>
          <div className="lens-signal"><small>{stage.signal}</small><ArrowRight aria-hidden="true" /></div>
        </section>
      </div>
    </div>
  )
}
