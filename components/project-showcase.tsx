"use client"

import { useEffect, useRef, type CSSProperties, type PointerEvent } from "react"
import { ArrowUpRight, ExternalLink, GitFork } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Reveal } from "@/components/reveal"
import type { Project } from "@/lib/portfolio"

type ProjectShowcaseProps = {
  project: Project
  reversed?: boolean
  index: number
  total: number
}

function ProjectVisual({ project }: { project: Project }) {
  const stageRef = useRef<HTMLAnchorElement>(null)
  const frame = useRef(0)
  const pointer = useRef({ x: 0, y: 0 })

  const onPointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === "touch" || document.documentElement.dataset.motion !== "full") return

    pointer.current = { x: event.clientX, y: event.clientY }
    if (frame.current) return

    frame.current = window.requestAnimationFrame(() => {
      const stage = stageRef.current
      if (stage) {
        const rect = stage.getBoundingClientRect()
        const x = (pointer.current.x - rect.left) / rect.width - 0.5
        const y = (pointer.current.y - rect.top) / rect.height - 0.5
        stage.style.setProperty("--tilt-x", `${y * -3.2}deg`)
        stage.style.setProperty("--tilt-y", `${x * 4}deg`)
      }
      frame.current = 0
    })
  }

  const resetTilt = () => {
    window.cancelAnimationFrame(frame.current)
    frame.current = 0
    stageRef.current?.style.setProperty("--tilt-x", "0deg")
    stageRef.current?.style.setProperty("--tilt-y", "0deg")
  }

  useEffect(() => () => window.cancelAnimationFrame(frame.current), [])

  const primaryImageIndex: Record<string, number> = {
    squadtactics: 2,
    helpdesk: 1,
    spoton: 0,
    qnb: 2,
    swizzle: 0,
    automate: 1,
  }

  const portalSignals: Record<string, string[]> = {
    squadtactics: ["Formation", "Matchday", "Team"],
    helpdesk: ["Request", "Route", "Resolve"],
    spoton: ["Locate", "Reserve", "Arrive"],
    qnb: ["Balance", "Act", "Understand"],
    swizzle: ["Taste", "Identity", "Launch"],
    automate: ["Observe", "Care", "Remember"],
  }

  const screen = project.images[primaryImageIndex[project.id] ?? 0] ?? project.cover

  return (
    <Link
      ref={stageRef}
      href={`/work/${project.id}`}
      className={project.landscape ? "project-visual project-portal is-landscape" : "project-visual project-portal"}
      onPointerMove={onPointerMove}
      onPointerLeave={resetTilt}
      data-cursor="Enter world"
      aria-label={`Enter ${project.title} project world`}
      style={
        {
          "--project-accent": project.accent,
          "--project-soft": project.accentSoft,
          "--project-surface": project.surface,
          viewTransitionName: `project-${project.id}`,
        } as CSSProperties
      }
    >
      <div className="portal-grid" aria-hidden="true" />
      <div className="portal-orbit" aria-hidden="true"><span /><span /><span /></div>
      <div className="portal-index" aria-hidden="true">
        <span>System {project.number}</span>
        <i>Active world</i>
      </div>

      <div className="portal-device">
        <span className="portal-camera" aria-hidden="true" />
        <Image
          src={screen}
          alt={project.imageAlt}
          width={project.landscape ? 1600 : 1080}
          height={project.landscape ? 900 : 2235}
          loading="lazy"
          sizes={project.landscape ? "(max-width: 864px) 88vw, 48vw" : "(max-width: 864px) 54vw, 16rem"}
        />
      </div>

      <div className="portal-flow" aria-hidden="true">
        {portalSignals[project.id].map((signal, index) => (
          <span key={signal}><i>{String(index + 1).padStart(2, "0")}</i>{signal}</span>
        ))}
      </div>

      <span className="portal-open">Open project <ArrowUpRight aria-hidden="true" /></span>
    </Link>
  )
}

export function ProjectShowcase({ project, reversed = false, index, total }: ProjectShowcaseProps) {
  return (
    <Reveal>
      <article
        className="project-card project-chapter"
        data-reversed={reversed}
        data-project-world={project.id}
        data-world-accent={project.accent}
        data-world-soft={project.accentSoft}
        data-world-surface={project.surface}
        style={
          {
            "--project-accent": project.accent,
            "--project-soft": project.accentSoft,
            "--project-surface": project.surface,
            "--project-order": index,
          } as CSSProperties
        }
      >
        <div className="project-copy chapter-copy">
          <div className="project-meta">
            <span>{project.number}</span>
            <span>{project.discipline}</span>
            <span>{project.year}</span>
          </div>
          <h3>{project.title}</h3>
          <h4>{project.headline}</h4>
          <p>{project.summary}</p>

          <div className="chapter-role">
            <span>My role</span>
            <strong>{project.role}</strong>
          </div>

          <div className="project-tools" aria-label={`${project.title} technologies`}>
            {project.tools.slice(0, 4).map((tool) => <span key={tool}>{tool}</span>)}
          </div>

          <div className="project-actions">
            <Link className="case-study-button" href={`/work/${project.id}`} data-magnetic data-cursor="Enter world" data-analytics-event="project_opened" data-analytics-project={project.id}>
              Enter project world <ArrowUpRight aria-hidden="true" />
            </Link>
            {project.liveUrl && (
              <a
                className="live-demo-button"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                data-magnetic
                data-cursor="Launch demo"
                data-analytics-event="live_product_opened"
                data-analytics-project={project.id}
              >
                Live demo <ExternalLink aria-hidden="true" />
              </a>
            )}
            {project.githubUrl && (
              <a className="repository-button" href={project.githubUrl} target="_blank" rel="noreferrer" data-magnetic data-cursor="View code" data-analytics-event="project_repository_opened" data-analytics-project={project.id}>
                Repository <GitFork aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <ProjectVisual project={project} />

        <span className="chapter-position" aria-hidden="true">
          {project.number} / {String(total).padStart(2, "0")}
        </span>
      </article>
    </Reveal>
  )
}
