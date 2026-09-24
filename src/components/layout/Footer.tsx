import { ArrowUpIcon, EnvelopeSimpleIcon } from '@phosphor-icons/react'
import logoCbs from '@/assets/images/logo-cbs.webp'
import { navLinks } from '@/lib/nav-links'
import { CONTACT_EMAIL } from '@/lib/contact'

const footerLinks = [...navLinks, { label: 'Contacto', href: '#contacto' }]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-950">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-14 lg:px-10 lg:py-16 xl:px-16 2xl:max-w-[1700px] 2xl:px-14 2xl:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-8">
          <div className="flex flex-col gap-4">
            <a href="#top" aria-label="CBS - Inicio" className="inline-block w-fit">
              <img
                src={logoCbs}
                alt="CBS - Construtora Baiana de Saneamento"
                width={1080}
                height={211}
                className="h-9 w-auto brightness-0 invert 2xl:h-10"
              />
            </a>
            <p className="max-w-xs text-base leading-relaxed text-navy-300 2xl:text-lg">
              Infraestructura, agua y saneamiento en Perú y Brasil.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 2xl:text-sm">Navegación</p>
            <nav aria-label="Enlaces del sitio" className="flex flex-col gap-4">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="w-fit text-base font-semibold text-navy-200 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-400 2xl:text-lg"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-5">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 2xl:text-sm">Contacto</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex w-fit items-center gap-2 text-base font-semibold text-navy-200 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-400 2xl:text-lg"
            >
              <EnvelopeSimpleIcon size={18} weight="regular" className="shrink-0 text-cyan-400" />
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between lg:mt-12">
          <p className="text-xs text-navy-400">
            © {year} CBS — Construtora Baiana de Saneamento. Todos los derechos reservados.
          </p>
          <a
            href="#top"
            className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-navy-300 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Volver arriba
            <ArrowUpIcon size={13} weight="regular" className="shrink-0" />
          </a>
        </div>
      </div>
    </footer>
  )
}
