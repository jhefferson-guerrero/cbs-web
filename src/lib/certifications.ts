export interface Certification {
  /** Número de la norma, sin el prefijo "ISO". */
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
    number: '9001',
    name: 'Gestión de calidad',
    description: 'Gestión de la calidad de los procesos y de la satisfacción del cliente.',
  },
  {
    number: '14001',
    name: 'Gestión ambiental',
    description: 'Control y reducción del impacto ambiental de las operaciones.',
  },
  {
    number: '45001',
    name: 'Seguridad y salud en el trabajo',
    description: 'Prevención de accidentes y enfermedades en el trabajo.',
  },
  {
    number: '37001',
    name: 'Gestión antisoborno',
    description: 'Prevención, detección y respuesta frente al soborno.',
  },
  {
    number: '8000',
    name: 'Gestión de datos de calidad',
    description: 'Calidad y confiabilidad de los datos y la información.',
  },
]
