"use client"

import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react"
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react"
import Image from "next/image"

import type { Project } from "@/lib/portfolio"

export function ScreenTheater({ project }: { project: Project }) {
  const [active, setActive] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const theaterRef = useRef<HTMLElement>(null)
  const gesture = useRef({ x: 0, y: 0 })

  const move = useCallback((direction: number) => {
    setActive((current) => (current + direction + project.images.length) % project.images.length)
  }, [project.images.length])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") move(-1)
      if (event.key === "ArrowRight") move(1)
    }

    const onFullscreenChange = () => setFullscreen(document.fullscreenElement === theaterRef.current)

    window.addEventListener("keydown", onKeyDown)
    document.addEventListener("fullscreenchange", onFullscreenChange)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("fullscreenchange", onFullscreenChange)
    }
  }, [move])

  const toggleFullscreen = async () => {
    if (!theaterRef.current) return
    if (document.fullscreenElement) {
      await document.exitFullscreen()
      return
    }
    await theaterRef.current.requestFullscreen()
  }

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    gesture.current = { x: event.clientX, y: event.clientY }
  }

  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse") return
    const x = event.clientX - gesture.current.x
    const y = event.clientY - gesture.current.y
    if (Math.abs(x) < 55 || Math.abs(x) < Math.abs(y) * 1.2) return
    move(x < 0 ? 1 : -1)
  }

  const currentImage = project.images[active]
  const theaterLabel = project.id === "squadtactics"
    ? "Tactical replay"
    : project.id === "helpdesk"
      ? "Role workspace"
      : project.id === "spoton"
        ? "Driver journey"
        : project.id === "qnb"
          ? "Banking flow"
          : "Brand story"

  return (
    <section
      ref={theaterRef}
      className={project.landscape ? "screen-theater is-landscape" : "screen-theater"}
      data-world={project.id}
      aria-label={`${project.title} screen theater`}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      style={{ "--project-accent": project.accent, "--project-soft": project.accentSoft } as CSSProperties}
    >
      <div className="theater-grid" aria-hidden="true" />
      <div className="theater-head">
        <div>
          <span><i /> {theaterLabel}</span>
          <strong>{String(active + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}</strong>
        </div>
        <button type="button" onClick={toggleFullscreen} aria-label={fullscreen ? "Exit fullscreen" : "Open fullscreen"}>
          {fullscreen ? <Minimize2 aria-hidden="true" /> : <Maximize2 aria-hidden="true" />}
          <span>{fullscreen ? "Exit" : "Fullscreen"}</span>
        </button>
      </div>

      <div className="theater-stage">
        <button className="theater-arrow theater-arrow-left" type="button" onClick={() => move(-1)} aria-label="Previous screen">
          <ChevronLeft aria-hidden="true" />
        </button>

        <div className="theater-image" key={currentImage}>
          <Image
            src={currentImage}
            alt={`${project.imageAlt}, screen ${active + 1}`}
            width={project.landscape ? 1867 : 1080}
            height={project.landscape ? 924 : 2235}
            sizes="(max-width: 864px) 96vw, 86vw"
            quality={84}
            priority={active === 0}
          />
        </div>

        <button className="theater-arrow theater-arrow-right" type="button" onClick={() => move(1)} aria-label="Next screen">
          <ChevronRight aria-hidden="true" />
        </button>
      </div>

      <div className="theater-rail" aria-label="Choose a project screen">
        {project.images.map((image, index) => (
          <button
            type="button"
            key={image}
            data-active={index === active}
            aria-label={`Show screen ${index + 1}`}
            aria-pressed={index === active}
            onClick={() => setActive(index)}
          >
            <Image
              src={image}
              alt=""
              width={project.landscape ? 320 : 150}
              height={project.landscape ? 160 : 310}
              sizes="72px"
              loading="lazy"
              quality={55}
            />
            <span>{String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>

      <p className="theater-hint">Use arrow keys · swipe on touch · tap the screen rail</p>
    </section>
  )
}
