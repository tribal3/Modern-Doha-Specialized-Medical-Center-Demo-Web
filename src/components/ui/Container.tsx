import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cx(
        'mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10',
        className,
      )}
    >
      {children}
    </div>
  )
}
