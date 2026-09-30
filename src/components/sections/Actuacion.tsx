import { motion, useReducedMotion } from 'motion/react'
import mapaCobertura from '@/assets/images/actuacion-mapa.png'

// Proporción de la imagen fuente; el mapa se muestra completo (sin recortar)
// y el resto del espacio lo cubre un fondo con la misma imagen desenfocada.
const MAP_RATIO = '1483 / 704'

export function Actuacion() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="actuacion"
      aria-labelledby="actuacion-title"
      className="relative isolate overflow-hidden bg-navy-950 lg:h-[calc(100svh-var(--nav-h))] lg:min-h-[420px]"
    >
      <h2 id="actuacion-title" className="sr-only">
        Área de actuación: presencia en Perú y Brasil
      </h2>

      {/* Fondo ambiental: la misma imagen, desenfocada y oscurecida, llena los
          costados cuando la pantalla es más ancha que el mapa, sin costuras
          de color ni huecos. */}
      <img
        src={mapaCobertura}
        alt=""
        aria-hidden="true"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full scale-110 object-cover opacity-60 blur-2xl"
      />

      <div className="overflow-x-auto lg:h-full lg:overflow-visible">
        <div className="flex min-w-[760px] justify-center lg:h-full lg:min-w-0">
          <div
            className="relative w-full max-w-full lg:h-full lg:w-auto"
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
              className="h-full w-full object-contain"
            />

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

      <span aria-hidden="true" className="absolute right-6 top-6 h-6 w-6 border-r-2 border-t-2 border-white/70 lg:right-9 lg:top-9 lg:h-7 lg:w-7" />
      <span aria-hidden="true" className="absolute bottom-6 left-6 h-6 w-6 border-b-2 border-l-2 border-white/70 lg:bottom-9 lg:left-9 lg:h-7 lg:w-7" />
      <span className="absolute bottom-7 right-6 font-mono text-[11px] uppercase tracking-[0.18em] text-white lg:bottom-10 lg:right-9">
        Fig. 02 — Área de actuación
      </span>
    </section>
  )
}
