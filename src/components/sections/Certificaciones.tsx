import { motion, useReducedMotion } from 'motion/react'
import { SealCheckIcon } from '@phosphor-icons/react'
import { certifications } from '@/lib/certifications'
import { cn } from '@/lib/utils'

export function Certificaciones() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="bg-white">
      {/* Espacio blanco de respiro arriba y abajo, fuera del ancla (#certificaciones está en
          el bloque del medio): al pulsar "Certificaciones" en el menú no se ve, solo al
          recorrer la página con scroll. */}
      <div aria-hidden="true" className="hidden lg:block lg:h-[clamp(2rem,8vh,6rem)]" />
      <div id="certificaciones" className="lg:h-[calc(100svh-var(--nav-h))] lg:min-h-[540px]">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-16 lg:flex lg:h-full lg:flex-col lg:px-10 lg:py-[clamp(1rem,3.5vh,3rem)] xl:px-16 2xl:max-w-[1700px] 2xl:px-14">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl lg:max-w-4xl"
          >
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 2xl:text-sm">
              Calidad certificada
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-navy-900 md:text-4xl lg:mt-[clamp(0.25rem,1vh,0.75rem)] lg:text-[clamp(2.25rem,5vh,3.25rem)]">
              Certificaciones internacionales
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700 lg:mt-[clamp(0.25rem,1vh,0.75rem)] lg:text-[clamp(15.5px,1.9vh,19px)]">
              Cumplimos con los estándares internacionales de gestión, calidad y seguridad que exige la
              industria, respaldando cada proyecto que ejecutamos.
            </p>
          </motion.div>

          {/* Cinco normas: en tablet 3 + 2 (sin celdas vacías) y en pantallas grandes una fila de cinco que
              llena el alto de la sección. */}
          <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6 lg:mt-[clamp(0.75rem,2.5vh,2.5rem)] lg:min-h-0 lg:flex-1 lg:grid-cols-5 lg:grid-rows-[minmax(0,1fr)] lg:gap-[clamp(0.75rem,1.4vw,1.5rem)]">
            {certifications.map((cert, i) => (
              <motion.li
                key={cert.number}
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: 'spring', stiffness: 70, damping: 18, delay: i * 0.08 }}
                className={cn(
                  'relative flex min-h-0 flex-col justify-between gap-10 bg-navy-950 p-6 lg:gap-4 lg:p-[clamp(1.25rem,2.4vh,2rem)]',
                  i < 3 ? 'md:col-span-2' : 'md:col-span-3',
                  'lg:col-span-1',
                )}
              >
                <span aria-hidden="true" className="absolute -left-px -top-px h-5 w-5 border-l-2 border-t-2 border-cyan-500" />
                <span aria-hidden="true" className="absolute -right-px -top-px h-5 w-5 border-r-2 border-t-2 border-cyan-500" />
                <span aria-hidden="true" className="absolute -bottom-px -left-px h-5 w-5 border-b-2 border-l-2 border-cyan-500" />
                <span aria-hidden="true" className="absolute -bottom-px -right-px h-5 w-5 border-b-2 border-r-2 border-cyan-500" />

                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 2xl:text-sm">ISO</p>
                  <p className="mt-2 font-mono text-5xl font-bold tabular-nums leading-none text-white lg:text-[clamp(1.75rem,3.2vw,4.25rem)]">
                    {cert.number}
                  </p>
                  <h3 className="mt-4 text-lg font-semibold leading-snug text-white lg:mt-[clamp(0.75rem,2vh,1.5rem)] lg:text-[clamp(1rem,2.2vh,1.375rem)]">
                    {cert.name}
                  </h3>
                </div>

                {/* Marca de agua decorativa que ocupa el hueco central en pantallas grandes (en móvil y tablet las
                    tarjetas son bajas y no hay hueco). Reemplazable por el sello oficial de cada norma. */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 justify-center lg:flex">
                  <span className="block h-[clamp(4rem,11vh,8rem)] w-[clamp(4rem,11vh,8rem)] text-cyan-400/30">
                    <SealCheckIcon size="100%" weight="thin" />
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-navy-200 lg:text-[clamp(0.8125rem,1.7vh,1rem)]">{cert.description}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
      <div aria-hidden="true" className="hidden lg:block lg:h-[clamp(2rem,8vh,6rem)]" />
    </section>
  )
}
