import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Preloader } from '@/components/layout/Preloader'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { Footer } from '@/components/layout/Footer'

// División de código por ruta: el JS de cada página se descarga solo cuando
// se visita, en vez de que el Home y cada página de proyecto vayan en un
// solo bundle.
const Home = lazy(() => import('@/pages/Home').then((m) => ({ default: m.Home })))
const LimpCity = lazy(() => import('@/pages/LimpCity').then((m) => ({ default: m.LimpCity })))
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail').then((m) => ({ default: m.ProjectDetail })))

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.documentElement.style.overflow = isLoading ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [isLoading])

  return (
    <BrowserRouter>
      <AnimatePresence>{isLoading && <Preloader onReady={() => setIsLoading(false)} />}</AnimatePresence>
      <SmoothScroll>
        <Navbar ready={!isLoading} />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home ready={!isLoading} />} />
            <Route path="/proyectos/:slug" element={<ProjectDetail />} />
            <Route path="/limp-city" element={<LimpCity />} />
          </Routes>
        </Suspense>
        <Footer />
      </SmoothScroll>
    </BrowserRouter>
  )
}

export default App
