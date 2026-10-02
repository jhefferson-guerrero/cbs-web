import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useLenis } from 'lenis/react'
import { XIcon } from '@phosphor-icons/react'

interface LightboxProps {
  open: boolean
  onClose: () => void
  src: string
  alt: string
  /** Ancho real de la imagen: el visor nunca la muestra más grande que esto para que no se vea borrosa. */
  width: number
}

// Visor de una sola imagen a pantalla completa. Se cierra con la X, con Escape o
// haciendo clic fuera de la imagen.
export function Lightbox({ open, onClose, src, alt, width }: LightboxProps) {
  const reduceMotion = useReducedMotion()
  const lenis = useLenis()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    document.documentElement.style.overflow = 'hidden'
    lenis?.stop()
    closeRef.current?.focus()
    return () => {
      document.documentElement.style.overflow = ''
      lenis?.start()
    }
  }, [open, lenis])

  useEffect(() => {
    if (!open) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      // El visor solo tiene un elemento enfocable: se evita que Tab salte a la página de detrás.
      if (event.key === 'Tab') {
        event.preventDefault()
        closeRef.current?.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[90] flex cursor-zoom-out items-center justify-center bg-navy-950/[0.985] p-4"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-6 top-6 rounded-full p-2 text-white/80 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <XIcon size={24} weight="regular" />
          </button>

          <img
            src={src}
            alt={alt}
            style={{ width: `min(95vw, ${width}px)`, maxHeight: '90vh' }}
            className="h-auto object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
