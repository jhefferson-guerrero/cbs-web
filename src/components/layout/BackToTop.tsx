import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useLenis } from 'lenis/react'
import { ArrowUpIcon } from '@phosphor-icons/react'

// Distancia de scroll a partir de la cual aparece (un poco menos de una pantalla).
const SHOW_AFTER_PX = 700

// Botón flotante para volver arriba. Aparece al bajar y se esconde al llegar arriba; vale para todas las
// páginas. Usa el scroll suave de Lenis para subir con el mismo movimiento que el resto del sitio.
export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const reduceMotion = useReducedMotion()
  const lenis = useLenis()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    } else {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={goTop}
          aria-label="Volver arriba"
          initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: 14, scale: 0.9 }}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-700 text-white shadow-card outline-none transition-colors duration-300 hover:bg-cyan-800 focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 active:scale-95 lg:bottom-8 lg:right-8"
        >
          <ArrowUpIcon size={20} weight="bold" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
