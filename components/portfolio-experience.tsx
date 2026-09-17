import { ArrowDownRight, ArrowRight, MapPin } from "lucide-react"
import type { CSSProperties } from "react"

import { AmbientEffects } from "@/components/ambient-effects"
import { ApproachLens } from "@/components/approach-lens"
import { CapabilityAtlas } from "@/components/capability-atlas"
import { CinematicIntro } from "@/components/cinematic-intro"
import { CommandPalette } from "@/components/command-palette"
import { CinematicEnding } from "@/components/cinematic-ending"
import { HeroStage } from "@/components/hero-stage"
import { MobilePortfolio } from "@/components/mobile-portfolio"
import { ProjectAura } from "@/components/project-aura"
import { ProjectShowcase } from "@/components/project-showcase"
import { Reveal } from "@/components/reveal"
import { RotatingRole } from "@/components/rotating-role"
import { SiteNav } from "@/components/site-nav"
import { projects } from "@/lib/portfolio"

export function PortfolioExperience() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <CinematicIntro />
      <AmbientEffects />
      <CommandPalette />
      <SiteNav />

      <main id="main-content">
        <MobilePortfolio />
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="hero-eyebrow hero-enter" style={{ "--enter-delay": "100ms" } as CSSProperties}>
              <span>Ahmed Saaied</span>
              <span className="eyebrow-line" />
              <span><MapPin aria-hidden="true" /> Cairo, Egypt</span>
            </div>
            <RotatingRole className="hero-role hero-enter" />
            <h1 id="hero-title" className="hero-enter" style={{ "--enter-delay": "180ms" } as CSSProperties}>
              <span>I build digital</span>
              <span>products that</span>
              <span>feel <em>obvious.</em></span>
            </h1>
            <p className="hero-intro hero-enter" style={{ "--enter-delay": "280ms" } as CSSProperties}>
              Software developer building mobile apps, full-stack web products, and interfaces that make complex work easier to understand.
            </p>
            <div className="hero-actions hero-enter" style={{ "--enter-delay": "360ms" } as CSSProperties}>
              <a className="primary-action" href="#work" data-magnetic data-cursor="Explore">
                Explore selected work <ArrowDownRight aria-hidden="true" />
              </a>
              <a className="text-action" href="mailto:ahmedsaaied117@gmail.com" data-magnetic data-cursor="Connect">
                Start a conversation <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="hero-stage-scroll">
            <div className="hero-stage-wrap hero-enter" style={{ "--enter-delay": "240ms" } as CSSProperties}>
              <HeroStage />
            </div>
          </div>

          <div className="hero-marquee" aria-hidden="true">
            <div>
              <span>Product thinking</span>
              <i>✳</i>
              <span>Interface craft</span>
              <i>✳</i>
              <span>Engineering depth</span>
              <i>✳</i>
              <span>Product thinking</span>
              <i>✳</i>
              <span>Interface craft</span>
              <i>✳</i>
              <span>Engineering depth</span>
              <i>✳</i>
            </div>
          </div>
        </section>

        <section className="work-section section-shell" id="work" aria-labelledby="work-title">
          <ProjectAura projects={projects} />
          <Reveal className="section-heading">
            <div>
              <span className="section-kicker">01 / Selected work</span>
              <h2 id="work-title">Products shaped from the inside out.</h2>
            </div>
            <p>
              Six different problems. One standard: understand the system, simplify the experience, and make the result feel considered at every scale.
            </p>
          </Reveal>

          <Reveal className="work-manifesto">
            <span>Six products</span>
            <p>Different industries, roles, and constraints—connected by one way of thinking.</p>
            <div aria-label="Portfolio range">
              <strong>Mobile</strong><i />
              <strong>Web</strong><i />
              <strong>Systems</strong>
            </div>
          </Reveal>

          <div className="project-list">
            {projects.map((project, index) => (
              <ProjectShowcase
                key={project.id}
                project={project}
                reversed={index % 2 === 1}
                index={index}
                total={projects.length}
              />
            ))}
          </div>
        </section>

        <section className="approach-section decision-lab" id="approach" aria-labelledby="approach-title">
          <div className="decision-lab-grid" aria-hidden="true" />
          <div className="section-shell">
            <Reveal className="decision-lab-heading">
              <span className="section-kicker">02 / Product decision lab</span>
              <h2 id="approach-title">Complexity enters.<br /><em>Clarity leaves.</em></h2>
              <p>
                I keep strategy, interface, and implementation in one continuous loop—so the product does not lose its meaning between a sketch and production.
              </p>
            </Reveal>

            <Reveal><ApproachLens /></Reveal>
          </div>
        </section>

        <section className="capabilities-section section-shell" id="capabilities" aria-labelledby="capabilities-title">
          <Reveal className="section-heading capabilities-heading">
            <div>
              <span className="section-kicker">03 / Capabilities</span>
              <h2 id="capabilities-title">One product brain. Multiple ways to ship.</h2>
            </div>
            <p>
              I work comfortably across the decisions that define a product and the code that makes those decisions real.
            </p>
          </Reveal>

          <Reveal>
            <CapabilityAtlas />
          </Reveal>

        </section>

        <CinematicEnding />
      </main>
    </>
  )
}
