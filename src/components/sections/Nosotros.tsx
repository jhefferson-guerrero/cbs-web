import { motion, useReducedMotion } from 'motion/react'
import nosotrosPhoto from '@/assets/images/nosotros.webp'

const timeline = [
  { year: '2009', label: 'Fundación del grupo en Brasil', current: false },
  { year: 'Brasil → Perú', label: 'Inicio de la internacionalización del grupo', current: false },
  { year: 'Hoy', label: '3 proyectos en desarrollo en Perú', current: true },
]

export function Nosotros() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="nosotros" className="bg-white">
      <div className="grid lg:min-h-[calc(100svh-var(--nav-h))] lg:grid-cols-2">
        <div className="relative h-full overflow-hidden">
          <div className="flex h-full flex-col justify-center bg-navy-950 px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-[clamp(2rem,7vh,6rem)] 2xl:px-[clamp(6rem,6vw,8rem)]">
            <motion.h2
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.65, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[clamp(2.25rem,5.6vh,4.25rem)]"
            >
              Nosotros
            </motion.h2>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex max-w-xl flex-col gap-5 lg:mt-[clamp(1rem,3.4vh,3rem)] lg:max-w-[min(100%,clamp(36rem,74vh,50rem))] lg:gap-[clamp(0.75rem,2.4vh,1.75rem)]"
            >
              <p className="text-[15.5px] leading-relaxed text-navy-200 lg:text-[clamp(15.5px,2.1vh,22px)]">
                Somos una organización con sólida trayectoria en la ejecución de obras de saneamiento,
                agua potable, drenaje urbano e infraestructura hidráulica. Desde nuestra fundación en
                2009, hemos asumido el compromiso de transformar vidas a través de soluciones integrales
                que garanticen acceso sostenible a agua potable y sistemas de desagüe eficientes.
              </p>
              <p className="text-[15.5px] leading-relaxed text-navy-200 lg:text-[clamp(15.5px,2.1vh,22px)]">
                Guiados por valores como integridad, responsabilidad social y cuidado ambiental, en CBS
                no solo materializamos los proyectos de nuestros clientes, sino también confianza y
                bienestar para las comunidades donde operamos.
              </p>
            </motion.div>

            <div className="mt-10 max-w-xl lg:mt-[clamp(1.25rem,4.4vh,4rem)] lg:max-w-[min(100%,clamp(36rem,74vh,50rem))]">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
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
                  <div className={i < timeline.length - 1 ? 'pb-6 lg:pb-[clamp(0.875rem,2.8vh,2.25rem)]' : ''}>
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 lg:text-[clamp(12px,1.45vh,15px)]">
                      {item.year}
                    </p>
                    <p
                      className={
                        item.current
                          ? 'mt-0.5 text-base font-semibold text-white sm:text-sm lg:text-[clamp(14px,1.9vh,19px)]'
                          : 'mt-0.5 text-base text-navy-200 sm:text-sm lg:text-[clamp(14px,1.9vh,19px)]'
                      }
                    >
                      {item.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative h-full min-h-[360px] overflow-hidden lg:min-h-0">
          <motion.img
            src={nosotrosPhoto}
            alt="Obra de infraestructura ejecutada por CBS"
            width={1372}
            height={768}
            loading="lazy"
            decoding="async"
            initial={reduceMotion ? false : { scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full object-cover object-[65%_65%]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-700/70 via-navy-900/30 to-navy-950/70" />

          <motion.span
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
            className="absolute right-9 top-9 h-7 w-7 border-r-2 border-t-2 border-white/70"
          />
          <motion.span
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.4, delay: 0.6, ease: 'easeOut' }}
            className="absolute bottom-9 left-9 h-7 w-7 border-b-2 border-l-2 border-white/70"
          />

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.5, delay: 0.65, ease: 'easeOut' }}
            className="absolute bottom-10 right-9 flex flex-col items-end gap-0.5 text-right"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white">
              Fig. 01 — Proyecto CBS, Perú
            </span>
          </motion.div>

          {/* Cortina navy que tapa la foto y se achica hacia la izquierda, revelándola
              de derecha a izquierda -- el mismo efecto que antes daba el clip-path,
              pero con scaleX (transform), que es confiable en este entorno. */}
          <motion.div
            aria-hidden="true"
            initial={reduceMotion ? false : { scaleX: 1 }}
            whileInView={{ scaleX: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left' }}
            className="absolute inset-0 bg-navy-950"
          />
        </div>
      </div>
    </section>
  )
}
