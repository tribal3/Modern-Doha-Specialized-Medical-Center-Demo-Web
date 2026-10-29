import { useLanguage } from '../../language/useLanguage'
import { cx } from '../../lib/cx'
import type { Lang } from '../../content/site'

const options: { code: Lang; label: string; aria: string }[] = [
  { code: 'en', label: 'EN', aria: 'English' },
  { code: 'ar', label: 'العربية', aria: 'Arabic' },
]

export function LanguageToggle({
  tone = 'light',
  className,
}: {
  tone?: 'light' | 'dark'
  className?: string
}) {
  const { lang, setLang, t } = useLanguage()
  const dark = tone === 'dark'

  return (
    <div
      role="group"
      aria-label={t.actions.language}
      className={cx(
        'inline-flex items-center gap-0.5 rounded-full border p-0.5',
        dark
          ? 'border-white/20 bg-white/5'
          : 'border-line bg-white/80 backdrop-blur',
        className,
      )}
    >
      {options.map((option) => {
        const active = lang === option.code
        return (
          <button
            key={option.code}
            type="button"
            lang={option.code}
            aria-pressed={active}
            aria-label={option.aria}
            onClick={() => setLang(option.code)}
            className={cx(
              'rounded-full px-2.5 py-2 text-[11px] leading-none font-semibold transition-colors duration-300 sm:px-3',
              active
                ? dark
                  ? 'bg-cream text-navy'
                  : 'bg-navy text-cream'
                : dark
                  ? 'text-cream/65 hover:text-cream'
                  : 'text-slate-soft hover:text-navy',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
