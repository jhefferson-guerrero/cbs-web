// Corre de inmediato durante el parseo del HTML, antes de que se
// descargue/ejecute el bundle de JS de la app, así el navegador puede
// empezar a descargar la imagen del hero lo antes posible. Mantén estos
// srcset sincronizados con src/lib/hero-image.ts y src/lib/limp-city-hero.ts
// (no se pueden importar aquí).
// Cada hero solo se precarga en su propia ruta: el de CBS en el inicio y el de
// Limp City en /limp-city. En el resto de páginas no se usan.
// Cada ruta puede tener varias variantes con un media: el navegador solo precarga
// la que corresponde a su pantalla (en Limp City, un recorte más liviano para
// móvil vertical).
(function () {
  var heroes = {
    '/': [
      {
        sizes: '100vw',
        href: '/hero-planta.webp',
        srcset:
          '/hero-planta-640.webp 640w, /hero-planta-960.webp 960w, /hero-planta-1280.webp 1280w, /hero-planta.webp 1920w, /hero-planta-2560.webp 2560w',
      },
    ],
    '/limp-city': [
      {
        // Debe coincidir con LIMP_CITY_HERO_MOBILE_* de src/lib/limp-city-hero.ts.
        media: '(max-width: 1023.98px) and (orientation: portrait)',
        sizes: '108vh',
        href: '/hero-limpcity-movil.webp',
        srcset: '/hero-limpcity-movil-1100.webp 1100w, /hero-limpcity-movil.webp 1651w',
      },
      {
        media: 'not all and (max-width: 1023.98px) and (orientation: portrait)',
        sizes: 'max(100vw, 170vh)',
        href: '/hero-limpcity.webp',
        srcset:
          '/hero-limpcity-768.webp 768w, /hero-limpcity-1280.webp 1280w, /hero-limpcity-1920.webp 1920w, /hero-limpcity.webp 2752w',
      },
    ],
  }

  var variants = heroes[location.pathname.replace(/(.)\/$/, '$1')] || []

  variants.forEach(function (hero) {
    var heroPreload = document.createElement('link')
    heroPreload.rel = 'preload'
    heroPreload.as = 'image'
    heroPreload.href = hero.href
    heroPreload.imageSrcset = hero.srcset
    heroPreload.imageSizes = hero.sizes
    heroPreload.fetchPriority = 'high'
    if (hero.media) heroPreload.media = hero.media
    document.head.appendChild(heroPreload)
  })
})()
