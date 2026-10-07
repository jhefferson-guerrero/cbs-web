import { useEffect, useRef, type ReactNode } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { navigateWithTransition } from '@/lib/page-transition'

const scrollToHash = (lenis: ReturnType<typeof useLenis>, hash: string, immediate = false) => {
  const target = document.getElementById(hash.slice(1))
  if (!target || !lenis) return
  // Después de un cambio de ruta, la altura del documento cambia drásticamente;
  // el límite de scroll que Lenis tiene en caché puede seguir reflejando la
  // página anterior hasta que vuelva a medir, lo que hace que scrollTo se
  // quede corto del destino real. Forzamos un recálculo sincrónico primero.
  lenis.resize()
  const navHeight = document.getElementById('site-navbar')?.offsetHeight ?? 0
  if (immediate) {
    lenis.scrollTo(target, { offset: -navHeight, immediate: true })
    return
  }
  lenis.scrollTo(target, {
    offset: -navHeight,
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })
}

function AnchorScrollBridge() {
  const lenis = useLenis()
  const navigate = useNavigate()
  const location = useLocation()
  const prevPathname = useRef(location.pathname)

  useEffect(() => {
    if (!lenis) return

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest('a[href^="#"], a[href^="/#"]')
      if (!anchor) return

      // En las páginas que no son la Home, los enlaces a secciones apuntan a "/#seccion" (ver sectionHref): se navega a
      // la Home con la transición de página. En la Home se tratan como el ancla "#seccion" de siempre.
      const rawHref = anchor.getAttribute('href')
      if (!rawHref) return
      const isHomeLink = rawHref.startsWith('/#')
      const href = isHomeLink ? rawHref.slice(1) : rawHref
      if (href.length < 2) return

      if (isHomeLink && location.pathname !== '/') {
        event.preventDefault()
        void navigateWithTransition(navigate, rawHref)
        return
      }

      const target = document.querySelector(href)

      if (!target) {
        if (location.pathname !== '/') {
          event.preventDefault()
          void navigateWithTransition(navigate, `/${href}`)
        }
        return
      }

      event.preventDefault()
      scrollToHash(lenis, href)
      history.pushState(null, '', href)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [lenis, navigate, location.pathname])

  // Maneja tanto la navegación a anclas entre páginas (Link to="/#nosotros"
  // desde una página de detalle) como volver arriba del todo en un cambio de
  // ruta simple. Esto solo se dispara en navegaciones hechas a través de
  // react-router (Link/navigate), o sea, al llegar recién a una página -- por
  // eso el salto es instantáneo, no animado: no hay una posición de scroll
  // "actual" desde la cual un scroll suave pueda dar continuidad.
  useEffect(() => {
    if (!lenis) return

    if (location.hash) {
      // La sección puede no existir todavía: la Home se carga con carga diferida (lazy), y si el visitante entró directo
      // a otra página o abrió un enlace con #sección, su código llega unos instantes después. Se reintenta cada 100 ms
      // (hasta 6 s) hasta que aparezca, y entonces se salta a ella.
      let timer: number | undefined
      let attempts = 0
      const attempt = () => {
        if (document.getElementById(location.hash.slice(1))) {
          scrollToHash(lenis, location.hash, true)
        } else if (++attempts < 60) {
          timer = window.setTimeout(attempt, 100)
        }
      }
      const raf = requestAnimationFrame(attempt)
      prevPathname.current = location.pathname
      return () => {
        cancelAnimationFrame(raf)
        window.clearTimeout(timer)
      }
    }

    if (prevPathname.current !== location.pathname) {
      lenis.scrollTo(0, { immediate: true })
    }
    prevPathname.current = location.pathname
  }, [lenis, location.pathname, location.hash])

  return null
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        syncTouch: false,
        respectReducedMotion: true,
      }}
    >
      <AnchorScrollBridge />
      {children}
    </ReactLenis>
  )
}
