import { Check, MapPin, Phone } from 'lucide-react'
import { clinic } from '../content/site'
import { useLanguage } from '../language/useLanguage'
import { Container } from './ui/Container'

export function TrustStrip() {
  const { t } = useLanguage()

  return (
    <section
      aria-labelledby="trust-heading"
      className="border-y border-line bg-white"
    >
      <Container className="py-7 sm:py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
            <div>
              <p id="trust-heading" className="eyebrow text-slate-soft">
                {t.trust.eyebrow}
              </p>
              <ul className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-2">
                {t.trust.facts.map((fact) => (
                  <li
                    key={fact}
                    className="inline-flex items-center gap-1.5 text-[12px] font-medium text-slate-"
                  >
                    <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-sand text-clay">
                      <Check
                        aria-hidden="true"
                        className="h-2.5 w-2.5"
                        strokeWidth={3}
                      />
                    </span>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>

            <div
              aria-hidden="true"
              className="hidden h-10 w-px bg-line sm:block"
            />

            <p className="flex items-start gap-2 text-[11.5px] leading-relaxed text-slate-soft">
              <MapPin
                aria-hidden="true"
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-clay"
              />
              {t.contact.locationValue}
            </p>
          </div>

          <div className="flex flex-col gap-1.5 lg:items-end lg:text-end">
            <a
              href={clinic.phoneHref}
              className="inline-flex items-center gap-2 text-[12px] font-semibold text-clay underline-offset-4 transition-colors hover:text-navy hover:underline"
            >
              <Phone aria-hidden="true" className="h-3.5 w-3.5" />
              {t.trust.cta}
              <span dir="ltr" className="text-slate-soft">
                {clinic.phoneDisplay}
              </span>
            </a>
            <p className="max-w-[420px] text-[10.5px] leading-relaxed text-slate-soft">
              {t.trust.note}
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
