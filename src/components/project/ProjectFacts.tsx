import { motion, useReducedMotion } from 'motion/react'
import type { Project } from '@/lib/projects'

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
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 2xl:text-sm">
          Ficha del proyecto
        </p>

        <dl className="mt-8 grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
          {facts.map((fact, i) => (
            <motion.div
              key={fact.label}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-between gap-4 border-t border-navy-100 pt-6 sm:gap-6"
            >
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
