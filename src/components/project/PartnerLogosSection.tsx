import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'
import { partnerLogos } from '@/lib/projects'

const EASE = [0.16, 1, 0.3, 1] as const

// Logos por fila en escritorio; cada fila se desliza por su cuenta.
const PER_ROW = 5
// Cuánto se desplaza cada fila (px, a cada lado) mientras la sección cruza la pantalla.
const SLIDE_PX = 80

// Cada logo entra cuando ÉL aparece en pantalla, con un leve zoom (así, en el móvil, donde la lista es más alta
// que la pantalla, los de abajo también se animan al llegar a ellos). `custom` es el retardo: dentro de una
// misma fila van uno tras otro, de izquierda a derecha.
const tileVariants = {
  hidden: { opacity: 0, y: 34, scale: 0.94 },
  show: (delay: number) => ({ opacity: 1, y: 0, scale: 1, transition: { duration: 0.85, delay, ease: EASE } }),
}

const rows = Array.from({ length: Math.ceil(partnerLogos.length / PER_ROW) }, (_, row) =>
  partnerLogos.slice(row * PER_ROW, (row + 1) * PER_ROW),
)

export function PartnerLogosSection() {
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  // Efecto de scroll: las filas se deslizan en horizontal en sentidos contrarios mientras la sección cruza la
  // pantalla (al bajar, la primera va a la derecha y la segunda a la izquierda; al subir, al revés). Con la
  // sección centrada están en su sitio. Va ligado a la posición del scroll, así que se deshace solo.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const rowX = [
    useTransform(scrollYProgress, [0, 1], [-SLIDE_PX, SLIDE_PX]),
    useTransform(scrollYProgress, [0, 1], [SLIDE_PX, -SLIDE_PX]),
  ]

  return (
    // overflow-x-clip: una fila que se sale por un lado no debe crear scroll horizontal en la página.
    <section ref={sectionRef} className="overflow-x-clip border-t border-navy-100 bg-white">
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

        <div className="mt-8 flex flex-col gap-4 2xl:gap-6">
          {rows.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              style={reduceMotion ? undefined : { x: rowX[rowIndex % 2] }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-5"
            >
              {row.map((partner, i) => (
                <motion.div
                  key={partner.name}
                  variants={tileVariants}
                  custom={0.1 + i * 0.09}
                  initial={reduceMotion ? false : 'hidden'}
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  className="flex items-center justify-center p-5 2xl:p-7"
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
          ))}
        </div>
      </div>
    </section>
  )
}
