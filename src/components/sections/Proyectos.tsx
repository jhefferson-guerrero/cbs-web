import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ArrowUpRightIcon, MapPinIcon } from '@phosphor-icons/react'
import { projects } from '@/lib/projects'

export function Proyectos() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="proyectos" className="bg-white">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20 xl:px-16 2xl:max-w-[1700px] 2xl:px-14 2xl:py-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 2xl:text-sm">
            Nuestros proyectos
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-navy-900 md:text-4xl 2xl:text-5xl">
            Presencia real en el territorio peruano
          </h2>
          <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700 2xl:text-lg">
            Obras de agua y saneamiento en ejecución en distintas regiones del país, desarrolladas
            junto a los organismos públicos y financiadas por entidades multilaterales.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 2xl:mt-14 2xl:gap-10">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: 'spring', stiffness: 70, damping: 18, delay: i * 0.12 }}
              className="group relative bg-navy-950"
            >
              <Link
                to={`/proyectos/${project.slug}`}
                aria-label={project.title}
                className="absolute inset-0 z-30 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              />
              <span aria-hidden="true" className="absolute -left-px -top-px z-10 h-7 w-7 border-l-2 border-t-2 border-cyan-500 transition-opacity duration-300 group-hover:opacity-60" />
              <span aria-hidden="true" className="absolute -right-px -top-px z-10 h-7 w-7 border-r-2 border-t-2 border-cyan-500 transition-opacity duration-300 group-hover:opacity-60" />
              <span aria-hidden="true" className="absolute -bottom-px -left-px z-10 h-7 w-7 border-b-2 border-l-2 border-cyan-500 transition-opacity duration-300 group-hover:opacity-60" />
              <span aria-hidden="true" className="absolute -bottom-px -right-px z-10 h-7 w-7 border-b-2 border-r-2 border-cyan-500 transition-opacity duration-300 group-hover:opacity-60" />

              <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[2/1]">
                <img
                  src={project.cover}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/10 to-transparent" />

                <span className="absolute left-4 top-4 rounded-full border border-cyan-400/40 bg-navy-950/70 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-300 backdrop-blur-sm">
                  {project.category}
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <span className="font-mono text-xs font-semibold tracking-[0.2em] text-cyan-400 2xl:text-sm">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-xl font-bold leading-snug text-white 2xl:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-3 flex items-center gap-1.5 text-sm text-navy-300 2xl:text-base">
                  <MapPinIcon size={16} weight="regular" className="shrink-0 text-cyan-400" />
                  {project.location}
                </p>

                <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-5 text-sm font-semibold text-navy-200 transition-colors duration-300 group-hover:text-white">
                  Ver proyecto
                  <ArrowUpRightIcon
                    size={16}
                    weight="regular"
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
