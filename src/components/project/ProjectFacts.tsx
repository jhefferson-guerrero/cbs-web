import { motion, useReducedMotion } from 'motion/react'
import type { Project } from '@/lib/projects'

const EASE = [0.16, 1, 0.3, 1] as const

// Cada ficha entra cuando ELLA aparece en pantalla (no todas a la vez): sube y aparece, y su línea superior se
// dibuja de izquierda a derecha. Así la fila de abajo (Monto contratado y Financiamiento), que en una laptop
// queda fuera de la primera pantalla, también se anima al llegar a ella. `custom` es el retardo: la ficha de la
// derecha de cada fila entra un poco después que la de la izquierda.
const itemVariants = {
  hidden: { opacity: 0, y: 48 },
  show: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: 1, delay, ease: EASE } }),
}
const lineVariants = {
  hidden: { scaleX: 0 },
  show: (delay: number) => ({ scaleX: 1, transition: { duration: 1.2, delay: delay + 0.1, ease: EASE } }),
}

export function ProjectFacts({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion()

  const facts = [
    { label: 'Cliente', value: project.client.name, note: project.client.note, logo: project.client.logo },
    { label: 'Contratista', value: project.contractor.name, note: project.contractor.note, logo: project.contractor.logo },
    { label: 'Monto contratado', value: project.amount, note: undefined, logo: undefined },
    { label: 'Financiamiento', value: project.funding.name, note: project.funding.note, logo: project.funding.logo },
  ]

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20 xl:px-16 2xl:max-w-[1700px] 2xl:px-14 2xl:py-24">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 2xl:text-sm"
        >
          Ficha del proyecto
        </motion.p>

        <dl className="mt-8 grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
          {facts.map((fact, i) => (
            <motion.div
              key={fact.label}
              variants={itemVariants}
              custom={0.15 + (i % 2) * 0.15}
              initial={reduceMotion ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              className="relative flex items-center justify-between gap-4 pt-6 sm:gap-6"
            >
              <motion.span
                variants={lineVariants}
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left bg-navy-200"
              />
              <div className="min-w-0">
                <dt className="font-mono text-xs font-semibold tracking-[0.2em] text-cyan-600 2xl:text-sm">
                  {fact.label.toUpperCase()}
                </dt>
                <dd className="mt-2 text-xl font-bold text-navy-900 md:text-2xl 2xl:text-3xl">{fact.value}</dd>
                {fact.note && <p className="mt-1 text-sm text-slate-600 2xl:text-base">{fact.note}</p>}
              </div>
              {fact.logo && (
                <img
                  src={fact.logo}
                  alt={`Logo de ${fact.value}`}
                  // lazy: React 19 espera a que carguen las imágenes sin loading="lazy" antes de mostrar una
                  // página nueva; estos logos no deben retrasar la entrada al proyecto.
                  loading="lazy"
                  decoding="async"
                  className="h-10 w-auto shrink-0 object-contain sm:h-16 2xl:h-20"
                />
              )}
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  )
}
