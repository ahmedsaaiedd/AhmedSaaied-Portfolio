"use client"

import { useEffect, useRef } from "react"
import { ArrowUpRight, FileText, GitFork, Link as LinkIcon, Mail } from "lucide-react"

import { Reveal } from "@/components/reveal"
import { TransitionLink } from "@/components/transition-link"

export function CinematicEnding() {
  const sectionRef = useRef<HTMLElement>(null)
  const motionFrame = useRef<number | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        section.dataset.active = entry.isIntersecting ? "true" : "false"
      },
      { threshold: 0.18 },
    )
    observer.observe(section)

    return () => {
      observer.disconnect()
      if (motionFrame.current !== null) cancelAnimationFrame(motionFrame.current)
    }
  }, [])

  const movePortal = (clientX: number, clientY: number) => {
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return
    const section = sectionRef.current
    if (!section) return

    const bounds = section.getBoundingClientRect()
    const x = Math.max(-1, Math.min(1, ((clientX - bounds.left) / bounds.width - 0.5) * 2))
    const y = Math.max(-1, Math.min(1, ((clientY - bounds.top) / bounds.height - 0.5) * 2))

    if (motionFrame.current !== null) cancelAnimationFrame(motionFrame.current)
    motionFrame.current = requestAnimationFrame(() => {
      section.style.setProperty("--signal-x", x.toFixed(3))
      section.style.setProperty("--signal-y", y.toFixed(3))
      motionFrame.current = null
    })
  }

  const resetPortal = () => {
    const section = sectionRef.current
    if (!section) return
    section.style.setProperty("--signal-x", "0")
    section.style.setProperty("--signal-y", "0")
  }

  return (
    <section
      ref={sectionRef}
      className="cinematic-ending"
      id="contact"
      aria-labelledby="ending-title"
      onPointerMove={(event) => movePortal(event.clientX, event.clientY)}
      onPointerLeave={resetPortal}
    >
      <div className="ending-grid" aria-hidden="true" />
      <div className="ending-convergence" aria-hidden="true">
        <div className="ending-convergence-field" />
        <div className="ending-convergence-axis" />
        <div className="ending-convergence-core"><span /><i /></div>
        <span className="ending-signal-label ending-signal-label-a">Input / complexity</span>
        <span className="ending-signal-label ending-signal-label-b">Output / clarity</span>
      </div>
      <div className="section-shell ending-inner">
        <Reveal>
          <span className="section-kicker">04 / Start the next system</span>
          <h2 id="ending-title">
            <span className="ending-title-question">Have a difficult product?</span>
            <em className="ending-title-answer" aria-label="Let's make it feel obvious.">
              Let&apos;s make it feel <span className="ending-obvious-word" aria-hidden="true">obv<span className="ending-signal-letter">ı<i className="ending-word-signal" /></span>ous.</span>
            </em>
          </h2>
          <p>
            Tell me what you&apos;re building, where it becomes difficult, and what needs to work better. I can help define the system, design the interface, and build the product.
          </p>
          <div className="ending-actions">
            <a className="ending-primary-action" href="mailto:ahmedsaaied117@gmail.com" data-magnetic data-cursor="Send mail">
              <Mail aria-hidden="true" /> Start a conversation <ArrowUpRight aria-hidden="true" />
            </a>
            <div className="ending-link-rail">
              <a href="https://www.linkedin.com/in/ahmed-saaied-904a23372" target="_blank" rel="noreferrer" data-cursor="LinkedIn">
                <LinkIcon aria-hidden="true" /> LinkedIn
              </a>
              <TransitionLink href="/resume" data-cursor="Resume">
                <FileText aria-hidden="true" /> Resume
              </TransitionLink>
              <a href="https://github.com/ahmedsaaiedd" target="_blank" rel="noreferrer" data-cursor="GitHub">
                <GitFork aria-hidden="true" /> GitHub
              </a>
            </div>
          </div>
        </Reveal>
        <div className="ending-status" aria-hidden="true"><i /> Cairo · available for selected work</div>
        <div className="ending-signoff" aria-label="Portfolio colophon">
          <span>© 2026 Ahmed Saaied</span>
          <span>Designed and engineered in Cairo</span>
        </div>
      </div>
    </section>
  )
}
