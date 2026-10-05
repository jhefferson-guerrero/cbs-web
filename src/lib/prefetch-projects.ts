import { isConnectionConstrained } from '@/lib/connection'
import { projects } from '@/lib/projects'

let warmed = false

// Calienta en segundo plano las páginas de proyecto: su código y la imagen de portada de cada una (la misma
// que se ve de fondo en el hero del proyecto y en la tarjeta de la Home, así que se descarga una sola vez).
// Las imágenes se piden con prioridad baja para no estorbar a lo que el visitante esté viendo.
function warmProjects() {
  if (warmed || isConnectionConstrained()) return
  warmed = true

  // Mismo módulo que carga la ruta con React.lazy: el navegador lo reutiliza al navegar.
  import('@/pages/ProjectDetail').catch(() => {})

  for (const project of projects) {
    const cover = new window.Image()
    cover.fetchPriority = 'low'
    cover.decoding = 'async'
    cover.src = project.cover
  }
}

// Dispara la precarga una sola vez, cuando el visitante llega a alguna de las secciones indicadas (por id).
// Se usan Experiencia y Proyectos: Experiencia es la anterior a Proyectos, así que da tiempo de sobra para
// bajar las portadas antes de que se pulse una tarjeta, y Proyectos cubre el salto directo desde el menú.
// Devuelve una función que cancela la espera.
export function prefetchProjectsWhenNear(sectionIds: string[]) {
  const targets = sectionIds.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null)
  if (targets.length === 0 || typeof IntersectionObserver === 'undefined') return () => {}

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return
      warmProjects()
      observer.disconnect()
    },
    // Un poco antes de que la sección entre en pantalla.
    { rootMargin: '0px 0px 300px 0px' },
  )
  targets.forEach((el) => observer.observe(el))

  return () => observer.disconnect()
}
