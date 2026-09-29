// Runs immediately during HTML parsing, before the app's JS bundle
// downloads/executes, so the browser can start fetching the hero image
// as early as possible. Keep this srcset in sync with
// src/lib/hero-image.ts (it can't be imported here). Home route only:
// the hero background isn't used on project detail pages.
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
