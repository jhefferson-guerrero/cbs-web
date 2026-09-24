import { motion, useReducedMotion } from 'motion/react'
import { clientGroups } from '@/lib/clients'

export function Clientes() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="clientes" className="relative bg-navy-950">
      <span aria-hidden="true" className="absolute right-6 top-6 h-6 w-6 border-r-2 border-t-2 border-white/70 lg:right-9 lg:top-9 lg:h-7 lg:w-7" />
      <span aria-hidden="true" className="absolute bottom-6 left-6 h-6 w-6 border-b-2 border-l-2 border-white/70 lg:bottom-9 lg:left-9 lg:h-7 lg:w-7" />

      <div className="mx-auto w-full max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20 xl:px-16 2xl:max-w-[1700px] 2xl:px-14 2xl:py-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 2xl:text-sm">
            Nuestros clientes
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl 2xl:text-5xl">
            Confianza institucional en dos países
          </h2>
          <p className="mt-5 text-[15.5px] leading-relaxed text-navy-200 2xl:text-lg">
            Organismos públicos y empresas de saneamiento en Perú y Brasil respaldan cada
            proyecto que ejecutamos, desde nuestro origen hasta la operación actual.
          </p>
        </motion.div>

        <div className="mt-12 flex flex-col divide-y divide-white/15 2xl:mt-14">
          {clientGroups.map((group) => {
            const featured = group.clients.length === 1

            return (
              <div key={group.country} className="pt-8 first:pt-0 2xl:pt-10">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 2xl:text-sm">
                  {group.country}
                </p>

                <div className={`mt-6 grid gap-3 ${featured ? 'grid-cols-1 sm:max-w-xs' : 'grid-cols-2 sm:grid-cols-4'}`}>
                  {group.clients.map((client, i) => (
                    <motion.div
                      key={client.name}
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className={`group flex items-center justify-center border border-white/15 p-6 2xl:p-8 ${featured ? 'h-24' : ''}`}
                    >
                      <img
                        src={client.logo}
                        alt={client.name}
                        loading="lazy"
                        decoding="async"
                        className={`w-auto object-contain brightness-0 invert opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:invert-0 group-hover:brightness-100 ${
                          featured ? 'h-14 2xl:h-16' : 'h-10 2xl:h-12'
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
