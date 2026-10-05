import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import experienciaPresa from '@/assets/images/experiencia-presa.webp'
import { Counter } from '@/components/ui/Counter'
import { Parallax } from '@/components/ui/Parallax'
import { withCommas } from '@/lib/utils'

type Stat = { label: string; to: number; format: (n: number) => string }

const stats: Stat[] = [
  { label: 'Redes de alcantarillado', to: 2000, format: (n) => `${withCommas(n)} km` },
  { label: 'Presas de concreto', to: 3, format: (n) => `${n}` },
  { label: 'Interceptores y líneas de impulsión', to: 40, format: (n) => `${n} km` },
  { label: 'Conexiones domiciliarias', to: 150000, format: (n) => withCommas(n) },
]

export function Experiencia() {
  const reduceMotion = useReducedMotion()
  const [inView, setInView] = useState(false)
  const show = reduceMotion || inView

  return (
    <section id="experiencia" className="relative isolate overflow-hidden bg-navy-950">
      <Parallax>
      <motion.img
        src={experienciaPresa}
        alt=""
        aria-hidden="true"
        width={1376}
        height={768}
        loading="lazy"
        decoding="async"
        initial={reduceMotion ? false : { scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="h-full w-full object-cover object-center saturate-[1.05] contrast-[1.02] brightness-[0.85]"
      />
      </Parallax>
      <div className="absolute inset-0 bg-navy-950/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-transparent to-navy-950/40" />

      <span aria-hidden="true" className="absolute right-6 top-6 h-6 w-6 border-r-2 border-t-2 border-white/70 lg:right-9 lg:top-9 lg:h-7 lg:w-7" />
      <span aria-hidden="true" className="absolute bottom-6 left-6 h-6 w-6 border-b-2 border-l-2 border-white/70 lg:bottom-9 lg:left-9 lg:h-7 lg:w-7" />

      <motion.div
        viewport={{ once: true, amount: 0.3 }}
        onViewportEnter={() => setInView(true)}
        className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-14 px-6 py-20 sm:gap-12 sm:py-14 lg:min-h-[calc(100svh-4rem)] lg:translate-y-[min(5rem,max(0px,calc(14vh_-_4.5rem)))] lg:justify-center lg:gap-[clamp(3rem,10vh,7rem)] lg:px-10 lg:py-16 xl:px-16 2xl:max-w-[1700px] 2xl:min-h-[calc(100svh-5rem)] 2xl:px-14 2xl:py-20"
      >
        <div>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400 2xl:text-base"
          >
            Nuestra Experiencia
          </motion.p>
          <motion.h2
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-2xl text-3xl font-bold leading-tight text-white sm:mt-4 md:text-4xl 2xl:text-5xl"
          >
            Resultados que respaldan cada proyecto
          </motion.h2>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-lg text-[15.5px] leading-relaxed text-navy-200 sm:mt-5 2xl:max-w-xl 2xl:text-lg"
          >
            Infraestructura hidráulica ejecutada a gran escala en Perú, con un historial que se mide en
            kilómetros de redes, presas construidas y conexiones entregadas.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 border-t border-white/15 pt-12 sm:grid-cols-4 sm:gap-y-10 sm:pt-10 sm:divide-x sm:divide-white/15">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-2 sm:px-6 sm:first:pl-0 sm:last:pr-0"
            >
              <p className="font-mono text-2xl font-bold tabular-nums text-white sm:text-3xl xl:text-4xl 2xl:text-5xl">
                <Counter to={stat.to} format={stat.format} />
              </p>
              <p className="text-sm leading-snug text-navy-200 2xl:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
