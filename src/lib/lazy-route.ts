import { lazy, type ComponentType } from 'react'

type RouteModule = { default: ComponentType }

// Como React.lazy, pero con precarga. React.lazy siempre "suspende" la primera vez que se dibuja, aunque
// el código ya esté descargado, y al volver a mostrar el contenido espera hasta ~300 ms (la pausa
// anti-parpadeo de Suspense). Si la página se precargó antes, aquí se le entrega a React de forma
// síncrona y entra al instante. Si no se precargó, funciona igual que un lazy normal.
export function lazyRoute(load: () => Promise<RouteModule>) {
  let loaded: RouteModule | undefined

  const preload = () =>
    load().then((module) => {
      loaded = module
      return module
    })

  const Component = lazy(() =>
    loaded
      ? // React solo necesita algo con .then(): lo llama de inmediato, sin esperar un ciclo de eventos.
        ({ then: (resolve: (module: RouteModule) => void) => resolve(loaded as RouteModule) } as unknown as Promise<RouteModule>)
      : preload(),
  )

  return { Component, preload }
}
