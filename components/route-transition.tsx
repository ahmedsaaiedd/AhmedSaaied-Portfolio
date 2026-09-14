"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

export function RouteTransition() {
  const pathname = usePathname()
  const previousPath = useRef(pathname)

  useEffect(() => {
    if (pathname === previousPath.current) return
    previousPath.current = pathname

    const root = document.documentElement
    root.dataset.routeTransition = "arriving"
    const timer = window.setTimeout(() => delete root.dataset.routeTransition, 620)
    return () => window.clearTimeout(timer)
  }, [pathname])

  return (
    <div className="route-transition" aria-hidden="true">
      <span>AS<i>.</i></span>
      <small>Changing perspective</small>
    </div>
  )
}
