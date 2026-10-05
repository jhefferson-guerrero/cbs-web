import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

interface ParallaxProps {
  children: ReactNode
  /** Cuánto se desplaza la imagen, en % de la altura del marco (arriba y abajo). */
  travel?: number
  className?: string
}

// Marco que recorta una imagen de fondo y la mueve más lento que la página: al bajar, la foto
// "se queda atrás"; al subir, vuelve. El movimiento va ligado a la posición del scroll, no a un
// disparo único. La capa interior es más alta que el marco (travel% de sobra arriba y abajo)
// para que nunca asome un borde vacío. Con "reducir movimiento" la imagen queda quieta.
export function Parallax({ children, travel = 14, className = 'absolute inset-0' }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  // La capa mide (100 + 2·travel)% del marco; mover ±travel% del marco equivale a este % de la capa.
  const shift = (travel / (100 + 2 * travel)) * 100
  const y = useTransform(scrollYProgress, [0, 1], [`-${shift}%`, `${shift}%`])

  return (
    <div ref={ref} className={`${className} overflow-hidden`}>
      <motion.div
        style={{ top: `-${travel}%`, bottom: `-${travel}%`, y: reduceMotion ? 0 : y }}
        className="absolute inset-x-0"
      >
        {children}
      </motion.div>
    </div>
  )
}
