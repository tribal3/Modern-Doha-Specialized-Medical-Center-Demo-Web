import {
  CalendarClock,
  Clock,
  ExternalLink,
  MapPin,
  Navigation,
  Phone,
} from 'lucide-react'
import { clinic } from '../content/site'
import { useLanguage } from '../language/useLanguage'
import { ButtonLink } from './ui/ButtonLink'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'

export function Contact() {
  const { t, lang } = useLanguage()
  const primaryName = lang === 'ar' ? clinic.nameAr : clinic.nameEn
  const secondaryName = lang === 'ar' ? clinic.nameEn : clinic.nameAr
  const primaryLang = lang === 'ar' ? 'ar' : 'en'
  const secondaryLang = lang === 'ar' ? 'en' : 'ar'

  const rows: {
    icon: typeof MapPin
    label: string
    value: string
    href?: string
    external?: boolean
    ltr?: boolean
  }[] = [
    {
      icon: MapPin,
      label: t.contact.locationLabel,
      value: t.contact.locationValue,
      href: clinic.mapsUrl,
      external: true,
    },
    {
      icon: Phone,
      label: t.contact.phoneLabel,
      value: clinic.phoneDisplay,
      href: clinic.phoneHref,
      ltr: true,
    },
    {
      icon: CalendarClock,
      label: t.contact.enquireLabel,
      value: t.contact.enquireValue,
      href: clinic.phoneHref,
    },
  ]

  return (
    <section id="contact" className="relative bg-white">
      <Container className="py-20 sm:py-24 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-16">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-clay">
              <span aria-hidden="true" className="h-px w-8 bg-brass" />
              {t.contact.eyebrow}
            </p>
            <h2 className="mt-5 max-w-[14ch] text-[clamp(1.95rem,4.2vw,3.15rem)] leading-[1.06] text-navy">
              {t.contact.title}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-[40ch] text-[14px] leading-[1.8] text-slate-soft lg:justify-self-end lg:text-end">
              {t.contact.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6">
          <div className="flex flex-col gap-5">
            <Reveal>
              <div className="flex h-full flex-col rounded-[2rem] border border-line bg-cream p-6 sm:p-8 lg:p-9">
                <div className="flex items-start justify-between gap-4 border-b border-line pb-6">
                  <div>
                    <h3
                      lang={primaryLang}
                      className="font-display text-[24px] leading-tight text-navy sm:text-[27px]"
                    >
                      {primaryName}
                    </h3>
                    <p
                      lang={secondaryLang}
                      dir={secondaryLang === 'ar' ? 'rtl' : 'ltr'}
                      className="mt-1.5 font-sans text-[12.5px] text-slate-soft"
                    >
                      {secondaryName}
                    </p>
                    <p className="micro-label mt-2.5 text-clay">
                      {lang === 'ar' ? clinic.roleAr : clinic.roleEn}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sand text-clay"
                  >
                    <MapPin className="h-[18px] w-[18px]" strokeWidth={1.6} />
                  </span>
                </div>

                <dl className="mt-6 divide-y divide-line/80">
                  {rows.map((row) => {
                    const Icon = row.icon
                    const value = (
                      <span
                        dir={row.ltr ? 'ltr' : undefined}
                        className="text-[13.5px] leading-relaxed font-medium text-navy"
                      >
                        {row.value}
                      </span>
                    )

                    return (
                      <div
                        key={row.label}
                        className="flex items-start gap-3.5 py-3.5"
                      >
                        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-clay shadow-sm">
                          <Icon
                            aria-hidden="true"
                            className="h-3.5 w-3.5"
                            strokeWidth={1.8}
                          />
                        </span>
                        <div className="min-w-0">
                          <dt className="micro-label text-slate-soft">
                            {row.label}
                          </dt>
                          <dd className="mt-1">
                            {row.href ? (
                              <a
                                href={row.href}
                                {...(row.external
                                  ? {
                                      target: '_blank',
                                      rel: 'noopener noreferrer',
                                    }
                                  : {})}
                                className="transition-colors hover:text-clay"
                              >
                                {value}
                              </a>
                            ) : (
                              value
                            )}
                          </dd>
                        </div>
                      </div>
                    )
                  })}
                </dl>

                <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  <ButtonLink href={clinic.phoneHref} fullWidth>
                    <Phone aria-hidden="true" className="h-4 w-4" />
                    {t.actions.call}
                  </ButtonLink>
                  <ButtonLink
                    href={clinic.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    fullWidth
                  >
                    <Navigation aria-hidden="true" className="h-4 w-4" />
                    {t.actions.directions}
                  </ButtonLink>
                </div>

                <p className="mt-auto pt-5 text-[10.5px] leading-relaxed text-slate-soft">
                  {t.contact.panelNote}
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-[2rem] border border-line bg-white p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sand-soft text-clay">
                    <Clock aria-hidden="true" className="h-4 w-4" strokeWidth={1.7} />
                  </span>
                  <h3 className="text-[15.5px] font-semibold text-navy">
                    {t.contact.hoursTitle}
                  </h3>
                </div>

                <dl className="mt-5 divide-y divide-line/80">
                  {t.contact.hoursRows.map((row) => (
                    <div
                      key={row.day}
                      className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                    >
                      <dt className="text-[13px] font-semibold text-navy">
                        {row.day}
                      </dt>
                      <dd
                        className="text-[12.5px] leading-relaxed text-slate-soft sm:text-end"
                        dir={lang === 'ar' ? 'rtl' : 'ltr'}
                      >
                        {row.hours}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-2 text-[10.5px] leading-relaxed text-slate-soft">
                  {t.contact.hoursNote}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="relative h-[340px] overflow-hidden rounded-[2rem] border border-line bg-sand-soft sm:h-[420px] lg:h-full lg:min-h-[520px]">
              <iframe
                src={clinic.mapEmbed}
                title={t.contact.mapTitle}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0 grayscale-[18%]"
              />
              <div className="pointer-events-none absolute inset-x-3 top-3 flex flex-wrap items-start justify-between gap-2 sm:inset-x-4 sm:top-4">
                <p className="rounded-full bg-white/90 px-3 py-1.5 text-[9.5px] font-medium text-slate-soft shadow-sm backdrop-blur">
                  {t.contact.mapNote}
                </p>
                <a
                  href={clinic.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full bg-navy px-3.5 py-2 text-[10.5px] font-semibold text-cream shadow-card transition-colors duration-300 hover:bg-clay-dark"
                >
                  {t.contact.mapCta}
                  <ExternalLink aria-hidden="true" className="h-3 w-3" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
