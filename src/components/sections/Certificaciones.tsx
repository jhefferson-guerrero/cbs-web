import { motion, useReducedMotion } from 'motion/react'
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
        <div className="mx-auto w-full max-w-[1400px] px-6 py-16 lg:grid lg:h-full lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-[clamp(2rem,5vw,6rem)] lg:px-10 lg:py-[clamp(1rem,3.5vh,3rem)] xl:px-16 2xl:max-w-[1700px] 2xl:px-14">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 2xl:text-sm">
              Calidad certificada
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-navy-900 md:text-4xl lg:mt-[clamp(0.5rem,1.6vh,1rem)] lg:text-[clamp(2.25rem,5.2vh,3.75rem)]">
              Certificaciones internacionales
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700 lg:mt-[clamp(0.75rem,2vh,1.5rem)] lg:text-[clamp(15.5px,2.1vh,21px)]">
              Cumplimos con los estándares internacionales de gestión, calidad y seguridad que exige la
              industria, respaldando cada proyecto que ejecutamos.
            </p>
          </motion.div>

          {/* Cinco normas. Móvil: una por fila. Tablet: 3 + 2 (sin celdas vacías). Escritorio: cinco filas
              anchas y bajas apiladas a la derecha, que llenan el alto de la sección sin alargarse. */}
          <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6 lg:mt-0 lg:h-full lg:min-h-0 lg:grid-cols-1 lg:grid-rows-5 lg:gap-[clamp(0.5rem,1.4vh,1.25rem)]">
            {certifications.map((cert, i) => (
              <motion.li
                key={cert.number}
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: 'spring', stiffness: 70, damping: 18, delay: i * 0.08 }}
                className={cn(
                  'relative flex min-h-0 flex-col bg-navy-950 p-6',
                  i < 3 ? 'md:col-span-2' : 'md:col-span-3',
                  'lg:col-span-1 lg:grid lg:grid-cols-[clamp(7.5rem,17vh,12rem)_minmax(0,1fr)] lg:grid-rows-[auto_auto] lg:content-center lg:items-center lg:gap-x-[clamp(1.25rem,2.6vw,3rem)] lg:gap-y-1 lg:px-[clamp(1.25rem,2.4vw,2.5rem)] lg:py-2',
                )}
              >
                <span aria-hidden="true" className="absolute -left-px -top-px h-5 w-5 border-l-2 border-t-2 border-cyan-500" />
                <span aria-hidden="true" className="absolute -right-px -top-px h-5 w-5 border-r-2 border-t-2 border-cyan-500" />
                <span aria-hidden="true" className="absolute -bottom-px -left-px h-5 w-5 border-b-2 border-l-2 border-cyan-500" />
                <span aria-hidden="true" className="absolute -bottom-px -right-px h-5 w-5 border-b-2 border-r-2 border-cyan-500" />

                <div className="lg:row-span-2">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 2xl:text-sm">ISO</p>
                  <p className="mt-2 font-mono text-5xl font-bold tabular-nums leading-none text-white lg:text-[clamp(2rem,5.2vh,3.75rem)]">
                    {cert.number}
                  </p>
                </div>

                <h3 className="mt-4 text-lg font-semibold leading-snug text-white lg:mt-0 lg:self-end lg:text-[clamp(1.05rem,2.5vh,1.6rem)]">
                  {cert.name}
                </h3>

                <p className="mt-auto pt-8 text-sm leading-relaxed text-navy-200 lg:mt-0 lg:self-start lg:pt-0 lg:text-[clamp(0.875rem,1.9vh,1.15rem)]">
                  {cert.description}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
      <div aria-hidden="true" className="hidden lg:block lg:h-[clamp(2rem,8vh,6rem)]" />
    </section>
  )
}
