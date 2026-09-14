import { ArrowUpRight, FileText, Link as LinkIcon, Mail } from "lucide-react"

import { Reveal } from "@/components/reveal"
import { TransitionLink } from "@/components/transition-link"

export function CinematicEnding() {
  return (
    <section className="cinematic-ending" id="contact" aria-labelledby="ending-title">
      <div className="ending-grid" aria-hidden="true" />
      <div className="ending-universe" aria-hidden="true">
        <span data-world="01">XI</span>
        <span data-world="02">HD</span>
        <span data-world="03">P</span>
        <span data-world="04">be</span>
        <span data-world="05">S</span>
        <i />
      </div>
      <div className="section-shell ending-inner">
        <Reveal>
          <span className="section-kicker">04 / Start the next system</span>
          <h2 id="ending-title">
            <span>Have a difficult product?</span>
            <em>Let&apos;s make it feel obvious.</em>
          </h2>
          <p>
            Bring the complicated workflow, the unfinished idea, or the product that needs to feel calmer. I&apos;ll help shape the system and build the experience around it.
          </p>
          <div className="ending-actions">
            <a href="mailto:ahmedsaaied117@gmail.com" data-magnetic data-cursor="Send mail">
              <Mail aria-hidden="true" /> Start a conversation <ArrowUpRight aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/in/ahmed-saaied-904a23372" target="_blank" rel="noreferrer" data-cursor="LinkedIn">
              <LinkIcon aria-hidden="true" /> LinkedIn
            </a>
            <TransitionLink href="/resume" data-cursor="Resume">
              <FileText aria-hidden="true" /> Resume <ArrowUpRight aria-hidden="true" />
            </TransitionLink>
          </div>
        </Reveal>
        <div className="ending-mark" aria-hidden="true"><span>AS</span><i>.</i></div>
        <div className="ending-status" aria-hidden="true"><i /> Cairo · available for selected work</div>
      </div>
    </section>
  )
}
