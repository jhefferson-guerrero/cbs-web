import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useLenis } from 'lenis/react'
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from '@phosphor-icons/react'
import type { GalleryImage } from '@/lib/projects'

export function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const reduceMotion = useReducedMotion()
  const lenis = useLenis()
  const [active, setActive] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [loaded, setLoaded] = useState<Record<number, boolean>>({})

  const goTo = (i: number) => setActive((i + images.length) % images.length)
  const markLoaded = (i: number) => setLoaded((prev) => (prev[i] ? prev : { ...prev, [i]: true }))
  const isLoaded = (i: number) => reduceMotion || loaded[i]

  useEffect(() => {
    if (!lightboxOpen) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxOpen(false)
      if (event.key === 'ArrowRight') goTo(active + 1)
      if (event.key === 'ArrowLeft') goTo(active - 1)
    }

    window.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    lenis?.stop()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
      lenis?.start()
    }
  }, [lightboxOpen, active, images.length, lenis])

  if (images.length === 0) return null

  return (
    <section className="border-t border-navy-100 bg-slate-50">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-14 lg:px-10 lg:py-16 xl:px-16 2xl:max-w-[1700px] 2xl:px-14 2xl:py-20">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 2xl:text-sm">
          Galería del proyecto
        </p>

        <div className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-[1fr_auto]">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="Ver foto en pantalla completa"
            className="group relative block aspect-video w-full overflow-hidden bg-navy-950 sm:aspect-auto sm:h-[480px] 2xl:h-[560px]"
          >
            <AnimatePresence>
              <motion.img
                key={active}
                src={images[active].src}
                alt={images[active].alt}
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
            <div className="scrollbar-thin hidden gap-2 overflow-y-auto sm:flex sm:flex-col sm:pr-3 sm:h-[480px] 2xl:h-[560px]">
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
                    <img src={img.src} alt="" className="h-full w-full object-cover" />
                  </span>
                </button>
              ))}
            </div>
          )}

          {images.length > 1 && (
            <div className="flex flex-wrap gap-3 sm:hidden">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Ver foto ${i + 1}`}
                  aria-current={i === active}
                  className={`h-16 w-24 shrink-0 overflow-hidden transition-all duration-300 ${
                    i === active
                      ? 'ring-2 ring-cyan-500 ring-offset-2 ring-offset-slate-50'
                      : 'opacity-60 hover:scale-[1.04] hover:opacity-100'
                  }`}
                >
                  <img src={img.src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-navy-950/95 p-6"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Cerrar galería"
              className="absolute right-6 top-6 text-white/80 transition-colors hover:text-white"
            >
              <XIcon size={28} weight="regular" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    goTo(active - 1)
                  }}
                  aria-label="Foto anterior"
                  className="absolute left-4 text-white/80 transition-colors hover:text-white sm:left-8"
                >
                  <ArrowLeftIcon size={28} weight="regular" />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    goTo(active + 1)
                  }}
                  aria-label="Foto siguiente"
                  className="absolute right-4 text-white/80 transition-colors hover:text-white sm:right-8"
                >
                  <ArrowRightIcon size={28} weight="regular" />
                </button>
              </>
            )}

            <div
              className="relative h-[85vh] w-full max-w-5xl"
              onClick={(event) => event.stopPropagation()}
            >
              <AnimatePresence>
                <motion.img
                  key={active}
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: isLoaded(active) ? 1 : 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  src={images[active].src}
                  alt={images[active].alt}
                  onLoad={() => markLoaded(active)}
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
