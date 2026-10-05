import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { EnvelopeSimpleIcon } from '@phosphor-icons/react'
import logoCbs from '@/assets/images/logo-cbs.webp'
import { navLinks } from '@/lib/nav-links'
import { CONTACT_EMAIL } from '@/lib/contact'

export function Footer() {
  const year = new Date().getFullYear()
  const reduceMotion = useReducedMotion()
  const [hoveredHref, setHoveredHref] = useState<string | null>(null)

  return (
    <footer className="relative bg-navy-950">
      <span aria-hidden="true" className="absolute right-6 top-6 hidden h-6 w-6 sm:block border-r-2 border-t-2 border-white/70 lg:right-9 lg:top-9 lg:h-7 lg:w-7" />
      <span aria-hidden="true" className="absolute bottom-6 left-6 hidden h-6 w-6 sm:block border-b-2 border-l-2 border-white/70 lg:bottom-9 lg:left-9 lg:h-7 lg:w-7" />

      <div className="mx-auto w-full max-w-[1400px] px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20 xl:px-24 2xl:max-w-none 2xl:py-24">
        <div className="grid gap-10 sm:gap-8 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#top" aria-label="CBS - Inicio" className="inline-block w-fit">
              <img
                src={logoCbs}
                alt="CBS - Construtora Baiana de Saneamento"
                width={1080}
                height={211}
                loading="lazy"
                className="h-11 w-auto brightness-0 invert 2xl:h-14"
              />
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 2xl:text-sm">Navegación</p>
            {/* Mismo hover que la navbar: un fondo suave que se desliza de un enlace al otro.
                El margen negativo a la izquierda compensa el relleno del primer enlace para que
                su texto siga alineado con la etiqueta "Navegación". */}
            <nav
              aria-label="Enlaces del sitio"
              onMouseLeave={() => setHoveredHref(null)}
              className="-ml-3 grid grid-cols-2 gap-1 sm:flex sm:flex-wrap"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredHref(link.href)}
                  onFocus={() => setHoveredHref(link.href)}
                  onBlur={() => setHoveredHref(null)}
                  className="relative isolate rounded-lg px-3 py-2 text-sm font-semibold text-navy-100 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-400 2xl:text-base"
                >
                  {hoveredHref === link.href && (
                    <motion.span
                      layoutId="footer-hover-pill"
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-lg bg-white/10"
                      transition={
                        reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }
                      }
                    />
                  )}
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3 lg:justify-self-end">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 2xl:text-sm">Contacto</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-navy-100 outline-none transition-colors hover:text-white hover:underline hover:underline-offset-4 focus-visible:ring-2 focus-visible:ring-cyan-400 2xl:text-base"
            >
              <EnvelopeSimpleIcon size={18} weight="regular" className="shrink-0 text-cyan-400" />
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 sm:mt-12">
          <p className="text-sm text-navy-300">
            © {year} CBS — Construtora Baiana de Saneamento. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
