import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Preloader } from '@/components/layout/Preloader'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { Footer } from '@/components/layout/Footer'
import { BackToTop } from '@/components/layout/BackToTop'
import { RouteSeo } from '@/components/layout/RouteSeo'
import { NotFound } from '@/pages/NotFound'
import { prefetchLimpCity } from '@/lib/prefetch-limp-city'
import { limpCityRoute, projectDetailRoute } from '@/lib/routes'

// División de código por ruta: el JS de cada página se descarga solo cuando
// se visita, en vez de que el Home y cada página de proyecto vayan en un
// solo bundle.
const Home = lazy(() => import('@/pages/Home').then((m) => ({ default: m.Home })))
// Limp City y los proyectos se precargan en segundo plano (lib/routes.ts): al abrirlos, React los encuentra
// listos y no hace la pausa de Suspense.
const LimpCity = limpCityRoute.Component
const ProjectDetail = projectDetailRoute.Component

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.documentElement.style.overflow = isLoading ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [isLoading])

  // Una vez que el preloader terminó (el hero de CBS ya se descargó y se ve),
  // se calienta Limp City en segundo plano para que abrirla desde el menú sea
  // inmediato. Ver lib/prefetch-limp-city.ts.
  useEffect(() => {
    if (isLoading) return
    return prefetchLimpCity(limpCityRoute.preload)
  }, [isLoading])

  return (
    // useTransitions={false}: la actualización de la ruta es inmediata, necesario para la transición de página
    // (ver lib/page-transition.ts).
    <BrowserRouter useTransitions={false}>
      <RouteSeo />
      <AnimatePresence>{isLoading && <Preloader onReady={() => setIsLoading(false)} />}</AnimatePresence>
      <SmoothScroll>
        <Navbar ready={!isLoading} />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home ready={!isLoading} />} />
            <Route path="/proyectos/:slug" element={<ProjectDetail ready={!isLoading} />} />
            <Route path="/limp-city" element={<LimpCity />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* Dentro del mismo Suspense que las rutas: así el pie de página aparece junto con la
              página y no antes. Si estuviera fuera, se dibujaría arriba mientras llega el
              archivo de la ruta y saltaría miles de píxeles hacia abajo (CLS). */}
          <Footer />
        </Suspense>
        <BackToTop />
      </SmoothScroll>
    </BrowserRouter>
  )
}

export default App
