import { ArrowLeftIcon } from '@phosphor-icons/react'
import { PageLink } from '@/components/ui/PageLink'

// Página para cualquier dirección que no existe. El servidor la entrega con código 404 (public/404.html, generado al
// compilar) y lleva noindex (ver getSeo en lib/seo.ts).
export function NotFound() {
  return (
    <main>
      <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-white px-6 pb-16 pt-32 text-center">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Error 404</p>
        <h1 className="text-3xl font-bold text-navy-900 md:text-4xl">No encontramos esa página</h1>
        <p className="max-w-md text-[15.5px] leading-relaxed text-slate-700">
          La dirección no existe o cambió. Puedes volver al inicio o conocer nuestros proyectos.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <PageLink
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition-colors hover:text-cyan-800"
          >
            <ArrowLeftIcon size={16} weight="regular" />
            Volver al inicio
          </PageLink>
          <PageLink
            to="/#proyectos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition-colors hover:text-cyan-800"
          >
            Ver proyectos
          </PageLink>
        </div>
      </section>
    </main>
  )
}
