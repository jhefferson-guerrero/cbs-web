import { useEffect, useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Preloader } from '@/components/layout/Preloader'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { Hero } from '@/components/sections/Hero'
import { Nosotros } from '@/components/sections/Nosotros'

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
      {isLoading && <Preloader onDone={() => setIsLoading(false)} />}
      <SmoothScroll>
        <Navbar ready={!isLoading} />
        <main>
          <Hero ready={!isLoading} />
          <Nosotros />
        </main>
      </SmoothScroll>
    </>
  )
}

export default App
