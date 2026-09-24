import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ArrowUpRightIcon, MapPinIcon } from '@phosphor-icons/react'
import { locationGroups } from '@/lib/actuacion'

// Temporary stand-in for the coverage map (see plan: a flat custom SVG of
// Perú + Brasil replaces this once the simplified country outlines are traced).
const MAP_PLACEHOLDER = '/hero-planta.webp'

export function Actuacion() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="actuacion" className="bg-white">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20 xl:px-16 2xl:max-w-[1700px] 2xl:px-14 2xl:py-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 2xl:text-sm">
            Área de actuación
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-navy-900 md:text-4xl 2xl:text-5xl">
            Presencia en dos países
          </h2>
          <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700 2xl:text-lg">
            Desde nuestro origen en Brasil hasta la operación actual en Perú, ejecutamos obras
            en distintas regiones de ambos países.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2 2xl:mt-14">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative isolate min-h-[320px] overflow-hidden lg:min-h-[480px]"
          >
            <img
              src={MAP_PLACEHOLDER}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-[70%_50%] saturate-[1.02] contrast-[1.02] brightness-[0.85]"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-700/40 via-navy-900/25 to-navy-950/70" />

            <span aria-hidden="true" className="absolute right-6 top-6 h-6 w-6 border-r-2 border-t-2 border-white/70 lg:right-9 lg:top-9 lg:h-7 lg:w-7" />
            <span aria-hidden="true" className="absolute bottom-6 left-6 h-6 w-6 border-b-2 border-l-2 border-white/70 lg:bottom-9 lg:left-9 lg:h-7 lg:w-7" />

            <div className="absolute bottom-9 left-9 right-9">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/75">
                Imagen provisional — mapa de cobertura en preparación
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative isolate overflow-hidden bg-navy-950 p-8 sm:p-10 2xl:p-12"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(148, 177, 216, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 177, 216, 0.06) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
                maskImage: 'radial-gradient(circle at 70% 30%, black 0%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(circle at 70% 30%, black 0%, transparent 70%)',
              }}
            />

            <div className="relative flex flex-col divide-y divide-white/15">
              {locationGroups.map((group) => (
                <div key={group.country} className="pt-8 first:pt-0">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 2xl:text-sm">
                    {group.country}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
                    {group.locations.map((location, i) => {
                      const inner = (
                        <>
                          <span className="font-mono text-xs font-semibold tracking-[0.15em] text-cyan-500">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-white sm:text-base">
                            <MapPinIcon size={15} weight="regular" className="shrink-0 text-cyan-400" />
                            {location.name}
                            {location.projectSlug && (
                              <ArrowUpRightIcon
                                size={13}
                                weight="regular"
                                className="shrink-0 text-navy-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-300"
                              />
                            )}
                          </span>
                        </>
                      )

                      if (location.projectSlug) {
                        return (
                          <Link
                            key={location.name}
                            to={`/proyectos/${location.projectSlug}`}
                            className="group flex flex-col outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                          >
                            {inner}
                          </Link>
                        )
                      }

                      return (
                        <div key={location.name} className="flex flex-col">
                          {inner}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
