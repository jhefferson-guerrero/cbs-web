import { flushSync } from 'react-dom'
import { limpCityRoute, projectDetailRoute } from '@/lib/routes'

// Página de cada ruta con carga diferida: antes de empezar la transición se espera a que su código esté
// descargado, para que el navegador fotografíe la página nueva ya lista y no una pantalla vacía.
const routeChunks: [RegExp, () => Promise<unknown>][] = [
  [/^\/limp-city/, limpCityRoute.preload],
  [/^\/proyectos\//, projectDetailRoute.preload],
]

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Cambia de página con una transición del navegador (View Transitions): fotografía la página actual y la
// funde con la nueva (ver las reglas ::view-transition-* de index.css). El cambio de ruta se hace con
// flushSync para que el DOM ya sea el nuevo cuando el navegador toma la segunda foto, por eso el
// BrowserRouter usa useTransitions={false}. Sin soporte del navegador, o con "reducir movimiento", se
// navega como siempre.
export async function navigateWithTransition(navigate: (to: string) => void, to: string) {
  const path = to.split(/[?#]/)[0]
  const chunk = routeChunks.find(([pattern]) => pattern.test(path))
  if (chunk) await chunk[1]().catch(() => {})

  if (typeof document.startViewTransition !== 'function' || prefersReducedMotion()) {
    navigate(to)
    return
  }
  document.startViewTransition(() => {
    flushSync(() => navigate(to))
  })
}
