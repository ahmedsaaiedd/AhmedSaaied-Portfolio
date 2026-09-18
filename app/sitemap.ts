import type { MetadataRoute } from "next"
import { projects } from "@/lib/portfolio"
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = "https://ahmedsaaied.space"
  const lastModified = new Date("2026-09-18")
  return [
    { url: origin, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${origin}/resume`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((project) => ({ url: `${origin}/work/${project.id}`, lastModified, changeFrequency: "monthly" as const, priority: 0.9 })),
  ]
}
