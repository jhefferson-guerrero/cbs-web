import { motion, useReducedMotion } from 'motion/react'
import { useMediaQuery } from '@/lib/use-media-query'
import { cn } from '@/lib/utils'
import { partnerLogos } from '@/lib/projects'

const EASE = [0.16, 1, 0.3, 1] as const

// Logos por fila desde 640 px (debajo, forman una cuadrícula de 2 columnas).
const PER_ROW = 5

// Cada logo entra cuando él aparece en pantalla, en orden. `custom` es el retardo: desde 640 px crece de izquierda a
// derecha y por filas; en móvil crece línea a línea y, en cada par de dos columnas, el de la derecha entra un poco
// después que el de la izquierda. Así, aunque varios queden a la vista a la vez, siempre se ven en orden. Los logos
// quedan quietos y alineados en su cuadrícula (no hay movimiento ligado al scroll).
const tileVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: (delay: number) => ({ opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, delay, ease: EASE } }),
}

const rows = Array.from({ length: Math.ceil(partnerLogos.length / PER_ROW) }, (_, row) =>
  partnerLogos.slice(row * PER_ROW, (row + 1) * PER_ROW),
)

export function PartnerLogosSection() {
  const reduceMotion = useReducedMotion()
  const isWide = useMediaQuery('(min-width: 640px)')

  const tileDelay = (rowIndex: number, i: number) => {
    if (isWide) return rowIndex * 0.15 + i * 0.07
    const n = rowIndex * PER_ROW + i
    return Math.floor(n / 2) * 0.06 + (n % 2) * 0.03
  }

  return (
    <section className="border-t border-navy-100 bg-white">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-14 lg:px-10 lg:py-16 xl:px-16 2xl:max-w-[1700px] 2xl:px-14 2xl:py-20">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 2xl:text-sm">
          <span lang="en">Stakeholders</span>
        </p>

        {/* En móvil los grupos de 5 no existen: cada grupo es `contents` y los logos forman una sola cuadrícula de
            2 columnas (si la cantidad es impar, el último ocupa las dos columnas y queda centrado). Desde 640 px
            cada grupo es una fila de 5 repartida de borde a borde (justify-between): el primer logo queda alineado
            con el título y el último con el borde derecho, y el espacio entre logos es parejo aunque midan distinto. */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:flex sm:flex-col 2xl:gap-6">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="contents sm:flex sm:items-center sm:justify-between sm:gap-4">
              {row.map((partner, i) => (
                <motion.div
                  key={partner.name}
                  variants={tileVariants}
                  custom={tileDelay(rowIndex, i)}
                  initial={reduceMotion ? false : 'hidden'}
                  whileInView={reduceMotion ? undefined : 'show'}
                  viewport={{ once: true, amount: 0.5 }}
                  className={cn(
                    'flex items-center justify-center p-5 sm:px-0 2xl:py-7',
                    rowIndex * PER_ROW + i === partnerLogos.length - 1 && partnerLogos.length % 2 === 1 && 'col-span-2 sm:col-span-1',
                  )}
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
          ))}
        </div>
      </div>
    </section>
  )
}
