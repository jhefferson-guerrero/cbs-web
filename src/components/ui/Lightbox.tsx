import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useLenis } from 'lenis/react'
import { ArrowsInIcon, MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon, XIcon } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface LightboxProps {
  open: boolean
  onClose: () => void
  src: string
  alt: string
  /** Medidas reales de la imagen: el visor nunca la muestra más grande que su ancho para que no se vea borrosa, y con ellas calcula el zoom máximo. */
  width: number
  height: number
}

interface View {
  scale: number
  x: number
  y: number
}

const FIT_VIEW: View = { scale: 1, x: 0, y: 0 }
// Un movimiento menor a esto (px) se considera un clic, no un arrastre.
const DRAG_THRESHOLD = 4
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

// Visor de una sola imagen a pantalla completa con zoom: la rueda del mouse acerca y aleja (hacia donde apunta
// el cursor), un clic acerca o vuelve al tamaño completo, y con la imagen ampliada se arrastra con el botón
// izquierdo para recorrerla. También tiene botones de zoom y atajos de teclado (+, -, 0 y flechas). Se cierra con
// la X, con Escape o haciendo clic fuera de la imagen.
function LightboxViewer({ onClose, src, alt, width, height }: Omit<LightboxProps, 'open'>) {
  const reduceMotion = useReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const dragRef = useRef<{ pointerX: number; pointerY: number; originX: number; originY: number; moved: boolean } | null>(null)
  // La vista vive también en una ref: los manejadores nativos (rueda, teclado) necesitan siempre el valor más reciente.
  const viewRef = useRef<View>(FIT_VIEW)
  const [view, setViewState] = useState<View>(FIT_VIEW)
  const [dragging, setDragging] = useState(false)
  // Zoom máximo ya medido (depende del tamaño al que quedó ajustada la imagen); solo sirve para desactivar el botón de acercar.
  const [maxScale, setMaxScale] = useState(2)

  const setView = useCallback((next: View) => {
    viewRef.current = next
    setViewState(next)
  }, [])

  // Zoom máximo: nunca menos del doble, y hasta una vez y media el tamaño real de la imagen (más allá solo se vería borrosa).
  const getMaxScale = useCallback(() => {
    const fitted = imgRef.current?.offsetWidth ?? width
    return Math.min(6, Math.max(2, (1.5 * width) / fitted))
  }, [width])

  // Con la imagen más chica que la pantalla se centra; más grande, no se puede arrastrar más allá de sus bordes.
  const clampView = useCallback((next: View): View => {
    const stage = stageRef.current
    const img = imgRef.current
    if (!stage || !img || next.scale <= 1) return { scale: Math.max(1, next.scale), x: 0, y: 0 }
    const maxX = Math.max(0, (img.offsetWidth * next.scale - stage.clientWidth) / 2)
    const maxY = Math.max(0, (img.offsetHeight * next.scale - stage.clientHeight) / 2)
    return { scale: next.scale, x: clamp(next.x, -maxX, maxX), y: clamp(next.y, -maxY, maxY) }
  }, [])

  // Cambia el zoom manteniendo fijo el punto de la imagen que está bajo (clientX, clientY).
  const zoomTo = useCallback(
    (nextScale: number, clientX?: number, clientY?: number) => {
      const stage = stageRef.current
      if (!stage) return
      const current = viewRef.current
      const scale = clamp(nextScale, 1, getMaxScale())
      const rect = stage.getBoundingClientRect()
      const px = (clientX ?? rect.left + rect.width / 2) - (rect.left + rect.width / 2)
      const py = (clientY ?? rect.top + rect.height / 2) - (rect.top + rect.height / 2)
      const ratio = scale / current.scale
      setView(clampView({ scale, x: px - (px - current.x) * ratio, y: py - (py - current.y) * ratio }))
    },
    [clampView, getMaxScale, setView],
  )

  // Tamaño al que se acerca con un clic: el real de la imagen (1 píxel de la imagen = 1 píxel de pantalla), o el
  // doble si ya es casi ese.
  const getClickScale = useCallback(() => {
    const fitted = imgRef.current?.offsetWidth ?? width
    return Math.min(getMaxScale(), Math.max(2, width / fitted))
  }, [getMaxScale, width])

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  // La rueda se registra a mano (no con onWheel de React): debe poder cancelar el scroll de la página.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      const delta = event.deltaMode === 1 ? event.deltaY * 33 : event.deltaY
      zoomTo(viewRef.current.scale * Math.exp(-delta * 0.0015), event.clientX, event.clientY)
    }
    stage.addEventListener('wheel', onWheel, { passive: false })
    return () => stage.removeEventListener('wheel', onWheel)
  }, [zoomTo])

  useEffect(() => {
    const onResize = () => {
      setView(clampView(viewRef.current))
      setMaxScale(getMaxScale())
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [clampView, getMaxScale, setView])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const { scale, x, y } = viewRef.current
      if (event.key === 'Escape') onClose()
      else if (event.key === '+' || event.key === '=') zoomTo(scale * 1.5)
      else if (event.key === '-' || event.key === '_') zoomTo(scale / 1.5)
      else if (event.key === '0') setView(FIT_VIEW)
      else if (scale > 1 && event.key.startsWith('Arrow')) {
        event.preventDefault()
        const step = 80
        const dx = event.key === 'ArrowLeft' ? step : event.key === 'ArrowRight' ? -step : 0
        const dy = event.key === 'ArrowUp' ? step : event.key === 'ArrowDown' ? -step : 0
        setView(clampView({ scale, x: x + dx, y: y + dy }))
      } else if (event.key === 'Tab') {
        // El foco se queda dentro del visor: se cicla entre sus botones.
        const buttons = Array.from(stageRef.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? [])
        if (buttons.length === 0) return
        event.preventDefault()
        const index = buttons.indexOf(document.activeElement as HTMLButtonElement)
        buttons[(index + (event.shiftKey ? -1 : 1) + buttons.length) % buttons.length].focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [clampView, onClose, setView, zoomTo])

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return
    event.currentTarget.setPointerCapture(event.pointerId)
    const { x, y } = viewRef.current
    dragRef.current = { pointerX: event.clientX, pointerY: event.clientY, originX: x, originY: y, moved: false }
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag) return
    const dx = event.clientX - drag.pointerX
    const dy = event.clientY - drag.pointerY
    if (!drag.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return
    drag.moved = true
    if (viewRef.current.scale <= 1) return
    setDragging(true)
    setView(clampView({ scale: viewRef.current.scale, x: drag.originX + dx, y: drag.originY + dy }))
  }

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    dragRef.current = null
    setDragging(false)
    if (!drag || drag.moved) return
    // Un clic sin arrastrar: acerca hacia ese punto, o vuelve al tamaño completo si ya estaba ampliada.
    if (viewRef.current.scale > 1.01) setView(FIT_VIEW)
    else zoomTo(getClickScale(), event.clientX, event.clientY)
  }

  const zoomed = view.scale > 1.01
  const toolbarButton =
    'flex h-10 w-10 items-center justify-center rounded-full text-white/85 outline-none transition-colors hover:bg-white/15 hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:pointer-events-none disabled:opacity-35'

  return (
    <motion.div
      ref={stageRef}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.25 }}
      // Un clic en el fondo (fuera de la imagen) cierra el visor.
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      className="fixed inset-0 z-[90] flex touch-none items-center justify-center overflow-hidden bg-navy-950/[0.985] p-4"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute right-6 top-6 z-10 rounded-full p-2 text-white/80 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-400"
      >
        <XIcon size={24} weight="regular" />
      </button>

      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})`,
          // Sin transición mientras se arrastra (debe seguir al dedo/mouse); con ella, el zoom se desliza suave.
          transition: dragging || reduceMotion ? 'none' : 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={cn('select-none will-change-transform', dragging ? 'cursor-grabbing' : zoomed ? 'cursor-grab' : 'cursor-zoom-in')}
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          draggable={false}
          // Ajustada a la pantalla (95% del ancho y 86% del alto, sin pasar de su tamaño real).
          style={{ width: `min(95vw, calc(86vh * ${width / height}), ${width}px)` }}
          className="block h-auto max-w-none"
        />
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-3">
        <p
          aria-hidden="true"
          className={cn(
            'rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm transition-opacity duration-300',
            zoomed ? 'opacity-100' : 'opacity-0',
          )}
        >
          Arrastra para moverte por el mapa
        </p>
        <div className="flex items-center gap-1 rounded-full bg-white/10 p-1 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => zoomTo(view.scale / 1.5)}
            disabled={!zoomed}
            aria-label="Alejar"
            className={toolbarButton}
          >
            <MagnifyingGlassMinusIcon size={22} weight="regular" />
          </button>
          <span aria-live="polite" className="w-14 text-center font-mono text-sm font-semibold tabular-nums text-white">
            {Math.round(view.scale * 100)}%
          </span>
          <button
            type="button"
            onClick={() => zoomTo(view.scale * 1.5)}
            disabled={view.scale >= maxScale - 0.01}
            aria-label="Acercar"
            className={toolbarButton}
          >
            <MagnifyingGlassPlusIcon size={22} weight="regular" />
          </button>
          <button
            type="button"
            onClick={() => setView(FIT_VIEW)}
            disabled={!zoomed}
            aria-label="Ajustar a la pantalla"
            className={toolbarButton}
          >
            <ArrowsInIcon size={22} weight="regular" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export function Lightbox({ open, onClose, src, alt, width, height }: LightboxProps) {
  const lenis = useLenis()

  useEffect(() => {
    if (!open) return

    document.documentElement.style.overflow = 'hidden'
    lenis?.stop()
    return () => {
      document.documentElement.style.overflow = ''
      lenis?.start()
    }
  }, [open, lenis])

  // El visor se monta de nuevo cada vez que se abre, así siempre empieza ajustado a la pantalla.
  return (
    <AnimatePresence>
      {open && <LightboxViewer onClose={onClose} src={src} alt={alt} width={width} height={height} />}
    </AnimatePresence>
  )
}
