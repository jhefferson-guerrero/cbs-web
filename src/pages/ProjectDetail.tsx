import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon, ArrowUpRightIcon } from '@phosphor-icons/react'
import { getProjectBySlug, projects } from '@/lib/projects'
import { ProjectHero } from '@/components/project/ProjectHero'
import { ProjectFacts } from '@/components/project/ProjectFacts'
import { PartnerLogosSection } from '@/components/project/PartnerLogosSection'
import { ProjectGallery } from '@/components/project/ProjectGallery'

export function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  useEffect(() => {
    document.title = project ? `${project.title} | CBS` : 'Proyecto no encontrado | CBS'
  }, [project])

  if (!project) {
    return (
      <main>
        <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 bg-white px-6 text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">404</p>
          <h1 className="text-2xl font-bold text-navy-900">No encontramos ese proyecto</h1>
          <Link
            to="/#proyectos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition-colors hover:text-cyan-800"
          >
            <ArrowLeftIcon size={16} weight="regular" />
            Volver a proyectos
          </Link>
        </section>
      </main>
    )
  }

  const currentIndex = projects.findIndex((p) => p.slug === project.slug)
  const nextProject = projects.length > 1 ? projects[(currentIndex + 1) % projects.length] : undefined

  return (
    <main key={project.slug}>
      <ProjectHero project={project} />
      <ProjectFacts project={project} />
      <PartnerLogosSection />
      <ProjectGallery images={project.gallery} />

      <section className="bg-navy-950">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-start justify-between gap-6 px-6 py-14 sm:flex-row sm:items-center lg:px-10 xl:px-16 2xl:max-w-[1700px] 2xl:px-14">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy-200 transition-colors hover:text-white"
          >
            <ArrowLeftIcon size={20} weight="regular" className="shrink-0" />
            Volver al inicio
          </Link>
          {nextProject && (
            <Link
              to={`/proyectos/${nextProject.slug}`}
              className="group inline-flex items-center gap-3 text-lg font-bold text-white transition-colors hover:text-cyan-300"
            >
              Siguiente proyecto: {nextProject.title}
              <ArrowUpRightIcon
                size={24}
                weight="regular"
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          )}
        </div>
      </section>
    </main>
  )
}
