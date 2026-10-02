import { motion, useReducedMotion } from 'motion/react'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/Button'
import { Counter } from '@/components/ui/Counter'
import { limpCityStats } from '@/lib/limp-city'
import { LIMP_CITY_HERO_SIZES, LIMP_CITY_HERO_SRC, LIMP_CITY_HERO_SRCSET } from '@/lib/limp-city-hero'
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
        src={LIMP_CITY_HERO_SRC}
        srcSet={LIMP_CITY_HERO_SRCSET}
        sizes={LIMP_CITY_HERO_SIZES}
        alt=""
        aria-hidden="true"
        width={2752}
        height={1536}
        fetchPriority="high"
        decoding="async"
        initial={reduceMotion ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[74%_50%] saturate-[1.02] lg:object-[50%_52%]"
      />
      <div className="absolute inset-0 -z-10 bg-navy-950/35 lg:hidden" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/85 via-navy-950/50 via-35% to-transparent to-62%" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/95 via-navy-950/35 via-20% to-transparent to-42%" />
      <div className="absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-navy-950/45 to-transparent" />

      <span aria-hidden="true" className="absolute right-6 top-24 h-6 w-6 border-r-2 border-t-2 border-white/70 lg:right-9 lg:top-28 lg:h-7 lg:w-7" />

      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center gap-8 px-6 pb-6 pt-24 sm:justify-between sm:gap-10 sm:pb-8 sm:pt-28 lg:gap-6 lg:px-10 lg:pb-10 lg:pt-[calc(var(--nav-h)+1.5rem)] xl:px-16 2xl:max-w-[1700px] 2xl:px-14">
        <div className="flex items-center sm:flex-1">
          {/* El ancho del texto sigue al de la pantalla: así el titular baja a dos líneas y no llega a la zona donde está el operario de la foto. */}
          <div className="max-w-4xl lg:max-w-[min(100%,clamp(28rem,46vw,54rem))]">
            {/* La animación va en el contenedor: si se anima el filtro de la propia imagen se pisa el brightness-0 invert que la vuelve blanca. */}
            <motion.div {...rise(0.1)}>
              <img
                src={logoLimpCity}
                alt="Limp City"
                width={256}
                height={256}
                className="h-14 w-auto brightness-0 invert sm:h-[4.5rem] lg:h-[clamp(4.5rem,12vh,8.5rem)]"
              />
            </motion.div>
            <motion.h1
              {...rise(0.22)}
              className="mt-3 text-[2rem] sm:mt-[clamp(1rem,2.6vh,2rem)] sm:text-[clamp(2.25rem,6.2vh,4.75rem)] font-semibold leading-[1.08] tracking-tight text-balance text-white"
            >
              Limpieza urbana y manejo de residuos sólidos
            </motion.h1>
            <motion.p
              {...rise(0.36)}
              className="mt-3 max-w-[46ch] text-[15px] sm:mt-[clamp(0.75rem,2vh,1.5rem)] sm:text-base leading-relaxed text-white/85 lg:text-[clamp(1rem,2.1vh,1.375rem)]"
            >
              Recolección, barrido y limpieza de canales y playas, con operación desde 2012.
            </motion.p>
            <motion.div {...rise(0.5)} className="mt-5 sm:mt-[clamp(1rem,3.2vh,2.25rem)]">
              <Button href="/#contacto" variant="moss" icon={<ArrowRightIcon size={18} weight="regular" />}>
                Contáctanos
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-4 border-t border-white/15 pt-4 sm:gap-x-6 sm:gap-y-8 sm:pt-[clamp(1rem,3vh,2.25rem)] sm:grid-cols-4 sm:divide-x sm:divide-white/15">
          {limpCityStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-1 sm:gap-2 sm:px-6 sm:first:pl-0 sm:last:pr-0"
            >
              <p className="font-mono text-xl font-bold tabular-nums text-moss-300 sm:text-3xl lg:text-[clamp(1.875rem,5vh,3.5rem)]">
                <Counter to={stat.to} format={stat.format} />
              </p>
              <p className="text-xs leading-snug text-navy-200 sm:text-sm lg:text-[clamp(0.875rem,1.7vh,1.125rem)]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
