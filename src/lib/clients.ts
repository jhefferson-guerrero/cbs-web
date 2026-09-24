// Placeholder: every entry points to the same logo for now (swap manually as
// real client logos come in). Names stay accurate so alt text is already correct.
import placeholderLogo from '@/assets/images/proyectos/logos/aliado-01.webp'

export interface Client {
  name: string
  logo: string
}

export interface ClientGroup {
  country: string
  clients: Client[]
}

export const clientGroups: ClientGroup[] = [
  {
    country: 'Perú',
    clients: [{ name: 'Ministerio de Vivienda, Construcción y Saneamiento', logo: placeholderLogo }],
  },
  {
    country: 'Brasil',
    clients: [
      { name: 'CODEVASF', logo: placeholderLogo },
      { name: 'Compesa', logo: placeholderLogo },
      { name: 'CONDER', logo: placeholderLogo },
      { name: 'IS Brasil', logo: placeholderLogo },
      { name: 'DNOCS', logo: placeholderLogo },
      { name: 'Embasa', logo: placeholderLogo },
      { name: 'CS Grãos', logo: placeholderLogo },
      { name: 'Sanasa Campinas', logo: placeholderLogo },
    ],
  },
]
