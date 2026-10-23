import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'motion/react'

// `duration` y `delay` (segundos): por defecto el conteo es pausado (cifras grandes de la Home); la ficha de un proyecto usa uno más corto.
export function Counter({
  to,
  format,
  duration = 2.2,
  delay = 0.4,
}: {
  to: number
  format: (n: number) => string
  duration?: number
  delay?: number
}) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  // En el servidor (HTML prerrenderizado que leen los buscadores) se escribe la cifra final; en el navegador arranca en 0
  // y cuenta hasta ella al aparecer.
  const count = useMotionValue(typeof window === 'undefined' ? to : 0)
  const display = useTransform(count, (v) => format(Math.round(v)))

  useEffect(() => {
    if (!isInView) return
    if (reduceMotion) {
      count.set(to)
      return
    }
    const controls = animate(count, to, { duration, ease: [0.16, 1, 0.3, 1], delay })
    return () => controls.stop()
  }, [isInView, to, reduceMotion, count, duration, delay])

  return <motion.span ref={ref}>{display}</motion.span>
}
