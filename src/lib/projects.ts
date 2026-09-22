import coverRioHuatanay from '@/assets/images/proyectos/rio-huatanay/cover.jpg'
import coverDrenajeTambopata from '@/assets/images/proyectos/drenaje-tambopata/cover.jpg'

export interface Project {
  slug: string
  category: string
  title: string
  location: string
  cover: string
  client: string
  contractor: string
  amount: string
  funding: string
}

export const projects: Project[] = [
  {
    slug: 'rio-huatanay',
    category: 'Agua potable',
    title: 'Ampliación del servicio de agua potable — Margen derecha del Huatanay',
    location: 'Distrito Santiago, Cusco',
    cover: coverRioHuatanay,
    client: 'Programa Nacional de Saneamiento Urbano',
    contractor: 'Consorcio Río Huatanay',
    amount: 'S/ 62,826,654',
    funding: 'Banco Mundial',
  },
  {
    slug: 'drenaje-tambopata',
    category: 'Drenaje pluvial',
    title: 'Sistema de drenaje pluvial urbano — Sector Tambopata',
    location: 'Distrito de Tambopata, Madre de Dios',
    cover: coverDrenajeTambopata,
    client: 'Programa Nacional de Saneamiento Urbano',
    contractor: 'Consorcio Tambopata',
    amount: 'S/ 323,553,522',
    funding: 'Banco Interamericano de Desarrollo',
  },
]
