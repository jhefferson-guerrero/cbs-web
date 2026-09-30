import { motion, useReducedMotion } from 'motion/react'
import { clientGroups } from '@/lib/clients'

export function Clientes() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="bg-navy-950">
      {/* Espacio de respiro arriba y abajo, fuera del ancla (#clientes está en el bloque
          del medio): al pulsar "Clientes" en el menú no se ve, solo al hacer scroll. */}
      <div aria-hidden="true" className="hidden lg:block lg:h-[clamp(2rem,8vh,6rem)]" />
      <div id="clientes" className="relative lg:h-[calc(100svh-var(--nav-h))] lg:min-h-[540px]">
      <span aria-hidden="true" className="absolute right-6 top-6 h-6 w-6 border-r-2 border-t-2 border-white/70 lg:right-9 lg:top-9 lg:h-7 lg:w-7" />
      <span aria-hidden="true" className="absolute bottom-6 left-6 h-6 w-6 border-b-2 border-l-2 border-white/70 lg:bottom-9 lg:left-9 lg:h-7 lg:w-7" />

      <div className="mx-auto w-full max-w-[1400px] px-6 py-16 lg:flex lg:h-full lg:flex-col lg:justify-center lg:px-10 lg:py-[clamp(1rem,3.5vh,3rem)] xl:px-16 2xl:max-w-[1700px] 2xl:px-14">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl lg:max-w-4xl"
        >
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 2xl:text-sm">
            Nuestros clientes
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl lg:mt-[clamp(0.5rem,1.6vh,1rem)] lg:text-[clamp(2.25rem,5vh,3.25rem)]">
            Confianza institucional en dos países
          </h2>
          <p className="mt-5 text-[15.5px] leading-relaxed text-navy-200 lg:mt-[clamp(0.5rem,1.6vh,1rem)] lg:text-[clamp(15.5px,1.9vh,19px)]">
            Organismos públicos y empresas de saneamiento en Perú y Brasil respaldan cada proyecto que
            ejecutamos.
          </p>
        </motion.div>

        <div className="mt-12 flex flex-col divide-y divide-white/15 lg:mt-[clamp(1rem,5vh,4rem)]">
          {clientGroups.map((group) => {
            const solo = group.clients.length === 1

            return (
              <div key={group.country} className="py-8 first:pt-0 last:pb-0 lg:py-[clamp(1rem,4vh,3.5rem)] lg:first:pt-0 lg:last:pb-0">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 2xl:text-sm">
                  {group.country}
                </p>

                <div className="mt-6 flex flex-wrap gap-3 lg:mt-[clamp(0.75rem,2.6vh,2rem)]">
                  {group.clients.map((client, i) => (
                    <motion.div
                      key={client.name}
                      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className={`group relative flex items-center justify-center bg-white ${
                        solo
                          ? 'h-20 w-56 shrink-0 p-3 sm:h-24 sm:w-72 sm:p-4 lg:h-[clamp(4.75rem,14vh,8.5rem)] lg:w-[clamp(14rem,42vh,25.5rem)] 2xl:p-5'
                          : 'h-28 min-w-28 max-w-40 flex-1 p-2.5 sm:h-32 sm:min-w-32 sm:max-w-48 sm:p-3 lg:h-[clamp(5.75rem,19vh,10.5rem)] 2xl:min-w-40 2xl:max-w-56 2xl:p-4'
                      }`}
                    >
                      <span aria-hidden="true" className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-navy-200" />
                      <span aria-hidden="true" className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-navy-200" />
                      <img
                        src={client.logo}
                        alt={client.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      </div>
      <div aria-hidden="true" className="hidden lg:block lg:h-[clamp(2rem,8vh,6rem)]" />
    </section>
  )
}
