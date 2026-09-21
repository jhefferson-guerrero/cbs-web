import { useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { Navbar } from '@/components/layout/Navbar'
import { Preloader } from '@/components/layout/Preloader'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { Hero } from '@/components/sections/Hero'
import { Nosotros } from '@/components/sections/Nosotros'
import { Experiencia } from '@/components/sections/Experiencia'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.documentElement.style.overflow = isLoading ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [isLoading])

  return (
    <>
      <AnimatePresence>{isLoading && <Preloader onReady={() => setIsLoading(false)} />}</AnimatePresence>
      <SmoothScroll>
        <Navbar ready={!isLoading} />
        <main>
          <Hero ready={!isLoading} />
          <Nosotros />
          <Experiencia />
        </main>
      </SmoothScroll>
    </>
  )
}

export default App
