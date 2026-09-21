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

const yearsSince2009 = new Date().getFullYear() - 2009

const stats: Stat[] = [
  { index: '01', label: 'Proyectos ejecutados', kind: 'count', to: 80, format: (n) => `+${n}` },
  { index: '02', label: 'Portafolio ejecutado', kind: 'count', to: 1300, format: (n) => `S/ ${withCommas(n)} M+` },
  { index: '03', label: 'Experiencia en el sector', kind: 'count', to: yearsSince2009, format: (n) => `+${n} años` },
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
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    <>
      {/* Fixed backdrop: stays pinned behind every section; content scrolls up and covers it */}
      <div className="fixed inset-x-0 top-0 -z-10 h-svh bg-navy-950">
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
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 h-full w-full object-cover object-[90%_50%] saturate-[1.02] contrast-[1.02] brightness-[0.92] sm:object-[72%_50%]"
        />
        <div className="absolute inset-0 bg-navy-950/20" />
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: play ? 1 : 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="absolute inset-0 bg-gradient-to-r from-navy-950/88 via-navy-950/40 to-navy-950/0"
        />
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: play ? 1 : 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-navy-950/0"
        />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-navy-950/55 to-transparent" />
      </div>

      <section id="top" className="relative flex min-h-[100dvh] items-center pt-16 lg:pt-20 2xl:pt-24">
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-10 xl:px-16 2xl:max-w-[1700px] 2xl:px-14">
          <div className="max-w-2xl lg:max-w-3xl 2xl:max-w-4xl">
            <h1 className="break-words text-[2.5rem] font-semibold leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-[5.75rem] [@media(max-height:600px)]:lg:text-5xl [@media(max-height:600px)]:xl:text-6xl">
              {headline.map((line, i) => (
                <motion.span
                  key={line}
                  initial={reduceMotion ? false : { opacity: 0, y: 22, filter: 'blur(6px)' }}
                  animate={
                    play
                      ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                      : { opacity: 0, y: 22, filter: 'blur(6px)' }
                  }
                  transition={{ duration: 0.8, delay: 0.25 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            <motion.p
              {...fadeUp(0.72)}
              className="mt-8 max-w-[54ch] text-base leading-relaxed text-white/85 sm:mt-6 md:text-lg 2xl:max-w-[46ch] 2xl:text-xl [@media(max-height:600px)]:mt-4"
            >
              Ejecutamos proyectos de infraestructura de mediana y gran escala: abastecimiento
              de agua, represas, alcantarillado sanitario, drenaje urbano, defensa ribereña e
              infraestructura urbana.
            </motion.p>

            <motion.div
              {...fadeUp(0.92)}
              className="mt-10 flex flex-wrap items-center gap-4 sm:mt-9 [@media(max-height:600px)]:mt-6"
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

      <div className="relative z-20 bg-white">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-10 md:py-14 lg:px-10 xl:px-16 2xl:max-w-[1700px] 2xl:px-14">
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

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:divide-x lg:divide-navy-800">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-2 lg:px-8 lg:first:pl-0 lg:last:pr-0"
                >
                  <span className="font-mono text-xs font-semibold tracking-[0.2em] text-cyan-400 2xl:text-sm">
                    {stat.index}
                  </span>
                  <p className="whitespace-nowrap font-mono text-4xl font-bold tabular-nums text-white xl:text-5xl 2xl:text-6xl">
                    {stat.kind === 'count' ? <Counter to={stat.to} format={stat.format} /> : stat.value}
                  </p>
                  <p className="text-sm text-navy-300 2xl:text-base">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
