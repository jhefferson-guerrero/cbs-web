import { useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Preloader } from '@/components/layout/Preloader'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { Home } from '@/pages/Home'
import { ProjectDetail } from '@/pages/ProjectDetail'

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
        <Routes>
          <Route path="/" element={<Home ready={!isLoading} />} />
          <Route path="/proyectos/:slug" element={<ProjectDetail />} />
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  )
}

export default App
