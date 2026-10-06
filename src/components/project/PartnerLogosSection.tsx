import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useMediaQuery } from '@/lib/use-media-query'
import { cn } from '@/lib/utils'
import { partnerLogos } from '@/lib/projects'

const EASE = [0.16, 1, 0.3, 1] as const

// Logos por fila en escritorio; cada fila se desliza por su cuenta.
const PER_ROW = 5
// Cuánto se desplaza cada fila (px, a cada lado) mientras la sección cruza la pantalla.
const SLIDE_PX = 80

// Solo en móvil: cada logo entra cuando él aparece en pantalla, en orden conforme se va bajando. `custom` es el
// retardo: crece línea a línea (de arriba hacia abajo) y, en cada par de dos columnas, el de la derecha entra un
// poco después que el de la izquierda; así, aunque varios queden a la vista a la vez, se ven en orden.
const tileVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: (delay: number) => ({ opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, delay, ease: EASE } }),
}

const rows = Array.from({ length: Math.ceil(partnerLogos.length / PER_ROW) }, (_, row) =>
  partnerLogos.slice(row * PER_ROW, (row + 1) * PER_ROW),
)

export function PartnerLogosSection() {
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  // Desde 640 px (la cuadrícula pasa a 5 columnas) las filas se deslizan con el scroll y los logos no tienen
  // entrada; en móvil es al revés: sin efecto de scroll, y los logos aparecen en orden al bajar.
  const isWide = useMediaQuery('(min-width: 640px)')
  const slides = isWide && !reduceMotion
  const entrance = !isWide && !reduceMotion

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
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 2xl:text-sm">
          Aliados
        </p>

        {/* En móvil los grupos de 5 no existen: cada grupo es `contents` y los 10 logos forman una sola cuadrícula
            de 2 columnas (5 líneas completas; con grupos de 5 quedaban dos logos solos). Desde 640 px cada grupo
            es una fila de 5 que se desliza por su cuenta. */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:flex sm:flex-col 2xl:gap-6">
          {rows.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              style={slides ? { x: rowX[rowIndex % 2] } : undefined}
              className="contents sm:grid sm:grid-cols-5 sm:gap-4"
            >
              {row.map((partner, i) => (
                <motion.div
                  key={partner.name}
                  variants={tileVariants}
                  custom={Math.floor((rowIndex * PER_ROW + i) / 2) * 0.12 + ((rowIndex * PER_ROW + i) % 2) * 0.06}
                  initial={entrance ? 'hidden' : false}
                  whileInView={entrance ? 'show' : undefined}
                  viewport={{ once: true, amount: 0.5 }}
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
