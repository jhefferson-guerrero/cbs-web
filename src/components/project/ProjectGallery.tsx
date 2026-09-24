import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion } from 'motion/react'
import { useLenis } from 'lenis/react'
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from '@phosphor-icons/react'
import type { GalleryImage } from '@/lib/projects'

export function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const reduceMotion = useReducedMotion()
  const lenis = useLenis()
  const [active, setActive] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [loaded, setLoaded] = useState<Record<number, boolean>>({})

  const goTo = useCallback(
    (delta: number) => setActive((current) => (current + delta + images.length) % images.length),
    [images.length],
  )
  const markLoaded = (i: number) => setLoaded((prev) => (prev[i] ? prev : { ...prev, [i]: true }))
  const isLoaded = (i: number) => reduceMotion || loaded[i]

  // Alternative to pinch-zoom (disabled above via touch-none): double-tap the
  // fullscreen photo to zoom in, drag to pan while zoomed, double-tap again
  // (or switch photos / close) to reset.
  const lightboxFrameRef = useRef<HTMLDivElement>(null)
  const lastTapRef = useRef(0)
  const [zoomed, setZoomed] = useState(false)
  const zoomScale = useMotionValue(1)
  const zoomX = useMotionValue(0)
  const zoomY = useMotionValue(0)

  const resetZoom = useCallback(() => {
    setZoomed(false)
    const duration = reduceMotion ? 0 : 0.25
    animate(zoomScale, 1, { duration, ease: [0.16, 1, 0.3, 1] })
    animate(zoomX, 0, { duration, ease: [0.16, 1, 0.3, 1] })
    animate(zoomY, 0, { duration, ease: [0.16, 1, 0.3, 1] })
  }, [zoomScale, zoomX, zoomY, reduceMotion])

  const handleImageTap = useCallback(() => {
    const now = Date.now()
    const isDoubleTap = now - lastTapRef.current < 300
    lastTapRef.current = now
    if (!isDoubleTap) return

    if (zoomed) {
      resetZoom()
    } else {
      setZoomed(true)
      animate(zoomScale, 2.4, { duration: reduceMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] })
    }
  }, [zoomed, zoomScale, resetZoom, reduceMotion])

  // Reset zoom whenever the photo or open state changes, computed during
  // render (React's recommended way to reset state on a prop change) instead
  // of a useEffect, so switching photos doesn't cost an extra render pass.
  const zoomResetKey = `${lightboxOpen}-${active}`
  const [lastZoomResetKey, setLastZoomResetKey] = useState(zoomResetKey)
  if (zoomResetKey !== lastZoomResetKey) {
    setLastZoomResetKey(zoomResetKey)
    setZoomed(false)
    zoomScale.set(1)
    zoomX.set(0)
    zoomY.set(0)
  }

  // Kept separate from the keydown effect below: this one must NOT depend on
  // `active`, otherwise switching photos re-runs it and toggles the scroll
  // lock + Lenis stop/start on every navigation, which is what was causing
  // the stutter on mobile when browsing images.
  useEffect(() => {
    if (!lightboxOpen) return

    document.documentElement.style.overflow = 'hidden'
    lenis?.stop()
    return () => {
      document.documentElement.style.overflow = ''
      lenis?.start()
    }
  }, [lightboxOpen, lenis])

  useEffect(() => {
    if (!lightboxOpen) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxOpen(false)
      if (event.key === 'ArrowRight') goTo(1)
      if (event.key === 'ArrowLeft') goTo(-1)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxOpen, goTo])

  if (images.length === 0) return null

  return (
    <section className="border-t border-navy-100 bg-slate-50">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-14 lg:px-10 lg:py-16 xl:px-16 2xl:max-w-[1700px] 2xl:px-14 2xl:py-20">
        <div className="mx-auto max-w-5xl 2xl:max-w-[1450px]">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 2xl:text-sm">
            Galería del proyecto
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_auto]">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="Ver foto en pantalla completa"
            className="group relative block aspect-video w-full overflow-hidden bg-navy-950 sm:aspect-auto sm:h-[480px] 2xl:h-[700px]"
          >
            <AnimatePresence>
              <motion.img
                key={active}
                src={images[active].src}
                alt={images[active].alt}
                loading="lazy"
                onLoad={() => markLoaded(active)}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: isLoaded(active) ? 1 : 0 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </AnimatePresence>
            <span aria-hidden="true" className="absolute -right-px -top-px h-7 w-7 border-r-2 border-t-2 border-cyan-500" />
            <span aria-hidden="true" className="absolute -bottom-px -left-px h-7 w-7 border-b-2 border-l-2 border-cyan-500" />
          </button>

          {images.length > 1 && (
            <div className="scrollbar-thin hidden gap-2 overflow-y-auto sm:flex sm:flex-col sm:pr-3 sm:h-[480px] 2xl:h-[700px]">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Ver foto ${i + 1}`}
                  aria-current={i === active}
                  className={`relative flex shrink-0 items-center gap-3 p-1.5 pl-3 text-left transition-colors duration-200 ${
                    i === active ? 'bg-white' : 'hover:bg-white/70'
                  }`}
                >
                  {i === active && (
                    <motion.span
                      layoutId="gallery-rail-indicator"
                      className="absolute inset-y-0 left-0 w-0.5 bg-cyan-500"
                      transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="shrink-0 font-mono text-xs font-semibold text-cyan-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="h-16 w-24 shrink-0 overflow-hidden">
                    <img src={img.src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  </span>
                </button>
              ))}
            </div>
          )}

          {images.length > 1 && (
            <div className="grid grid-cols-3 gap-3 sm:hidden">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Ver foto ${i + 1}`}
                  aria-current={i === active}
                  className={`relative aspect-[3/2] w-full overflow-hidden transition-all duration-300 ${
                    i === active
                      ? 'ring-2 ring-cyan-500 ring-offset-2 ring-offset-slate-50'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.src} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] flex touch-none items-center justify-center bg-navy-950/95 p-6"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Cerrar galería"
              className="absolute inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+3rem)] z-20 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur-sm transition-colors hover:bg-white/15 hover:text-white sm:inset-x-auto sm:bottom-auto sm:right-[calc(env(safe-area-inset-right)+1.5rem)] sm:top-[calc(env(safe-area-inset-top)+1.5rem)] sm:mx-0 sm:h-auto sm:w-auto sm:bg-transparent sm:backdrop-blur-none sm:hover:bg-transparent"
            >
              <XIcon size={22} weight="regular" className="sm:size-6" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    goTo(-1)
                  }}
                  aria-label="Foto anterior"
                  className="absolute left-2 z-10 rounded-full p-2.5 text-white/80 transition-colors hover:text-white sm:left-6"
                >
                  <ArrowLeftIcon size={28} weight="regular" />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    goTo(1)
                  }}
                  aria-label="Foto siguiente"
                  className="absolute right-2 z-10 rounded-full p-2.5 text-white/80 transition-colors hover:text-white sm:right-6"
                >
                  <ArrowRightIcon size={28} weight="regular" />
                </button>
              </>
            )}

            <div
              ref={lightboxFrameRef}
              className="relative h-[85vh] w-full max-w-5xl"
              onClick={(event) => event.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: isLoaded(active) ? 1 : 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  src={images[active].src}
                  alt={images[active].alt}
                  decoding="async"
                  onLoad={() => markLoaded(active)}
                  onTap={handleImageTap}
                  drag={zoomed}
                  dragConstraints={lightboxFrameRef}
                  dragElastic={0.15}
                  dragMomentum={false}
                  style={{ scale: zoomScale, x: zoomX, y: zoomY }}
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
