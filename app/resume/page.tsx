import type { Metadata } from "next"
import { ArrowDown, ArrowLeft, ArrowUpRight, Download } from "lucide-react"

import { AmbientEffects } from "@/components/ambient-effects"
import { TransitionLink } from "@/components/transition-link"
import styles from "./resume.module.css"

export const metadata: Metadata = {
  title: "Resume",
  description: "Ahmed Saaied's focused Flutter, full-stack, and product design resumes.",
  alternates: { canonical: "/resume" },
  openGraph: { title: "Ahmed Saaied — Resume", description: "Focused Flutter, full-stack, and product design resumes by Ahmed Saaied.", url: "/resume", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "Ahmed Saaied — Resume", description: "Focused Flutter, full-stack, and product design resumes by Ahmed Saaied.", images: ["/twitter-image"] },
}

const paths = [
  {
    id: "flutter",
    number: "01",
    eyebrow: "Mobile systems",
    title: "Flutter Developer",
    statement: "Responsive, offline-first products engineered to stay calm when the system gets complicated.",
    details: "Flutter · Riverpod · MVVM · GoRouter · Firebase",
    signal: "BUILD / SYNC / SHIP",
    color: "#65ff3a",
    soft: "rgba(101, 255, 58, .12)",
    pdf: "/resumes/ahmed-saaied-flutter-developer.pdf",
  },
  {
    id: "full-stack",
    number: "02",
    eyebrow: "Connected products",
    title: "Full-Stack Developer",
    statement: "Interfaces, APIs, data, and permissions shaped as one understandable product—not separate layers.",
    details: "Next.js · React · TypeScript · PostgreSQL · Prisma",
    signal: "REQUEST / ROUTE / RESOLVE",
    color: "#62e9df",
    soft: "rgba(98, 233, 223, .12)",
    pdf: "/resumes/ahmed-saaied-full-stack-developer.pdf",
  },
  {
    id: "design",
    number: "03",
    eyebrow: "Product clarity",
    title: "UI/UX Designer",
    statement: "Complex workflows turned into visual systems that feel intentional, human, and ready to build.",
    details: "Flows · Prototypes · Design systems · Interaction",
    signal: "FIND / FRAME / REFINE",
    color: "#ff5c9a",
    soft: "rgba(255, 92, 154, .12)",
    pdf: "/resumes/ahmed-saaied-ui-ux-designer.pdf",
  },
]

export default function ResumePage() {
  return (
    <main className={styles.page} id="top">
      <AmbientEffects />

      <header className={styles.header}>
        <TransitionLink className={styles.back} href="/" data-cursor="Home">
          <ArrowLeft aria-hidden="true" /> <span>Portfolio</span>
        </TransitionLink>
        <TransitionLink className={styles.mark} href="/" aria-label="Ahmed Saaied, home">AS<i>.</i></TransitionLink>
        <nav aria-label="Resume disciplines">
          {paths.map((path) => <a key={path.id} href={`#${path.id}`}>{path.number}</a>)}
        </nav>
      </header>

      <section className={styles.intro} aria-labelledby="resume-title">
        <div className={styles.introGrid} aria-hidden="true" />
        <p><span>Three disciplines</span><i />One product mind</p>
        <h1 id="resume-title">The role changes.<br /><em>The standard doesn’t.</em></h1>
        <div className={styles.introFoot}>
          <p>Choose the perspective most relevant to the work. Each path has a focused résumé and the same underlying approach: understand deeply, simplify carefully, and build completely.</p>
          <a href="#flutter" aria-label="Explore resume paths"><ArrowDown aria-hidden="true" /></a>
        </div>
      </section>

      <section className={styles.paths} aria-label="Resume paths">
        {paths.map((path) => (
          <article
            className={styles.path}
            id={path.id}
            key={path.id}
            style={{ "--path-color": path.color, "--path-soft": path.soft } as React.CSSProperties}
          >
            <div className={styles.pathGrid} aria-hidden="true" />
            <div className={styles.pathMeta}>
              <span>{path.number} / 03</span>
              <p>{path.eyebrow}</p>
              <small>{path.signal}</small>
            </div>
            <div className={styles.pathBody}>
              <h2>{path.title}</h2>
              <p>{path.statement}</p>
              <span>{path.details}</span>
            </div>
            <div className={styles.orbit} aria-hidden="true"><i /><i /><i /></div>
            <div className={styles.actions}>
              <a className={styles.primary} href={path.pdf} target="_blank" rel="noreferrer" data-magnetic data-cursor="Open PDF" data-analytics-event="resume_pdf_opened" data-analytics-discipline={path.id}>
                Open résumé <ArrowUpRight aria-hidden="true" />
              </a>
              <a className={styles.secondary} href={path.pdf} download data-cursor="Download" data-analytics-event="resume_downloaded" data-analytics-discipline={path.id}>
                <Download aria-hidden="true" /> Download PDF
              </a>
            </div>
          </article>
        ))}
      </section>

      <footer className={styles.footer}>
        <p>Not sure which one fits?</p>
        <a href="mailto:ahmedsaaiedd@gmail.com" data-analytics-event="contact_clicked" data-analytics-source="resume_page">Start a conversation <ArrowUpRight aria-hidden="true" /></a>
      </footer>

      <nav className={styles.mobileDock} aria-label="Resume path navigation">
        {paths.map((path) => <a key={path.id} href={`#${path.id}`}><span>{path.number}</span>{path.title.replace(" Developer", "").replace(" Designer", "")}</a>)}
      </nav>
    </main>
  )
}
