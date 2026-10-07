import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { Parallax } from '@/components/ui/Parallax'
import { cn } from '@/lib/utils'
import nosotrosPhoto from '@/assets/images/nosotros.webp'
import nosotrosPhotoAvif from '@/assets/images/nosotros.avif'

const timeline = [
  { year: '2009', label: 'Fundación del grupo en Brasil', current: false },
  { year: 'Brasil → Perú', label: 'Inicio de la internacionalización del grupo', current: false },
  { year: 'Hoy', label: '3 proyectos en desarrollo en Perú', current: true },
]

// Segundos que tarda cada hito en encenderse después del anterior.
const MILESTONE_STEP = 0.6

// Un hito de la línea de tiempo. Cuando la lista entra en pantalla (una sola vez), su punto se enciende en
// cian y la línea hacia el siguiente se rellena, uno tras otro de arriba hacia abajo.
function TimelineItem({
  item,
  index,
  lit,
  reduceMotion,
}: {
  item: (typeof timeline)[number]
  index: number
  lit: boolean
  reduceMotion: boolean | null
}) {
  const total = timeline.length
  const dotDelay = 0.35 + index * MILESTONE_STEP

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-4"
    >
      <div className="flex flex-col items-center">
        <span className={cn('relative shrink-0', item.current ? 'h-3 w-3' : 'h-2.5 w-2.5')}>
          <span className="absolute inset-0 rounded-full bg-navy-500" />
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
            animate={lit ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.4, delay: dotDelay, ease: [0.16, 1, 0.3, 1] }}
            className={cn('absolute inset-0 rounded-full bg-cyan-500', item.current && 'ring-4 ring-cyan-500/25')}
          />
        </span>
        {index < total - 1 && (
          <span className="relative mt-1 w-px flex-1 bg-navy-700">
            <motion.span
              initial={reduceMotion ? false : { scaleY: 0 }}
              animate={lit ? { scaleY: 1 } : undefined}
              transition={{ duration: MILESTONE_STEP - 0.1, delay: dotDelay + 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 origin-top bg-cyan-500"
            />
          </span>
        )}
      </div>
      <div className={index < total - 1 ? 'pb-6 lg:pb-[clamp(0.875rem,2.8vh,2.25rem)]' : ''}>
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
  )
}

export function Nosotros() {
  const reduceMotion = useReducedMotion()
  const timelineRef = useRef<HTMLDivElement>(null)
  const timelineInView = useInView(timelineRef, { once: true, amount: 0.6 })

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

            {/* Cada párrafo anima cuando él aparece en pantalla: en móvil el segundo queda más abajo y no debe
                animarse antes de verse. */}
            <div className="mt-8 flex max-w-xl flex-col gap-5 lg:mt-[clamp(1rem,3.4vh,3rem)] lg:max-w-[min(100%,clamp(36rem,74vh,50rem))] lg:gap-[clamp(0.75rem,2.4vh,1.75rem)]">
              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="text-[15.5px] leading-relaxed text-navy-200 lg:text-[clamp(15.5px,2.1vh,22px)]"
              >
                Somos una organización con sólida trayectoria en la ejecución de obras de saneamiento,
                agua potable, drenaje urbano e infraestructura hidráulica. Desde nuestra fundación en
                2009, hemos asumido el compromiso de transformar vidas a través de soluciones integrales
                que garanticen acceso sostenible a agua potable y sistemas de desagüe eficientes.
              </motion.p>
              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.65, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="text-[15.5px] leading-relaxed text-navy-200 lg:text-[clamp(15.5px,2.1vh,22px)]"
              >
                Guiados por valores como integridad, responsabilidad social y cuidado ambiental, en CBS
                no solo materializamos los proyectos de nuestros clientes, sino también confianza y
                bienestar para las comunidades donde operamos.
              </motion.p>
            </div>

            <div
              ref={timelineRef}
              className="mt-10 max-w-xl lg:mt-[clamp(1.25rem,4.4vh,4rem)] lg:max-w-[min(100%,clamp(36rem,74vh,50rem))]"
            >
              {timeline.map((item, i) => (
                <TimelineItem key={item.year} item={item} index={i} lit={timelineInView} reduceMotion={reduceMotion} />
              ))}
            </div>
          </div>
        </div>

        <div className="relative h-full min-h-[360px] overflow-hidden lg:min-h-0">
          {/* La mesa de planos y el grupo están al lado derecho de la foto (del 50% al 91% del ancho): se ancla
              a la derecha para que se vea completa. travel más corto = la capa se amplía menos y no recorta. */}
          <Parallax travel={10}>
          {/* Mismos píxeles en dos formatos: AVIF (392 KB) para los navegadores que lo entienden y el WebP (665 KB)
              de respaldo para los demás. `contents` hace que el <picture> no afecte al diseño. */}
          <picture className="contents">
            <source srcSet={nosotrosPhotoAvif} type="image/avif" />
            <motion.img
              src={nosotrosPhoto}
              alt="Equipo de CBS con cascos y chalecos revisando planos sobre una mesa en una obra de infraestructura"
              width={2744}
              height={1536}
              loading="lazy"
              decoding="async"
              initial={reduceMotion ? false : { scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full object-cover object-[88%_65%]"
            />
          </picture>
          </Parallax>
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
