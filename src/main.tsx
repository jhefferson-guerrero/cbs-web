import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/500.css'
import '@fontsource/ibm-plex-sans/600.css'
import '@fontsource/ibm-plex-sans/700.css'
import '@fontsource/ibm-plex-mono/500.css'
import '@fontsource/ibm-plex-mono/600.css'
import './index.css'
import App from './App.tsx'

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
window.scrollTo(0, 0)

// El aviso de precarga de la imagen del hero ahora vive en
// public/hero-preload.js, referenciado desde index.html, así corre antes de
// que este bundle se descargue/parsee, no después.

// El HTML trae el contenido de la página ya dibujado (prerrenderizado, para buscadores y vistas previas). La app lo
// reemplaza al arrancar: se vacía el contenedor y se dibuja de cero, con el preloader y las animaciones de siempre.
const root = document.getElementById('root')!
root.replaceChildren()
root.removeAttribute('data-prerendered')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
