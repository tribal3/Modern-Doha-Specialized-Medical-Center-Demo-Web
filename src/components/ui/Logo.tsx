import { clinic } from '../../content/site'
import { useLanguage } from '../../language/useLanguage'
import { cx } from '../../lib/cx'

interface LogoProps {
  tone?: 'dark' | 'light'
  className?: string
  /** Wraps the lockup in an anchor when a href is supplied. */
  href?: string
}

/** Typographic lockup — no borrowed branding, switches with the active language. */
export function Logo({ tone = 'dark', className, href }: LogoProps) {
  const { lang } = useLanguage()
  const dark = tone === 'dark'

  const short = lang === 'ar' ? clinic.nameShortAr : clinic.nameShortEn
  const sub = lang === 'ar' ? clinic.nameSubAr : clinic.nameSubEn
  const mark = lang === 'ar' ? 'م' : 'M'
  const homeLabel =
    lang === 'ar' ? `${clinic.nameAr} — الصفحة الرئيسية` : `${clinic.nameEn} — home`

  const content = (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className={cx(
          'grid h-9 w-9 shrink-0 place-items-center rounded-[11px] font-display text-[17px] leading-none',
          dark ? 'bg-navy text-cream' : 'bg-blush text-navy',
        )}
      >
        {mark}
      </span>

      <span className="flex flex-col gap-[5px] text-start leading-none">
        <span
          className={cx(
            'font-display text-[15px] font-medium tracking-[-0.01em] sm:text-[16px]',
            dark ? 'text-navy' : 'text-cream',
          )}
        >
          {short}
        </span>
        <span
          className={cx(
            'micro-label max-sm:hidden',
            dark ? 'text-slate-soft' : 'text-blush/75',
          )}
        >
          {sub}
        </span>
      </span>
    </span>
  )

  if (!href) return <span className={cx('inline-flex', className)}>{content}</span>

  return (
    <a
      href={href}
      aria-label={homeLabel}
      className={cx(
        'rounded-lg transition-opacity duration-300 hover:opacity-80',
        className,
      )}
    >
      {content}
    </a>
  )
}
