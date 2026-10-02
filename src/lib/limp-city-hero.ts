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
