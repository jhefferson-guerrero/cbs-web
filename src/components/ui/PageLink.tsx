import { forwardRef, type MouseEvent } from 'react'
import { Link, useNavigate, type LinkProps } from 'react-router-dom'
import { navigateWithTransition } from '@/lib/page-transition'

// Como <Link>, pero el cambio de página se hace con la transición suave del navegador. Los clics con
// Ctrl/Cmd/Shift, el botón del medio o target="_blank" siguen su comportamiento normal.
export const PageLink = forwardRef<HTMLAnchorElement, LinkProps & { to: string }>(function PageLink(
  { to, onClick, target, ...props },
  ref,
) {
  const navigate = useNavigate()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.defaultPrevented || event.button !== 0 || target === '_blank') return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    void navigateWithTransition(navigate, to)
  }

  return <Link ref={ref} to={to} target={target} onClick={handleClick} {...props} />
})
