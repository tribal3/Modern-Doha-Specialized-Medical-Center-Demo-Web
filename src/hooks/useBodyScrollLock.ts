import { useEffect } from 'react'

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    const { body } = document
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingInlineEnd

    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingInlineEnd = `${scrollbar}px`

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingInlineEnd = previousPadding
    }
  }, [locked])
}
