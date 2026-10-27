import { Fragment, useEffect, useLayoutEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useLenis } from 'lenis/react'
import { useLocation } from 'react-router-dom'
import { ArrowUpRightIcon } from '@phosphor-icons/react'
import logoCbs from '@/assets/images/logo-cbs.webp'
import logoMobileCbs from '@/assets/images/logo-mobile-cbs.webp'
import { PageLink } from '@/components/ui/PageLink'
import { navLinks, sectionHref } from '@/lib/nav-links'
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
        loading="lazy"
        className={cn('[grid-area:1/1] w-auto', className, isSolid ? 'opacity-100' : 'opacity-0')}
      />
      <img
        src={partner.logo}
        alt=""
        aria-hidden="true"
        width={256}
        height={256}
        loading="lazy"
        className={cn('[grid-area:1/1] w-auto brightness-0 invert', className, isSolid ? 'opacity-0' : 'opacity-100')}
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
    <PageLink to={partner.href} onClick={onNavigate} className={linkClasses}>
      {logo}
    </PageLink>
  )
}

const MENU_EASE = [0.16, 1, 0.3, 1] as const

// Cómo se retira el menú: al tocar el logo de un aliado (otra página) espera un instante mientras arranca la transición de página;
// con la X o el botón, y al tocar un enlace a una sección (ver closeMenuForSection), se retira de golpe.
type MenuExit = 'close' | 'page' | 'section'
const MENU_PAGE_EXIT_DELAY = 0.3
const menuPanelVariants = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
  show: { clipPath: 'inset(0 0 0% 0)', opacity: 1, transition: { duration: 0.25, ease: MENU_EASE } },
  exit: (mode: MenuExit) => ({
    clipPath: 'inset(0 0 100% 0)',
    opacity: 0,
    // Sin desvanecido al cerrar: una animación de opacidad corre en el compositor sin esperar a que el navegador pinte lo que hay
    // debajo del menú (mientras estaba abierto cubriéndolo no se pintó), y durante el desvanecido se veía la página en blanco
    // casi 1 s en un celular. Quitado de golpe, el navegador espera a tener la página pintada antes de mostrarla.
    transition:
      mode === 'page' ? { duration: 0.25, delay: MENU_PAGE_EXIT_DELAY, ease: MENU_EASE } : { duration: 0 },
  }),
}

export function Navbar({ ready }: { ready: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredHref, setHoveredHref] = useState<string | null>(null)
  const [menuExit, setMenuExit] = useState<MenuExit>('close')
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

  // Al cambiar de página el scroll se reposiciona (SmoothScroll) y el evento "scroll" llega un fotograma después: sin
  // esto, la página nueva se pintaba una vez con la barra de la anterior (blanca o transparente) y recién después
  // pasaba a la correcta. Aquí se lee el scroll ya reposicionado, antes de pintar.
  //
  // La barra cambia de estado (blanca / transparente) de golpe, sin transiciones de color ni de opacidad: con
  // transiciones, al terminar el fundido Chrome repintaba la barra y en 1 de cada ~8 cambios un fotograma salía en
  // blanco (un parpadeo), y a mitad del fundido el texto quedaba ilegible. Sin ellas, fondo, texto y logos cambian en
  // el mismo fotograma.
  useLayoutEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect -- sincroniza con un valor externo (window.scrollY) antes de pintar
    setIsScrolled(window.scrollY > 16)
  }, [pathname])

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

  // El bloqueo del scroll de la página (overflow del <html>) hace que el navegador recalcule el diseño de toda la página, y si
  // ocurre en el mismo instante en que arranca la animación del menú, ésta salta. Se aplica (y se quita) cuando la animación
  // ya terminó; mientras tanto el menú cubre la pantalla y Lenis ya está detenido.
  useEffect(() => {
    if (isMenuOpen) {
      lenis?.stop()
    } else {
      lenis?.start()
    }
    const id = window.setTimeout(() => {
      document.documentElement.style.overflow = isMenuOpen ? 'hidden' : ''
    }, 300)
    return () => window.clearTimeout(id)
  }, [isMenuOpen, lenis])

  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = ''
      lenis?.start()
    }
  }, [lenis])

  // Al tocar un enlace del menú, el scroll tiene que estar libre ya en este mismo clic: el manejador de anclas (SmoothScroll) corre
  // justo después y Lenis ignora scrollTo mientras está detenido, así que si se esperaba al efecto de arriba la página no se movía.
  const releaseScroll = () => {
    document.documentElement.style.overflow = ''
    lenis?.start()
  }

  // Logos de aliados (otra página): el menú se retira tras un instante, mientras la transición de página arranca.
  const closeMenuForNavigation = () => {
    releaseScroll()
    setMenuExit('page')
    setIsMenuOpen(false)
  }

  // Enlaces a secciones: la página salta a la sección debajo del menú y el menú se queda cubriendo la pantalla hasta que lo que hay
  // debajo está listo para verse. Si se retirara enseguida, en un celular se veía la pantalla en blanco hasta que el navegador
  // terminaba de pintar esa zona lejana (y de decodificar sus imágenes). Se espera a que se pinten dos fotogramas y a que se
  // decodifiquen las imágenes que ya están a la vista, con un tope de 1,2 s, y un último respiro para que arranque el contenido.
  const closeMenuForSection = () => {
    releaseScroll()
    const header = document.getElementById('site-header')
    const finish = () => {
      setMenuExit('section')
      setIsMenuOpen(false)
    }
    const cap = window.setTimeout(finish, 1200)
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const pending = [...document.images].filter((img) => {
          const box = img.getBoundingClientRect()
          return !img.complete && !header?.contains(img) && box.bottom > 0 && box.top < window.innerHeight
        })
        // Con las imágenes listas, se espera además a que el contenido de la sección ya sea visible (cada bloque entra con una
        // animación de aparición que arranca recién cuando llega a la pantalla), y un par de fotogramas más para que se pinte.
        const effectiveOpacity = (el: Element) => {
          let opacity = 1
          for (let node: Element | null = el; node && node !== document.body; node = node.parentElement) {
            opacity *= Number(getComputedStyle(node).opacity)
          }
          return opacity
        }
        const contentShown = () => {
          const inView = [...document.querySelectorAll('h2, h3, p, img, li')].filter((el) => {
            const box = el.getBoundingClientRect()
            return !header?.contains(el) && box.height > 0 && box.bottom > 0 && box.top < window.innerHeight
          })
          const shown = inView.filter((el) => effectiveOpacity(el) > 0.6).length
          return shown >= Math.min(3, inView.length)
        }
        const waitForContent = () => {
          if (!contentShown()) return requestAnimationFrame(waitForContent)
          window.clearTimeout(cap)
          requestAnimationFrame(() => requestAnimationFrame(finish))
        }
        void Promise.all(pending.map((img) => img.decode().catch(() => undefined))).then(waitForContent)
      }),
    )
  }

  const isSolid = isScrolled || isMenuOpen

  return (
    <motion.header
      id="site-header"
      initial={reduceMotion ? false : { opacity: 0, y: -12 }}
      animate={reduceMotion || ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50',
        isSolid ? 'bg-white shadow-nav' : 'bg-transparent',
      )}
    >
      <nav id="site-navbar" className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-6 lg:h-16 lg:px-10 xl:max-w-[1600px] xl:px-12 2xl:h-20 2xl:max-w-[1850px] 2xl:px-16">
        <a href={sectionHref(pathname, '#top')} className="relative block shrink-0" aria-label="CBS - Inicio">
          <span className="grid lg:hidden">
            <img
              src={logoMobileCbs}
              alt="CBS - Construtora Baiana de Saneamento"
              width={652}
              height={296}
              className={cn(
                '[grid-area:1/1] h-9 w-auto',
                isSolid ? 'opacity-100' : 'opacity-0',
              )}
            />
            <img
              src={logoMobileCbs}
              aria-hidden="true"
              width={652}
              height={296}
              className={cn(
                '[grid-area:1/1] h-9 w-auto brightness-0 invert',
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
              loading="lazy"
              className={cn(
                '[grid-area:1/1] h-9 w-auto xl:h-10 2xl:h-12',
                isSolid ? 'opacity-100' : 'opacity-0',
              )}
            />
            <img
              src={logoCbs}
              aria-hidden="true"
              width={1080}
              height={211}
              loading="lazy"
              className={cn(
                '[grid-area:1/1] h-9 w-auto brightness-0 invert xl:h-10 2xl:h-12',
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
                href={sectionHref(pathname, link.href)}
                onMouseEnter={() => setHoveredHref(link.href)}
                onFocus={() => setHoveredHref(link.href)}
                onBlur={() => setHoveredHref(null)}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'relative rounded-lg px-2 py-2 text-[15px] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 xl:px-4 xl:text-base 2xl:px-5 2xl:text-lg',
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
                    className="absolute inset-x-2 bottom-1 h-0.5 rounded-full bg-cyan-500 xl:inset-x-4 2xl:inset-x-5"
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
                  className={cn('h-6 w-px 2xl:h-8', isSolid ? 'bg-navy-200' : 'bg-white/30')}
                />
              )}
              <PartnerLogo partner={partner} isSolid={isSolid} className="h-8 xl:h-10 2xl:h-12" />
            </Fragment>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            setMenuExit('close')
            setIsMenuOpen((open) => !open)
          }}
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-md lg:hidden',
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

      <AnimatePresence custom={menuExit}>
        {isMenuOpen && (
          <motion.div
            // El panel se revela con clip-path y opacidad (los dos van por la GPU) en vez de animar su alto: animar `height`
            // obligaba al navegador a recalcular el diseño del panel en cada fotograma, y en un móvil eso se sentía a pocos fps.
            variants={menuPanelVariants}
            custom={menuExit}
            initial={reduceMotion ? false : 'hidden'}
            animate="show"
            exit="exit"
            className="relative min-h-[calc(100dvh-3.5rem)] overflow-hidden border-t border-navy-100 bg-white lg:hidden"
          >
            <div className="flex flex-col px-6 py-8">
              <nav className="flex flex-col divide-y divide-navy-100">
                {navLinks.map((link, i) => {
                  const isActive = pathname === '/' && activeHref === link.href

                  return (
                    <motion.a
                      key={link.href}
                      href={sectionHref(pathname, link.href)}
                      onClick={closeMenuForSection}
                      data-instant-scroll
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
                      <PartnerLogo partner={partner} isSolid className="h-12" onNavigate={closeMenuForNavigation} />
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
