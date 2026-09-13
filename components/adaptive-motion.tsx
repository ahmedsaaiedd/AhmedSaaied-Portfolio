"use client"

import { useEffect } from "react"

type AdaptiveNavigator = Navigator & {
  deviceMemory?: number
  connection?: {
    saveData?: boolean
    effectiveType?: string
  }
}

export function AdaptiveMotion() {
  useEffect(() => {
    const root = document.documentElement
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const coarseQuery = window.matchMedia("(pointer: coarse)")
    const applyProfile = () => {
      const navigatorInfo = navigator as AdaptiveNavigator
      const reduced = reducedQuery.matches
      const touch = coarseQuery.matches
      const lowMemory = typeof navigatorInfo.deviceMemory === "number" && navigatorInfo.deviceMemory <= 4
      const lowCores = typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4
      const constrainedNetwork = navigatorInfo.connection?.saveData === true || navigatorInfo.connection?.effectiveType === "2g"

      const motion = reduced
        ? "reduced"
        : lowMemory || lowCores || constrainedNetwork
          ? "balanced"
          : "full"

      root.dataset.motion = motion
      root.dataset.input = touch ? "touch" : "pointer"
    }

    const sceneState = new Map<Element, boolean>()
    const resolveScene = () => {
      if (document.querySelector(".project-world-page")) {
        root.dataset.scene = "world"
        return
      }

      const work = document.querySelector(".project-list")
      const hero = document.querySelector(".hero")
      root.dataset.scene = work && sceneState.get(work)
        ? "work"
        : hero && sceneState.get(hero)
          ? "hero"
          : "content"
    }

    const sceneObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => sceneState.set(entry.target, entry.isIntersecting))
        resolveScene()
      },
      { threshold: 0, rootMargin: "-18% 0px -18%" },
    )

    const hero = document.querySelector(".hero")
    const work = document.querySelector(".project-list")
    if (hero) sceneObserver.observe(hero)
    if (work) sceneObserver.observe(work)
    resolveScene()

    const onVisibilityChange = () => {
      root.dataset.pageVisible = document.hidden ? "false" : "true"
    }

    applyProfile()
    onVisibilityChange()
    reducedQuery.addEventListener("change", applyProfile)
    coarseQuery.addEventListener("change", applyProfile)
    document.addEventListener("visibilitychange", onVisibilityChange)

    return () => {
      sceneObserver.disconnect()
      reducedQuery.removeEventListener("change", applyProfile)
      coarseQuery.removeEventListener("change", applyProfile)
      document.removeEventListener("visibilitychange", onVisibilityChange)
      delete root.dataset.scene
      delete root.dataset.pageVisible
    }
  }, [])

  return null
}
