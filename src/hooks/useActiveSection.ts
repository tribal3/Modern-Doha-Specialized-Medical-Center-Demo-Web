import { useEffect, useState } from 'react'

/** Highlights the section currently sitting beneath the sticky header. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const offset = 140
      let current = ids[0] ?? ''

      for (const id of ids) {
        const element = document.getElementById(id)
        if (!element) continue
        if (element.getBoundingClientRect().top <= offset) current = id
      }

      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      if (nearBottom) current = ids[ids.length - 1] ?? current

      setActive(current)
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return active
}
