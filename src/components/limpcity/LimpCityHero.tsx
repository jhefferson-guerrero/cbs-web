import { motion, useReducedMotion } from 'motion/react'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/Button'
import { Counter } from '@/components/ui/Counter'
import { heroImage, limpCityStats } from '@/lib/limp-city'
import logoLimpCity from '@/assets/images/grupo/limp-city.webp'

export function LimpCityHero() {
  const reduceMotion = useReducedMotion()

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22, filter: 'blur(4px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-950">
      <motion.img
        src={heroImage}
        alt=""
        aria-hidden="true"
        width={1280}
        height={720}
        fetchPriority="high"
        decoding="async"
        initial={reduceMotion ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[78%_50%] saturate-[1.05] brightness-[0.95]"
      />
      <div className="absolute inset-0 -z-10 bg-navy-950/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/90 via-navy-950/45 to-navy-950/0" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/25 to-navy-950/0" />
      <div className="absolute inset-x-0 top-0 -z-10 h-36 bg-gradient-to-b from-navy-950/55 to-transparent" />

      <span aria-hidden="true" className="absolute right-6 top-24 h-6 w-6 border-r-2 border-t-2 border-white/70 lg:right-9 lg:top-28 lg:h-7 lg:w-7" />

      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-between gap-10 px-6 pb-8 pt-28 lg:gap-6 lg:px-10 lg:pb-10 lg:pt-[calc(var(--nav-h)+1.5rem)] xl:px-16 2xl:max-w-[1700px] 2xl:px-14">
        <div className="flex flex-1 items-center">
          <div className="max-w-4xl">
            {/* La animación va en el contenedor: si se anima el filtro de la propia imagen se pisa el brightness-0 invert que la vuelve blanca. */}
            <motion.div {...rise(0.1)}>
              <img
                src={logoLimpCity}
                alt="Limp City"
                width={256}
                height={256}
                className="h-[clamp(4.5rem,12vh,8.5rem)] w-auto brightness-0 invert"
              />
            </motion.div>
            <motion.h1
              {...rise(0.22)}
              className="mt-[clamp(1rem,2.6vh,2rem)] text-[clamp(2.25rem,6.2vh,4.75rem)] font-semibold leading-[1.08] tracking-tight text-white"
            >
              Limpieza urbana y manejo de residuos sólidos
            </motion.h1>
            <motion.p
              {...rise(0.36)}
              className="mt-[clamp(0.75rem,2vh,1.5rem)] max-w-[46ch] text-base leading-relaxed text-white/85 lg:text-[clamp(1rem,2.1vh,1.375rem)]"
            >
              Recolección, barrido y limpieza de canales y playas, con operación desde 2012.
            </motion.p>
            <motion.div {...rise(0.5)} className="mt-[clamp(1rem,3.2vh,2.25rem)]">
              <Button href="/#contacto" variant="moss" icon={<ArrowRightIcon size={18} weight="regular" />}>
                Contáctanos
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/15 pt-[clamp(1rem,3vh,2.25rem)] sm:grid-cols-4 sm:divide-x sm:divide-white/15">
          {limpCityStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-2 sm:px-6 sm:first:pl-0 sm:last:pr-0"
            >
              <p className="font-mono text-2xl font-bold tabular-nums text-moss-300 sm:text-3xl lg:text-[clamp(1.875rem,5vh,3.5rem)]">
                <Counter to={stat.to} format={stat.format} />
              </p>
              <p className="text-sm leading-snug text-navy-200 lg:text-[clamp(0.875rem,1.7vh,1.125rem)]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
