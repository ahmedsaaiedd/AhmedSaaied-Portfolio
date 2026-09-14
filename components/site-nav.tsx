"use client"

import { type MouseEvent, useEffect, useRef, useState } from "react"
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
  { href: "#system", label: "System" },
  { href: "#next-world", label: "Next" },
]

type SiteNavProps = {
  mode?: "home" | "world"
  worldCount?: string
}

export function SiteNav({ mode = "home", worldCount }: SiteNavProps) {
  const links = mode === "world" ? worldLinks : homeLinks
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState(mode === "world" ? "#top" : "#work")
  const scrolledRef = useRef(false)
  const activeRef = useRef(mode === "world" ? "#top" : "#work")

  useEffect(() => {
    const onScroll = () => {
      const nextScrolled = window.scrollY > 40
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

  const openCommands = () => {
    setOpen(false)
    window.dispatchEvent(new Event("portfolio:command"))
  }
  const handleDockClick = (event: MouseEvent<HTMLAnchorElement>, linkHref: string) => {
    const mobile = window.matchMedia("(max-width: 54rem)").matches
    if (!mobile) return

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
    <header className="site-header" data-scrolled={scrolled} data-mode={mode}>
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
          <TransitionLink className="resume-nav-link" href="/resume" data-cursor="Resume">Resume</TransitionLink>
        )}
        {mode === "home" && (
          <button type="button" className="command-launch" onClick={openCommands} aria-label="Open command center">
            <Command aria-hidden="true" />
            <span>Ctrl K</span>
          </button>
        )}
      </nav>

      {mode === "world" ? (
        <Link className="world-nav-return" href="/#work" data-cursor="All projects">
          <ArrowLeft aria-hidden="true" />
          <span>All work</span>
          {worldCount && <small>{worldCount}</small>}
        </Link>
      ) : (
        <a className="availability" href="mailto:ahmedsaaied117@gmail.com" data-magnetic data-cursor="Connect">
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
          <TransitionLink href="/resume" onClick={() => setOpen(false)}>
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

      <nav className="mobile-dock" aria-label="Mobile primary navigation">
          {links.map((link, index) => {
            const Icon = [Grid2X2, Sparkles, Layers3, MessageCircle][index]
            return <a key={link.href} href={link.href === "#work" ? "#mobile-work" : link.href}
              data-active={active === link.href} aria-current={active === link.href ? "location" : undefined}
              onClick={(event) => handleDockClick(event, link.href)}>
              <Icon aria-hidden="true" /><span>{link.label === "Capabilities" ? "Skills" : link.label}</span>
            </a>
          })}
        </nav>
    </header>
  )
}
