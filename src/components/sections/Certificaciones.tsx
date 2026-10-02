import { motion, useReducedMotion } from 'motion/react'
import { certifications } from '@/lib/certifications'
import { cn } from '@/lib/utils'

export function Certificaciones() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="bg-white">
      <div id="certificaciones" className="lg:flex lg:min-h-[calc(100svh-var(--nav-h))] lg:items-center">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-16 lg:px-10 lg:py-[clamp(1.75rem,5vh,4rem)] xl:px-16 2xl:max-w-[1700px] 2xl:px-14">
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
            <h2 className="mt-4 text-3xl font-bold leading-tight text-navy-900 md:text-4xl lg:mt-[clamp(0.25rem,1vh,0.75rem)] lg:text-[clamp(2.25rem,6vh,3.75rem)]">
              Certificaciones internacionales
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700 lg:mt-[clamp(0.25rem,1vh,0.75rem)] lg:text-[clamp(15.5px,2.1vh,21px)]">
              Cumplimos con los estándares internacionales de gestión, calidad y seguridad que exige la
              industria, respaldando cada proyecto que ejecutamos.
            </p>
          </motion.div>

          {/* Cinco normas: en tablet 3 + 2 (sin celdas vacías) y en pantallas grandes una fila de cinco con
              proporción fija, centrada en la sección. */}
          <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6 lg:mt-[clamp(1.5rem,5.5vh,4rem)] lg:grid-cols-5 lg:gap-[var(--cert-gap)] lg:[container-type:inline-size] [--cert-gap:clamp(0.75rem,1.4vw,1.5rem)]">
            {certifications.map((cert, i) => (
              <motion.li
                key={cert.number}
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: 'spring', stiffness: 70, damping: 18, delay: i * 0.08 }}
                className={cn(
                  'relative flex flex-col justify-between gap-10 bg-navy-950 p-6 lg:gap-4 lg:p-[clamp(1.25rem,2.4vh,2rem)]',
                  i < 3 ? 'md:col-span-2' : 'md:col-span-3',
                  'lg:col-span-1 lg:min-h-[calc((100cqw-4*var(--cert-gap))/5*1.5)]',
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

                <p className="text-sm leading-relaxed text-navy-200 lg:text-[clamp(0.8125rem,1.7vh,1rem)]">{cert.description}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
