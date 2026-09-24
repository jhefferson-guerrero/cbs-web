import { Hero } from '@/components/sections/Hero'
import { Nosotros } from '@/components/sections/Nosotros'
import { Actuacion } from '@/components/sections/Actuacion'
import { Experiencia } from '@/components/sections/Experiencia'
import { Proyectos } from '@/components/sections/Proyectos'
import { Clientes } from '@/components/sections/Clientes'
import { Contacto } from '@/components/sections/Contacto'

export function Home({ ready }: { ready: boolean }) {
  return (
    <main>
      <Hero ready={ready} />
      <Nosotros />
      <Actuacion />
      <Experiencia />
      <Proyectos />
      <Clientes />
      <Contacto />
    </main>
  )
}
