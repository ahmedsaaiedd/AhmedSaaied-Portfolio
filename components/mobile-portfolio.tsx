"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowUpRight, ExternalLink, MapPin } from "lucide-react"

import { projects } from "@/lib/portfolio"

const projectScenes: Record<string, { label: string; detail: string; image: number }> = {
  squadtactics: { label: "Matchday system", detail: "11 players · 6 formations · live logic", image: 2 },
  helpdesk: { label: "Support operations", detail: "Request · route · resolve", image: 1 },
  spoton: { label: "Driver journey", detail: "Locate · reserve · arrive", image: 0 },
  qnb: { label: "Financial clarity", detail: "Balance · act · understand", image: 2 },
  swizzle: { label: "Flavor identity", detail: "Taste · color · launch", image: 0 },
  automate: { label: "Living machine", detail: "Observe · care · remember", image: 1 },
}

export function MobilePortfolio() {
  const introRef = useRef<HTMLElement>(null)
  const activeIdRef = useRef(projects[0].id)
  const [activeId, setActiveId] = useState(projects[0].id)

  useEffect(() => {
    const intro = introRef.current
    if (!intro) return
    if (window.matchMedia("(max-width: 54rem)").matches && window.location.hash === "#work") {
      document.getElementById("mobile-work")?.scrollIntoView({ behavior: "instant" })
    }

    let frame = 0
    let lastProgress = -1
    const introDistance = Math.max(intro.offsetHeight * 0.7, 1)
    const render = () => {
      const progress = Math.min(Math.max(window.scrollY / introDistance, 0), 1)
      if (Math.abs(progress - lastProgress) > 0.003) {
        intro.style.setProperty("--mobile-intro-progress", progress.toFixed(3))
        lastProgress = progress
      }
      frame = 0
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(render)
    }

    render()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>("[data-mobile-project]")
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        const id = (visible.target as HTMLElement).dataset.mobileProject
        if (id && id !== activeIdRef.current) {
          activeIdRef.current = id
          setActiveId(id)
        }
      },
      { rootMargin: "-24% 0px -30%", threshold: [0.2, 0.45, 0.7] },
    )
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="mobile-portfolio" aria-label="Ahmed Saaied mobile portfolio">
      <section ref={introRef} className="mobile-intro" id="mobile-top" aria-labelledby="mobile-hero-title">
        <div className="mobile-intro-grid" aria-hidden="true" />
        <div className="mobile-intro-status">
          <span>Ahmed Saaied</span>
          <i />
          <span><MapPin aria-hidden="true" /> Cairo</span>
        </div>

        <div className="mobile-intro-copy">
          <p>Product designer + developer</p>
          <h1 id="mobile-hero-title">
            <span>I build</span>
            <span>digital products</span>
            <span>that feel <em>obvious.</em></span>
          </h1>
          <p className="mobile-intro-summary">
            I turn complicated systems into products people understand instinctively.
          </p>
        </div>

        <div className="mobile-intro-actions">
          <a href="#mobile-work">Explore the systems <ArrowDown aria-hidden="true" /></a>
          <a href="mailto:ahmedsaaied117@gmail.com">Start a conversation <ArrowUpRight aria-hidden="true" /></a>
        </div>

        <div className="mobile-intro-readout" aria-label="Portfolio status">
          <span><i /> Available</span>
          <span>06 products</span>
          <span>Design ↔ Engineering</span>
        </div>
      </section>

      <section className="mobile-projects" id="mobile-work" aria-labelledby="mobile-work-title">
        <header className="mobile-projects-heading">
          <span>Selected product systems</span>
          <h2 id="mobile-work-title">Six worlds.<br />Built from the inside out.</h2>
        </header>

        <div className="mobile-project-stack">
          {projects.map((project, index) => {
            const scene = projectScenes[project.id]
            const image = project.images[scene.image] ?? project.cover
            return (
              <article
                key={project.id}
                className="mobile-project-scene"
                data-mobile-project={project.id}
                data-active={activeId === project.id}
                style={{
                  "--mobile-accent": project.accent,
                  "--mobile-soft": project.accentSoft,
                  "--mobile-surface": project.surface,
                } as CSSProperties}
              >
                <div className="mobile-scene-atmosphere" aria-hidden="true">
                  <span /><span /><span /><span /><span />
                </div>

                <div className="mobile-scene-meta">
                  <span>{project.number} / {String(projects.length).padStart(2, "0")}</span>
                  <i>{scene.label}</i>
                  <span>{project.year}</span>
                </div>

                <div className={project.landscape ? "mobile-scene-device is-landscape" : "mobile-scene-device"}>
                  <div className="mobile-device-frame">
                    {!project.landscape && <span className="mobile-device-camera" aria-hidden="true" />}
                    <Image
                      src={image}
                      alt={project.imageAlt}
                      fill
                      style={{ objectFit: "cover" }}
                      priority={index === 0}
                      sizes={project.landscape ? "92vw" : "68vw"}
                    />
                  </div>
                </div>

                <div className="mobile-scene-copy">
                  <span>{scene.detail}</span>
                  <h3>{project.title}</h3>
                  <p>{project.headline}</p>
                  <div>
                    <Link href={`/work/${project.id}`}>
                      Enter world <ArrowUpRight aria-hidden="true" />
                    </Link>
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer">
                        Live product <ExternalLink aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
