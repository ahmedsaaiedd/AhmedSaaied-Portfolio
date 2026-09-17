"use client"

import { useEffect, useState } from "react"

const roles = [
  "Software Developer",
  "Product Engineer",
  "Mobile & Web Developer",
  "UI/UX Designer",
]

type RotatingRoleProps = {
  className?: string
}

export function RotatingRole({ className }: RotatingRoleProps) {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length)
    }, 3200)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div
      className={className ? `rotating-role ${className}` : "rotating-role"}
      aria-label="Software developer, product engineer, mobile and web developer, and UI/UX designer"
    >
      <span className="role-signal-label" aria-hidden="true">Discipline signal</span>
      <span className="role-signal-value" key={roleIndex} aria-hidden="true">
        {roles[roleIndex]}
      </span>
      <span className="role-signal-count" aria-hidden="true">
        {String(roleIndex + 1).padStart(2, "0")} / {String(roles.length).padStart(2, "0")}
      </span>
      <span className="role-signal-track" aria-hidden="true">
        <i key={`track-${roleIndex}`} />
      </span>
    </div>
  )
}
