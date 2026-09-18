import { useState } from 'react'
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
  const [gridInView, setGridInView] = useState(false)
  const showEntrance = reduceMotion || gridInView

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    <section id="nosotros" className="bg-white">
      <motion.div
        className="grid lg:grid-cols-2"
        viewport={{ once: true, amount: 0.3 }}
        onViewportEnter={() => setGridInView(true)}
      >
        <motion.div
          initial={reduceMotion ? false : { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0.6 }}
          animate={showEntrance ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 } : undefined}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="bg-navy-950 px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28 2xl:px-24 2xl:py-32"
        >
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400 2xl:text-base">Sobre CBS</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl 2xl:text-5xl">Nosotros</h2>

          <div className="mt-8 flex max-w-xl flex-col gap-5 2xl:max-w-2xl">
            <p className="text-[15.5px] leading-relaxed text-navy-200 2xl:text-lg">
              Somos una organización con sólida trayectoria en la ejecución de obras de saneamiento,
              agua potable, drenaje urbano e infraestructura hidráulica. Desde nuestra fundación en
              2009, hemos asumido el compromiso de transformar vidas a través de soluciones integrales
              que garanticen acceso sostenible a agua potable y sistemas de desagüe eficientes.
            </p>
            <p className="text-[15.5px] leading-relaxed text-navy-200 2xl:text-lg">
              Guiados por valores como integridad, responsabilidad social y cuidado ambiental, en CBS
              no solo materializamos los proyectos de nuestros clientes, sino también confianza y
              bienestar para las comunidades donde operamos.
            </p>
          </div>

          <div className="mt-10 max-w-xl 2xl:max-w-2xl">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={showEntrance ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-4"
              >
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
                  <p className="font-mono text-xs font-semibold tracking-[0.1em] text-cyan-400 2xl:text-sm">{item.year}</p>
                  <p className={item.current ? 'mt-0.5 text-sm font-semibold text-white 2xl:text-base' : 'mt-0.5 text-sm text-navy-200 2xl:text-base'}>
                    {item.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { clipPath: 'inset(0% 0% 0% 100%)', opacity: 0.6 }}
          animate={showEntrance ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 } : undefined}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-[360px] overflow-hidden lg:min-h-0"
        >
          <motion.img
            src={nosotrosPhoto}
            alt="Obra de infraestructura ejecutada por CBS"
            width={1372}
            height={768}
            loading="lazy"
            decoding="async"
            initial={reduceMotion ? false : { scale: 1.15 }}
            animate={showEntrance ? { scale: 1 } : undefined}
            transition={{ duration: 1.1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full object-cover object-[65%_65%]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-700/70 via-navy-900/30 to-navy-950/70" />

          <motion.span
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.6 }}
            animate={showEntrance ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.4, delay: 0.75, ease: 'easeOut' }}
            className="absolute right-9 top-9 h-7 w-7 border-r-2 border-t-2 border-white/70"
          />
          <motion.span
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.6 }}
            animate={showEntrance ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.4, delay: 0.85, ease: 'easeOut' }}
            className="absolute bottom-9 left-9 h-7 w-7 border-b-2 border-l-2 border-white/70"
          />

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={showEntrance ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.9, ease: 'easeOut' }}
            className="absolute bottom-10 right-9 flex flex-col items-end gap-0.5 text-right"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white">
              Fig. 01 — Proyecto CBS, Perú
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="border-t border-navy-100">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20 xl:px-16 2xl:max-w-[1700px] 2xl:px-14 2xl:py-24">
          <motion.div {...reveal(0.2)}>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 2xl:text-sm">
              Calidad certificada
            </p>
            <h3 className="mt-3 text-2xl font-bold leading-tight text-navy-900 md:text-3xl 2xl:text-4xl">
              Certificaciones internacionales
            </h3>
            <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-navy-600 2xl:text-lg">
              Cumplimos con los estándares internacionales de gestión, calidad y seguridad que exige la
              industria, respaldando cada proyecto que ejecutamos.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:divide-x sm:divide-navy-100 lg:grid-cols-5 2xl:mt-14 2xl:gap-y-14">
              {certifications.map(({ code, label }, i) => (
                <motion.div
                  key={code}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.5, y: -14, rotate: -8 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15, delay: i * 0.08 }}
                  className="flex flex-col items-center gap-4 text-center sm:px-6 sm:first:pl-0 sm:last:pr-0 2xl:px-8"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-50 2xl:h-14 2xl:w-14">
                    <ShieldCheckIcon size={26} weight="regular" className="text-cyan-600" />
                  </span>
                  <div>
                    <dt className="font-mono text-lg font-semibold text-navy-900 md:text-xl 2xl:text-2xl">{code}</dt>
                    <dd className="mt-1 text-sm leading-snug text-navy-600 2xl:text-base">{label}</dd>
                  </div>
                </motion.div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
