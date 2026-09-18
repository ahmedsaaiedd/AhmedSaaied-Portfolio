"use client"

import { useEffect, useState } from "react"
import {
  ArrowUp,
  Braces,
  Check,
  Copy,
  ExternalLink,
  Layers3,
  Mail,
  Workflow,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

const sections = [
  { label: "Selected work", target: "#work", icon: Layers3, shortcut: "01" },
  { label: "Approach", target: "#approach", icon: Workflow, shortcut: "02" },
  { label: "Capabilities", target: "#capabilities", icon: Braces, shortcut: "03" },
  { label: "Contact", target: "#contact", icon: Mail, shortcut: "04" },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    const onOpen = () => setOpen(true)

    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("portfolio:command", onOpen)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("portfolio:command", onOpen)
    }
  }, [])

  const navigate = (target: string) => {
    setOpen(false)
    window.setTimeout(() => document.querySelector(target)?.scrollIntoView({ behavior: "smooth" }), 80)
  }

  const copyEmail = async () => {
    await navigator.clipboard.writeText("ahmedsaaiedd@gmail.com")
    setCopied(true)
    window.setTimeout(() => {
      setCopied(false)
      setOpen(false)
    }, 700)
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      className="command-palette"
      title="Ahmed Saaied command center"
      description="Navigate the portfolio or start a conversation"
    >
      <div className="command-brand">
        <span>AS<span>.</span></span>
        <small>Command center</small>
      </div>
      <CommandInput placeholder="Type a destination or action…" />
      <CommandList>
        <CommandEmpty>No command found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          {sections.map(({ label, target, icon: Icon, shortcut }) => (
            <CommandItem key={target} value={label} onSelect={() => navigate(target)}>
              <Icon />
              <span>{label}</span>
              <CommandShortcut>{shortcut}</CommandShortcut>
            </CommandItem>
          ))}
          <CommandItem value="Back to top" onSelect={() => navigate("#top")}>
            <ArrowUp />
            <span>Back to top</span>
            <CommandShortcut>00</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Connect">
          <CommandItem value="Copy email" onSelect={copyEmail}>
            {copied ? <Check /> : <Copy />}
            <span>{copied ? "Email copied" : "Copy email address"}</span>
          </CommandItem>
          <CommandItem
            value="Open LinkedIn"
            onSelect={() => window.open("https://www.linkedin.com/in/ahmed-saaied-904a23372", "_blank", "noopener,noreferrer")}
          >
            <ExternalLink />
            <span>Open LinkedIn</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
      <div className="command-footer">
        <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
        <span><kbd>↵</kbd> Select</span>
        <span><kbd>esc</kbd> Close</span>
      </div>
    </CommandDialog>
  )
}
