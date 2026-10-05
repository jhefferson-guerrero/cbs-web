import { isConnectionConstrained } from '@/lib/connection'
import { getLimpCityHeroVariant } from '@/lib/limp-city-hero'

// Imágenes ya calentadas: mientras el objeto exista, el navegador conserva su versión decodificada en
// memoria y el hero de Limp City la reutiliza al entrar.
const warmedImages: HTMLImageElement[] = []

// Calienta en segundo plano la página de Limp City (su JS y la imagen del hero)
// para que, si el visitante entra desde el menú, aparezca sin esperar. No
// compite con el hero de CBS: quien la llama espera a que el preloader haya
// terminado, y aquí además se espera al evento `load` de la página y a que el
// navegador esté ocioso. La imagen se pide con prioridad baja, así cualquier
// recurso que el visitante necesite en ese momento (imágenes al hacer scroll,
// por ejemplo) pasa primero. Devuelve una función que cancela lo pendiente.
export function prefetchLimpCity(loadPage: () => Promise<unknown>) {
  if (isConnectionConstrained()) return () => {}

  let cancelled = false
  let idleId: number | undefined
  let timeoutId: number | undefined

  const warm = () => {
    if (cancelled) return

    const hero = new window.Image()
    hero.fetchPriority = 'low'
    hero.decoding = 'async'
    // sizes y srcset antes que src: el navegador descarga la misma variante
    // responsive que va a mostrar el <img> real del hero.
    const { src, srcset, sizes } = getLimpCityHeroVariant()
    hero.sizes = sizes
    hero.srcset = srcset
    hero.src = src
    warmedImages.push(hero)

    // Descargar no basta: la primera vez que se muestra, el navegador además tiene que decodificar la
    // imagen (2752 px), y ese tiempo se veía como un instante de fondo azul al entrar a la página.
    // decode() lo hace por adelantado, en segundo plano.
    hero.decode().catch(() => {})

    loadPage().catch(() => {})
  }

  const whenIdle = () => {
    if (cancelled) return
    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(warm, { timeout: 5000 })
    } else {
      // Safari no tiene requestIdleCallback.
      timeoutId = window.setTimeout(warm, 2000)
    }
  }

  const whenLoaded = () => {
    if (document.readyState === 'complete') whenIdle()
    else window.addEventListener('load', whenIdle, { once: true })
  }

  whenLoaded()

  return () => {
    cancelled = true
    window.removeEventListener('load', whenIdle)
    if (idleId !== undefined) window.cancelIdleCallback(idleId)
    if (timeoutId !== undefined) window.clearTimeout(timeoutId)
  }
}
