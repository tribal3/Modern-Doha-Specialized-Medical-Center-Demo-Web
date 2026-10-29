import { CalendarClock, Info, FileText, ShieldQuestion, ListChecks } from 'lucide-react'
import { useLanguage } from '../language/useLanguage'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'

const itemIcons = [CalendarClock, ListChecks, FileText, ShieldQuestion]

export function PatientInfo() {
  const { t } = useLanguage()

  return (
    <section id="patients" className="relative bg-white">
      <Container className="py-20 sm:py-24 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-end lg:gap-16">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-clay">
              <span aria-hidden="true" className="h-px w-8 bg-brass" />
              {t.patients.eyebrow}
            </p>
            <h2 className="mt-5 max-w-[16ch] text-[clamp(1.95rem,4.2vw,3.15rem)] leading-[1.06] text-navy">
              {t.patients.title}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-[42ch] text-[14px] leading-[1.8] text-slate-soft lg:justify-self-end lg:text-end">
              {t.patients.intro}
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14">
          {t.patients.items.map((item, index) => {
            const Icon = itemIcons[index] ?? ListChecks
            return (
              <li key={item.title} className="h-full">
                <Reveal delay={(index % 2) * 80} className="h-full">
                  <div className="flex h-full flex-col rounded-[1.5rem] border border-line bg-cream p-6 transition-all duration-300 hover:border-clay/25 hover:shadow-card sm:p-7">
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-clay shadow-sm">
                        <Icon
                          aria-hidden="true"
                          className="h-[19px] w-[19px]"
                          strokeWidth={1.6}
                        />
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-display text-[11px] tracking-[0.12em] text-brass/90"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="mt-5 text-[15px] leading-snug font-semibold text-navy sm:text-[15.5px]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-[13px] leading-[1.75] text-slate-soft">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ul>

        <Reveal delay={120}>
          <p className="mt-8 flex max-w-3xl items-start gap-3 rounded-2xl border border-line bg-white px-4 py-3.5 text-[11.5px] leading-relaxed text-slate-soft">
            <Info
              aria-hidden="true"
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-clay"
            />
            {t.patients.note}
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
