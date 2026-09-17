import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/Button'

const heroPlanta = '/hero-planta.webp'

const withCommas = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

const headline = ['Infraestructura,', 'agua y', 'saneamiento']

type Stat =
  | { index: string; label: string; kind: 'count'; to: number; format: (n: number) => string }
  | { index: string; label: string; kind: 'static'; value: string }

const stats: Stat[] = [
  { index: '01', label: 'Proyectos ejecutados', kind: 'count', to: 80, format: (n) => `+${n}` },
  { index: '02', label: 'Portafolio ejecutado', kind: 'count', to: 1300, format: (n) => `S/ ${withCommas(n)} M+` },
  { index: '03', label: 'Experiencia en el sector', kind: 'static', value: 'Desde 2009' },
]

function Counter({ to, format }: { to: number; format: (n: number) => string }) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const count = useMotionValue(0)
  const display = useTransform(count, (v) => format(Math.round(v)))

  useEffect(() => {
    if (!isInView) return
    if (reduceMotion) {
      count.set(to)
      return
    }
    const controls = animate(count, to, { duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 })
    return () => controls.stop()
  }, [isInView, to, reduceMotion, count])

  return <motion.span ref={ref}>{display}</motion.span>
}

export function Hero({ ready }: { ready: boolean }) {
  const reduceMotion = useReducedMotion()
  const play = reduceMotion || ready

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18, filter: 'blur(4px)' },
    animate: play
      ? { opacity: 1, y: 0, filter: 'blur(0px)' }
      : { opacity: 0, y: 18, filter: 'blur(4px)' },
    transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    <>
      <section id="top" className="relative flex min-h-[100dvh] items-center overflow-hidden bg-navy-950 pt-18">
        <motion.img
          src={heroPlanta}
          alt=""
          aria-hidden="true"
          width={2574}
          height={1664}
          fetchPriority="high"
          decoding="async"
          initial={reduceMotion ? false : { scale: 1.06 }}
          animate={{ scale: play ? 1 : 1.06 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 h-full w-full object-cover object-[72%_50%] saturate-[1.4] contrast-[1.12] brightness-[1.12]"
        />
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: play ? 1 : 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
          className="absolute inset-0 bg-gradient-to-r from-navy-950/96 via-navy-950/65 to-navy-950/10"
        />
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: play ? 1 : 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
          className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-navy-950/10"
        />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-navy-950/70 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-10">
          <div className="max-w-2xl lg:max-w-3xl">
            <h1 className="break-words text-4xl font-bold leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-7xl [@media(max-height:820px)]:lg:text-5xl [@media(max-height:820px)]:xl:text-6xl">
              {headline.map((line, i) => (
                <motion.span
                  key={line}
                  initial={reduceMotion ? false : { opacity: 0, y: 22, filter: 'blur(6px)' }}
                  animate={
                    play
                      ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                      : { opacity: 0, y: 22, filter: 'blur(6px)' }
                  }
                  transition={{ duration: 0.9, delay: i * 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            <motion.p
              {...fadeUp(0.62)}
              className="mt-6 max-w-[54ch] text-base leading-relaxed text-white/85 md:text-lg [@media(max-height:820px)]:mt-4"
            >
              Ejecutamos proyectos de infraestructura de mediana y gran escala: abastecimiento
              de agua, represas, alcantarillado sanitario, drenaje urbano, defensa ribereña e
              infraestructura urbana.
            </motion.p>

            <motion.div
              {...fadeUp(0.86)}
              className="mt-9 flex flex-wrap items-center gap-4 [@media(max-height:820px)]:mt-6"
            >
              <Button href="#proyectos" variant="solid" icon={<ArrowRightIcon size={18} weight="regular" />}>
                Ver proyectos
              </Button>
              <Button href="#nosotros" variant="outline-light">
                Conocer más
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="relative z-20 mx-auto w-full max-w-[1400px] px-6 py-10 md:py-14 lg:px-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: 'spring', stiffness: 70, damping: 18 }}
          className="relative bg-navy-950 p-8 sm:p-10"
        >
          <span aria-hidden="true" className="absolute -left-px -top-px h-7 w-7 border-l-2 border-t-2 border-cyan-500" />
          <span aria-hidden="true" className="absolute -right-px -top-px h-7 w-7 border-r-2 border-t-2 border-cyan-500" />
          <span aria-hidden="true" className="absolute -bottom-px -left-px h-7 w-7 border-b-2 border-l-2 border-cyan-500" />
          <span aria-hidden="true" className="absolute -bottom-px -right-px h-7 w-7 border-b-2 border-r-2 border-cyan-500" />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:divide-x sm:divide-navy-800">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-2 sm:px-8 sm:first:pl-0 sm:last:pr-0"
              >
                <span className="font-mono text-xs font-semibold tracking-[0.2em] text-cyan-400">
                  {stat.index}
                </span>
                <p className="font-mono text-4xl font-bold tabular-nums text-white md:text-5xl">
                  {stat.kind === 'count' ? <Counter to={stat.to} format={stat.format} /> : stat.value}
                </p>
                <p className="text-sm text-navy-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}
