import { useCallback, useEffect, useState } from 'react'
import { ArrowUpRight, Menu, Navigation, Phone, X } from 'lucide-react'
import { useActiveSection } from '../hooks/useActiveSection'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import { useModalA11y } from '../hooks/useModalA11y'
import { useLanguage } from '../language/useLanguage'
import { clinic } from '../content/site'
import { cx } from '../lib/cx'
import { ButtonLink } from './ui/ButtonLink'
import { LanguageToggle } from './ui/LanguageToggle'
import { Logo } from './ui/Logo'

const SECTION_IDS = [
  'home',
  'why',
  'services',
  'about',
  'patients',
  'contact',
] as const

export function Header() {
  const { t, lang } = useLanguage()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(SECTION_IDS)

  const closeMenu = useCallback(() => setOpen(false), [])
  const panelRef = useModalA11y<HTMLDivElement>(open, closeMenu)

  useBodyScrollLock(open)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links: { id: string; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'why', label: t.nav.why },
    { id: 'services', label: t.nav.services },
    { id: 'about', label: t.nav.about },
    { id: 'patients', label: t.nav.patients },
    { id: 'contact', label: t.nav.contact },
  ]

  return (
    <header
      className={cx(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled ? 'border-b border-line' : 'border-b border-transparent',
      )}
    >
      {/*
        Background + blur live in their own layer on purpose: a backdrop-filter
        on <header> itself would make it the containing block for the fixed
        mobile drawer below, collapsing the drawer to the header's height.
      */}
      <div
        aria-hidden="true"
        className={cx(
          'pointer-events-none absolute inset-0 -z-10 transition-all duration-300',
          scrolled
            ? 'bg-white/90 shadow-[0_18px_40px_-36px_rgba(20,41,74,0.55)] backdrop-blur-xl'
            : 'bg-white/75 backdrop-blur-md',
        )}
      />
      <div className="mx-auto flex h-[72px] w-full max-w-[1320px] items-center justify-between gap-3 px-5 sm:px-8 lg:h-[88px] lg:px-10">
        <Logo href="#home" />

        <nav
          aria-label={t.header.menuTitle}
          className="hidden items-center gap-5 lg:flex xl:gap-8"
        >
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? 'location' : undefined}
              className={cx(
                'relative py-2 text-[13px] font-medium whitespace-nowrap transition-colors duration-300',
                'after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-center after:bg-wine after:transition-transform after:duration-300',
                active === link.id
                  ? 'text-navy after:scale-x-100'
                  : 'text-slate-soft after:scale-x-0 hover:text-navy hover:after:scale-x-100',
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />
          <ButtonLink
            href="#contact"
            className="max-xl:hidden whitespace-nowrap"
          >
            {t.actions.enquiry}
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 rtl:-scale-x-100"
            />
          </ButtonLink>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t.actions.menu}
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full border border-navy/15 text-navy transition-colors duration-300 hover:border-navy/35 hover:bg-white lg:hidden"
          >
            <Menu aria-hidden="true" className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div
            aria-hidden="true"
            onClick={closeMenu}
            className="drawer-backdrop absolute inset-0 bg-navy/45 backdrop-blur-sm"
          />
          <div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={t.header.menuTitle}
            tabIndex={-1}
            className="drawer-panel absolute inset-y-0 end-0 flex w-[86%] max-w-[370px] flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <Logo href="#home" />
              <button
                type="button"
                onClick={closeMenu}
                aria-label={t.actions.close}
                className="grid h-10 w-10 place-items-center rounded-full border border-navy/15 text-navy transition-colors duration-300 hover:border-navy/35 hover:bg-white"
              >
                <X aria-hidden="true" className="h-[18px] w-[18px]" />
              </button>
            </div>

            <nav
              aria-label={t.header.menuTitle}
              className="drawer-scroll flex-1 overflow-y-auto px-6 py-4"
            >
              <ul>
                {links.map((link, index) => (
                  <li key={link.id} className="border-b border-line/80">
                    <a
                      href={`#${link.id}`}
                      onClick={closeMenu}
                      aria-current={active === link.id ? 'location' : undefined}
                      className="flex items-center justify-between gap-4 py-4"
                    >
                      <span
                        className={cx(
                          'font-display text-[22px] leading-tight',
                          active === link.id ? 'text-wine' : 'text-navy',
                        )}
                      >
                        {link.label}
                      </span>
                      <span
                        className="text-[10px] font-semibold tracking-[0.18em] text-gold"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-line px-6 pt-5 pb-7">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="eyebrow text-slate-soft">{t.actions.language}</span>
                <LanguageToggle />
              </div>

              <ButtonLink
                href="#contact"
                onClick={closeMenu}
                fullWidth
                size="lg"
              >
                {t.actions.enquiry}
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 rtl:-scale-x-100"
                />
              </ButtonLink>

              <div className="mt-2.5 grid grid-cols-2 gap-2">
                <a
                  href={clinic.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/15 px-3 py-2.5 text-[12px] font-semibold text-navy transition-colors duration-300 hover:bg-blush-soft"
                >
                  <Phone aria-hidden="true" className="h-3.5 w-3.5" />
                  {t.actions.call}
                </a>
                <a
                  href={clinic.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/15 px-3 py-2.5 text-[12px] font-semibold text-navy transition-colors duration-300 hover:bg-blush-soft"
                >
                  <Navigation aria-hidden="true" className="h-3.5 w-3.5" />
                  {t.actions.directions}
                </a>
              </div>

              <p
                className="mt-4 text-[11px] text-slate-soft"
                lang={lang === 'ar' ? 'en' : 'ar'}
                dir={lang === 'ar' ? 'ltr' : 'rtl'}
              >
                {lang === 'ar' ? clinic.nameEn : clinic.nameAr}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
