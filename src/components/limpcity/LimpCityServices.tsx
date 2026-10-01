import { useState, type CSSProperties } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { PlusIcon } from '@phosphor-icons/react'
import { limpCityServices } from '@/lib/limp-city'
import { cn } from '@/lib/utils'

// En pantallas grandes los servicios son franjas verticales: la activa se abre y las
// demás quedan angostas. Se activa con el cursor, el foco de teclado o un toque.
// En móvil y tablet son filas apiladas, todas abiertas.
export function LimpCityServices() {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)

  const columns = limpCityServices.map((_, i) => (i === active ? '5fr' : '1fr')).join(' ')

  return (
    <section className="bg-navy-950">
      {/* Espacio de respiro arriba y abajo, fuera del bloque de una vista. */}
      <div aria-hidden="true" className="hidden lg:block lg:h-[clamp(2rem,8vh,6rem)]" />
      <div className="mx-auto flex w-full max-w-[1400px] flex-col px-6 py-16 lg:h-[calc(100svh-var(--nav-h))] lg:min-h-[440px] lg:px-10 lg:py-[clamp(1.25rem,4vh,3.5rem)] xl:px-16 2xl:max-w-[1700px] 2xl:px-14">
        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl lg:text-[clamp(2.25rem,5.4vh,3.75rem)]"
        >
          Nuestros servicios
        </motion.h2>

        <ul
          style={{ '--cols': columns } as CSSProperties}
          className="mt-8 flex flex-col gap-3 lg:mt-[clamp(1rem,3vh,2.5rem)] lg:grid lg:min-h-0 lg:flex-1 lg:grid-rows-[minmax(0,1fr)] lg:[grid-template-columns:var(--cols)] lg:transition-[grid-template-columns] lg:duration-700 lg:ease-[cubic-bezier(0.16,1,0.3,1)]"
        >
          {limpCityServices.map((service, i) => {
            const isActive = i === active

            return (
              <motion.li
                key={service.name}
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="min-h-0"
              >
                <button
                  type="button"
                  aria-expanded={isActive}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group relative block h-56 w-full overflow-hidden bg-navy-900 text-left outline-none focus-visible:ring-2 focus-visible:ring-moss-300 sm:h-64 lg:h-full"
                >
                  <div className={cn('absolute inset-0', service.fit === 'contain' && 'bg-[#e6e9df]')}>
                    <img
                      src={service.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      style={service.position ? { objectPosition: service.position } : undefined}
                      className={cn(
                        'h-full w-full transition-[filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
                        service.fit === 'contain' ? 'object-contain p-4 mix-blend-multiply sm:p-6' : 'object-cover',
                        isActive ? 'scale-100' : 'lg:scale-110 lg:grayscale-[25%]',
                      )}
                    />
                  </div>

                  <div
                    className={cn(
                      'absolute inset-0 transition-opacity duration-700',
                      'bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-navy-950/0',
                    )}
                  />
                  <div
                    className={cn(
                      'absolute inset-0 bg-navy-950/15 transition-opacity duration-700',
                      isActive ? 'lg:opacity-0' : 'lg:opacity-100',
                    )}
                  />

                  <span aria-hidden="true" className={cn('absolute left-0 top-0 h-full w-0.5 bg-moss-300 transition-opacity duration-500', isActive ? 'opacity-100' : 'lg:opacity-0')} />

                  {/* Nombre y descripción: horizontales cuando la franja está abierta (y siempre en móvil). */}
                  <span
                    className={cn(
                      'absolute bottom-0 left-0 right-0 flex flex-col gap-1.5 p-5 transition-opacity sm:p-6 lg:right-auto lg:w-[min(30rem,100%)] lg:p-[clamp(1.25rem,2.4vh,2rem)]',
                      // Ancho fijo (no sigue al de la franja) para que el texto no se reacomode mientras
                      // la franja cambia de tamano. Sale rapido y entra cuando la franja ya casi termino de abrirse.
                      isActive ? 'opacity-100 duration-500 lg:delay-[350ms]' : 'duration-150 lg:opacity-0',
                    )}
                  >
                    <span className="text-xl font-semibold leading-tight text-white lg:text-[clamp(1.25rem,3vh,2rem)]">
                      {service.name}
                    </span>
                    <span className="max-w-[44ch] text-sm leading-snug text-white/85 lg:text-[clamp(0.875rem,1.8vh,1.125rem)]">
                      {service.description}
                    </span>
                  </span>

                  {/* Indicador de que la franja se puede abrir (solo pantallas grandes, solo cerrada). */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute left-1/2 top-5 hidden h-8 w-8 -translate-x-1/2 items-center justify-center border border-white/60 text-white transition-opacity lg:flex',
                      isActive ? 'opacity-0 duration-150' : 'opacity-100 duration-500 delay-[350ms]',
                    )}
                  >
                    <PlusIcon size={16} weight="regular" />
                  </span>

                  {/* Nombre vertical cuando la franja está cerrada (solo pantallas grandes). */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute bottom-5 left-1/2 hidden -translate-x-1/2 rotate-180 whitespace-nowrap text-base font-semibold text-white transition-opacity [writing-mode:vertical-rl] lg:block lg:text-[clamp(1rem,2.2vh,1.375rem)]',
                      isActive ? 'opacity-0 duration-150' : 'opacity-100 duration-500 delay-[350ms]',
                    )}
                  >
                    {service.name}
                  </span>
                </button>
              </motion.li>
            )
          })}
        </ul>
      </div>
      <div aria-hidden="true" className="hidden lg:block lg:h-[clamp(2rem,8vh,6rem)]" />
    </section>
  )
}
