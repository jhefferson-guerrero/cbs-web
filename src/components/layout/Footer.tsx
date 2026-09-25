import { ArrowUpIcon, EnvelopeSimpleIcon } from '@phosphor-icons/react'
import logoCbs from '@/assets/images/logo-cbs.webp'
import { navLinks } from '@/lib/nav-links'
import { CONTACT_EMAIL } from '@/lib/contact'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-navy-950">
      <span aria-hidden="true" className="absolute right-6 top-6 h-6 w-6 border-r-2 border-t-2 border-white/70 lg:right-9 lg:top-9 lg:h-7 lg:w-7" />
      <span aria-hidden="true" className="absolute bottom-6 left-6 h-6 w-6 border-b-2 border-l-2 border-white/70 lg:bottom-9 lg:left-9 lg:h-7 lg:w-7" />

      <div className="mx-auto w-full max-w-[1400px] px-10 py-10 lg:px-16 lg:py-12 xl:px-24 2xl:max-w-none 2xl:py-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-12">
          <div className="flex flex-col gap-3 sm:col-span-2 lg:col-span-1 lg:max-w-xs">
            <a href="#top" aria-label="CBS - Inicio" className="inline-block w-fit">
              <img
                src={logoCbs}
                alt="CBS - Construtora Baiana de Saneamento"
                width={1080}
                height={211}
                className="h-8 w-auto brightness-0 invert 2xl:h-9"
              />
            </a>
            <p className="text-sm leading-relaxed text-navy-300 2xl:text-base">
              Infraestructura, agua y saneamiento en Perú y Brasil.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 2xl:text-sm">Navegación</p>
            <nav aria-label="Enlaces del sitio" className="flex flex-wrap gap-x-5 gap-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-navy-200 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-400 2xl:text-base"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3 lg:justify-self-end">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 2xl:text-sm">Contacto</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-navy-200 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-400 2xl:text-base"
            >
              <EnvelopeSimpleIcon size={18} weight="regular" className="shrink-0 text-cyan-400" />
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-navy-400">
            © {year} CBS — Construtora Baiana de Saneamento. Todos los derechos reservados.
          </p>
          <a
            href="#top"
            className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-navy-300 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Volver arriba
            <ArrowUpIcon size={14} weight="regular" className="shrink-0" />
          </a>
        </div>
      </div>
    </footer>
  )
}
