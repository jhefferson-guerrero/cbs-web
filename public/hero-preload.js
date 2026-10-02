// Corre de inmediato durante el parseo del HTML, antes de que se
// descargue/ejecute el bundle de JS de la app, así el navegador puede
// empezar a descargar la imagen del hero lo antes posible. Mantené estos
// srcset sincronizados con src/lib/hero-image.ts y src/lib/limp-city-hero.ts
// (no se pueden importar acá).
// Cada hero solo se precarga en su propia ruta: el de CBS en el inicio y el de
// Limp City en /limp-city. En el resto de páginas no se usan.
(function () {
  var heroes = {
    '/': {
      sizes: '100vw',
      href: '/hero-planta.webp',
      srcset:
        '/hero-planta-640.webp 640w, /hero-planta-960.webp 960w, /hero-planta-1280.webp 1280w, /hero-planta.webp 1920w, /hero-planta-2560.webp 2560w',
    },
    '/limp-city': {
      sizes: 'max(100vw, 170vh)',
      href: '/hero-limpcity.webp',
      srcset:
        '/hero-limpcity-768.webp 768w, /hero-limpcity-1280.webp 1280w, /hero-limpcity-1920.webp 1920w, /hero-limpcity.webp 2752w',
    },
  }

  var hero = heroes[location.pathname.replace(/(.)\/$/, '$1')]

  if (hero) {
    var heroPreload = document.createElement('link')
    heroPreload.rel = 'preload'
    heroPreload.as = 'image'
    heroPreload.href = hero.href
    heroPreload.imageSrcset = hero.srcset
    heroPreload.imageSizes = hero.sizes
    heroPreload.fetchPriority = 'high'
    document.head.appendChild(heroPreload)
  }
})()
