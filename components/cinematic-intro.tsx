"use client"

import { useCallback, useLayoutEffect, useRef, useState } from "react"

const INTRO_KEY = "ahmed-portfolio-cinematic-intro-v2"

export function CinematicIntro() {
  const [visible, setVisible] = useState(true)
  const [leaving, setLeaving] = useState(false)
  const timers = useRef<number[]>([])

  const complete = useCallback(() => {
    window.scrollTo(0, 0)
    document.documentElement.removeAttribute("data-intro")
    window.sessionStorage.setItem(INTRO_KEY, "seen")
    setVisible(false)
    window.requestAnimationFrame(() => window.scrollTo(0, 0))
  }, [])

  const dismiss = useCallback(() => {
    setLeaving(true)
    timers.current.forEach(window.clearTimeout)
    timers.current = [window.setTimeout(complete, 420)]
  }, [complete])

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const alreadySeen = window.sessionStorage.getItem(INTRO_KEY) === "seen"

    if (window.location.hash) {
      // Preserve deep links and the return-to-work destination.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(false)
      document.documentElement.removeAttribute("data-intro")
      return
    }
    window.scrollTo(0, 0)

    if (reducedMotion || alreadySeen) {
      // The layout effect keeps repeat visits from flashing the full-screen intro.
      setVisible(false)
      const topFrame = window.requestAnimationFrame(() => window.scrollTo(0, 0))
      return () => window.cancelAnimationFrame(topFrame)
    }

    document.documentElement.dataset.intro = "active"
    const openingFrame = window.requestAnimationFrame(() => window.scrollTo(0, 0))
    timers.current = [
      window.setTimeout(() => setLeaving(true), 1850),
      window.setTimeout(complete, 2350),
    ]

    return () => {
      window.cancelAnimationFrame(openingFrame)
      timers.current.forEach(window.clearTimeout)
      document.documentElement.removeAttribute("data-intro")
    }
  }, [complete])

  if (!visible) return null

  return (
    <div className="intro-sequence" data-leaving={leaving} aria-label="Opening Ahmed Saaied portfolio">
      <div className="intro-grid" aria-hidden="true" />
      <div className="intro-scan" aria-hidden="true" />
      <div className="intro-corner intro-corner-a" aria-hidden="true">01 / 04</div>
      <div className="intro-corner intro-corner-b" aria-hidden="true">CAIRO · 30.0444° N</div>

      <div className="intro-center">
        <div className="intro-mark" aria-hidden="true">
          <span>A</span><span>S</span><i>.</i>
        </div>
        <div className="intro-status">
          <span>Product systems online</span>
          <strong>Design ↔ Engineering</strong>
        </div>
        <div className="intro-loader" aria-hidden="true"><span /></div>
      </div>

      <button type="button" className="intro-skip" onClick={dismiss}>
        Skip intro
      </button>
    </div>
  )
}
