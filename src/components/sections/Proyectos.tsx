import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ArrowUpRightIcon, MapPinIcon } from '@phosphor-icons/react'
import { projects } from '@/lib/projects'

export function Proyectos() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="proyectos" className="bg-white lg:h-[calc(100svh-var(--nav-h))] lg:min-h-[540px]">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-16 lg:flex lg:h-full lg:flex-col lg:px-10 lg:py-[clamp(1rem,3.5vh,3rem)] xl:px-16 2xl:max-w-[1700px] 2xl:px-14">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl lg:max-w-4xl"
        >
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 2xl:text-sm">
            Nuestros proyectos
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-navy-900 md:text-4xl lg:mt-[clamp(0.25rem,1vh,0.75rem)] lg:text-[clamp(2.25rem,5vh,3.25rem)]">
            Presencia real en el territorio peruano
          </h2>
          <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700 lg:mt-[clamp(0.25rem,1vh,0.75rem)] lg:text-[clamp(15.5px,1.9vh,19px)]">
            Obras de agua y saneamiento en distintas regiones del país, con organismos públicos y
            financiamiento multilateral.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:mt-[clamp(0.75rem,2.5vh,2.5rem)] lg:min-h-0 lg:flex-1 lg:grid-rows-[minmax(0,1fr)] lg:gap-[clamp(1rem,2.5vw,2.5rem)]">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: 'spring', stiffness: 70, damping: 18, delay: i * 0.12 }}
              className="group relative flex min-h-0 flex-col bg-navy-950"
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

              <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[2/1] lg:aspect-auto lg:min-h-0 lg:flex-1">
                <img
                  src={project.cover}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/10 to-transparent" />

                <span className="absolute left-4 top-4 rounded-full border border-cyan-400/40 bg-navy-950/70 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-300 backdrop-blur-sm">
                  {project.category}
                </span>
              </div>

              <div className="p-6 sm:p-8 lg:p-[clamp(1rem,2.8vh,2rem)]">
                <h3 className="text-xl font-bold leading-snug text-white lg:text-[clamp(1.05rem,2.4vh,1.6rem)]">
                  {project.title}
                </h3>
                <div className="mt-3 flex items-center justify-between gap-4 lg:mt-[clamp(0.25rem,1vh,0.75rem)] 2xl:mt-[clamp(0.75rem,1.8vh,1.5rem)]">
                  <p className="flex items-center gap-1.5 text-sm text-navy-300 lg:text-[clamp(0.875rem,1.7vh,1.05rem)]">
                    <MapPinIcon size={16} weight="regular" className="shrink-0 text-cyan-400" />
                    {project.location}
                  </p>
                  {/* En pantallas grandes "Ver proyecto" va en la misma fila que la ubicación
                      para ahorrar altura; en móvil queda debajo, con su divisor. */}
                  <span className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-navy-200 transition-colors duration-300 group-hover:text-white lg:flex">
                    Ver proyecto
                    <ArrowUpRightIcon
                      size={16}
                      weight="regular"
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>

                <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-5 text-sm font-semibold text-navy-200 transition-colors duration-300 group-hover:text-white lg:hidden">
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
