import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { PageLink } from '@/components/ui/PageLink'
import { cn } from '@/lib/utils'

type ButtonVariant = 'solid' | 'moss' | 'outline-light' | 'outline-dark'

interface ButtonOwnProps {
  variant?: ButtonVariant
  icon?: ReactNode
}

type ButtonProps =
  | (ButtonOwnProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  | (ButtonOwnProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })

const variantClasses: Record<ButtonVariant, string> = {
  solid:
    'bg-cyan-700 text-white shadow-sm shadow-navy-950/10 hover:-translate-y-0.5 hover:bg-cyan-800 hover:shadow-lg hover:shadow-cyan-900/25',
  moss: 'bg-moss-400 text-navy-950 shadow-sm shadow-navy-950/10 hover:-translate-y-0.5 hover:bg-moss-300 hover:shadow-lg hover:shadow-navy-950/25',
  'outline-light': 'border border-white/35 text-white hover:-translate-y-0.5 hover:border-white/60',
  'outline-dark': 'border border-navy-200 text-navy-800 hover:-translate-y-0.5 hover:border-navy-300',
}

const fillClasses: Record<ButtonVariant, string | null> = {
  solid: null,
  moss: null,
  'outline-light': 'bg-white/10',
  'outline-dark': 'bg-navy-50',
}

export function Button({ variant = 'solid', icon, className, children, ...props }: ButtonProps) {
  const fill = fillClasses[variant]

  const classes = cn(
    'group relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-lg px-5 py-[11px] text-base max-[380px]:px-4 max-[380px]:text-[0.9375rem] sm:px-6 font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:translate-y-0 active:scale-[0.98] 2xl:px-7 2xl:py-3.5 2xl:text-lg',
    variantClasses[variant],
    className,
  )

  const content = (
    <>
      {fill && (
        <span aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden rounded-lg">
          <span
            className={cn(
              'absolute inset-0 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100',
              fill,
            )}
          />
        </span>
      )}

      {children}

      {icon && (
        <span className="inline-flex shrink-0 items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  )

  if (props.href) {
    const { href, ...anchorProps } = props as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

    // Una ruta interna (/algo) navega dentro de la SPA; un ancla (#algo) o una URL externa es un <a> normal.
    if (href.startsWith('/')) {
      return (
        <PageLink to={href} className={classes} {...anchorProps}>
          {content}
        </PageLink>
      )
    }

    return (
      <a href={href} className={classes} {...anchorProps}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  )
}
