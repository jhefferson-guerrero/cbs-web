import { useState, type CSSProperties } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { coverageMap, limpCityCities } from '@/lib/limp-city'

// La imagen fuente mide 2752x1536, pero a la derecha de las etiquetas y debajo de
// Eunápolis solo hay fondo vacío. La tarjeta muestra únicamente la zona útil
// (2477x1186 px de la imagen, desde la esquina superior izquierda): el mapa se ve más
// grande y todas las etiquetas siguen completas (la más larga, "Campo Formoso",
// termina al 86% del ancho).
const IMAGE_W = 2752
const IMAGE_H = 1536
const CROP_W = 2477
const CROP_H = 1186
const MAP_RATIO = `${CROP_W} / ${CROP_H}`
const MAP_IMAGE_WIDTH = `${(IMAGE_W / CROP_W) * 100}%`

// En móvil (menos de lg) no cabe el mapa completo con etiquetas legibles: se muestra solo la
// franja de la derecha, desde el este de Bahía hasta el final de las etiquetas (px 605 a 2477
// de la imagen, 1872x1205), sin scroll horizontal. Las proporciones de la tarjeta (aspect-[...] abajo) deben coincidir.
const MOBILE_CROP_X = 605
const MOBILE_CROP_W = 1872
const MOBILE_IMAGE_WIDTH = `${(IMAGE_W / MOBILE_CROP_W) * 100}%`
const MOBILE_IMAGE_LEFT = `-${(MOBILE_CROP_X / MOBILE_CROP_W) * 100}%`

// Posición (en px de la imagen de 2752x1536) del punto blanco de cada ciudad. Se pintan encima, con el mismo
// recorte que la imagen, para que sigan pegados a ella en escritorio y en móvil. Si se cambia la imagen del mapa,
// hay que volver a medirlos.
const CITY_POINTS = [
  { name: 'Juazeiro', x: 1213, y: 344 },
  { name: 'Petrolina', x: 1368, y: 334 },
  { name: 'Campo Formoso', x: 1188, y: 505 },
  { name: 'Alagoinhas', x: 1307, y: 647 },
  { name: 'Salvador', x: 1363, y: 674 },
  { name: 'Lauro de Freitas', x: 1336, y: 725 },
  { name: 'Eunápolis', x: 1268, y: 1022 },
]
// Diámetro del aro de cada ciudad, en px de la imagen.
const POINT_SIZE = 100

export function LimpCityCoverage() {
  const reduceMotion = useReducedMotion()
  // Las ondas arrancan cuando el mapa aparece (no al cargar la página), para que se encienda una ciudad tras otra.
  const [pulsing, setPulsing] = useState(false)

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
          className="relative isolate aspect-[1872/1205] w-full overflow-hidden bg-moss-100 shadow-card ring-1 ring-moss-700/15 lg:aspect-[2477/1186] lg:h-full lg:w-auto"
          style={
            {
              '--map-ratio': MAP_RATIO,
              '--map-w': MAP_IMAGE_WIDTH,
              '--m-w': MOBILE_IMAGE_WIDTH,
              '--m-left': MOBILE_IMAGE_LEFT,
            } as CSSProperties
          }
        >
          {/* La imagen y los puntos comparten esta capa (mismo tamaño y posición), así los puntos se miden en % de la imagen. */}
          <motion.div
            initial={reduceMotion ? false : { scale: 1.05 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            onViewportEnter={() => setPulsing(true)}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 max-w-none [left:var(--m-left)] [width:var(--m-w)] lg:left-0 lg:[width:var(--map-w)]"
          >
            <img
              src={coverageMap}
              alt={`Mapa de Bahía con las ciudades donde opera Limp City: ${limpCityCities.join(', ')}`}
              width={IMAGE_W}
              height={IMAGE_H}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
            {CITY_POINTS.map((city, i) => (
              <motion.span
                key={city.name}
                aria-hidden="true"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                // El primer punto espera a que la cortina termine de descubrir el mapa (~0.9 s); luego, uno tras otro.
                transition={{ duration: 0.6, delay: 1 + i * 0.16, ease: [0.16, 1, 0.3, 1] }}
                // Se coloca por su esquina (centro menos medio aro) y NO con translate(-50%): con medidas fraccionarias, el
                // navegador redondea distinto el desplazamiento mientras el aro anima y al terminar, y el aro "se asentaba"
                // ~1 px hacia un lado al acabar la entrada.
                style={{
                  left: `${((city.x - POINT_SIZE / 2) / IMAGE_W) * 100}%`,
                  top: `${((city.y - POINT_SIZE / 2) / IMAGE_H) * 100}%`,
                  width: `${(POINT_SIZE / IMAGE_W) * 100}%`,
                  aspectRatio: '1',
                }}
                className="pointer-events-none absolute"
              >
                {/* Aro fijo alrededor del punto */}
                <span className="absolute inset-[30%] rounded-full border-2 border-moss-400 bg-moss-400/25 shadow-[0_0_0_1px_rgba(255,255,255,0.55)]" />
                {/* Onda que sale del punto; sin movimiento si el visitante lo pidió. */}
                {!reduceMotion && pulsing && (
                  <span
                    style={{ animationDelay: `${1.4 + i * 0.32}s`, animationFillMode: 'backwards' }}
                    className="absolute inset-0 animate-city-pulse rounded-full border-2 border-moss-400 bg-moss-400/25"
                  />
                )}
              </motion.span>
            ))}
          </motion.div>
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
