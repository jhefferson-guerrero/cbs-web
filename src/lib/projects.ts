import galeriaRioHuatanay01 from '@/assets/images/proyectos/rio-huatanay/galeria-01.webp'
import galeriaRioHuatanay02 from '@/assets/images/proyectos/rio-huatanay/galeria-02.webp'
import galeriaRioHuatanay03 from '@/assets/images/proyectos/rio-huatanay/galeria-03.webp'
import galeriaRioHuatanay04 from '@/assets/images/proyectos/rio-huatanay/galeria-04.webp'
import galeriaRioHuatanay05 from '@/assets/images/proyectos/rio-huatanay/galeria-05.webp'
import galeriaRioHuatanay06 from '@/assets/images/proyectos/rio-huatanay/galeria-06.webp'
import galeriaRioHuatanay07 from '@/assets/images/proyectos/rio-huatanay/galeria-07.webp'
import galeriaRioHuatanay08 from '@/assets/images/proyectos/rio-huatanay/galeria-08.webp'
import galeriaTambopata01 from '@/assets/images/proyectos/drenaje-tambopata/galeria-01.webp'
import galeriaTambopata02 from '@/assets/images/proyectos/drenaje-tambopata/galeria-02.webp'
import galeriaTambopata03 from '@/assets/images/proyectos/drenaje-tambopata/galeria-03.webp'
import galeriaTambopata04 from '@/assets/images/proyectos/drenaje-tambopata/galeria-04.webp'

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
import aliado09 from '@/assets/images/proyectos/logos/aliado-09.webp'
import aliado10 from '@/assets/images/proyectos/logos/aliado-10.webp'

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
    cover: galeriaRioHuatanay01,
    client: { name: 'Programa Nacional de Saneamiento Urbano', logo: logoClientePnsu },
    contractor: { name: 'Consorcio Río Huatanay', logo: logoContratistaRioHuatanay, note: '50% de participación' },
    amount: 'S/ 62,826,654',
    funding: { name: 'Banco Mundial', logo: logoFinanciamientoBancoMundial },
    gallery: [
      { src: galeriaRioHuatanay01, alt: 'Vista aérea del reservorio de agua potable junto a la ciudad de Cusco' },
      { src: galeriaRioHuatanay02, alt: 'Vista aérea del reservorio en etapa avanzada de construcción' },
      { src: galeriaRioHuatanay03, alt: 'Vista aérea del trazo de la línea de conducción sobre el cerro' },
      { src: galeriaRioHuatanay04, alt: 'Vista aérea de la losa circular del reservorio con equipo de trabajo' },
      { src: galeriaRioHuatanay05, alt: 'Encofrado perimetral del reservorio con trabajador en obra' },
      { src: galeriaRioHuatanay06, alt: 'Detalle del encofrado y armadura de acero en obra' },
      { src: galeriaRioHuatanay07, alt: 'Maquinaria pesada del Consorcio Río Huatanay en obra' },
      { src: galeriaRioHuatanay08, alt: 'Armado de acero y vaciado de concreto del reservorio' },
    ],
  },
  {
    slug: 'drenaje-tambopata',
    category: 'Drenaje pluvial',
    title: 'Sistema de drenaje pluvial urbano — Sector Tambopata',
    location: 'Distrito de Tambopata, Madre de Dios',
    cover: galeriaTambopata01,
    client: { name: 'Programa Nacional de Saneamiento Urbano', logo: logoClientePnsu },
    contractor: { name: 'Consorcio Tambopata', logo: logoContratistaTambopata, note: 'CBS Líder, 50% de participación' },
    amount: 'S/ 323,553,522',
    funding: { name: 'Banco Interamericano de Desarrollo', logo: logoFinanciamientoBid },
    gallery: [
      { src: galeriaTambopata01, alt: 'Vista aérea de Puerto Maldonado en la confluencia de los ríos Madre de Dios y Tambopata' },
      { src: galeriaTambopata04, alt: 'Vista aérea de la plaza principal de Puerto Maldonado' },
      { src: galeriaTambopata02, alt: 'Estudio de diseño: mapa de soluciones conceptuales del sistema de drenaje pluvial' },
      { src: galeriaTambopata03, alt: 'Objetivos físicos del sistema de drenaje pluvial urbano' },
    ],
  },
]

export const partnerLogos: { name: string; logo: string; large?: boolean }[] = [
  { name: 'Ministerio de Vivienda, Construcción y Saneamiento', logo: aliado01 },
  { name: 'Grupo Banco Mundial', logo: aliado02 },
  { name: 'OTASS', logo: aliado03 },
  { name: 'SUNASS', logo: aliado04 },
  { name: 'EPS Sedacusco', logo: aliado05, large: true },
  { name: 'Agua Barranca', logo: aliado06 },
  { name: 'Sedapar', logo: aliado07 },
  { name: 'Agua Huaral', logo: aliado08 },
  { name: 'Aguas Lima Norte', logo: aliado09 },
  { name: 'Agua Pucallpa', logo: aliado10 },
]

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
