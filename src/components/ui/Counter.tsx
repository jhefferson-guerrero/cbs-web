import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'motion/react'

export function Counter({ to, format }: { to: number; format: (n: number) => string }) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const count = useMotionValue(0)
  const display = useTransform(count, (v) => format(Math.round(v)))

  useEffect(() => {
    if (!isInView) return
    if (reduceMotion) {
      count.set(to)
      return
    }
    const controls = animate(count, to, { duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 })
    return () => controls.stop()
  }, [isInView, to, reduceMotion, count])

  return <motion.span ref={ref}>{display}</motion.span>
}
