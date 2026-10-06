import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { partnerLogos } from '@/lib/projects'

const EASE = [0.16, 1, 0.3, 1] as const

// Cada logo entra cuando ÉL aparece en pantalla, con un leve zoom (así, en el móvil, donde la lista es más alta
// que la pantalla, los de abajo también se animan al llegar a ellos). `custom` es el retardo: dentro de una
// misma fila van uno tras otro, de izquierda a derecha.
const tileVariants = {
  hidden: { opacity: 0, y: 34, scale: 0.94 },
  show: (delay: number) => ({ opacity: 1, y: 0, scale: 1, transition: { duration: 0.85, delay, ease: EASE } }),
}

export function PartnerLogosSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="border-t border-navy-100 bg-white">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-14 lg:px-10 lg:py-16 xl:px-16 2xl:max-w-[1700px] 2xl:px-14 2xl:py-20">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 2xl:text-sm"
        >
          Aliados y financiamiento
        </motion.p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {partnerLogos.map((partner, i) => (
            <motion.div
              key={partner.name}
              variants={tileVariants}
              custom={0.1 + (i % 5) * 0.09}
              initial={reduceMotion ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="flex items-center justify-center border border-navy-100 p-5 2xl:p-7"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                className={cn(
                  'w-auto object-contain',
                  partner.large ? 'h-14 2xl:h-16' : 'h-12 2xl:h-14',
                )}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
