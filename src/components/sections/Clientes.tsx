import { motion, useReducedMotion } from 'motion/react'
import { clientGroups } from '@/lib/clients'

export function Clientes() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="clientes" className="border-t border-navy-100 bg-white">
      <div className="mx-auto w-full max-w-[1400px] px-6 pb-10 pt-16 lg:px-10 lg:pb-12 lg:pt-20 xl:px-16 2xl:max-w-[1700px] 2xl:px-14 2xl:pb-14 2xl:pt-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 2xl:text-sm">
            Nuestros clientes
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-navy-900 md:text-4xl 2xl:text-5xl">
            Confianza institucional en dos países
          </h2>
          <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700 2xl:text-lg">
            Organismos públicos y empresas de saneamiento en Perú y Brasil respaldan cada
            proyecto que ejecutamos, desde nuestro origen hasta la operación actual.
          </p>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.1 }}
          className="relative mt-12 bg-navy-900 p-8 sm:p-10 2xl:mt-14"
        >
          <span aria-hidden="true" className="absolute -left-px -top-px h-7 w-7 border-l-2 border-t-2 border-cyan-500" />
          <span aria-hidden="true" className="absolute -right-px -top-px h-7 w-7 border-r-2 border-t-2 border-cyan-500" />
          <span aria-hidden="true" className="absolute -bottom-px -left-px h-7 w-7 border-b-2 border-l-2 border-cyan-500" />
          <span aria-hidden="true" className="absolute -bottom-px -right-px h-7 w-7 border-b-2 border-r-2 border-cyan-500" />

          <div className="flex flex-col divide-y divide-white/15">
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
        </motion.div>
      </div>
    </section>
  )
}
