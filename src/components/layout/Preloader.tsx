import { useEffect, useState } from 'react'
import { animate, motion, useMotionValue, useReducedMotion } from 'motion/react'
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

export function Preloader({ onReady }: { onReady: () => void }) {
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

      if (reduceMotion) {
        count.set(100)
        onReady()
      } else {
        animate(count, 100, { duration: 0.35, ease: 'easeOut', onComplete: onReady })
      }
    })

    return () => {
      cancelled = true
    }
  }, [count, onReady, reduceMotion])

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="Cargando sitio"
      exit={{ opacity: 0, transition: { duration: reduceMotion ? 0.2 : 0.5, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-12 bg-navy-950"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reduceMotion ? undefined : { opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex h-36 w-52 items-center justify-center sm:h-40 sm:w-60"
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          animate={reduceMotion ? undefined : { opacity: [1, 0.45, 1] }}
          transition={{ duration: 2.2, delay: 0.7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="absolute -left-px -top-px h-10 w-10 border-l-2 border-t-2 border-cyan-500 sm:h-11 sm:w-11" />
          <span className="absolute -right-px -top-px h-10 w-10 border-r-2 border-t-2 border-cyan-500 sm:h-11 sm:w-11" />
          <span className="absolute -bottom-px -left-px h-10 w-10 border-b-2 border-l-2 border-cyan-500 sm:h-11 sm:w-11" />
          <span className="absolute -bottom-px -right-px h-10 w-10 border-b-2 border-r-2 border-cyan-500 sm:h-11 sm:w-11" />
        </motion.div>

        <div className="relative inline-block">
          <motion.div
            className="brightness-0 invert"
            initial={reduceMotion ? false : { clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={logoMobileCbs}
              alt=""
              aria-hidden="true"
              width={652}
              height={296}
              className="h-20 w-auto sm:h-24"
            />
          </motion.div>

          {!reduceMotion && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-y-0 w-px bg-cyan-400 shadow-[0_0_10px_2px_rgba(14,160,212,0.85)]"
              initial={{ left: '0%', opacity: 1 }}
              animate={{ left: '100%', opacity: [1, 1, 0] }}
              transition={{ duration: 0.6, delay: 0.25, times: [0, 0.85, 1], ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </div>
      </motion.div>

      <div aria-hidden="true" className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-3 font-mono text-sm font-semibold uppercase tracking-[0.3em] text-white">
          <span>Cargando</span>
          <span className="text-cyan-400 tabular-nums">{displayCount}%</span>
        </div>
        <div className="h-0.5 w-44 overflow-hidden bg-white/15 sm:w-52">
          <div
            className="h-full bg-cyan-500 transition-[width] duration-150 ease-out"
            style={{ width: `${displayCount}%` }}
          />
        </div>
      </div>
    </motion.div>
  )
}
