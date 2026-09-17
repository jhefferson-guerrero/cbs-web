import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useLenis } from 'lenis/react'
import { ArrowUpRightIcon } from '@phosphor-icons/react'
import logoCbs from '@/assets/images/logo-cbs.webp'
import logoMobileCbs from '@/assets/images/logo-mobile-cbs.webp'
import { navLinks } from '@/lib/nav-links'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export function Navbar({ ready }: { ready: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredHref, setHoveredHref] = useState<string | null>(null)
  const reduceMotion = useReducedMotion()
  const lenis = useLenis()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
      initial={reduceMotion ? false : { opacity: 0, y: -12 }}
      animate={reduceMotion || ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        isSolid ? 'bg-white shadow-nav' : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-18 max-w-[1400px] items-center justify-between px-6 lg:px-10 xl:px-16">
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
                '[grid-area:1/1] h-10 w-auto transition-opacity duration-300',
                isSolid ? 'opacity-100' : 'opacity-0',
              )}
            />
            <img
              src={logoCbs}
              aria-hidden="true"
              width={1080}
              height={211}
              className={cn(
                '[grid-area:1/1] h-10 w-auto brightness-0 invert transition-opacity duration-300',
                isSolid ? 'opacity-0' : 'opacity-100',
              )}
            />
          </span>
        </a>

        <div
          className="hidden items-center gap-1 lg:flex"
          onMouseLeave={() => setHoveredHref(null)}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHoveredHref(link.href)}
              onFocus={() => setHoveredHref(link.href)}
              onBlur={() => setHoveredHref(null)}
              className={cn(
                'relative rounded-lg px-4 py-2 text-base font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400',
                isSolid ? 'text-navy-800 hover:text-navy-950' : 'text-white hover:text-white',
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
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button href="#contacto" variant="solid" icon={<ArrowUpRightIcon size={18} weight="regular" />}>
            Contáctanos
          </Button>
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
            className="min-h-[calc(100dvh-4.5rem)] overflow-hidden border-t border-navy-100 bg-white lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-semibold text-navy-800 hover:bg-navy-50"
                >
                  {link.label}
                </a>
              ))}
              <Button
                href="#contacto"
                variant="solid"
                className="mt-3 justify-center"
                icon={<ArrowUpRightIcon size={18} weight="regular" />}
              >
                Contáctanos
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
