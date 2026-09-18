import type { Metadata } from "next"
import { ArrowLeft, FileText, Mail } from "lucide-react"
import Link from "next/link"

import styles from "./not-found.module.css"

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: false } }

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.signal} aria-hidden="true"><i /><i /><span>404</span></div>
      <Link className={styles.mark} href="/" aria-label="Ahmed Saaied, home">AS<span>.</span></Link>
      <section className={styles.content}>
        <p>404 / Signal lost</p>
        <h1>This route left<br /><em>the system.</em></h1>
        <span>The page may have moved, but the work is still here.</span>
        <div className={styles.actions}>
          <Link href="/#work"><ArrowLeft aria-hidden="true" /> Return to selected work</Link>
          <Link href="/resume" data-analytics-event="resume_opened" data-analytics-source="not_found"><FileText aria-hidden="true" /> Resume</Link>
          <a href="mailto:ahmedsaaiedd@gmail.com" data-analytics-event="contact_clicked" data-analytics-source="not_found"><Mail aria-hidden="true" /> Contact</a>
        </div>
      </section>
      <p className={styles.status}><i /> Cairo · system online</p>
    </main>
  )
}
