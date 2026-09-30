import { Fragment, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useLenis } from 'lenis/react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRightIcon } from '@phosphor-icons/react'
import logoCbs from '@/assets/images/logo-cbs.webp'
import logoMobileCbs from '@/assets/images/logo-mobile-cbs.webp'
import { navLinks } from '@/lib/nav-links'
import { partners, type Partner } from '@/lib/partners'
import { cn } from '@/lib/utils'

// Logo de una empresa aliada, con enlace: en color sobre la navbar blanca y como
// silueta blanca sobre el hero (mismo tratamiento que el logo de CBS), con fundido
// entre ambos. Un sitio externo se abre en pestaña nueva; uno interno, en este sitio.
function PartnerLogo({
  partner,
  isSolid,
  className,
  onNavigate,
}: {
  partner: Partner
  isSolid: boolean
  className: string
  onNavigate?: () => void
}) {
  const linkClasses =
    'relative grid shrink-0 rounded-md outline-none transition-transform duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-cyan-400'

  const logo = (
    <>
      <img
        src={partner.logo}
        alt={partner.name}
        width={256}
        height={256}
        className={cn('[grid-area:1/1] w-auto transition-opacity duration-300', className, isSolid ? 'opacity-100' : 'opacity-0')}
      />
      <img
        src={partner.logo}
        alt=""
        aria-hidden="true"
        width={256}
        height={256}
        className={cn('[grid-area:1/1] w-auto brightness-0 invert transition-opacity duration-300', className, isSolid ? 'opacity-0' : 'opacity-100')}
      />
    </>
  )

  if (partner.external) {
    return (
      <a href={partner.href} target="_blank" rel="noopener noreferrer" className={linkClasses}>
        {logo}
        <span className="sr-only">(se abre en una pestaña nueva)</span>
      </a>
    )
  }

  return (
    <Link to={partner.href} onClick={onNavigate} className={linkClasses}>
      {logo}
    </Link>
  )
}

export function Navbar({ ready }: { ready: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredHref, setHoveredHref] = useState<string | null>(null)
  const [activeHref, setActiveHref] = useState<string | null>(null)
  const reduceMotion = useReducedMotion()
  const lenis = useLenis()
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scrollspy: la sección activa es la última cuyo inicio ya pasó una línea de
  // lectura ubicada al 40% de la altura de la pantalla. Se calcula con la
  // posición de cada sección en cada scroll, así que no hay "huecos" sin
  // sección activa (por ejemplo, en los espacios blancos de respiro que hay
  // entre secciones) ni depende de una franja delgada que se pueda saltar.
  useEffect(() => {
    if (pathname !== '/') return

    let rafId = 0

    const update = () => {
      rafId = 0
      const sections = navLinks
        .map((link) => document.getElementById(link.href.slice(1)))
        .filter((el): el is HTMLElement => el !== null)
      if (sections.length === 0) return

      const probe = window.innerHeight * 0.4
      let current: string | null = null
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= probe) current = `#${section.id}`
      }

      setActiveHref(current)
    }

    const schedule = () => {
      if (!rafId) rafId = requestAnimationFrame(update)
    }

    // Las secciones del Home están detrás de un chunk de ruta con carga
    // diferida (lazy) + Suspense; se recalcula en cada scroll/resize y una vez
    // al montar, y si todavía no existen simplemente no hace nada.
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    const retry = window.setInterval(schedule, 500)
    const stopRetry = window.setTimeout(() => window.clearInterval(retry), 4000)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.clearInterval(retry)
      window.clearTimeout(stopRetry)
    }
  }, [pathname])

  useEffect(() => {
    document.documentElement.style.overflow = isMenuOpen ? 'hidden' : ''
    if (isMenuOpen) {
      lenis?.stop()
    } else {
      lenis?.start()
    }
    return () => {
      document.documentElement.style.overflow = ''
      lenis?.start()
    }
  }, [isMenuOpen, lenis])

  const isSolid = isScrolled || isMenuOpen

  return (
    <motion.header
      id="site-header"
      initial={reduceMotion ? false : { opacity: 0, y: -12 }}
      animate={reduceMotion || ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors',
        isMenuOpen ? 'duration-0' : 'duration-300',
        isSolid ? 'bg-white shadow-nav' : 'bg-transparent',
      )}
    >
      <nav id="site-navbar" className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-6 lg:h-16 lg:px-10 xl:max-w-[1600px] xl:px-12 2xl:h-20 2xl:max-w-[1850px] 2xl:px-16">
        <a href="#top" className="relative block shrink-0" aria-label="CBS - Inicio">
          <span className="grid lg:hidden">
            <img
              src={logoMobileCbs}
              alt="CBS - Construtora Baiana de Saneamento"
              width={652}
              height={296}
              className={cn(
                '[grid-area:1/1] h-9 w-auto transition-opacity duration-300',
                isSolid ? 'opacity-100' : 'opacity-0',
              )}
            />
            <img
              src={logoMobileCbs}
              aria-hidden="true"
              width={652}
              height={296}
              className={cn(
                '[grid-area:1/1] h-9 w-auto brightness-0 invert transition-opacity duration-300',
                isSolid ? 'opacity-0' : 'opacity-100',
              )}
            />
          </span>

          <span className="hidden lg:grid">
            <img
              src={logoCbs}
              alt="CBS - Construtora Baiana de Saneamento"
              width={1080}
              height={211}
              className={cn(
                '[grid-area:1/1] h-10 w-auto transition-opacity duration-300 2xl:h-12',
                isSolid ? 'opacity-100' : 'opacity-0',
              )}
            />
            <img
              src={logoCbs}
              aria-hidden="true"
              width={1080}
              height={211}
              className={cn(
                '[grid-area:1/1] h-10 w-auto brightness-0 invert transition-opacity duration-300 2xl:h-12',
                isSolid ? 'opacity-0' : 'opacity-100',
              )}
            />
          </span>
        </a>

        <div
          className="hidden items-center gap-1 lg:flex"
          onMouseLeave={() => setHoveredHref(null)}
        >
          {navLinks.map((link) => {
            const isActive = pathname === '/' && activeHref === link.href

            return (
              <a
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHoveredHref(link.href)}
                onFocus={() => setHoveredHref(link.href)}
                onBlur={() => setHoveredHref(null)}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'relative rounded-lg px-3 py-2 text-base font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 xl:px-4 2xl:px-5 2xl:text-lg',
                  isActive
                    ? isSolid
                      ? 'text-cyan-700'
                      : 'text-cyan-300'
                    : isSolid
                      ? 'text-navy-800 hover:text-navy-950'
                      : 'text-white hover:text-white',
                )}
              >
                {hoveredHref === link.href && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    className={cn(
                      'absolute inset-0 -z-10 rounded-lg',
                      isSolid ? 'bg-navy-50' : 'bg-white/10',
                    )}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 420, damping: 34 }
                    }
                  />
                )}
                {link.label}
                {isActive && (
                  <motion.span
                    aria-hidden="true"
                    layoutId="nav-active-indicator"
                    className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-cyan-500 xl:inset-x-4 2xl:inset-x-5"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 420, damping: 34 }
                    }
                  />
                )}
              </a>
            )
          })}
        </div>

        <div className="hidden shrink-0 items-center gap-4 lg:flex xl:gap-5">
          {partners.map((partner, i) => (
            <Fragment key={partner.name}>
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className={cn('h-6 w-px transition-colors duration-300 2xl:h-8', isSolid ? 'bg-navy-200' : 'bg-white/30')}
                />
              )}
              <PartnerLogo partner={partner} isSolid={isSolid} className="h-9 xl:h-10 2xl:h-12" />
            </Fragment>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors lg:hidden',
            isSolid ? 'text-navy-900' : 'text-white',
          )}
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMenuOpen}
        >
          <span aria-hidden="true" className="relative flex h-4 w-6 flex-col items-center justify-between">
            <motion.span
              className="h-0.5 w-6 rounded-full bg-current"
              animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 24 }}
            />
            <motion.span
              className="h-0.5 w-6 rounded-full bg-current"
              animate={isMenuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.15 }}
            />
            <motion.span
              className="h-0.5 w-6 rounded-full bg-current"
              animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 24 }}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-[calc(100dvh-3.5rem)] overflow-hidden border-t border-navy-100 bg-white lg:hidden"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-6 right-6 h-7 w-7 border-b-2 border-r-2 border-cyan-500/40"
            />

            <div className="flex flex-col px-6 py-8">
              <nav className="flex flex-col divide-y divide-navy-100">
                {navLinks.map((link, i) => {
                  const isActive = pathname === '/' && activeHref === link.href

                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={isActive ? 'true' : undefined}
                      initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      className={cn(
                        'group flex items-center gap-4 py-4 text-lg font-semibold transition-colors',
                        isActive ? 'text-cyan-700' : 'text-navy-800',
                      )}
                    >
                      <span className="flex-1 transition-colors group-active:text-navy-950">{link.label}</span>
                      <ArrowUpRightIcon
                        size={16}
                        weight="regular"
                        className={cn(
                          'transition-colors group-active:text-cyan-600',
                          isActive ? 'text-cyan-500' : 'text-navy-300',
                        )}
                      />
                    </motion.a>
                  )
                })}
              </nav>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + navLinks.length * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mt-8 flex items-center gap-5 border-t border-navy-100 pt-6">
                  {partners.map((partner, i) => (
                    <Fragment key={partner.name}>
                      {i > 0 && <span aria-hidden="true" className="h-8 w-px bg-navy-200" />}
                      <PartnerLogo partner={partner} isSolid className="h-12" onNavigate={() => setIsMenuOpen(false)} />
                    </Fragment>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
