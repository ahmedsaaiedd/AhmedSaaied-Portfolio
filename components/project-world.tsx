import type { CSSProperties } from "react"
import { ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"

import { AmbientEffects } from "@/components/ambient-effects"
import { ProjectHeroAtmosphere } from "@/components/project-hero-atmosphere"
import { ScreenTheater } from "@/components/screen-theater"
import { SiteNav } from "@/components/site-nav"
import type { Project } from "@/lib/portfolio"

type ProjectWorldProps = {
  project: Project
  nextProject: Project
  total: number
}

const worldLanguage: Record<string, {
  proofEyebrow: string
  proofTitle: string
  challengeLabel: string
  challengeTitle: string
  roleLabel: string
  roleTitle: string
  decisionsLabel: string
  decisionsTitle: string
  processLabel: string
  processTitle: string
  resultLabel: string
}> = {
  squadtactics: {
    proofEyebrow: "Match intelligence",
    proofTitle: "The system behind matchday.",
    challengeLabel: "01 / Opposition",
    challengeTitle: "Read the chaos before kickoff.",
    roleLabel: "02 / Position",
    roleTitle: "Owning the full touchline system.",
    decisionsLabel: "03 / Game plan",
    decisionsTitle: "Tactical calls that shaped the product.",
    processLabel: "04 / Match plan",
    processTitle: "Four phases. One coordinated XI.",
    resultLabel: "05 / Full time",
  },
  helpdesk: {
    proofEyebrow: "Operations telemetry",
    proofTitle: "The routing system behind every resolution.",
    challengeLabel: "01 / Incoming",
    challengeTitle: "Turn request noise into a clear queue.",
    roleLabel: "02 / Ownership",
    roleTitle: "One system across every support role.",
    decisionsLabel: "03 / Routing rules",
    decisionsTitle: "Decisions that keep work moving.",
    processLabel: "04 / Resolution path",
    processTitle: "From intake to resolved, without losing context.",
    resultLabel: "05 / Resolved",
  },
  spoton: {
    proofEyebrow: "Live navigation",
    proofTitle: "The journey behind a confident arrival.",
    challengeLabel: "01 / Roadblock",
    challengeTitle: "Remove uncertainty from the drive.",
    roleLabel: "02 / Driver view",
    roleTitle: "Own every turn from search to park.",
    decisionsLabel: "03 / Route choices",
    decisionsTitle: "Signals that guide the shortest path.",
    processLabel: "04 / Route plan",
    processTitle: "Four waypoints to an effortless arrival.",
    resultLabel: "05 / Arrived",
  },
  qnb: {
    proofEyebrow: "Financial clarity",
    proofTitle: "A calmer hierarchy for everyday money.",
    challengeLabel: "01 / Friction audit",
    challengeTitle: "Make complexity feel trustworthy.",
    roleLabel: "02 / Stewardship",
    roleTitle: "Protect clarity across the whole experience.",
    decisionsLabel: "03 / Trust principles",
    decisionsTitle: "Choices that make money easier to read.",
    processLabel: "04 / Clarity framework",
    processTitle: "A redesign built like a financial statement.",
    resultLabel: "05 / Account transformed",
  },
  swizzle: {
    proofEyebrow: "Brand energy",
    proofTitle: "A flavor system made to move.",
    challengeLabel: "01 / Raw mix",
    challengeTitle: "Turn a product into a feeling.",
    roleLabel: "02 / Creative direction",
    roleTitle: "Shape one voice across every touchpoint.",
    decisionsLabel: "03 / Flavor notes",
    decisionsTitle: "Ingredients that give the brand its kick.",
    processLabel: "04 / Mixing process",
    processTitle: "Blend, taste, refine, launch.",
    resultLabel: "05 / Ready to serve",
  },
}

export function ProjectWorld({ project, nextProject, total }: ProjectWorldProps) {
  const language = worldLanguage[project.id] ?? worldLanguage.squadtactics

  return (
    <main
      className="project-world-page"
      data-project-world={project.id}
      data-world={project.id}
      style={
        {
          "--project-accent": project.accent,
          "--project-soft": project.accentSoft,
          "--project-surface": project.surface,
        } as CSSProperties
      }
    >
      <AmbientEffects />
      <div className="world-backdrop" aria-hidden="true"><span /><span /></div>

      <SiteNav mode="world" worldCount={`${project.number} / ${String(total).padStart(2, "0")}`} />

      <section className="world-intro" id="top" style={{ viewTransitionName: `project-${project.id}` } as CSSProperties}>
        <ProjectHeroAtmosphere project={project} />
        <div className="world-intro-meta">
          <span>{project.discipline}</span>
          <span>{project.year}</span>
          <span>Project world</span>
        </div>
        <h1>{project.title}</h1>
        <p className="world-headline">{project.headline}</p>
        <div className="world-intro-bottom">
          <p>{project.summary}</p>
          <div>
            <span>My role</span>
            <strong>{project.role}</strong>
          </div>
        </div>
        {project.liveUrl && (
          <a className="world-live-demo" href={project.liveUrl} target="_blank" rel="noreferrer" data-cursor="Launch demo">
            Launch live product <ExternalLink aria-hidden="true" />
          </a>
        )}
      </section>

      <div className="world-theater-anchor" id="screens">
        <ScreenTheater project={project} />
      </div>

      <section className="world-proof" id="system" aria-labelledby={`${project.id}-proof`}>
        <div className="world-proof-heading">
          <span>{language.proofEyebrow}</span>
          <h2 id={`${project.id}-proof`}>{language.proofTitle}</h2>
        </div>

        <div className="world-signals">
          {project.signals.map((signal) => (
            <article key={signal.label}>
              <strong>{signal.value}</strong>
              <span>{signal.label}</span>
            </article>
          ))}
        </div>

        <div className="world-story-grid">
          <article>
            <span>{language.challengeLabel}</span>
            <h3>{language.challengeTitle}</h3>
            <p>{project.challenge}</p>
          </article>
          <article>
            <span>{language.roleLabel}</span>
            <h3>{language.roleTitle}</h3>
            <p>{project.role}</p>
          </article>
        </div>

        <div className="world-decisions">
          <div>
            <span>{language.decisionsLabel}</span>
            <h3>{language.decisionsTitle}</h3>
          </div>
          <ol>
            {project.decisions.map((decision, index) => (
              <li key={decision}><span>{String(index + 1).padStart(2, "0")}</span><p>{decision}</p></li>
            ))}
          </ol>
        </div>

        <div className="world-process">
          <div className="world-process-head">
            <span>{language.processLabel}</span>
            <h3>{language.processTitle}</h3>
          </div>
          <div className="world-process-grid" data-process-world={project.id}>
            {project.phases.map((phase, index) => (
              <article key={phase.title} data-phase={String(index + 1).padStart(2, "0")}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h4>{phase.title}</h4>
                <p>{phase.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="world-result">
          <div>
            <span>{language.resultLabel}</span>
            <p>{project.outcome}</p>
          </div>
          <div className="world-tools" aria-label="Tools used">
            {project.tools.map((tool) => <span key={tool}>{tool}</span>)}
          </div>
        </div>
      </section>

      <footer className="world-next" id="next-world">
        <span>Next project world</span>
        <Link href={`/work/${nextProject.id}`} data-cursor="Next world">
          <div>
            <small>{nextProject.number} / {String(total).padStart(2, "0")}</small>
            <strong>{nextProject.title}</strong>
          </div>
          <ArrowRight aria-hidden="true" />
        </Link>
      </footer>
    </main>
  )
}
