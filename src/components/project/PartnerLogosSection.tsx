import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { partnerLogos } from '@/lib/projects'

export function PartnerLogosSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="border-t border-navy-100 bg-white">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-14 lg:px-10 lg:py-16 xl:px-16 2xl:max-w-[1700px] 2xl:px-14 2xl:py-20">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 2xl:text-sm">
          Aliados y financiamiento
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {partnerLogos.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center border border-navy-100 p-6 2xl:p-8"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                className={cn(
                  'w-auto object-contain grayscale opacity-60 transition-all duration-300 hover:opacity-100 hover:grayscale-0',
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
