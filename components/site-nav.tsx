"use client"

import { type MouseEvent, useCallback, useEffect, useRef, useState } from "react"
import { ArrowLeft, Command, Grid2X2, Layers3, Menu, MessageCircle, Sparkles, X } from "lucide-react"
import Link from "next/link"
import { TransitionLink } from "@/components/transition-link"

const homeLinks = [
  { href: "#work", label: "Work" },
  { href: "#approach", label: "Approach" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#contact", label: "Contact" },
]

const worldLinks = [
  { href: "#top", label: "Overview" },
  { href: "#screens", label: "Screens" },
  { href: "#system", label: "Case study" },
  { href: "#next-world", label: "Next" },
]

const MOBILE_DOCK_IDLE_MS = 1500

type SiteNavProps = {
  mode?: "home" | "world"
  worldCount?: string
}

export function SiteNav({ mode = "home", worldCount }: SiteNavProps) {
  const links = mode === "world" ? worldLinks : homeLinks
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [navCompact, setNavCompact] = useState(false)
  const [active, setActive] = useState(mode === "world" ? "#top" : "#work")
  const [dockVisible, setDockVisible] = useState(true)
  const scrolledRef = useRef(false)
  const activeRef = useRef(mode === "world" ? "#top" : "#work")
  const dockHideTimer = useRef<number | null>(null)
  const lastDockScrollY = useRef(0)
  const lastDesktopScrollY = useRef(0)

  const wakeDock = useCallback(() => {
    const mobile = window.matchMedia("(max-width: 54rem)").matches
    if (!mobile) {
      setDockVisible(true)
      return
    }

    setDockVisible(true)
    if (dockHideTimer.current !== null) window.clearTimeout(dockHideTimer.current)
    dockHideTimer.current = window.setTimeout(() => {
      const dockHasFocus = document.activeElement?.closest?.(".mobile-dock")
      if (!dockHasFocus) setDockVisible(false)
    }, MOBILE_DOCK_IDLE_MS)
  }, [])

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 54rem)")
    const onActivity = () => wakeDock()
    const onDirectionalScroll = () => {
      if (!mobileQuery.matches) return
      const nextY = Math.max(window.scrollY, 0)
      const delta = nextY - lastDockScrollY.current
      if (Math.abs(delta) < 4) return

      if (delta > 0 && nextY > 16) {
        if (dockHideTimer.current !== null) window.clearTimeout(dockHideTimer.current)
        dockHideTimer.current = null
        setDockVisible(false)
      } else {
        wakeDock()
      }
      lastDockScrollY.current = nextY
    }
    const onVisibilityChange = () => {
      if (!document.hidden) wakeDock()
    }

    lastDockScrollY.current = Math.max(window.scrollY, 0)
    window.addEventListener("scroll", onDirectionalScroll, { passive: true })
    window.addEventListener("touchstart", onActivity, { passive: true })
    window.addEventListener("pointerdown", onActivity, { passive: true })
    window.addEventListener("keydown", onActivity)
    window.addEventListener("focusin", onActivity)
    document.addEventListener("visibilitychange", onVisibilityChange)
    mobileQuery.addEventListener("change", onActivity)
    if (mobileQuery.matches) {
      dockHideTimer.current = window.setTimeout(() => setDockVisible(false), MOBILE_DOCK_IDLE_MS)
    }

    return () => {
      window.removeEventListener("scroll", onDirectionalScroll)
      window.removeEventListener("touchstart", onActivity)
      window.removeEventListener("pointerdown", onActivity)
      window.removeEventListener("keydown", onActivity)
      window.removeEventListener("focusin", onActivity)
      document.removeEventListener("visibilitychange", onVisibilityChange)
      mobileQuery.removeEventListener("change", onActivity)
      if (dockHideTimer.current !== null) window.clearTimeout(dockHideTimer.current)
    }
  }, [wakeDock])

  useEffect(() => {
    const onScroll = () => {
      const nextY = Math.max(window.scrollY, 0)
      const nextScrolled = nextY > 40
      if (nextScrolled === scrolledRef.current) return
      scrolledRef.current = nextScrolled
      setScrolled(nextScrolled)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    let frame = 0
    const updateActive = () => {
      frame = 0
      const mobile = window.matchMedia("(max-width: 54rem)").matches
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      let current = links[0].href

      for (const link of links) {
        const href = mobile && link.href === "#work" ? "#mobile-work" : link.href
        const section = document.querySelector(href)
        if (!section) continue

        const rect = section.getBoundingClientRect()
        const threshold = link.href === "#next-world" ? viewportHeight * 0.78 : viewportHeight * 0.52
        if (rect.top <= threshold && rect.bottom > viewportHeight * 0.08) current = link.href
      }

      if (current !== activeRef.current) {
        activeRef.current = current
        setActive(current)
      }
    }
    const trackSection = () => { if (!frame) frame = requestAnimationFrame(updateActive) }
    window.addEventListener("scroll", trackSection, { passive: true })
    window.addEventListener("resize", trackSection)
    updateActive()

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("scroll", trackSection)
      window.removeEventListener("resize", trackSection)
      cancelAnimationFrame(frame)
    }
  }, [links])

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 54.01rem)")
    let frame = 0

    const updateNavShape = () => {
      frame = 0

      if (!desktopQuery.matches) {
        setNavCompact(false)
        lastDesktopScrollY.current = Math.max(window.scrollY, 0)
        return
      }

      const nextY = Math.max(window.scrollY, 0)
      const delta = nextY - lastDesktopScrollY.current

      if (nextY <= 56) {
        setNavCompact(false)
      } else if (Math.abs(delta) >= 10) {
        setNavCompact(delta > 0)
      }

      lastDesktopScrollY.current = nextY
    }

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateNavShape)
    }

    lastDesktopScrollY.current = Math.max(window.scrollY, 0)
    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    desktopQuery.addEventListener("change", scheduleUpdate)
    updateNavShape()

    return () => {
      window.removeEventListener("scroll", scheduleUpdate)
      desktopQuery.removeEventListener("change", scheduleUpdate)
      cancelAnimationFrame(frame)
    }
  }, [])

  const openCommands = () => {
    setOpen(false)
    window.dispatchEvent(new Event("portfolio:command"))
  }
  const handleDockClick = (event: MouseEvent<HTMLAnchorElement>, linkHref: string) => {
    const mobile = window.matchMedia("(max-width: 54rem)").matches
    if (!mobile) return
    wakeDock()

    const targetHref = linkHref === "#work" ? "#mobile-work" : linkHref
    const target = document.querySelector<HTMLElement>(targetHref)
    if (!target) return

    event.preventDefault()
    setOpen(false)
    activeRef.current = linkHref
    setActive(linkHref)

    const rect = target.getBoundingClientRect()
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight
    const dockClearance = 104
    const topInset = 18
    const targetTop = window.scrollY + rect.top
    const centeredOffset = Math.max(topInset, Math.round((viewportHeight - Math.min(rect.height, viewportHeight - dockClearance)) / 2))
    const nextY = Math.max(0, Math.round(targetTop - centeredOffset))

    window.scrollTo({ top: nextY, behavior: "smooth" })
    history.replaceState(null, "", targetHref)
  }


  return (
    <header className="site-header" data-scrolled={scrolled} data-compact={navCompact} data-mode={mode}>
      <Link className="monogram" href={mode === "world" ? "/" : "#top"} aria-label="Ahmed Saaied, home">
        AS<span>.</span>
      </Link>

      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map((link) => (
          <a key={link.href} href={link.href} data-active={active === link.href} aria-current={active === link.href ? "location" : undefined}>
            {link.label}
          </a>
        ))}
        {mode === "home" && (
          <TransitionLink className="resume-nav-link" href="/resume" data-cursor="Resume" data-analytics-event="resume_opened" data-analytics-source="navigation">Resume</TransitionLink>
        )}
        {mode === "home" && (
          <button type="button" className="command-launch" onClick={openCommands} aria-label="Open command center">
            <Command aria-hidden="true" />
            <span>Ctrl K</span>
          </button>
        )}
      </nav>

      <div className="nav-signal" aria-hidden={!navCompact}>
        <span className="nav-signal-index">{String(links.findIndex((link) => link.href === active) + 1).padStart(2, "0")}</span>
        <strong>{links.find((link) => link.href === active)?.label ?? links[0].label}</strong>
        <span className="nav-signal-track" aria-hidden="true">
          <i style={{ width: `${((links.findIndex((link) => link.href === active) + 1) / links.length) * 100}%` }} />
        </span>
        {mode === "home" ? (
          <button type="button" onClick={openCommands} aria-label="Open command center">
            <Command aria-hidden="true" />
          </button>
        ) : (
          <Link href="/#work" aria-label="Return to all work">
            <ArrowLeft aria-hidden="true" />
          </Link>
        )}
      </div>

      {mode === "world" ? (
        <Link className="world-nav-return" href="/#work" data-cursor="All projects">
          <ArrowLeft aria-hidden="true" />
          <span>All work</span>
          {worldCount && <small>{worldCount}</small>}
        </Link>
      ) : (
        <a className="availability" href="mailto:ahmedsaaiedd@gmail.com" data-magnetic data-cursor="Connect" data-analytics-event="contact_clicked" data-analytics-source="navigation">
          <span /> Available for work
        </a>
      )}

      <button
        className="menu-button"
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <Menu />}
      </button>

      <nav className="mobile-nav" data-open={open} aria-label="Mobile navigation">
        {mode === "world" && (
          <Link href="/#work" onClick={() => setOpen(false)}>
            <span>←</span>
            All work
          </Link>
        )}
        {links.map((link, index) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            <span>0{index + 1}</span>
            {link.label}
          </a>
        ))}
        {mode === "home" && (
          <TransitionLink href="/resume" onClick={() => setOpen(false)} data-analytics-event="resume_opened" data-analytics-source="mobile_menu">
            <span>05</span>
            Resume
          </TransitionLink>
        )}
        {mode === "home" && (
          <button type="button" onClick={openCommands}>
            <span>⌘K</span>
            Quick command
          </button>
        )}
      </nav>

      <nav className="mobile-dock" data-visible={dockVisible} aria-label="Mobile primary navigation">
          {links.map((link, index) => {
            const Icon = [Grid2X2, Sparkles, Layers3, MessageCircle][index]
            return <a key={link.href} href={link.href === "#work" ? "#mobile-work" : link.href}
              data-active={active === link.href} aria-current={active === link.href ? "location" : undefined}
              onClick={(event) => handleDockClick(event, link.href)}>
              <Icon aria-hidden="true" /><span>{link.label === "Capabilities" ? "Skills" : link.label === "Case study" ? "Case" : link.label}</span>
            </a>
          })}
      </nav>
      <button
        className="mobile-dock-handle"
        type="button"
        data-visible={!dockVisible}
        aria-label="Show navigation"
        aria-hidden={dockVisible}
        tabIndex={dockVisible ? -1 : 0}
        onClick={wakeDock}
      >
        <span />
      </button>
    </header>
  )
}
