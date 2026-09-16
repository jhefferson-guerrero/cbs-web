import { motion, useReducedMotion } from 'motion/react'
import { ShieldCheckIcon } from '@phosphor-icons/react'
import nosotrosPhoto from '@/assets/images/nosotros.jpg'

const timeline = [
  { year: '2009', label: 'Fundación del grupo en Brasil', current: false },
  { year: 'Brasil → Perú', label: 'Inicio de la internacionalización del grupo', current: false },
  { year: 'Hoy', label: '3 proyectos en desarrollo en Perú', current: true },
]

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
    <section id="nosotros" className="bg-white">
      <div className="grid lg:grid-cols-2">
        <motion.div {...reveal()} className="bg-navy-950 px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">Sobre CBS</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl">Nosotros</h2>

          <div className="mt-8 flex max-w-xl flex-col gap-5">
            <p className="text-[15.5px] leading-relaxed text-navy-200">
              Somos una organización con sólida trayectoria en la ejecución de obras de saneamiento,
              agua potable, drenaje urbano e infraestructura hidráulica. Desde nuestra fundación en
              2009, hemos asumido el compromiso de transformar vidas a través de soluciones integrales
              que garanticen acceso sostenible a agua potable y sistemas de desagüe eficientes.
            </p>
            <p className="text-[15.5px] leading-relaxed text-navy-200">
              Guiados por valores como integridad, responsabilidad social y cuidado ambiental, en CBS
              no solo materializamos los proyectos de nuestros clientes, sino también confianza y
              bienestar para las comunidades donde operamos.
            </p>
          </div>

          <div className="mt-10 max-w-xl">
            {timeline.map((item, i) => (
              <div key={item.year} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span
                    className={
                      item.current
                        ? 'h-3 w-3 shrink-0 rounded-full bg-cyan-500 ring-4 ring-cyan-500/25'
                        : 'h-2.5 w-2.5 shrink-0 rounded-full bg-navy-500'
                    }
                  />
                  {i < timeline.length - 1 && <span className="mt-1 w-px flex-1 bg-navy-700" />}
                </div>
                <div className={i < timeline.length - 1 ? 'pb-6' : ''}>
                  <p className="font-mono text-xs font-semibold tracking-[0.1em] text-cyan-400">{item.year}</p>
                  <p className={item.current ? 'mt-0.5 text-sm font-semibold text-white' : 'mt-0.5 text-sm text-navy-200'}>
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...reveal(0.1)} className="relative min-h-[360px] overflow-hidden lg:min-h-0">
          <img
            src={nosotrosPhoto}
            alt="Obra de infraestructura ejecutada por CBS"
            className="absolute inset-0 h-full w-full object-cover object-[65%_65%]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-700/70 via-navy-900/30 to-navy-950/70" />

          <span aria-hidden="true" className="absolute right-9 top-9 h-7 w-7 border-r-2 border-t-2 border-white/70" />
          <span aria-hidden="true" className="absolute bottom-9 left-9 h-7 w-7 border-b-2 border-l-2 border-white/70" />

          <div className="absolute bottom-10 right-9 flex flex-col items-end gap-0.5 text-right">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white">
              Fig. 01 — Proyecto CBS, Perú
            </span>
          </div>
        </motion.div>
      </div>

      <div className="border-t border-navy-100">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20">
          <motion.div {...reveal(0.2)}>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
              Calidad certificada
            </p>
            <h3 className="mt-3 text-2xl font-bold leading-tight text-navy-900 md:text-3xl">
              Certificaciones internacionales
            </h3>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:divide-x sm:divide-navy-100 lg:grid-cols-5">
              {certifications.map(({ code, label }) => (
                <div key={code} className="flex flex-col gap-3 sm:px-6 sm:first:pl-0 sm:last:pr-0">
                  <ShieldCheckIcon size={26} weight="regular" className="text-cyan-600" />
                  <div>
                    <dt className="font-mono text-lg font-semibold text-navy-900 md:text-xl">{code}</dt>
                    <dd className="mt-1 text-sm leading-snug text-navy-600">{label}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
