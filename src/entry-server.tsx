/* oxlint-disable react/only-export-components */
import { renderToString } from 'react-dom/server'
import { Route, Routes, StaticRouter } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { Home } from '@/pages/Home'
import { LimpCity } from '@/pages/LimpCity'
import { NotFound } from '@/pages/NotFound'
import { ProjectDetail } from '@/pages/ProjectDetail'

// Punto de entrada del servidor: lo usa scripts/prerender.mjs al compilar para escribir en el HTML de cada página el
// contenido ya dibujado. Así los buscadores y las vistas previas al compartir (WhatsApp, LinkedIn) leen el texto sin
// ejecutar JavaScript. Las páginas van importadas directo (no con carga diferida) porque el servidor no espera a
// los chunks. El preloader, el scroll suave y el botón de volver arriba solo existen en el navegador.
export function render(path: string) {
  return renderToString(
    <StaticRouter location={path}>
      <Navbar ready />
      <Routes>
        <Route path="/" element={<Home ready />} />
        <Route path="/proyectos/:slug" element={<ProjectDetail ready />} />
        <Route path="/limp-city" element={<LimpCity />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </StaticRouter>,
  )
}

export { getSeo, indexablePaths, seoToHead, sitemapPaths } from '@/lib/seo'
export { SITE_URL } from '@/lib/site'
