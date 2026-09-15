import type { CSSProperties } from "react"

import type { Project } from "@/lib/portfolio"

type AtmosphereProps = {
  project: Project
}

const formationPlayers = [
  [50, 88],
  [17, 68], [39, 72], [61, 72], [83, 68],
  [27, 47], [50, 53], [73, 47],
  [20, 24], [50, 18], [80, 24],
]

function SquadAtmosphere() {
  return (
    <div className="hero-atmosphere squad-atmosphere" aria-hidden="true">
      <div className="world-squad-pitch">
        <i className="world-squad-pitch-half" />
        <i className="world-squad-pitch-circle" />
        <i className="world-squad-pitch-box world-squad-pitch-box-top" />
        <i className="world-squad-pitch-box world-squad-pitch-box-bottom" />
        {formationPlayers.map(([left, top], index) => (
          <span
            className="world-squad-player"
            key={`${left}-${top}`}
            style={{ "--player-x": `${left}%`, "--player-y": `${top}%`, "--player-order": index } as CSSProperties}
          />
        ))}
      </div>
      <span className="pitch-formation">4–3–3 / XI</span>
    </div>
  )
}

function HelpdeskAtmosphere() {
  return (
    <div className="hero-atmosphere helpdesk-atmosphere" aria-hidden="true">
      <div className="support-lane lane-request"><span>Request</span><i /><i /><i /></div>
      <div className="support-lane lane-owner"><span>Owner</span><i /><i /><i /></div>
      <div className="support-lane lane-resolved"><span>Resolved</span><i /><i /><i /></div>
      <div className="support-ticket ticket-a"><span>#284</span><strong>Assigned</strong></div>
      <div className="support-ticket ticket-b"><span>#283</span><strong>In progress</strong></div>
      <div className="support-ticket ticket-c"><span>#282</span><strong>Resolved</strong></div>
      <svg className="support-paths" viewBox="0 0 680 520" preserveAspectRatio="none">
        <path d="M70 105 C250 105 208 256 344 256 S470 405 620 405" />
        <path d="M70 256 C220 256 250 405 620 405" />
      </svg>
    </div>
  )
}

function SpotonAtmosphere() {
  return (
    <div className="hero-atmosphere spoton-atmosphere" aria-hidden="true">
      <div className="hero-parking-map">
        <div className="hero-map-road hero-map-road-a" />
        <div className="hero-map-road hero-map-road-b" />
        <div className="hero-map-route"><span /><span /><span /></div>
        {Array.from({ length: 10 }, (_, index) => (
          <i className="hero-parking-slot" data-open={index % 3 !== 1} key={index} />
        ))}
        <div className="hero-map-pin"><span>P</span><small>3 min</small></div>
      </div>
      <span className="parking-signal">125 spaces / live</span>
    </div>
  )
}

function QnbAtmosphere() {
  return (
    <div className="hero-atmosphere qnb-atmosphere" aria-hidden="true">
      <div className="secure-card-outline">
        <span>SECURE / 04</span>
        <strong>•••• 4829</strong>
        <i />
      </div>
      <div className="money-orbit orbit-balance"><span>Balance</span></div>
      <div className="money-orbit orbit-transfer"><span>Transfer</span></div>
      <svg className="transaction-trail" viewBox="0 0 760 520" preserveAspectRatio="none">
        <path d="M40 410 C190 410 205 120 388 120 S540 326 720 326" />
        <path d="M110 465 C250 360 372 446 520 214 S635 84 738 70" />
      </svg>
    </div>
  )
}

function SwizzleAtmosphere() {
  return (
    <div className="hero-atmosphere swizzle-atmosphere" aria-hidden="true">
      <div className="hero-flavor-orbit">
        <i data-flavor="berry" />
        <i data-flavor="mango" />
        <i data-flavor="lime" />
        <i data-flavor="ocean" />
      </div>
      <span className="hero-swizzle-mark">S</span>
      <div className="hero-flavor-labels"><span>Berry</span><span>Mango</span><span>Lime</span><span>Ocean</span></div>
    </div>
  )
}

function AutoMateAtmosphere() {
  return (
    <div className="hero-atmosphere automate-atmosphere" aria-hidden="true">
      <div className="world-machine-orbit">
        <i /><i /><i /><i /><i />
        <div className="machine-memory-core">
          <span>LOCAL MEMORY</span>
          <strong>5,000</strong>
          <small>KM OBSERVED</small>
        </div>
        <div className="machine-cycle cycle-care"><span>CARE</span><b>07</b></div>
        <div className="machine-cycle cycle-cost"><span>COST</span><b>CALM</b></div>
        <div className="machine-cycle cycle-drive"><span>DRIVE</span><b>SYNCED</b></div>
        <strong>IN RHYTHM</strong>
      </div>
      <span className="machine-status status-care">CARE / 07</span>
      <span className="machine-status status-memory">LOCAL MEMORY</span>
      <span className="machine-status status-journey">5,000 KM</span>
    </div>
  )
}

export function ProjectHeroAtmosphere({ project }: AtmosphereProps) {
  if (project.id === "squadtactics") return <SquadAtmosphere />
  if (project.id === "helpdesk") return <HelpdeskAtmosphere />
  if (project.id === "spoton") return <SpotonAtmosphere />
  if (project.id === "qnb") return <QnbAtmosphere />
  if (project.id === "swizzle") return <SwizzleAtmosphere />
  return <AutoMateAtmosphere />
}
