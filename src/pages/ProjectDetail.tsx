import { useParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { PageLink } from '@/components/ui/PageLink'
import { ArrowRightIcon, MapPinIcon } from '@phosphor-icons/react'
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
        <section aria-label="Siguiente proyecto" className="bg-navy-950">
          {/* Toda la tarjeta es el enlace. Lleva la portada del proyecto que sigue de fondo, para que se note y no se
              confunda con el pie de página (que tiene el mismo azul marino). */}
          <PageLink
            to={`/proyectos/${nextProject.slug}`}
            className="group relative block overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-400"
          >
            <img
              src={nextProject.cover}
              srcSet={nextProject.coverSrcSet}
              sizes="100vw"
              alt=""
              aria-hidden="true"
              draggable={false}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transition-none"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-navy-950/60" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/55 to-navy-950/10" />

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto flex min-h-[18rem] w-full max-w-[1400px] flex-col justify-center gap-6 px-6 py-14 sm:min-h-[20rem] lg:min-h-[22rem] lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-10 xl:px-16 2xl:min-h-[26rem] 2xl:max-w-[1700px] 2xl:px-14"
            >
              <div className="max-w-2xl">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 2xl:text-sm">
                  Siguiente proyecto
                </p>
                <p className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl 2xl:text-5xl">
                  {nextProject.title.split(' — ')[0]}
                </p>
                {nextProject.title.includes(' — ') && (
                  <p className="mt-2 text-base font-medium text-white/80 sm:text-lg 2xl:text-xl">
                    {nextProject.title.split(' — ').slice(1).join(' — ')}
                  </p>
                )}
                <p className="mt-4 flex items-center gap-1.5 text-sm text-navy-100 2xl:text-base">
                  <MapPinIcon size={16} weight="regular" className="shrink-0 text-cyan-400" />
                  {nextProject.location}
                </p>
              </div>

              {/* Es un <span> y no otro enlace: la tarjeta entera ya es el enlace. */}
              <span className="inline-flex w-fit shrink-0 items-center gap-3 rounded-lg bg-white px-6 py-3 text-base font-semibold text-navy-900 lg:px-7 2xl:text-lg">
                Ver proyecto
                <ArrowRightIcon
                  size={18}
                  weight="bold"
                  className="transition-transform duration-300 group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5"
                />
              </span>
            </motion.div>
          </PageLink>
        </section>
      )}
    </main>
  )
}
