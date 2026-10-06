import { useSyncExternalStore } from 'react'

// Dice si una media query se cumple ahora mismo y se actualiza si cambia (girar el móvil, cambiar el ancho de
// la ventana). Útil cuando el comportamiento de un componente (no solo su estilo) depende del tamaño.
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query)
      media.addEventListener('change', onChange)
      return () => media.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}
