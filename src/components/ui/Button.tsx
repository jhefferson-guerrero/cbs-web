import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'solid' | 'outline-light' | 'outline-dark'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant
  icon?: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  solid:
    'bg-cyan-600 text-white shadow-sm shadow-navy-950/10 hover:-translate-y-0.5 hover:bg-cyan-700 hover:shadow-lg hover:shadow-cyan-900/25',
  'outline-light': 'border border-white/35 text-white hover:-translate-y-0.5 hover:border-white/60',
  'outline-dark': 'border border-navy-200 text-navy-800 hover:-translate-y-0.5 hover:border-navy-300',
}

const fillClasses: Record<ButtonVariant, string | null> = {
  solid: null,
  'outline-light': 'bg-white/10',
  'outline-dark': 'bg-navy-50',
}

export function Button({ variant = 'solid', icon, className, children, ...props }: ButtonProps) {
  const fill = fillClasses[variant]

  return (
    <a
      className={cn(
        'group relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-lg px-6 py-[11px] text-base font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:translate-y-0 active:scale-[0.98]',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
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
    </a>
  )
}
