import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cx } from '../../lib/cx'

export type ButtonVariant =
  | 'primary'
  | 'outline'
  | 'soft'
  | 'onDark'
  | 'ghostOnDark'

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  variant?: ButtonVariant
  size?: 'md' | 'lg'
  fullWidth?: boolean
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-navy text-cream hover:bg-wine-dark shadow-[0_18px_36px_-24px_rgba(20,41,74,0.9)]',
  outline:
    'border border-navy/20 text-navy hover:border-navy/40 hover:bg-white',
  soft: 'bg-blush text-navy hover:bg-[#efd6dd]',
  onDark: 'bg-cream text-navy hover:bg-white',
  ghostOnDark:
    'border border-white/25 text-cream hover:border-white/45 hover:bg-white/10',
}

export function ButtonLink({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cx(
        'group/btn inline-flex items-center justify-center gap-2.5 rounded-full text-[13.5px] font-semibold tracking-[0.01em] transition-all duration-300',
        size === 'lg' ? 'px-7 py-4 text-sm' : 'px-6 py-3.5',
        variants[variant],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}
