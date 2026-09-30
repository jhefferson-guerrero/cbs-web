import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '@phosphor-icons/react'

// Página provisional: la página informativa de Limp City todavía no está hecha.
export function LimpCity() {
  useEffect(() => {
    document.title = 'Limp City | CBS'
  }, [])

  return (
    <main>
      <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-navy-950 px-6 pb-16 pt-28 text-center">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Limp City</p>
        <h1 className="text-3xl font-bold text-white md:text-4xl">Próximamente</h1>
        <p className="max-w-md text-[15.5px] leading-relaxed text-navy-200">
          Estamos preparando la página de Limp City.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition-colors hover:text-white"
        >
          <ArrowLeftIcon size={16} weight="regular" />
          Volver al inicio
        </Link>
      </section>
    </main>
  )
}
