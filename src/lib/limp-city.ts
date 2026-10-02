import { withCommas } from '@/lib/utils'
import { limpCityHeroImage as heroImage } from '@/lib/limp-city-hero'
import aboutImage from '@/assets/images/limpcity/sobre-limp-city.webp'
import coverageMap from '@/assets/images/limpcity/mapa-bahia.webp'
import servicePlaya from '@/assets/images/limpcity/servicio-playa.webp'
import serviceRecoleccion from '@/assets/images/limpcity/servicio-recoleccion.webp'
import serviceCanales from '@/assets/images/limpcity/servicio-canales.webp'
import serviceBarrido from '@/assets/images/limpcity/servicio-barrido.webp'
import serviceEquipos from '@/assets/images/limpcity/servicio-equipos.webp'

export { heroImage, aboutImage, coverageMap }

export interface LimpCityStat {
  label: string
  to: number
  format: (n: number) => string
}

export const limpCityStats: LimpCityStat[] = [
  { label: 'Toneladas recolectadas', to: 21000, format: (n) => `${withCommas(n)}+` },
  { label: 'Calles barridas al mes', to: 23000, format: (n) => `${withCommas(n)} km` },
  { label: 'Personas atendidas', to: 15, format: (n) => `${(n / 10).toFixed(1)}M+` },
  { label: 'Colaboradores', to: 1700, format: (n) => withCommas(n) },
]

export interface LimpCityService {
  name: string
  /** Una línea breve. Provisional: pendiente de validar con el cliente. */
  description: string
  image: string
  /** 'contain': fotos de producto con fondo blanco, se funden con el fondo del panel en vez de recortarse. */
  fit: 'cover' | 'contain'
  /** object-position para las fotos que se recortan. */
  position?: string
}

export const limpCityServices: LimpCityService[] = [
  { name: 'Limpieza de playa', description: 'Retiro de residuos y algas de las playas con equipos especializados.', image: servicePlaya, fit: 'cover', position: '50% 60%' },
  { name: 'Recolección domiciliaria', description: 'Recolección de residuos en viviendas con camiones y cuadrillas propias.', image: serviceRecoleccion, fit: 'contain' },
  { name: 'Limpieza de canales', description: 'Limpieza y desobstrucción de canales con maquinaria pesada.', image: serviceCanales, fit: 'cover', position: '45% 55%' },
  { name: 'Barrido mecanizado', description: 'Barrido de calles y avenidas con equipos mecanizados.', image: serviceBarrido, fit: 'contain' },
  { name: 'Equipos especiales', description: 'Equipos especializados para la limpieza y el mantenimiento urbano.', image: serviceEquipos, fit: 'cover', position: '60% 50%' },
]

export const limpCityCities = [
  'Juazeiro',
  'Petrolina',
  'Campo Formoso',
  'Alagoinhas',
  'Salvador',
  'Lauro de Freitas',
  'Eunápolis',
]
