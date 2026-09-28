import ministerioViviendaLogo from '@/assets/images/clientes/ministerio-vivienda.webp'
import codevasfLogo from '@/assets/images/clientes/codevasf.webp'
import compesaLogo from '@/assets/images/clientes/compesa.webp'
import conderLogo from '@/assets/images/clientes/conder.webp'
import mDiasBrancoLogo from '@/assets/images/clientes/m-dias-branco.webp'
import dnocsLogo from '@/assets/images/clientes/dnocs.webp'
import embasaLogo from '@/assets/images/clientes/embasa.webp'
import csGraosLogo from '@/assets/images/clientes/cs-graos.webp'
import sanasaCampinasLogo from '@/assets/images/clientes/sanasa-campinas.webp'

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
    clients: [{ name: 'Ministerio de Vivienda, Construcción y Saneamiento', logo: ministerioViviendaLogo }],
  },
  {
    country: 'Brasil',
    clients: [
      { name: 'CODEVASF', logo: codevasfLogo },
      { name: 'Compesa', logo: compesaLogo },
      { name: 'CONDER', logo: conderLogo },
      { name: 'M. Dias Branco', logo: mDiasBrancoLogo },
      { name: 'DNOCS', logo: dnocsLogo },
      { name: 'Embasa', logo: embasaLogo },
      { name: 'CS Grãos', logo: csGraosLogo },
      { name: 'Sanasa Campinas', logo: sanasaCampinasLogo },
    ],
  },
]
