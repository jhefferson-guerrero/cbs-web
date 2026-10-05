import { isConnectionConstrained } from '@/lib/connection'
import { projects } from '@/lib/projects'
import { projectDetailRoute } from '@/lib/routes'

let warmed = false

// Calienta en segundo plano las páginas de proyecto: su código, la imagen de portada de cada una (la misma
// que se ve de fondo en el hero del proyecto y en la tarjeta de la Home, así que se descarga una sola vez) y
// los logos de su ficha (cliente, contratista y financiamiento). Las imágenes se piden con prioridad baja para
// no estorbar a lo que el visitante esté viendo.
function warmProjects() {
  if (warmed || isConnectionConstrained()) return
  warmed = true

  // Código de la página de proyecto: se deja listo para que la ruta lo encuentre al navegar.
  projectDetailRoute.preload().catch(() => {})

  for (const project of projects) {
    const files = [project.cover, project.client.logo, project.contractor.logo, project.funding.logo]
    for (const src of files) {
      if (!src) continue
      const image = new window.Image()
      image.fetchPriority = 'low'
      image.decoding = 'async'
      image.src = src
    }
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
