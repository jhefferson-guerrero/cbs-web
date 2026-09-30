import { motion, useReducedMotion } from 'motion/react'
import mapaCobertura from '@/assets/images/actuacion-mapa.png'

// Proporción de la imagen fuente: la tarjeta tiene exactamente esta forma,
// así el mapa se ve completo y sin franjas de otro tono alrededor.
const MAP_RATIO = '1483 / 704'

export function Actuacion() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="border-t border-navy-100 bg-white">
      {/* Espacio blanco de respiro arriba y abajo, fuera del ancla (#actuacion está en
          el bloque del medio): al pulsar "Actuación" en el menú no se ve, solo al
          recorrer la página con scroll. */}
      <div aria-hidden="true" className="hidden lg:block lg:h-[clamp(2rem,8vh,6rem)]" />
      <div
        id="actuacion"
        className="flex flex-col px-6 py-16 sm:px-10 lg:h-[calc(100svh-var(--nav-h))] lg:min-h-[540px] lg:py-[clamp(1rem,3.5vh,3rem)] xl:px-16 2xl:px-24"
      >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-4xl text-center"
      >
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 2xl:text-sm">
          Área de actuación
        </p>
        <h2 className="mt-3 text-3xl font-bold leading-tight text-navy-900 md:text-4xl lg:mt-[clamp(0.5rem,1.5vh,0.75rem)] 2xl:text-5xl">
          Presencia en dos países
        </h2>
        <p className="mt-3 text-[15.5px] leading-relaxed text-slate-700 lg:mt-[clamp(0.25rem,1vh,0.75rem)] lg:text-[clamp(15.5px,1.9vh,19px)]">
          Desde Brasil hasta Perú, ejecutamos obras en distintas regiones de ambos países.
        </p>
      </motion.div>

      <div className="mt-8 overflow-x-auto lg:mt-[clamp(0.75rem,2.5vh,2rem)] lg:flex lg:min-h-0 lg:flex-1 lg:justify-center lg:overflow-visible">
        <div
          className="relative isolate min-w-[760px] overflow-hidden bg-navy-950 shadow-card lg:h-full lg:min-w-0"
          style={{ aspectRatio: MAP_RATIO }}
        >
          <motion.img
            src={mapaCobertura}
            alt="Mapa de cobertura de CBS en Perú y Brasil, con las regiones donde opera en cada país"
            width={1483}
            height={704}
            loading="lazy"
            decoding="async"
            initial={reduceMotion ? false : { scale: 1.06 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full object-cover"
          />

          <span aria-hidden="true" className="absolute right-4 top-4 h-5 w-5 border-r-2 border-t-2 border-white/70 lg:right-6 lg:top-6 lg:h-6 lg:w-6" />
          <span aria-hidden="true" className="absolute bottom-4 left-4 h-5 w-5 border-b-2 border-l-2 border-white/70 lg:bottom-6 lg:left-6 lg:h-6 lg:w-6" />

          {/* Cortina navy que se achica hacia la derecha, revelando el mapa de
              izquierda a derecha (scaleX, igual que en la foto de Nosotros). */}
          <motion.div
            aria-hidden="true"
            initial={reduceMotion ? false : { scaleX: 1 }}
            whileInView={{ scaleX: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'right' }}
            className="absolute inset-0 bg-navy-950"
          />
        </div>
      </div>
      </div>
      <div aria-hidden="true" className="hidden lg:block lg:h-[clamp(2rem,8vh,6rem)]" />
    </section>
  )
}
