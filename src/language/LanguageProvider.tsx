import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { copy, type Lang } from '../content/site'
import { LanguageContext, type LanguageValue } from './languageContext'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = dir

    document.title =
      lang === 'en'
        ? `${copy.en.meta.title} — Website Concept`
        : `${copy.ar.meta.title} — تصوّر موقع`

    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    )
    if (description) description.content = copy[lang].meta.description
  }, [lang, dir])

  const toggle = useCallback(() => {
    setLang((current) => (current === 'en' ? 'ar' : 'en'))
  }, [])

  const value = useMemo<LanguageValue>(
    () => ({ lang, dir, t: copy[lang], setLang, toggle }),
    [lang, dir, toggle],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
