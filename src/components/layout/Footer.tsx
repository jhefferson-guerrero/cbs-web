import { EnvelopeSimpleIcon } from '@phosphor-icons/react'
import logoCbs from '@/assets/images/logo-cbs.webp'
import { navLinks } from '@/lib/nav-links'
import { CONTACT_EMAIL } from '@/lib/contact'

const footerLinks = [...navLinks, { label: 'Contacto', href: '#contacto' }]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-950">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-14 lg:px-10 lg:py-16 xl:px-16 2xl:max-w-[1700px] 2xl:px-14 2xl:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
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
            <p className="max-w-xs text-sm leading-relaxed text-navy-300">
              Infraestructura, agua y saneamiento en Perú y Brasil.
            </p>
          </div>

          <nav aria-label="Enlaces del sitio" className="flex flex-wrap gap-x-6 gap-y-3 lg:justify-center">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-navy-200 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy-200 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <EnvelopeSimpleIcon size={16} weight="regular" className="shrink-0 text-cyan-400" />
            {CONTACT_EMAIL}
          </a>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 lg:mt-12">
          <p className="text-xs text-navy-400">
            © {year} CBS — Construtora Baiana de Saneamento. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
