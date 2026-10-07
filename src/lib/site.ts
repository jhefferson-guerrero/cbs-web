// Datos de la empresa y del sitio que usan el SEO, el sitemap y los datos estructurados. Es la única fuente: si cambia
// el dominio, solo se cambia aquí (y en public/robots.txt, que no puede importar este módulo).
export const SITE_URL = 'https://www.cbsperu.com'
export const SITE_NAME = 'CBS Perú'
export const SITE_LEGAL_NAME = 'CBS - Construtora Baiana de Saneamento'
export const SITE_SLOGAN = 'Infraestructura, agua y saneamiento'
export const SITE_LANGUAGE = 'es-PE'
export const SITE_LOCALE = 'es_PE'
export const FOUNDING_YEAR = 2009

/** Logo para los datos estructurados y las tarjetas (archivo en public/). */
export const SITE_LOGO = { path: '/logo-cbs.png', width: 1080, height: 211 }

/** Imagen de las tarjetas al compartir (1200x630, en public/og/). */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 }
