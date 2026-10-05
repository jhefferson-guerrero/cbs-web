import { withCommas } from '@/lib/utils'
import aboutImage from '@/assets/images/limpcity/sobre-limp-city.webp'
import coverageMap from '@/assets/images/limpcity/mapa-bahia.webp'
import servicePlaya from '@/assets/images/limpcity/servicio-playa.webp'
import servicePlaya800 from '@/assets/images/limpcity/servicio-playa-800.webp'
import serviceRecoleccion from '@/assets/images/limpcity/servicio-recoleccion.webp'
import serviceRecoleccion800 from '@/assets/images/limpcity/servicio-recoleccion-800.webp'
import serviceCanales from '@/assets/images/limpcity/servicio-canales.webp'
import serviceCanales800 from '@/assets/images/limpcity/servicio-canales-800.webp'
import serviceBarrido from '@/assets/images/limpcity/servicio-barrido.webp'
import serviceBarrido800 from '@/assets/images/limpcity/servicio-barrido-800.webp'
import serviceEquipos from '@/assets/images/limpcity/servicio-equipos.webp'
import serviceEquipos800 from '@/assets/images/limpcity/servicio-equipos-800.webp'

export { aboutImage, coverageMap }

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
  /** Versión grande (la que usa el navegador si no entiende srcSet). */
  image: string
  /** Las dos versiones (800 px y la grande) para que un móvil no descargue la de escritorio. */
  srcSet: string
  /** 'contain': fotos de producto con fondo blanco, se funden con el fondo del panel en vez de recortarse. */
  fit: 'cover' | 'contain'
  /** object-position para las fotos que se recortan. */
  position?: string
}

// Las fotos se publican en dos tamaños; el navegador elige según el ancho que ocupa la franja.
const responsive = (small: string, large: string, largeWidth: number) => `${small} 800w, ${large} ${largeWidth}w`

export const limpCityServices: LimpCityService[] = [
  { name: 'Limpieza de playa', description: 'Retiro de residuos y algas de las playas con equipos especializados.', image: servicePlaya, srcSet: responsive(servicePlaya800, servicePlaya, 1600), fit: 'cover', position: '50% 60%' },
  { name: 'Recolección domiciliaria', description: 'Recolección de residuos en viviendas con camiones y cuadrillas propias.', image: serviceRecoleccion, srcSet: responsive(serviceRecoleccion800, serviceRecoleccion, 1600), fit: 'cover', position: '38% 55%' },
  { name: 'Limpieza de canales', description: 'Limpieza y desobstrucción de canales con maquinaria pesada.', image: serviceCanales, srcSet: responsive(serviceCanales800, serviceCanales, 1600), fit: 'cover', position: '45% 55%' },
  { name: 'Barrido mecanizado', description: 'Barrido de calles y avenidas con equipos mecanizados.', image: serviceBarrido, srcSet: responsive(serviceBarrido800, serviceBarrido, 1600), fit: 'cover', position: '40% 60%' },
  { name: 'Equipos especiales', description: 'Equipos especializados para la limpieza y el mantenimiento urbano.', image: serviceEquipos, srcSet: responsive(serviceEquipos800, serviceEquipos, 1200), fit: 'cover', position: '60% 50%' },
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
