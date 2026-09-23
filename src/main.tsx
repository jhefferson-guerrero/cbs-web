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

// The Hero background is only rendered on the home route; only warm the
// browser's fetch for it there instead of on every route.
if (window.location.pathname === '/') {
  const preload = document.createElement('link')
  preload.rel = 'preload'
  preload.as = 'image'
  preload.href = '/hero-planta.webp'
  preload.fetchPriority = 'high'
  document.head.appendChild(preload)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
