"use client"

import { useEffect, useRef } from "react"

export function AmbientEffects() {
  const pointerHalo = useRef<HTMLDivElement>(null)
  const scrollProgress = useRef<HTMLDivElement>(null)
  const cursorRing = useRef<HTMLDivElement>(null)
  const cursorDot = useRef<HTMLDivElement>(null)
  const cursorLabel = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = document.documentElement
    const motionScenes = document.querySelectorAll<HTMLElement>(".product-universe, .project-portal, .hero-atmosphere, .mobile-project-scene")
    const visibilityObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        (entry.target as HTMLElement).dataset.motionVisible = String(entry.isIntersecting)
      }
    }, { rootMargin: "120px", threshold: 0 })
    motionScenes.forEach((scene) => visibilityObserver.observe(scene))
    const finePointer = window.matchMedia("(pointer: fine)").matches
    const hero = document.querySelector<HTMLElement>(".hero")
    const heroCopy = hero?.querySelector<HTMLElement>(".hero-copy") ?? null
    const heroStage = hero?.querySelector<HTMLElement>(".hero-stage-scroll") ?? null
    let scrollFrame = 0
    let cursorFrame = 0
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let ringX = targetX
    let ringY = targetY
    let haloX = targetX
    let haloY = targetY
    let heroDistance = window.innerHeight
    let activeMagnetic: HTMLElement | null = null
    let magneticRect: DOMRect | null = null
    let currentCursorLabel = ""
    let activeWorld = ""
    let activeCard: HTMLElement | null = null
    let auraEngaged = false
    let pointerVisible = false
    let wheelAccumulator = 0
    let wheelDirection = 0
    let wheelGestureConsumed = false
    let wheelGestureTimer = 0
    let lastWheelAt = 0
    let lastWheelMagnitude = 0
    let snapLockedUntil = 0
    let snapReleaseTimer = 0
    let lastScrollProgress = -1
    let lastHeroProgress = -1

    const measure = () => {
      heroDistance = hero ? Math.max(hero.offsetHeight * 0.78, 1) : window.innerHeight
      magneticRect = null
    }

    const animateCursor = () => {
      ringX += (targetX - ringX) * 0.34
      ringY += (targetY - ringY) * 0.34
      haloX += (targetX - haloX) * 0.16
      haloY += (targetY - haloY) * 0.16

      cursorRing.current?.style.setProperty("transform", `translate3d(${ringX}px, ${ringY}px, 0)`)
      pointerHalo.current?.style.setProperty("transform", `translate3d(${haloX}px, ${haloY}px, 0)`)
      cursorDot.current?.style.setProperty("transform", `translate3d(${targetX}px, ${targetY}px, 0)`)

      if (activeMagnetic && magneticRect) {
        const x = (targetX - (magneticRect.left + magneticRect.width / 2)) * 0.13
        const y = (targetY - (magneticRect.top + magneticRect.height / 2)) * 0.16
        activeMagnetic.style.setProperty("--magnetic-x", `${x}px`)
        activeMagnetic.style.setProperty("--magnetic-y", `${y}px`)
      }

      const ringSettled = Math.abs(targetX - ringX) < 0.12 && Math.abs(targetY - ringY) < 0.12
      const haloSettled = Math.abs(targetX - haloX) < 0.12 && Math.abs(targetY - haloY) < 0.12

      if (ringSettled && haloSettled) {
        ringX = haloX = targetX
        ringY = haloY = targetY
        cursorRing.current?.style.setProperty("transform", `translate3d(${targetX}px, ${targetY}px, 0)`)
        pointerHalo.current?.style.setProperty("transform", `translate3d(${targetX}px, ${targetY}px, 0)`)
        cursorFrame = 0
        return
      }

      cursorFrame = requestAnimationFrame(animateCursor)
    }

    const requestCursorFrame = () => {
      if (!finePointer || cursorFrame) return
      cursorFrame = requestAnimationFrame(animateCursor)
    }

    const updatePointer = (event: PointerEvent) => {
      if (!finePointer || event.pointerType === "touch") return
      targetX = event.clientX
      targetY = event.clientY
      if (!pointerVisible) {
        pointerVisible = true
        root.dataset.pointer = "visible"
      }
      requestCursorFrame()

      const target = event.target instanceof Element ? event.target : null
      const cursorTarget = target?.closest<HTMLElement>("[data-cursor]") ?? null
      const nextMagnetic = target?.closest<HTMLElement>("[data-magnetic]") ?? null
      const label = cursorTarget?.dataset.cursor ?? ""

      if (label !== currentCursorLabel && cursorRing.current && cursorLabel.current) {
        currentCursorLabel = label
        cursorRing.current.dataset.active = label ? "true" : "false"
        cursorLabel.current.textContent = label
      }

      if (activeMagnetic !== nextMagnetic) {
        if (activeMagnetic) {
          activeMagnetic.style.setProperty("--magnetic-x", "0px")
          activeMagnetic.style.setProperty("--magnetic-y", "0px")
        }
        activeMagnetic = nextMagnetic
        magneticRect = activeMagnetic?.getBoundingClientRect() ?? null
      }
      if (activeMagnetic && !magneticRect) {
        magneticRect = activeMagnetic.getBoundingClientRect()
      }

    }

    const renderScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0
      const heroProgress = Math.min(Math.max(window.scrollY / heroDistance, 0), 1)

      if (Math.abs(progress - lastScrollProgress) > 0.0005) {
        scrollProgress.current?.style.setProperty("transform", `scaleX(${progress})`)
        lastScrollProgress = progress
      }

      if (hero && Math.abs(heroProgress - lastHeroProgress) > 0.001) {
        // Keep the hot scroll variable off the full hero subtree. Updating only
        // the two composited layers avoids invalidating the product universe.
        heroCopy?.style.setProperty("--hero-scroll", `${heroProgress}`)
        heroStage?.style.setProperty("--hero-scroll", `${heroProgress}`)
        lastHeroProgress = heroProgress
      }
      scrollFrame = 0
    }

    const requestScrollFrame = () => {
      if (scrollFrame || document.hidden) return
      scrollFrame = requestAnimationFrame(renderScroll)
    }

    const onResize = () => {
      measure()
      requestScrollFrame()
    }

    const hidePointer = () => {
      pointerVisible = false
      root.dataset.pointer = "hidden"
      if (activeMagnetic) {
        activeMagnetic.style.setProperty("--magnetic-x", "0px")
        activeMagnetic.style.setProperty("--magnetic-y", "0px")
        activeMagnetic = null
        magneticRect = null
      }
    }

    const workSection = document.querySelector<HTMLElement>("#work")
    const projectList = workSection?.querySelector<HTMLElement>(".project-list") ?? null
    const approachSection = document.querySelector<HTMLElement>("#approach")
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".project-card[data-project-world]"))
    const ratios = new Map<Element, number>()
    const projectRailQuery = window.matchMedia("(pointer: fine) and (min-width: 54.0625rem)")

    const applyWorld = (card: HTMLElement) => {
      const nextWorld = card.dataset.projectWorld ?? ""
      if (!nextWorld || nextWorld === activeWorld) return

      activeWorld = nextWorld
      root.style.setProperty("--world-accent", card.dataset.worldAccent ?? "#d8ff45")
      root.style.setProperty("--world-soft", card.dataset.worldSoft ?? "rgba(216,255,69,.12)")
      root.dataset.auraProject = nextWorld
      document.body.dataset.world = nextWorld
      workSection?.setAttribute("data-aura-project", nextWorld)
      if (activeCard && activeCard !== card) activeCard.dataset.auraActive = "false"
      card.dataset.auraActive = "true"
      activeCard = card
    }

    const setAuraEngaged = (engaged: boolean) => {
      if (auraEngaged === engaged) return
      auraEngaged = engaged
      root.dataset.projectAura = engaged ? "active" : "idle"
      workSection?.setAttribute("data-aura-engaged", engaged ? "true" : "false")

      if (engaged) {
        const visibleCard = cards.reduce<HTMLElement | null>((best, candidate) => {
          if (!best) return (ratios.get(candidate) ?? 0) > 0 ? candidate : null
          return (ratios.get(candidate) ?? 0) > (ratios.get(best) ?? 0) ? candidate : best
        }, null)
        if (visibleCard) applyWorld(visibleCard)
        return
      }

      root.style.setProperty("--world-accent", "#d8ff45")
      root.style.setProperty("--world-soft", "rgba(216,255,69,.12)")
      delete root.dataset.auraProject
      delete root.dataset.railSnapping
      delete document.body.dataset.world
      workSection?.removeAttribute("data-aura-project")
      workSection?.removeAttribute("data-rail-snapping")
      if (activeCard) delete activeCard.dataset.auraActive
      activeCard = null
      wheelAccumulator = 0
      wheelDirection = 0
      activeWorld = ""
    }

    const releaseProjectRail = () => {
      delete root.dataset.railSnapping
      workSection?.removeAttribute("data-rail-snapping")
      snapReleaseTimer = 0

      if (!auraEngaged || cards.length === 0) return
      const viewportCenter = window.innerHeight / 2
      const settledCard = cards.reduce((best, candidate) => {
        const candidateRect = candidate.getBoundingClientRect()
        const bestRect = best.getBoundingClientRect()
        const candidateDistance = Math.abs(candidateRect.top + candidateRect.height / 2 - viewportCenter)
        const bestDistance = Math.abs(bestRect.top + bestRect.height / 2 - viewportCenter)
        return candidateDistance < bestDistance ? candidate : best
      }, cards[0])
      applyWorld(settledCard)
    }

    const releaseWheelGesture = () => {
      wheelGestureConsumed = false
      wheelAccumulator = 0
      wheelDirection = 0
      lastWheelMagnitude = 0
      wheelGestureTimer = 0
    }

    const onProjectWheel = (event: WheelEvent) => {
      if (
        !workSection ||
        cards.length === 0 ||
        !projectRailQuery.matches ||
        !auraEngaged ||
        root.dataset.motion === "reduced" ||
        root.dataset.intro === "active" ||
        event.ctrlKey ||
        event.defaultPrevented
      ) return

      const deltaMultiplier = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1
      const delta = event.deltaY * deltaMultiplier
      if (Math.abs(delta) <= Math.abs(event.deltaX) || Math.abs(delta) < 0.5) return

      const firstRect = cards[0].getBoundingClientRect()
      const lastRect = cards[cards.length - 1].getBoundingClientRect()
      const insideRail = firstRect.top < window.innerHeight * 0.82 && lastRect.bottom > window.innerHeight * 0.18
      if (!insideRail) return

      const now = performance.now()
      const magnitude = Math.abs(delta)
      const startedAfterQuiet = now - lastWheelAt > 130
      const renewedIntent = wheelGestureConsumed
        && now >= snapLockedUntil
        && magnitude >= 10
        && magnitude > lastWheelMagnitude * 1.65

      // A fresh gesture either follows a short quiet gap or arrives as a clear
      // acceleration spike above the decaying touchpad momentum tail.
      if (startedAfterQuiet || renewedIntent) {
        wheelGestureConsumed = false
        wheelAccumulator = 0
        wheelDirection = 0
      }

      lastWheelAt = now
      lastWheelMagnitude = magnitude
      window.clearTimeout(wheelGestureTimer)
      wheelGestureTimer = window.setTimeout(releaseWheelGesture, 220)

      if (wheelGestureConsumed) {
        event.preventDefault()
        return
      }

      if (now < snapLockedUntil) {
        event.preventDefault()
        return
      }

      const direction = delta > 0 ? 1 : -1
      if (direction !== wheelDirection) {
        wheelAccumulator = 0
        wheelDirection = direction
      }

      const viewportCenter = window.innerHeight / 2
      const rects = cards.map((card) => card.getBoundingClientRect())
      const nearestIndex = rects.reduce((bestIndex, rect, index) => {
        const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter)
        const bestRect = rects[bestIndex]
        const bestDistance = Math.abs(bestRect.top + bestRect.height / 2 - viewportCenter)
        return distance < bestDistance ? index : bestIndex
      }, 0)
      const nearestCenter = rects[nearestIndex].top + rects[nearestIndex].height / 2

      let targetIndex = nearestIndex + direction
      if (direction > 0 && nearestCenter > viewportCenter + window.innerHeight * 0.12) targetIndex = nearestIndex
      if (direction < 0 && nearestCenter < viewportCenter - window.innerHeight * 0.12) targetIndex = nearestIndex

      const edgeTarget = targetIndex < 0 && direction < 0
        ? hero
        : targetIndex >= cards.length && direction > 0
          ? approachSection
          : null

      if ((targetIndex < 0 || targetIndex >= cards.length) && !edgeTarget) {
        wheelAccumulator = 0
        wheelDirection = 0
        return
      }

      event.preventDefault()
      wheelAccumulator += delta
      if (Math.abs(wheelAccumulator) < 24) return

      wheelAccumulator = 0
      wheelDirection = 0
      wheelGestureConsumed = true
      snapLockedUntil = now + 760
      root.dataset.railSnapping = "true"
      workSection.dataset.railSnapping = "true"
      window.clearTimeout(snapReleaseTimer)
      snapReleaseTimer = window.setTimeout(releaseProjectRail, 780)

      const targetCard = targetIndex >= 0 && targetIndex < cards.length ? cards[targetIndex] : null
      if (targetCard) applyWorld(targetCard)
      const scrollTarget = targetCard ?? edgeTarget
      scrollTarget?.scrollIntoView({
        behavior: root.dataset.motion === "reduced" ? "auto" : "smooth",
        block: targetCard ? "center" : "start",
      })
    }

    const worldObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => ratios.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0))
        const card = cards.reduce<HTMLElement | null>((best, candidate) => {
          if (!best) return (ratios.get(candidate) ?? 0) > 0 ? candidate : null
          return (ratios.get(candidate) ?? 0) > (ratios.get(best) ?? 0) ? candidate : best
        }, null)
        if (card && auraEngaged && performance.now() >= snapLockedUntil) applyWorld(card)
      },
      { threshold: [0, 0.18, 0.36, 0.54, 0.72], rootMargin: "-18% 0px -18%" },
    )

    const sectionObserver = new IntersectionObserver(
      ([entry]) => setAuraEngaged(Boolean(entry?.isIntersecting)),
      { threshold: 0, rootMargin: "-8% 0px -55%" },
    )

    cards.forEach((card) => worldObserver.observe(card))
    if (projectList) sectionObserver.observe(projectList)
    measure()
    renderScroll()
    if (finePointer) {
      cursorRing.current?.style.setProperty("transform", `translate3d(${ringX}px, ${ringY}px, 0)`)
      pointerHalo.current?.style.setProperty("transform", `translate3d(${haloX}px, ${haloY}px, 0)`)
      cursorDot.current?.style.setProperty("transform", `translate3d(${targetX}px, ${targetY}px, 0)`)
    }

    if (finePointer) {
      window.addEventListener("pointermove", updatePointer, { passive: true })
      document.documentElement.addEventListener("mouseleave", hidePointer)
    }
    window.addEventListener("scroll", requestScrollFrame, { passive: true })
    window.addEventListener("resize", onResize, { passive: true })
    if (projectRailQuery.matches) {
      window.addEventListener("wheel", onProjectWheel, { passive: false })
    }

    return () => {
      cancelAnimationFrame(scrollFrame)
      cancelAnimationFrame(cursorFrame)
      window.clearTimeout(snapReleaseTimer)
      window.clearTimeout(wheelGestureTimer)
      worldObserver.disconnect()
      sectionObserver.disconnect()
      setAuraEngaged(false)
      if (finePointer) {
        window.removeEventListener("pointermove", updatePointer)
        document.documentElement.removeEventListener("mouseleave", hidePointer)
      }
      window.removeEventListener("scroll", requestScrollFrame)
      window.removeEventListener("resize", onResize)
      visibilityObserver.disconnect()
      if (projectRailQuery.matches) {
        window.removeEventListener("wheel", onProjectWheel)
      }
    }
  }, [])

  return (
    <>
      <div className="world-ambient" aria-hidden="true" />
      <div ref={pointerHalo} className="pointer-halo" aria-hidden="true" />
      <div ref={scrollProgress} className="scroll-progress" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
      <div ref={cursorRing} className="cursor-ring" aria-hidden="true"><span ref={cursorLabel} /></div>
      <div ref={cursorDot} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
