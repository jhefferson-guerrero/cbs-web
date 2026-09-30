import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react'
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
        <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight text-navy-900 md:text-4xl 2xl:text-5xl">
          Hablemos de tu proyecto
        </h2>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button href="/#contacto" variant="moss" icon={<ArrowRightIcon size={18} weight="regular" />}>
            Contáctanos
          </Button>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy-700 outline-none transition-colors hover:text-navy-950 focus-visible:ring-2 focus-visible:ring-moss-500 2xl:text-base"
          >
            <ArrowLeftIcon size={16} weight="regular" />
            Volver al inicio
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
