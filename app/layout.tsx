import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import "./mobile-experience.css"
import { AdaptiveMotion } from "@/components/adaptive-motion"
import { AnalyticsEvents } from "@/components/analytics-events"
import { RouteTransition } from "@/components/route-transition"

const siteUrl = new URL("https://ahmedsaaied.space")
const title = "Ahmed Saaied — Software Developer"
const description = "Portfolio of Ahmed Saaied, a software developer building mobile applications, full-stack web products, and clear digital experiences."

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: title, template: "%s — Ahmed Saaied" },
  description,
  keywords: ["Ahmed Saaied", "software developer", "mobile developer", "full-stack developer", "Flutter", "Kotlin", "Next.js", "UI UX designer", "Cairo"],
  authors: [{ name: "Ahmed Saaied", url: siteUrl }],
  creator: "Ahmed Saaied",
  publisher: "Ahmed Saaied",
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  openGraph: { type: "website", locale: "en_US", url: "/", siteName: "Ahmed Saaied Portfolio", title, description, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: ["/twitter-image"] },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon-96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/favicon-192.png", type: "image/png", sizes: "192x192" }],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Person", "@id": `${siteUrl}#ahmed-saaied`, name: "Ahmed Saaied", url: siteUrl, image: `${siteUrl}favicon-192.png`, email: "mailto:ahmedsaaiedd@gmail.com", jobTitle: "Software Developer", sameAs: ["https://github.com/ahmedsaaiedd", "https://www.linkedin.com/in/ahmed-saaied-904a23372"], address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" }, knowsAbout: ["Flutter", "Kotlin", "Next.js", "TypeScript", "PostgreSQL", "Firebase", "Product design", "UI/UX design"] },
      { "@type": "WebSite", "@id": `${siteUrl}#website`, name: "Ahmed Saaied Portfolio", url: siteUrl, description, author: { "@id": `${siteUrl}#ahmed-saaied` } },
    ],
  }
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        <AdaptiveMotion />
        <RouteTransition />
        {children}
        <Analytics />
        <AnalyticsEvents />
      </body>
    </html>
  )
}
