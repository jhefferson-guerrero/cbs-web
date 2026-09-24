import { Hero } from '@/components/sections/Hero'
import { Nosotros } from '@/components/sections/Nosotros'
import { Experiencia } from '@/components/sections/Experiencia'
import { Proyectos } from '@/components/sections/Proyectos'
import { Clientes } from '@/components/sections/Clientes'

export function Home({ ready }: { ready: boolean }) {
  return (
    <main>
      <Hero ready={ready} />
      <Nosotros />
      <Experiencia />
      <Proyectos />
      <Clientes />
    </main>
  )
}
