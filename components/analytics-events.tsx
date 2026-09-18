"use client"

import { useEffect } from "react"
import { track } from "@vercel/analytics"

export function AnalyticsEvents() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const element = target.closest<HTMLElement>("[data-analytics-event]")
      const eventName = element?.dataset.analyticsEvent
      if (!element || !eventName) return
      const properties = Object.fromEntries(
        Object.entries(element.dataset)
          .filter(([key, value]) => key.startsWith("analytics") && key !== "analyticsEvent" && value)
          .map(([key, value]) => [key.replace(/^analytics/, "").replace(/^./, (letter) => letter.toLowerCase()), value!]),
      )
      track(eventName, properties)
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])
  return null
}
