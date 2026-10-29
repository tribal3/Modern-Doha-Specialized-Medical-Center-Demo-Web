import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cx } from '../../lib/cx'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Stagger in milliseconds. */
  delay?: number
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(
    () =>
      typeof window === 'undefined' ||
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const node = ref.current
    if (!node || visible) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [visible])

  return (
    <div
      ref={ref}
      className={cx('reveal', className)}
      data-visible={visible}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
