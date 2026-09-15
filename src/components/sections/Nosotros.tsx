import { motion, useReducedMotion } from 'motion/react'

const certifications = [
  { code: 'ISO 9001', label: 'Gestión de calidad' },
  { code: 'ISO 14001', label: 'Gestión ambiental' },
  { code: 'ISO 45001', label: 'Seguridad y salud en el trabajo' },
  { code: 'ISO 37001', label: 'Gestión antisoborno' },
  { code: 'ISO 8000', label: 'Gestión de datos de calidad' },
]

export function Nosotros() {
  const reduceMotion = useReducedMotion()

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    <section id="nosotros" className="bg-white py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-10">
        <motion.div {...reveal()}>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight text-navy-900 md:text-4xl lg:text-5xl">
            Quince años construyendo infraestructura en el Perú
          </h2>
          <div className="mt-10 grid max-w-5xl gap-8 md:mt-12 md:grid-cols-2 md:gap-12">
            <p className="text-lg leading-relaxed text-navy-700">
              CBS, Construtora Baiana de Saneamento, opera en el Perú desde 2009. Desde entonces
              hemos entregado más de 80 obras de mediana y gran escala, con un portafolio acumulado
              que supera los S/ 1,300 millones.
            </p>
            <p className="text-lg leading-relaxed text-navy-700">
              Cada proyecto se ejecuta bajo estándares internacionales de calidad, gestión
              ambiental, seguridad ocupacional y ética empresarial, verificados mediante
              certificación ISO.
            </p>
          </div>
        </motion.div>

        <motion.div {...reveal(0.1)} className="mt-16 border-t border-navy-100 pt-12 md:mt-20">
          <h3 className="text-sm font-semibold text-navy-900">Certificaciones internacionales</h3>
          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {certifications.map(({ code, label }) => (
              <div key={code}>
                <dt className="font-mono text-xl font-semibold text-cyan-700 md:text-2xl">{code}</dt>
                <dd className="mt-2 text-sm leading-snug text-navy-600">{label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  )
}
