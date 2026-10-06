import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { PageLink } from '@/components/ui/PageLink'
import { ArrowLeftIcon, MapPinIcon } from '@phosphor-icons/react'
import type { Project } from '@/lib/projects'

const EASE = [0.16, 1, 0.3, 1] as const

// La entrada espera a `ready` (en una carga directa el preloader tapa la página) y arranca con un retardo para
// que no se pierda durante el fundido con el que aparece la página al navegar desde la Home (~0.4 s).
export function ProjectHero({ project, ready }: { project: Project; ready: boolean }) {
  const reduceMotion = useReducedMotion()
  const play = reduceMotion || ready
  // Si la página se abrió con el preloader encima (carga directa), su desvanecimiento tapa los primeros ~0.5 s
  // de la entrada: se suma ese tiempo para que se vea completa.
  const [behindPreloader] = useState(() => !ready)
  const wait = behindPreloader ? 0.45 : 0

  // Sube desde abajo con un leve desenfoque que se aclara: más recorrido y más lento que antes.
  const rise = (delay: number, distance = 32) => ({
    initial: reduceMotion ? (false as const) : { opacity: 0, y: distance, filter: 'blur(6px)' },
    animate: play
      ? { opacity: 1, y: 0, filter: 'blur(0px)' }
      : { opacity: 0, y: distance, filter: 'blur(6px)' },
    transition: { duration: 1, delay: delay + wait, ease: EASE },
  })

  const corner = (delay: number) => ({
    initial: reduceMotion ? (false as const) : { opacity: 0, scale: 1.8 },
    animate: play ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.8 },
    transition: { duration: 0.6, delay: delay + wait, ease: 'easeOut' as const },
  })

  return (
    <section className="relative isolate flex overflow-hidden bg-navy-950 lg:min-h-[560px] 2xl:min-h-[680px]">
      <motion.img
        src={project.cover}
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        initial={reduceMotion ? false : { scale: 1.14 }}
        animate={{ scale: play ? 1 : 1.14 }}
        transition={{ duration: 2.4, ease: EASE }}
        className="absolute inset-0 h-full w-full object-cover object-center saturate-[1.05] contrast-[1.02] brightness-[0.7]"
      />
      <div className="absolute inset-0 bg-navy-950/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/15" />

      <motion.span
        {...corner(1.1)}
        aria-hidden="true"
        className="absolute right-6 top-20 h-6 w-6 border-r-2 border-t-2 border-white/70 lg:right-9 lg:top-24 lg:h-7 lg:w-7"
      />
      <motion.span
        {...corner(1.25)}
        aria-hidden="true"
        className="absolute bottom-6 left-6 h-6 w-6 border-b-2 border-l-2 border-white/70 lg:bottom-9 lg:left-9 lg:h-7 lg:w-7"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col justify-end gap-6 px-6 pb-14 pt-28 lg:px-10 lg:pb-20 lg:pt-36 xl:px-16 2xl:max-w-[1700px] 2xl:px-14 2xl:pb-24 2xl:pt-44">
        <motion.div {...rise(0.35, 18)}>
          <PageLink
            to="/#proyectos"
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-cyan-300 transition-colors hover:text-cyan-200"
          >
            <ArrowLeftIcon size={14} weight="bold" />
            Volver a proyectos
          </PageLink>
        </motion.div>

        <div>
          <motion.h1
            {...rise(0.55)}
            className="max-w-3xl text-3xl font-bold leading-tight text-white md:text-4xl 2xl:text-5xl"
          >
            {project.title}
          </motion.h1>
          <motion.p
            {...rise(0.85, 22)}
            className="mt-4 flex items-center gap-2 text-sm text-navy-200 2xl:text-base"
          >
            <MapPinIcon size={18} weight="regular" className="shrink-0 text-cyan-400" />
            {project.location}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
