import { motion, useReducedMotion } from 'motion/react'
import { ArrowRightIcon, BuildingsIcon, ChartLineUpIcon, ClockIcon } from '@phosphor-icons/react'
import heroPlanta from '@/assets/images/hero-planta.webp'
import { Button } from '@/components/ui/Button'

const stats = [
  { icon: BuildingsIcon, value: '+80', label: 'Proyectos ejecutados' },
  { icon: ChartLineUpIcon, value: 'S/ 1,300 M+', label: 'Portafolio ejecutado' },
  { icon: ClockIcon, value: 'Desde 2009', label: 'Experiencia en el sector' },
]

export function Hero() {
  const reduceMotion = useReducedMotion()

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    <>
      <section id="top" className="relative flex min-h-[100dvh] items-center overflow-hidden bg-navy-950 pt-18">
        <img
          src={heroPlanta}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[72%_50%] saturate-[1.4] contrast-[1.12] brightness-[1.12]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/96 via-navy-950/65 to-navy-950/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-navy-950/10" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-navy-950/70 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-10">
          <div className="max-w-2xl lg:max-w-3xl">
            <motion.h1
              {...fadeUp(0)}
              className="break-words text-4xl font-bold leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Infraestructura, agua y saneamiento
            </motion.h1>

            <motion.p {...fadeUp(0.1)} className="mt-6 max-w-[54ch] text-base leading-relaxed text-white/85 md:text-lg">
              Ejecutamos proyectos de infraestructura de mediana y gran escala: abastecimiento
              de agua, represas, alcantarillado sanitario, drenaje urbano, defensa ribereña e
              infraestructura urbana.
            </motion.p>

            <motion.div {...fadeUp(0.2)} className="mt-9 flex flex-wrap items-center gap-4">
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.35 }}
          className="grid grid-cols-1 divide-y divide-navy-100 rounded-lg border-t-[3px] border-cyan-600 bg-white p-8 ring-1 ring-navy-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:p-10"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="group flex items-start gap-4 py-6 first:pt-0 last:pb-0 sm:flex-col sm:gap-4 sm:px-8 sm:py-0 sm:first:pl-0 sm:last:pr-0"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-cyan-50 text-cyan-600 transition-colors duration-300 group-hover:bg-cyan-600 group-hover:text-white">
                <Icon size={22} weight="regular" />
              </span>
              <div>
                <p className="font-mono text-3xl font-semibold text-navy-900 md:text-4xl">{value}</p>
                <p className="mt-1.5 text-sm text-navy-600">{label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </>
  )
}
