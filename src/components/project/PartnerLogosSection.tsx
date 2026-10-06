import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { partnerLogos } from '@/lib/projects'

const EASE = [0.16, 1, 0.3, 1] as const

// Los logos entran en cascada, uno tras otro, con un leve zoom: se dispara una sola vez al llegar a la sección.
const gridVariants = {
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
}
const tileVariants = {
  hidden: { opacity: 0, y: 34, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.85, ease: EASE } },
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

        <motion.div
          variants={gridVariants}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5"
        >
          {partnerLogos.map((partner) => (
            <motion.div
              key={partner.name}
              variants={tileVariants}
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
        </motion.div>
      </div>
    </section>
  )
}
