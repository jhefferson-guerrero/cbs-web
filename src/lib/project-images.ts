import { isConnectionConstrained } from '@/lib/connection'
import { projects } from '@/lib/projects'

// Tamaños reales de las portadas en la sección Proyectos de la Home (atributo `sizes`). Los usan tanto las <img> de la
// sección como la precarga de aquí abajo: con el mismo `sizes` y `srcset` el navegador elige la MISMA variante en los
// dos lados, así lo que se precarga es justo lo que luego se pinta. Celular: la foto grande ocupa todo el ancho y las
// miniaturas un tercio. Escritorio: la franja abierta ocupa poco más de la mitad del ancho.
export const COVER_FEATURE_SIZES = '100vw'
export const COVER_THUMB_SIZES = '34vw'
export const COVER_STRIP_SIZES = '55vw'
export const DESKTOP_QUERY = '(min-width: 1024px)'

// Imágenes ya calentadas: mientras el objeto exista, el navegador conserva su versión decodificada en memoria y la
// sección la reutiliza al entrar, sin decodificar de nuevo.
const warmedImages: HTMLImageElement[] = []

// Variantes que la sección va a pedir en este dispositivo: una en escritorio (las franjas) y dos en celular (la foto
// grande y las miniaturas).
function coverSizesForDevice() {
  return window.matchMedia(DESKTOP_QUERY).matches
    ? [COVER_STRIP_SIZES]
    : [COVER_FEATURE_SIZES, COVER_THUMB_SIZES]
}

// Descarga y decodifica por adelantado las portadas de la sección Proyectos de la Home, para que al llegar a ella ya
// estén listas y no se vea el fondo azul un rato. Antes esto dependía de acercarse a la sección (y del tamaño de foto
// equivocado), y al bajar rápido o saltar desde el menú las fotos llegaban tarde. Espera a que la página haya
// cargado y el navegador esté ocioso, y las pide con prioridad baja para no estorbar al hero ni a lo que el visitante
// esté viendo. Devuelve una función que cancela lo pendiente.
export function prefetchProjectCovers() {
  if (isConnectionConstrained()) return () => {}

  let cancelled = false
  let idleId: number | undefined
  let timeoutId: number | undefined

  const warm = () => {
    if (cancelled) return
    for (const sizes of coverSizesForDevice()) {
      for (const project of projects) {
        const image = new window.Image()
        image.fetchPriority = 'low'
        image.decoding = 'async'
        // sizes y srcset antes que src: el navegador descarga la misma variante responsive que va a mostrar el <img>.
        image.sizes = sizes
        image.srcset = project.coverSrcSet
        image.src = project.cover
        image.decode().catch(() => {})
        warmedImages.push(image)
      }
    }
  }

  const whenIdle = () => {
    if (cancelled) return
    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(warm, { timeout: 4000 })
    } else {
      // Safari no tiene requestIdleCallback.
      timeoutId = window.setTimeout(warm, 1500)
    }
  }

  if (document.readyState === 'complete') whenIdle()
  else window.addEventListener('load', whenIdle, { once: true })

  return () => {
    cancelled = true
    window.removeEventListener('load', whenIdle)
    if (idleId !== undefined) window.cancelIdleCallback(idleId)
    if (timeoutId !== undefined) window.clearTimeout(timeoutId)
  }
}
