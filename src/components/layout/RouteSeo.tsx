import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// Mantiene al día el título, la descripción, la canónica y los datos estructurados del <head> al cambiar de página
// dentro de la app. En la carga inicial el HTML ya los trae puestos (ver scripts/prerender.mjs), así que no se hace
// nada y el módulo de SEO (con los datos de proyectos y de Limp City) no entra en la carga inicial: se descarga recién
// cuando el visitante navega a otra página. Con el servidor de desarrollo (sin HTML prerrenderizado) se aplica siempre.
export function RouteSeo() {
  const { pathname } = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      if (document.head.querySelector('meta[name="description"]')) return
    }
    void import('@/lib/seo').then(({ applySeo, getSeo }) => applySeo(getSeo(pathname)))
  }, [pathname])

  return null
}
