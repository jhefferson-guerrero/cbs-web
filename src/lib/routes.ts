import { lazyRoute } from '@/lib/lazy-route'

// Páginas con carga diferida que se precargan en segundo plano (ver prefetch-limp-city.ts y
// prefetch-projects.ts) y se abren desde enlaces del sitio.
export const limpCityRoute = lazyRoute(() => import('@/pages/LimpCity').then((m) => ({ default: m.LimpCity })))
export const projectDetailRoute = lazyRoute(() =>
  import('@/pages/ProjectDetail').then((m) => ({ default: m.ProjectDetail })),
)
