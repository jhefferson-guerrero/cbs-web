import { motion, useReducedMotion } from 'motion/react'
import { coverageMap, limpCityCities } from '@/lib/limp-city'

// La imagen fuente mide 1365x661, pero a la derecha de las etiquetas y debajo de
// Eunápolis solo hay mar vacío. La tarjeta muestra únicamente la zona útil
// (1170x560 px de la imagen): el mapa se ve más grande y todas las etiquetas
// siguen completas.
const MAP_RATIO = '1170 / 560'
const MAP_IMAGE_WIDTH = `${(1365 / 1170) * 100}%`

export function LimpCityCoverage() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="flex flex-col bg-moss-50 px-6 py-16 sm:px-10 lg:h-[calc(100svh-var(--nav-h))] lg:min-h-[540px] lg:py-[clamp(1.25rem,4.5vh,4rem)] xl:px-16 2xl:px-24">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-4xl text-center"
      >
        <h2 className="text-3xl font-semibold leading-tight tracking-tight text-navy-900 md:text-4xl lg:text-[clamp(2.25rem,5.4vh,3.75rem)]">
          Área de actuación
        </h2>
        <p className="mt-3 text-[15.5px] leading-relaxed text-slate-700 lg:mt-[clamp(0.25rem,1.2vh,0.75rem)] lg:text-[clamp(15.5px,1.9vh,19px)]">
          Siete ciudades donde prestamos servicio de limpieza urbana.
        </p>
      </motion.div>

      <div className="mt-8 overflow-x-auto lg:mt-[clamp(0.75rem,3vh,2.5rem)] lg:flex lg:min-h-0 lg:flex-1 lg:justify-center lg:overflow-visible">
        <div
          className="relative isolate min-w-[640px] overflow-hidden bg-moss-100 shadow-card ring-1 ring-moss-700/15 lg:h-full lg:min-w-0"
          style={{ aspectRatio: MAP_RATIO }}
        >
          <motion.img
            src={coverageMap}
            alt={`Mapa de Bahía con las ciudades donde opera Limp City: ${limpCityCities.join(', ')}`}
            width={1365}
            height={661}
            loading="lazy"
            decoding="async"
            initial={reduceMotion ? false : { scale: 1.05 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: MAP_IMAGE_WIDTH }}
            className="absolute left-0 top-0 h-auto max-w-none"
          />
          <span aria-hidden="true" className="absolute right-4 top-4 h-5 w-5 border-r-2 border-t-2 border-navy-900/50 lg:right-6 lg:top-6 lg:h-6 lg:w-6" />
          <span aria-hidden="true" className="absolute bottom-4 left-4 h-5 w-5 border-b-2 border-l-2 border-navy-900/50 lg:bottom-6 lg:left-6 lg:h-6 lg:w-6" />
          <motion.div
            aria-hidden="true"
            initial={reduceMotion ? false : { scaleX: 1 }}
            whileInView={{ scaleX: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'right' }}
            className="absolute inset-0 bg-moss-50"
          />
        </div>
      </div>
    </section>
  )
}
