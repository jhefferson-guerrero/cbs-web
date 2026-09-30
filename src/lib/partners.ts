import logoHydrosistem from '@/assets/images/grupo/hydrosistem.webp'
import logoLimpCity from '@/assets/images/grupo/limp-city.webp'

export interface Partner {
  name: string
  logo: string
  href: string
  /** Sitio de otra empresa: se abre en una pestaña nueva. Si no, es una ruta interna de este sitio. */
  external?: boolean
}

export const partners: Partner[] = [
  { name: 'Limp City', logo: logoLimpCity, href: '/limp-city' },
  { name: 'Hydrosistem', logo: logoHydrosistem, href: 'https://hydrosistem.com.br/', external: true },
]
