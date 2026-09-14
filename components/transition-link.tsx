"use client"

import type { ComponentProps, MouseEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

type TransitionLinkProps = ComponentProps<typeof Link>

export function TransitionLink({ href, onClick, ...props }: TransitionLinkProps) {
  const router = useRouter()

  const navigate = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target === "_blank" ||
      typeof href !== "string" ||
      href.startsWith("#")
    ) return

    event.preventDefault()
    document.documentElement.dataset.routeTransition = "leaving"
    window.setTimeout(() => router.push(href), 460)
  }

  return <Link href={href} onClick={navigate} {...props} />
}
