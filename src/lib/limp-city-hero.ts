// Fuente única de verdad para las variantes responsive del fondo del hero de
// Limp City. Se mantiene sincronizado a mano con public/hero-preload.js, que
// no puede importar este módulo. Los archivos viven en public/ (no en
// src/assets) para que ese script conozca sus URLs sin hash.
export const LIMP_CITY_HERO_SRC = '/hero-limpcity.webp'
export const LIMP_CITY_HERO_SIZES = '100vw'
export const LIMP_CITY_HERO_SRCSET =
  '/hero-limpcity-768.webp 768w, /hero-limpcity-1280.webp 1280w, /hero-limpcity-1920.webp 1920w, /hero-limpcity.webp 2752w'
