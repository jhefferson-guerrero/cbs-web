import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ArrowUpRightIcon, MapPinIcon } from '@phosphor-icons/react'
import mapaCobertura from '@/assets/images/actuacion-mapa.webp'
import { locationGroups } from '@/lib/actuacion'

export function Actuacion() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="actuacion" className="border-t border-navy-100 bg-white">
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

        <div className="mt-12 2xl:mt-14">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative isolate w-full overflow-hidden"
            style={{ aspectRatio: '3200 / 1520' }}
          >
            {/* La proporción del contenedor (arriba) es exactamente la de la imagen fuente
                -- así se ve completa, sin recortar nada y sin dejar espacio vacío alrededor. */}
            <motion.img
              src={mapaCobertura}
              alt="Mapa de cobertura de CBS en Perú y Brasil, con las regiones donde opera en cada país"
              loading="lazy"
              decoding="async"
              initial={reduceMotion ? false : { scale: 1.08 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full object-cover"
            />

            <span aria-hidden="true" className="absolute right-6 top-6 h-6 w-6 border-r-2 border-t-2 border-white/70 lg:right-9 lg:top-9 lg:h-7 lg:w-7" />
            <span aria-hidden="true" className="absolute bottom-6 left-6 h-6 w-6 border-b-2 border-l-2 border-white/70 lg:bottom-9 lg:left-9 lg:h-7 lg:w-7" />
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 bg-navy-950 p-10 sm:p-12 2xl:p-14"
          >
            <div className="flex flex-col gap-10">
              {locationGroups.map((group) => (
                <div key={group.country}>
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 2xl:text-sm">
                    {group.country}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
                    {group.locations.map((location, i) => {
                      const inner = (
                        <span className="flex items-center gap-1.5 text-sm font-semibold text-white sm:text-base">
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
                      )

                      const itemMotion = {
                        initial: reduceMotion ? false : { opacity: 0, y: 12 },
                        whileInView: { opacity: 1, y: 0 },
                        viewport: { once: true, amount: 0.6 },
                        transition: { duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] as const },
                      }

                      if (location.projectSlug) {
                        return (
                          <motion.div key={location.name} {...itemMotion}>
                            <Link
                              to={`/proyectos/${location.projectSlug}`}
                              className="group flex flex-col outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                            >
                              {inner}
                            </Link>
                          </motion.div>
                        )
                      }

                      return (
                        <motion.div key={location.name} {...itemMotion} className="flex flex-col">
                          {inner}
                        </motion.div>
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
