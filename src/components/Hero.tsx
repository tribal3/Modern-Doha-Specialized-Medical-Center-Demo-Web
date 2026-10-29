import { ArrowRight, Check, Navigation, Phone } from 'lucide-react'
import { clinic } from '../content/site'
import { useLanguage } from '../language/useLanguage'
import { ButtonLink } from './ui/ButtonLink'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { SmartImage } from './ui/SmartImage'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section id="home" className="relative overflow-hidden bg-white">
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute inset-0"
      />

      <Container className="relative pt-10 pb-16 sm:pt-14 lg:pt-16 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-14 xl:gap-20">
          <div className="max-w-[620px]">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-clay">
                <span aria-hidden="true" className="h-px w-9 bg-brass" />
                {t.hero.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={70}>
              <h1 className="hero-title mt-5 text-[clamp(2.4rem,5.3vw,4.3rem)] leading-[1.02] tracking-[-0.015em] text-navy sm:mt-6">
                <span className="block">{t.hero.titleLead}</span>
                <span className="mt-1 block text-clay">
                  {t.hero.titleAccent}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-6 max-w-[46ch] text-[15px] leading-[1.75] text-slate-soft sm:text-[16.5px]">
                {t.hero.body}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <ButtonLink
                  href={clinic.phoneHref}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Phone aria-hidden="true" className="h-4 w-4" />
                  {t.actions.call}
                </ButtonLink>

                <ButtonLink
                  href={clinic.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Navigation aria-hidden="true" className="h-4 w-4" />
                  {t.actions.directions}
                </ButtonLink>

                <a
                  href="#services"
                  className="group inline-flex items-center gap-3 rounded-full py-2 pe-2 ps-1 text-[13.5px] font-semibold text-navy transition-colors duration-300 hover:text-clay"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-navy/15 bg-white/70 text-navy transition-all duration-300 group-hover:border-clay/40 group-hover:bg-sand">
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                    />
                  </span>
                  {t.hero.explore}
                </a>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-navy/10 pt-6">
                {t.hero.trust.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 text-[11.5px] font-medium text-slate-soft sm:text-[12px]"
                  >
                    <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-sand text-clay">
                      <Check
                        aria-hidden="true"
                        className="h-2.5 w-2.5"
                        strokeWidth={3}
                      />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={160} className="relative">
            <div className="relative mx-auto w-full max-w-[480px] lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -end-3 -bottom-3 h-full w-full rounded-[1.25rem] bg-sand sm:-end-4 sm:-bottom-4"
              />

              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] border border-white/60 shadow-soft lg:aspect-[5/6]">
                <SmartImage
                  src="/images/hero.jpg"
                  alt={t.hero.imageAlt}
                  priority
                  className="h-full w-full object-cover object-[center_25%]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(to_top,rgba(23,52,80,0.42),rgba(23,52,80,0.02)_45%,transparent)]"
                />
                <span className="absolute top-5 end-5 rounded-full border border-white/60 bg-white/85 px-3 py-1.5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-navy backdrop-blur">
                  {t.header.tagline}
                </span>
              </div>

              <a
                href={clinic.phoneHref}
                className="absolute bottom-5 start-4 flex items-center gap-3 rounded-2xl border border-white bg-white/95 px-4 py-3 shadow-card backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 sm:-start-6 sm:bottom-8"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sand text-clay">
                  <Phone aria-hidden="true" className="h-4 w-4" />
                </span>
                <span className="flex flex-col">
                  <span className="micro-label text-slate-soft">
                    {t.hero.cardEyebrow}
                  </span>
                  <span
                    className="mt-1 text-[13px] font-semibold text-navy"
                    dir="ltr"
                  >
                    {clinic.phoneDisplay}
                  </span>
                </span>
              </a>
            </div>

            <p className="mt-6 text-end text-[10.5px] leading-relaxed text-slate-soft">
              {t.hero.imageCaption}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
