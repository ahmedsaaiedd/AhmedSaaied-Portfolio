import type { CSSProperties } from "react"

import type { Project } from "@/lib/portfolio"

type ProjectAuraProps = {
  projects: Project[]
}

export function ProjectAura({ projects }: ProjectAuraProps) {
  return (
    <div className="project-aura" aria-hidden="true">
      {projects.map((project) => (
        <div
          className="project-aura-world"
          data-aura-world={project.id}
          key={project.id}
          style={
            {
              "--aura-accent": project.accent,
              "--aura-soft": project.accentSoft,
              "--aura-surface": project.surface,
            } as CSSProperties
          }
        >
          <div className="aura-wash" />
          <div className="aura-motif">
            {Array.from({ length: 7 }, (_, index) => <span key={index} />)}
          </div>
          <span className="aura-code">{project.number} / {project.id}</span>
        </div>
      ))}

      <div className="project-aura-rail">
        {projects.map((project) => (
          <span key={project.id} data-aura-marker={project.id} />
        ))}
      </div>
    </div>
  )
}
