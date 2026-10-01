import type { CSSProperties } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { coverageMap, limpCityCities } from '@/lib/limp-city'

// La imagen fuente mide 1365x661, pero a la derecha de las etiquetas y debajo de
// Eunápolis solo hay mar vacío. La tarjeta muestra únicamente la zona útil
// (1170x560 px de la imagen): el mapa se ve más grande y todas las etiquetas
// siguen completas.
const MAP_RATIO = '1170 / 560'
const MAP_IMAGE_WIDTH = `${(1365 / 1170) * 100}%`

// En móvil (menos de lg) no cabe el mapa completo con etiquetas legibles: se muestra solo la
// franja de la derecha, desde el este de Bahía hasta el final de las etiquetas (px 300 a 1170
// de la imagen), sin scroll horizontal.
const MOBILE_CROP_X = 300
const MOBILE_CROP_W = 870
const MOBILE_IMAGE_WIDTH = `${(1365 / MOBILE_CROP_W) * 100}%`
const MOBILE_IMAGE_LEFT = `-${(MOBILE_CROP_X / MOBILE_CROP_W) * 100}%`

export function LimpCityCoverage() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="bg-moss-50">
      {/* Espacio de respiro arriba y abajo, fuera del bloque de una vista. */}
      <div aria-hidden="true" className="hidden lg:block lg:h-[clamp(2rem,8vh,6rem)]" />
      <div className="flex flex-col px-6 py-16 sm:px-10 lg:h-[calc(100svh-var(--nav-h))] lg:min-h-[440px] lg:py-[clamp(1.25rem,4.5vh,4rem)] xl:px-16 2xl:px-24">
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

      <div className="mt-8 lg:mt-[clamp(0.75rem,3vh,2.5rem)] lg:flex lg:min-h-0 lg:flex-1 lg:justify-center">
        <div
          className="relative isolate aspect-[870/560] w-full overflow-hidden bg-moss-100 shadow-card ring-1 ring-moss-700/15 lg:aspect-[1170/560] lg:h-full lg:w-auto"
          style={
            {
              '--map-ratio': MAP_RATIO,
              '--map-w': MAP_IMAGE_WIDTH,
              '--m-w': MOBILE_IMAGE_WIDTH,
              '--m-left': MOBILE_IMAGE_LEFT,
            } as CSSProperties
          }
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
            className="absolute top-0 h-auto max-w-none [left:var(--m-left)] [width:var(--m-w)] lg:left-0 lg:[width:var(--map-w)]"
          />
          <span aria-hidden="true" className="absolute right-4 top-4 h-5 w-5 border-r-2 border-t-2 border-navy-900/50 lg:right-6 lg:top-6 lg:h-6 lg:w-6" />
          <span aria-hidden="true" className="absolute bottom-4 left-4 h-5 w-5 border-b-2 border-l-2 border-navy-900/50 lg:bottom-6 lg:left-6 lg:h-6 lg:w-6" />
          {/* Cortina que se achica hacia la derecha y revela el mapa de izquierda a derecha. */}
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
      </div>
      <div aria-hidden="true" className="hidden lg:block lg:h-[clamp(2rem,8vh,6rem)]" />
    </section>
  )
}
