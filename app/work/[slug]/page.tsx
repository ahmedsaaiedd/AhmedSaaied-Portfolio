import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProjectWorld } from "@/components/project-world"
import { projects } from "@/lib/portfolio"

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((item) => item.id === slug)

  if (!project) return {}

  return {
    title: `${project.title} — Ahmed Saaied`,
    description: project.summary,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const index = projects.findIndex((project) => project.id === slug)

  if (index === -1) notFound()

  const project = projects[index]
  const nextProject = projects[(index + 1) % projects.length]

  return <ProjectWorld project={project} nextProject={nextProject} total={projects.length} />
}
