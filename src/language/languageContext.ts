import { createContext } from 'react'
import type { Lang, SiteCopy } from '../content/site'

export interface LanguageValue {
  lang: Lang
  dir: 'ltr' | 'rtl'
  t: SiteCopy
  setLang: (lang: Lang) => void
  toggle: () => void
}

export const LanguageContext = createContext<LanguageValue | null>(null)
