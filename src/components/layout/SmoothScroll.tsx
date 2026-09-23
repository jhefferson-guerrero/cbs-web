import { useEffect, useRef, type ReactNode } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { useLocation, useNavigate } from 'react-router-dom'

const scrollToHash = (lenis: ReturnType<typeof useLenis>, hash: string, immediate = false) => {
  const target = document.getElementById(hash.slice(1))
  if (!target || !lenis) return
  // After a route change the document height changes drastically; Lenis's cached
  // scroll limit can still reflect the previous page until it re-measures, which
  // clamps scrollTo short of the real target. Force a synchronous recalculation first.
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
      const anchor = (event.target as HTMLElement).closest('a[href^="#"]')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || href.length < 2) return

      const target = document.querySelector(href)

      if (!target) {
        if (location.pathname !== '/') {
          event.preventDefault()
          navigate(`/${href}`)
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

  // Handles both cross-page anchor navigation (Link to="/#nosotros" from a
  // detail page) and scrolling back to top on a plain route change. This only
  // fires for navigations made through react-router (Link/navigate), i.e.
  // arriving fresh on a page -- so the jump is instant, not animated: there's
  // no "current" scroll position for a smooth scroll to give continuity from.
  useEffect(() => {
    if (!lenis) return

    if (location.hash) {
      const raf = requestAnimationFrame(() => scrollToHash(lenis, location.hash, true))
      prevPathname.current = location.pathname
      return () => cancelAnimationFrame(raf)
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
