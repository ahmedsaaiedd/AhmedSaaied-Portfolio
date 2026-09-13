"use client"

import { useEffect, useRef, useState } from "react"

type MetricCounterProps = {
  value: number
  label: string
  delay?: number
}

export function MetricCounter({ value, label, delay = 0 }: MetricCounterProps) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    let frame = 0
    let timeout = 0
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()

      if (reducedMotion) {
        setDisplay(value)
        return
      }

      timeout = window.setTimeout(() => {
        const started = performance.now()
        let lastValue = -1
        const tick = (now: number) => {
          const progress = Math.min((now - started) / 900, 1)
          const eased = 1 - Math.pow(1 - progress, 4)
          const nextValue = Math.round(value * eased)
          if (nextValue !== lastValue) {
            lastValue = nextValue
            setDisplay(nextValue)
          }
          if (progress < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      }, delay)
    }, { threshold: 0.6 })

    observer.observe(node)
    return () => {
      observer.disconnect()
      window.clearTimeout(timeout)
      cancelAnimationFrame(frame)
    }
  }, [delay, value])

  return (
    <span ref={ref} className="hero-metric">
      <strong>{String(display).padStart(2, "0")}</strong>
      <span>{label}</span>
    </span>
  )
}
