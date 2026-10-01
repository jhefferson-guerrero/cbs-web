import { motion, useReducedMotion } from 'motion/react'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/Button'

export function LimpCityCta() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="bg-white">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-6 py-16 sm:flex-row sm:items-center sm:justify-between lg:px-10 lg:py-20 xl:px-16 2xl:max-w-[1700px] 2xl:px-14 2xl:py-24"
      >
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-navy-900 md:text-4xl 2xl:text-5xl">
            Hablemos de tu proyecto
          </h2>
          <p className="mt-3 text-[15.5px] leading-relaxed text-slate-700 2xl:text-lg">
            Escríbenos y te contactamos a la brevedad.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <Button href="/#contacto" variant="moss" icon={<ArrowRightIcon size={18} weight="regular" />}>
            Contáctanos
          </Button>
          <Button href="/" variant="outline-dark">
            Volver al inicio
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
