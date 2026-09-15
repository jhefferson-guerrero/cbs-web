import { Navbar } from '@/components/layout/Navbar'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { Hero } from '@/components/sections/Hero'
import { Nosotros } from '@/components/sections/Nosotros'

function App() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <Nosotros />
      </main>
    </SmoothScroll>
  )
}

export default App
