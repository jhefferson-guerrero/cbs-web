import coverRioHuatanay from '@/assets/images/proyectos/rio-huatanay/cover.jpg'
import galeriaRioHuatanay01 from '@/assets/images/proyectos/rio-huatanay/galeria-01.jpg'
import galeriaRioHuatanay02 from '@/assets/images/proyectos/rio-huatanay/galeria-02.jpg'
import galeriaRioHuatanay03 from '@/assets/images/proyectos/rio-huatanay/galeria-03.jpg'
import galeriaRioHuatanay04 from '@/assets/images/proyectos/rio-huatanay/galeria-04.jpg'
import coverDrenajeTambopata from '@/assets/images/proyectos/drenaje-tambopata/cover.jpg'
import galeriaTambopata01 from '@/assets/images/proyectos/drenaje-tambopata/galeria-01.jpg'
import galeriaTambopata02 from '@/assets/images/proyectos/drenaje-tambopata/galeria-02.jpg'
import galeriaTambopata03 from '@/assets/images/proyectos/drenaje-tambopata/galeria-03.jpg'
import galeriaTambopata04 from '@/assets/images/proyectos/drenaje-tambopata/galeria-04.jpg'

import logoClientePnsu from '@/assets/images/proyectos/logos/cliente-pnsu.webp'
import logoContratistaRioHuatanay from '@/assets/images/proyectos/logos/contratista-rio-huatanay.webp'
import logoContratistaTambopata from '@/assets/images/proyectos/logos/contratista-tambopata.webp'
import logoFinanciamientoBancoMundial from '@/assets/images/proyectos/logos/financiamiento-banco-mundial.webp'
import logoFinanciamientoBid from '@/assets/images/proyectos/logos/financiamiento-bid.webp'
import aliado01 from '@/assets/images/proyectos/logos/aliado-01.webp'
import aliado02 from '@/assets/images/proyectos/logos/aliado-02.webp'
import aliado03 from '@/assets/images/proyectos/logos/aliado-03.webp'
import aliado04 from '@/assets/images/proyectos/logos/aliado-04.webp'
import aliado05 from '@/assets/images/proyectos/logos/aliado-05.webp'
import aliado06 from '@/assets/images/proyectos/logos/aliado-06.webp'
import aliado07 from '@/assets/images/proyectos/logos/aliado-07.webp'
import aliado08 from '@/assets/images/proyectos/logos/aliado-08.webp'

export interface Party {
  name: string
  logo?: string
  note?: string
}

export interface GalleryImage {
  src: string
  alt: string
}

export interface Project {
  slug: string
  category: string
  title: string
  location: string
  cover: string
  client: Party
  contractor: Party
  amount: string
  funding: Party
  gallery: GalleryImage[]
}

export const projects: Project[] = [
  {
    slug: 'rio-huatanay',
    category: 'Agua potable',
    title: 'Ampliación del servicio de agua potable — Margen derecha del Huatanay',
    location: 'Distrito Santiago, Cusco',
    cover: coverRioHuatanay,
    client: { name: 'Programa Nacional de Saneamiento Urbano', logo: logoClientePnsu },
    contractor: { name: 'Consorcio Río Huatanay', logo: logoContratistaRioHuatanay, note: '50% de participación' },
    amount: 'S/ 62,826,654',
    funding: { name: 'Banco Mundial', logo: logoFinanciamientoBancoMundial },
    gallery: [
      { src: galeriaRioHuatanay01, alt: 'Vista aérea de la obra de agua potable en Cusco' },
      { src: galeriaRioHuatanay02, alt: 'Presa de concreto en construcción' },
      { src: galeriaRioHuatanay03, alt: 'Detalle de la obra de infraestructura hidráulica' },
      { src: galeriaRioHuatanay04, alt: 'Equipo de trabajo en obra de CBS' },
    ],
  },
  {
    slug: 'drenaje-tambopata',
    category: 'Drenaje pluvial',
    title: 'Sistema de drenaje pluvial urbano — Sector Tambopata',
    location: 'Distrito de Tambopata, Madre de Dios',
    cover: coverDrenajeTambopata,
    client: { name: 'Programa Nacional de Saneamiento Urbano', logo: logoClientePnsu },
    contractor: { name: 'Consorcio Tambopata', logo: logoContratistaTambopata, note: 'CBS Líder, 50% de participación' },
    amount: 'S/ 323,553,522',
    funding: { name: 'Banco Interamericano de Desarrollo', logo: logoFinanciamientoBid },
    gallery: [
      { src: galeriaTambopata01, alt: 'Vista aérea de Puerto Maldonado, sector Tambopata' },
      { src: galeriaTambopata02, alt: 'Equipo de trabajo en obra de CBS' },
      { src: galeriaTambopata03, alt: 'Detalle de la obra de infraestructura hidráulica' },
      { src: galeriaTambopata04, alt: 'Presa de concreto en construcción' },
    ],
  },
]

export const partnerLogos: { name: string; logo: string }[] = [
  { name: 'Aliado 01', logo: aliado01 },
  { name: 'Aliado 02', logo: aliado02 },
  { name: 'Aliado 03', logo: aliado03 },
  { name: 'Aliado 04', logo: aliado04 },
  { name: 'Aliado 05', logo: aliado05 },
  { name: 'Aliado 06', logo: aliado06 },
  { name: 'Aliado 07', logo: aliado07 },
  { name: 'Aliado 08', logo: aliado08 },
]

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
