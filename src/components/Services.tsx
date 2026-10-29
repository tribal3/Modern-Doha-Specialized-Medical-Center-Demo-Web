import { useCallback, useState } from 'react'
import { ArrowUpRight, Info } from 'lucide-react'
import type { ServiceCopy } from '../content/site'
import { useLanguage } from '../language/useLanguage'
import { Reveal } from './ui/Reveal'
import { Container } from './ui/Container'
import { ServiceDialog } from './ServiceDialog'
import { serviceIcons } from './serviceIcons'

export function Services() {
  const { t } = useLanguage()
  const [selected, setSelected] = useState<ServiceCopy | null>(null)
  const close = useCallback(() => setSelected(null), [])

  return (
    <section id="services" className="relative overflow-hidden bg-white">
      <Container className="py-20 sm:py-24 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-wine">
              <span aria-hidden="true" className="h-px w-8 bg-gold" />
              {t.services.eyebrow}
            </p>
            <h2 className="mt-5 max-w-[18ch] text-[clamp(1.95rem,4.2vw,3.15rem)] leading-[1.06] text-navy">
              {t.services.title}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-[44ch] text-[14px] leading-[1.8] text-slate-soft lg:justify-self-end lg:text-[14.5px]">
              {t.services.intro}
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {t.servicesList.map((service, index) => {
            const Icon = serviceIcons[service.id]
            return (
              <li key={service.id} className="h-full">                  <Reveal delay={(index % 3) * 60} className="h-full">
                  <button
                    type="button"
                    onClick={() => setSelected(service)}
                    aria-haspopup="dialog"
                    className="group flex h-full min-h-[248px] w-full flex-col rounded-[1.5rem] border border-line bg-white p-6 text-start transition-all duration-300 hover:-translate-y-1 hover:border-wine/25 hover:shadow-card focus-visible:-translate-y-1 sm:p-7"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blush-soft text-wine transition-colors duration-300 group-hover:bg-wine group-hover:text-cream">
                        <Icon
                          aria-hidden="true"
                          className="h-[21px] w-[21px]"
                          strokeWidth={1.5}
                        />
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-display text-[11px] tracking-[0.12em] text-gold/90"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="mt-5 text-[15.5px] leading-snug font-semibold text-navy">
                      {service.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[13px] leading-[1.7] text-slate-soft">
                      {service.description}
                    </p>

                    <span className="mt-5 flex items-center justify-between border-t border-line/90 pt-3.5 text-[11.5px] font-semibold text-wine">
                      {t.services.cardCta}
                      <span className="grid h-6 w-6 place-items-center rounded-full border border-wine/20 transition-all duration-300 group-hover:border-wine group-hover:bg-wine group-hover:text-cream">
                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-3 w-3 rtl:-scale-x-100"
                        />
                      </span>
                    </span>
                  </button>
                </Reveal>
              </li>
            )
          })}
        </ul>

        <p className="mt-8 flex max-w-3xl items-start gap-3 rounded-2xl border border-line/90 bg-cream px-4 py-3.5 text-[11.5px] leading-relaxed text-slate-soft">
          <Info
            aria-hidden="true"
            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-wine"
          />
          {t.services.note}
        </p>
      </Container>

      <ServiceDialog service={selected} onClose={close} />
    </section>
  )
}
