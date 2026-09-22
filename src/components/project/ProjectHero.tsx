import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon, MapPinIcon } from '@phosphor-icons/react'
import type { Project } from '@/lib/projects'

export function ProjectHero({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative isolate overflow-hidden bg-navy-950">
      <motion.img
        src={project.cover}
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        initial={reduceMotion ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 h-full w-full object-cover object-center saturate-[1.05] contrast-[1.02] brightness-[0.7]"
      />
      <div className="absolute inset-0 bg-navy-950/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/15" />

      <span aria-hidden="true" className="absolute right-6 top-6 h-6 w-6 border-r-2 border-t-2 border-white/70 lg:right-9 lg:top-9 lg:h-7 lg:w-7" />
      <span aria-hidden="true" className="absolute bottom-6 left-6 h-6 w-6 border-b-2 border-l-2 border-white/70 lg:bottom-9 lg:left-9 lg:h-7 lg:w-7" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col justify-end gap-6 px-6 pb-14 pt-28 lg:px-10 lg:pb-20 lg:pt-36 xl:px-16 2xl:max-w-[1700px] 2xl:px-14 2xl:pb-24 2xl:pt-44">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            to="/#proyectos"
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-cyan-300 transition-colors hover:text-cyan-200"
          >
            <ArrowLeftIcon size={14} weight="bold" />
            Volver a proyectos
          </Link>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex rounded-full border border-cyan-400/40 bg-navy-950/70 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-300 backdrop-blur-sm">
            {project.category}
          </span>
          <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-tight text-white md:text-4xl 2xl:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 flex items-center gap-2 text-sm text-navy-200 2xl:text-base">
            <MapPinIcon size={18} weight="regular" className="shrink-0 text-cyan-400" />
            {project.location}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
