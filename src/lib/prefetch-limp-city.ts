import { limpCityHeroImage } from '@/lib/limp-city-hero'

type NetworkInformation = { saveData?: boolean; effectiveType?: string }

// Con ahorro de datos o una conexión 2G no vale la pena gastar bytes en una
// página que quizá el visitante nunca abra.
function isConnectionConstrained() {
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection
  return Boolean(connection?.saveData) || connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g'
}

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
    hero.src = limpCityHeroImage

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
