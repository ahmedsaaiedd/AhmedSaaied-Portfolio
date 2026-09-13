import type { CSSProperties } from "react"

import type { Project } from "@/lib/portfolio"

type SignatureProps = {
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
      <div className="hero-pitch">
        <i className="hero-pitch-half" />
        <i className="hero-pitch-circle" />
        <i className="hero-pitch-box hero-pitch-box-top" />
        <i className="hero-pitch-box hero-pitch-box-bottom" />
        {formationPlayers.map(([left, top]) => (
          <span
            className="hero-pitch-player"
            key={`${left}-${top}`}
            style={{ "--player-x": `${left}%`, "--player-y": `${top}%` } as CSSProperties}
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

export function ProjectHeroAtmosphere({ project }: SignatureProps) {
  if (project.id === "squadtactics") return <SquadAtmosphere />
  if (project.id === "helpdesk") return <HelpdeskAtmosphere />
  if (project.id === "qnb") return <QnbAtmosphere />
  return null
}

function SpotonSignature() {
  return (
    <div className="signature-panel spoton-map" aria-label="SpotON parking availability preview">
      <div className="map-status"><i /> Live availability <strong>125 spaces</strong></div>
      <div className="parking-map" aria-hidden="true">
        <div className="map-road road-a" />
        <div className="map-road road-b" />
        <div className="map-route"><span /><span /><span /></div>
        {Array.from({ length: 12 }, (_, index) => (
          <i className="parking-slot" data-open={index % 4 !== 1} key={index} />
        ))}
        <div className="map-pin"><span>P</span><small>3 min</small></div>
      </div>
      <div className="map-destination">
        <span>Computer Science Park</span>
        <strong>EGP 12 / hr</strong>
      </div>
    </div>
  )
}

function SwizzleSignature() {
  return (
    <div className="signature-panel swizzle-lab" aria-label="Swizzle flavor and brand system preview">
      <div className="flavor-orbit" aria-hidden="true"><span /><span /><span /><span /></div>
      <div className="swizzle-wordmark"><small>Summer / Egypt / 2025</small><strong>SWIZZLE</strong><em>Pick it. Twist it. Taste it.</em></div>
      <div className="flavor-system">
        <span data-flavor="berry">Berry</span>
        <span data-flavor="mango">Mango</span>
        <span data-flavor="lime">Lime</span>
        <span data-flavor="ocean">Ocean</span>
      </div>
      <div className="swizzle-stamp">4 flavors<br />1 twist</div>
    </div>
  )
}

export function ProjectWorldSignature({ project }: SignatureProps) {
  if (project.id === "spoton") return <SpotonSignature />
  if (project.id === "swizzle") return <SwizzleSignature />
  return null
}
