// Corre de inmediato durante el parseo del HTML, antes de que se
// descargue/ejecute el bundle de JS de la app, así el navegador puede
// empezar a descargar la imagen del hero lo antes posible. Mantené este
// srcset sincronizado con src/lib/hero-image.ts (no se puede importar acá).
// Solo para la ruta de inicio: el fondo del hero no se usa en las páginas
// de detalle de proyecto.
if (location.pathname === '/') {
  var heroPreload = document.createElement('link')
  heroPreload.rel = 'preload'
  heroPreload.as = 'image'
  heroPreload.href = '/hero-planta.webp'
  heroPreload.imageSrcset =
    '/hero-planta-640.webp 640w, /hero-planta-960.webp 960w, /hero-planta-1280.webp 1280w, /hero-planta.webp 1920w, /hero-planta-2560.webp 2560w'
  heroPreload.imageSizes = '100vw'
  heroPreload.fetchPriority = 'high'
  document.head.appendChild(heroPreload)
}
