import { motion, useReducedMotion } from 'motion/react'
import { aboutImage } from '@/lib/limp-city'

export function LimpCityAbout() {
  const reduceMotion = useReducedMotion()

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    <section className="bg-white">
      {/* Espacio de respiro arriba y abajo, fuera del bloque de una vista. */}
      <div aria-hidden="true" className="hidden lg:block lg:h-[clamp(2rem,8vh,6rem)]" />
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-12 px-6 py-16 lg:min-h-[calc(100svh-var(--nav-h))] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-[clamp(3rem,6vw,7rem)] lg:px-10 lg:py-[clamp(1.5rem,6vh,5rem)] xl:px-16 2xl:max-w-[1700px] 2xl:px-14">
        <div>
          <motion.p
            {...reveal()}
            aria-hidden="true"
            className="font-mono text-[3.75rem] sm:text-[5rem] lg:text-[clamp(5rem,18vh,13rem)] font-bold leading-[0.85] tracking-tighter text-transparent [-webkit-text-stroke:2px_var(--color-moss-500)] lg:[-webkit-text-stroke:2.5px_var(--color-moss-500)]"
          >
            2012
          </motion.p>
          <motion.h2
            {...reveal(0.1)}
            className="mt-[clamp(1rem,3vh,2.5rem)] max-w-[22ch] text-[1.5rem] sm:text-[1.875rem] lg:text-[clamp(1.75rem,5.4vh,4rem)] font-semibold leading-[1.1] tracking-tight text-navy-900 sm:max-w-[30ch]"
          >
            Cuando muchos lo consideran el final de la cadena productiva, para Limp City es{' '}
            <span className="text-moss-700">apenas el comienzo.</span>
          </motion.h2>
          <motion.p
            {...reveal(0.2)}
            className="mt-[clamp(1rem,2.6vh,2rem)] max-w-[64ch] text-[15.5px] leading-relaxed text-slate-700 lg:text-[clamp(15.5px,2.1vh,22px)]"
          >
            Fundada en 2012, Limp City presta servicios de limpieza urbana y manejo adecuado de
            residuos sólidos, con soluciones sostenibles y ambientalmente adecuadas, y tiene como
            base fundamental la Ley 14.026, que actualiza el Marco Legal del Saneamiento Básico.
          </motion.p>
        </div>

        <motion.div
          {...reveal(0.15)}
          className="relative isolate mx-auto w-full max-w-sm lg:mx-0 lg:ml-auto lg:aspect-[626/720] lg:h-[min(74vh,46rem)] lg:w-auto lg:max-w-none"
        >
          <span aria-hidden="true" className="absolute -bottom-4 -right-4 -z-10 h-full w-full border-[2.5px] border-moss-500 lg:-bottom-5 lg:-right-5" />
          <div className="relative aspect-[626/720] w-full overflow-hidden bg-navy-950 lg:aspect-auto lg:h-full">
            <img
              src={aboutImage}
              alt="Tres operarios de Limp City con chaleco y uniforme verde barriendo junto a un sumidero, con una carretilla naranja"
              width={1264}
              height={842}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-[48%_50%]"
            />
            <span aria-hidden="true" className="absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-white/80" />
            <span aria-hidden="true" className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-white/80" />
          </div>
        </motion.div>
      </div>
      <div aria-hidden="true" className="hidden lg:block lg:h-[clamp(2rem,8vh,6rem)]" />
    </section>
  )
}
