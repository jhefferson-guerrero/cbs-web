import { useEffect, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion } from 'motion/react'
import logoMobileCbs from '@/assets/images/logo-mobile-cbs.webp'

const HERO_IMAGE = '/hero-planta.webp'
const MIN_DISPLAY_MS = 900
const MAX_DISPLAY_MS = 4000

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new window.Image()
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = src
  })
}

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

export function Preloader({ onDone }: { onDone: () => void }) {
  const [isDone, setIsDone] = useState(false)
  const [displayCount, setDisplayCount] = useState(0)
  const reduceMotion = useReducedMotion()
  const count = useMotionValue(0)

  useEffect(() => {
    return count.on('change', (v) => setDisplayCount(Math.round(v)))
  }, [count])

  useEffect(() => {
    let cancelled = false

    const minTimer = wait(MIN_DISPLAY_MS)
    const maxTimer = wait(MAX_DISPLAY_MS)
    const assetsReady = Promise.all([preloadImage(HERO_IMAGE), document.fonts?.ready ?? Promise.resolve()])

    if (!reduceMotion) {
      animate(count, 92, { duration: 1.6, ease: [0.16, 1, 0.3, 1] })
    }

    Promise.race([Promise.all([assetsReady, minTimer]), maxTimer]).then(() => {
      if (cancelled) return

      const finish = () => {
        setIsDone(true)
        setTimeout(onDone, reduceMotion ? 200 : 650)
      }

      if (reduceMotion) {
        count.set(100)
        finish()
      } else {
        animate(count, 100, { duration: 0.35, ease: 'easeOut', onComplete: finish })
      }
    })

    return () => {
      cancelled = true
    }
  }, [count, onDone, reduceMotion])

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Cargando sitio"
          exit={{ opacity: 0, transition: { duration: reduceMotion ? 0.2 : 0.5, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-10 bg-navy-950"
        >
          <motion.div
            initial={reduceMotion ? false : { scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={reduceMotion ? undefined : { scale: 1.15, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-36 w-36 items-center justify-center sm:h-44 sm:w-44"
          >
            <motion.div
              aria-hidden="true"
              className="absolute inset-0"
              animate={reduceMotion ? undefined : { opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="absolute -left-px -top-px h-9 w-9 border-l-2 border-t-2 border-cyan-500" />
              <span className="absolute -right-px -top-px h-9 w-9 border-r-2 border-t-2 border-cyan-500" />
              <span className="absolute -bottom-px -left-px h-9 w-9 border-b-2 border-l-2 border-cyan-500" />
              <span className="absolute -bottom-px -right-px h-9 w-9 border-b-2 border-r-2 border-cyan-500" />
            </motion.div>

            <img src={logoMobileCbs} alt="" aria-hidden="true" className="h-16 w-auto brightness-0 invert sm:h-20" />
          </motion.div>

          <div aria-hidden="true" className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3 font-mono text-sm font-semibold uppercase tracking-[0.3em] text-navy-300">
              <span>Cargando</span>
              <span className="text-cyan-400 tabular-nums">{displayCount}%</span>
            </div>
            <div className="h-0.5 w-44 overflow-hidden bg-navy-800 sm:w-52">
              <div
                className="h-full bg-cyan-500 transition-[width] duration-150 ease-out"
                style={{ width: `${displayCount}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
