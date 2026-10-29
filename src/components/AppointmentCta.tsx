import { Phone, Navigation } from 'lucide-react'
import { clinic } from '../content/site'
import { useLanguage } from '../language/useLanguage'
import { ButtonLink } from './ui/ButtonLink'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'

export function AppointmentCta() {
  const { t } = useLanguage()

  return (
    <section
      aria-labelledby="appointment-heading"
      className="relative overflow-hidden bg-navy text-cream"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(110%_130%_at_88%_0%,rgba(140,59,85,0.6),transparent_58%)]"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 400 400"
        fill="none"
        className="pointer-events-none absolute -end-24 -top-32 h-[420px] w-[420px] text-blush/15"
      >
        <circle cx="200" cy="200" r="199" stroke="currentColor" />
        <circle cx="200" cy="200" r="150" stroke="currentColor" />
        <circle
          cx="200"
          cy="200"
          r="100"
          stroke="currentColor"
          strokeDasharray="2 7"
        />
      </svg>
      <div
        aria-hidden="true"
        className="ring-pattern pointer-events-none absolute -start-10 bottom-0 h-48 w-52 opacity-20"
      />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-blush/80">
              <span aria-hidden="true" className="h-px w-8 bg-gold" />
              {t.appointment.eyebrow}
            </p>
            <h2
              id="appointment-heading"
              className="mt-5 max-w-[17ch] font-display text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.04] text-cream"
            >
              {t.appointment.title}
            </h2>
            <p className="mt-5 max-w-[48ch] text-[13.5px] leading-[1.85] text-cream/70 sm:text-[14.5px]">
              {t.appointment.body}
            </p>
            <p className="mt-5 text-[10.5px] font-medium tracking-[0.08em] text-blush/80 uppercase">
              {t.appointment.note}
            </p>
          </Reveal>

          <Reveal delay={120} className="lg:justify-self-end">
            <div className="flex w-full flex-col gap-3 sm:max-w-[400px] lg:w-[340px]">
              <ButtonLink
                href={clinic.phoneHref}
                variant="onDark"
                size="lg"
                fullWidth
              >
                <Phone aria-hidden="true" className="h-4 w-4" />
                {t.actions.call}
              </ButtonLink>

              <ButtonLink
                href={clinic.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghostOnDark"
                size="lg"
                fullWidth
              >
                <Navigation aria-hidden="true" className="h-4 w-4" />
                {t.actions.directions}
              </ButtonLink>

              <a
                href={clinic.phoneHref}
                dir="ltr"
                className="mt-2 inline-flex items-center gap-2.5 font-display text-[20px] tracking-[0.04em] text-blush transition-colors duration-300 hover:text-white"
              >
                {clinic.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
