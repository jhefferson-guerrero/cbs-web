// Fuente única de verdad para las variantes responsive del fondo del hero de
// Limp City. Se mantiene sincronizado a mano con public/hero-preload.js, que
// no puede importar este módulo. Los archivos viven en public/ (no en
// src/assets) para que ese script conozca sus URLs sin hash.
export const LIMP_CITY_HERO_SRC = '/hero-limpcity.webp'
// La foto se recorta con object-cover para cubrir toda la pantalla: en un móvil vertical
// queda mucho más ancha que la pantalla (~1.7 veces su altura), así que calcular el
// tamaño solo con el ancho (100vw) elegiría una variante demasiado chica y se vería suave.
// 170vh es el ancho real de la foto (relación 1.79) con un pequeño margen a la baja.
export const LIMP_CITY_HERO_SIZES = 'max(100vw, 170vh)'
export const LIMP_CITY_HERO_SRCSET =
  '/hero-limpcity-768.webp 768w, /hero-limpcity-1280.webp 1280w, /hero-limpcity-1920.webp 1920w, /hero-limpcity.webp 2752w'

// Móvil vertical: la foto se recorta con object-cover y solo se ve la franja derecha (~28%), así que
// no hace falta descargar el 100%. Este recorte (del 30% al 90% del ancho, 1651x1536) incluye esa
// franja en cualquier teléfono o tablet vertical y pesa la mitad. Se mantiene sincronizado a mano con
// public/hero-preload.js. La posición equivalente al 74% de la foto completa es 73.3% en el recorte
// (ver LimpCityHero.tsx).
export const LIMP_CITY_HERO_MOBILE_QUERY = '(max-width: 1023.98px) and (orientation: portrait)'
export const LIMP_CITY_HERO_MOBILE_SRC = '/hero-limpcity-movil.webp'
// El recorte mide 1.075 veces su alto y se ajusta al alto de la pantalla: 108vh es su ancho real.
export const LIMP_CITY_HERO_MOBILE_SIZES = '108vh'
export const LIMP_CITY_HERO_MOBILE_SRCSET =
  '/hero-limpcity-movil-1100.webp 1100w, /hero-limpcity-movil.webp 1651w'

// La variante que corresponde a este dispositivo (para el preloader y el prefetch, que piden la
// imagen por código y deben bajar la misma que va a mostrar el <picture>).
export function getLimpCityHeroVariant() {
  const isMobilePortrait =
    typeof window !== 'undefined' && window.matchMedia(LIMP_CITY_HERO_MOBILE_QUERY).matches
  return isMobilePortrait
    ? { src: LIMP_CITY_HERO_MOBILE_SRC, srcset: LIMP_CITY_HERO_MOBILE_SRCSET, sizes: LIMP_CITY_HERO_MOBILE_SIZES }
    : { src: LIMP_CITY_HERO_SRC, srcset: LIMP_CITY_HERO_SRCSET, sizes: LIMP_CITY_HERO_SIZES }
}
