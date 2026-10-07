import { useParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { PageLink } from '@/components/ui/PageLink'
import { ArrowUpRightIcon } from '@phosphor-icons/react'
import { getProjectBySlug, projects } from '@/lib/projects'
import { ProjectHero } from '@/components/project/ProjectHero'
import { ProjectFacts } from '@/components/project/ProjectFacts'
import { PartnerLogosSection } from '@/components/project/PartnerLogosSection'
import { ProjectGallery } from '@/components/project/ProjectGallery'
import { NotFound } from '@/pages/NotFound'

export function ProjectDetail({ ready = true }: { ready?: boolean }) {
  const { slug } = useParams()
  const reduceMotion = useReducedMotion()
  const project = getProjectBySlug(slug)

  // Un proyecto que no existe es una 404 más (el título y noindex los pone RouteSeo).
  if (!project) return <NotFound />

  const currentIndex = projects.findIndex((p) => p.slug === project.slug)
  const nextProject = projects.length > 1 ? projects[(currentIndex + 1) % projects.length] : undefined

  return (
    <main key={project.slug}>
      <ProjectHero project={project} ready={ready} />
      <ProjectFacts project={project} ready={ready} />
      {project.showPartnerLogos && <PartnerLogosSection />}
      <ProjectGallery images={project.gallery} />

      {nextProject && (
        <section className="border-b border-white/10 bg-navy-950">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto w-full max-w-[1400px] px-6 py-14 lg:px-10 xl:px-16 2xl:max-w-[1700px] 2xl:px-14"
          >
            <PageLink
              to={`/proyectos/${nextProject.slug}`}
              className="group inline-flex items-center gap-3 text-lg font-bold text-white transition-colors hover:text-cyan-300"
            >
              Siguiente proyecto: {nextProject.title}
              <ArrowUpRightIcon
                size={24}
                weight="regular"
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </PageLink>
          </motion.div>
        </section>
      )}
    </main>
  )
}
