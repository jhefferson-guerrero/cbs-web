// Fuente única de verdad para las variantes responsive del fondo del hero.
// Se mantiene sincronizado a mano con el aviso de precarga en
// public/hero-preload.js, que no puede importar este módulo.
export const HERO_IMAGE_SRC = '/hero-planta.webp'
// La foto se recorta con object-cover para cubrir toda la pantalla: en una pantalla vertical (tablet) queda
// mucho más ancha que ella (~1.55 veces su altura), así que calcular el tamaño solo con el ancho (100vw)
// elegiría una variante demasiado chica y se vería borrosa. 155vh es el ancho real de la foto (relación
// 1.547). En pantallas horizontales gana 100vw y nada cambia.
export const HERO_IMAGE_SIZES = 'max(100vw, 155vh)'
export const HERO_IMAGE_SRCSET =
  '/hero-planta-640.webp 640w, /hero-planta-960.webp 960w, /hero-planta-1280.webp 1280w, /hero-planta.webp 1920w, /hero-planta-2560.webp 2560w'

// Celular vertical (menos de 640 px, donde el hero ancla la foto a la derecha): solo se ve la franja derecha
// (~29% del ancho de la foto), así que se descarga un recorte vertical de esa zona (del 44% al 96% del ancho,
// 1338x1664) a la resolución original de la foto, en vez de la foto completa reducida y estirada. Se
// mantiene sincronizado a mano con public/hero-preload.js. La posición equivalente al 90% de la foto
// completa es 86% en el recorte (ver Hero.tsx).
export const HERO_IMAGE_MOBILE_QUERY = '(max-width: 639.98px) and (orientation: portrait)'
export const HERO_IMAGE_MOBILE_SRC = '/hero-planta-movil.webp'
// El recorte mide 0.804 veces su alto y se ajusta al alto de la pantalla: 80vh es su ancho real.
export const HERO_IMAGE_MOBILE_SIZES = 'max(100vw, 80vh)'
export const HERO_IMAGE_MOBILE_SRCSET = '/hero-planta-movil-900.webp 900w, /hero-planta-movil.webp 1338w'

// La variante que corresponde a este dispositivo (para el preloader, que pide la imagen por código y debe
// bajar la misma que va a mostrar el <picture>).
export function getHeroImageVariant() {
  const isMobilePortrait = typeof window !== 'undefined' && window.matchMedia(HERO_IMAGE_MOBILE_QUERY).matches
  return isMobilePortrait
    ? { src: HERO_IMAGE_MOBILE_SRC, srcset: HERO_IMAGE_MOBILE_SRCSET, sizes: HERO_IMAGE_MOBILE_SIZES }
    : { src: HERO_IMAGE_SRC, srcset: HERO_IMAGE_SRCSET, sizes: HERO_IMAGE_SIZES }
}
