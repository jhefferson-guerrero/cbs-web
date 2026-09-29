export interface LocationEntry {
  name: string
  projectSlug?: string
}

export interface LocationGroup {
  country: string
  locations: LocationEntry[]
}

export const locationGroups: LocationGroup[] = [
  {
    country: 'Perú',
    locations: [
      { name: 'Cusco', projectSlug: 'rio-huatanay' },
      { name: 'Puerto Maldonado', projectSlug: 'drenaje-tambopata' },
      { name: 'Pasco' },
    ],
  },
  {
    country: 'Brasil',
    locations: [
      { name: 'Piauí' },
      { name: 'Pernambuco' },
      { name: 'Alagoas' },
      { name: 'Sergipe' },
      { name: 'Bahía' },
      { name: 'Espírito Santo' },
      { name: 'São Paulo' },
      { name: 'Río de Janeiro' },
      { name: 'Santa Catarina' },
    ],
  },
]
