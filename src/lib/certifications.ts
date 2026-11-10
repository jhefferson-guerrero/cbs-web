export interface Certification {
  /** Quién emite la norma y se muestra sobre el número: "ISO" en casi todas; SA 8000 es de Social Accountability International. */
  standard: 'ISO' | 'SA'
  /** Número de la norma, sin el prefijo. */
  number: string
  name: string
  /**
   * Una línea sobre qué cubre la norma. Provisional: es una descripción general de la norma,
   * pendiente de revisar con el cliente. Confirmar también que las cinco estén vigentes.
   */
  description: string
}

export const certifications: Certification[] = [
  {
    standard: 'ISO',
    number: '9001',
    name: 'Gestión de calidad',
    description: 'Gestión de la calidad de los procesos y de la satisfacción del cliente.',
  },
  {
    standard: 'ISO',
    number: '14001',
    name: 'Gestión ambiental',
    description: 'Control y reducción del impacto ambiental de las operaciones.',
  },
  {
    standard: 'ISO',
    number: '45001',
    name: 'Seguridad y salud en el trabajo',
    description: 'Prevención de accidentes y enfermedades en el trabajo.',
  },
  {
    standard: 'ISO',
    number: '37001',
    name: 'Gestión antisoborno',
    description: 'Prevención, detección y respuesta frente al soborno.',
  },
  {
    standard: 'SA',
    number: '8000',
    name: 'Responsabilidad social',
    description: 'Condiciones de trabajo dignas y respeto de los derechos laborales y humanos.',
  },
]
