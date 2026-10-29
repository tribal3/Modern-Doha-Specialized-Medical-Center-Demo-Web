import { Building2, Info, Languages, Phone } from 'lucide-react'
import { useLanguage } from '../language/useLanguage'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'

const pointIcons = [Building2, Phone, Languages]

export function Specialty() {
  const { t } = useLanguage()

  return (
    <section id="why" className="relative overflow-hidden bg-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute start-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-line to-transparent rtl:translate-x-1/2"
      />
      <Container className="py-20 sm:py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-16 xl:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-clay">
                <span aria-hidden="true" className="h-px w-8 bg-brass" />
                {t.specialty.eyebrow}
              </p>
              <h2 className="mt-5 max-w-[16ch] text-[clamp(1.95rem,4.2vw,3.15rem)] leading-[1.06] text-navy">
                {t.specialty.title}
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <p className="mt-6 max-w-[52ch] border-s-2 border-clay/50 ps-4 text-[15px] leading-[1.8] text-navy sm:text-[16px]">
                {t.specialty.intro}
              </p>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-6 max-w-[54ch] space-y-4">
                <p className="text-[13.5px] leading-[1.85] text-slate-soft sm:text-[14px]">
                  {t.specialty.paragraphs[0]}
                </p>
                <p className="text-[13.5px] leading-[1.85] text-slate-soft sm:text-[14px]">
                  {t.specialty.paragraphs[1]}
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-8 flex max-w-[54ch] items-start gap-3 rounded-2xl border border-line bg-white px-4 py-3.5 text-[11.5px] leading-relaxed text-slate-soft">
                <Info
                  aria-hidden="true"
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-clay"
                />
                {t.specialty.note}
              </p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="rounded-[1.75rem] border border-line bg-white p-6 shadow-card sm:p-8">
              <h3 className="text-[17px] leading-snug font-semibold text-navy sm:text-[19px]">
                {t.specialty.panelTitle}
              </h3>

              <ul className="mt-6 space-y-5">
                {t.specialty.points.map((point, index) => {
                  const Icon = pointIcons[index] ?? Building2
                  return (
                    <li
                      key={point.title}
                      className="flex items-start gap-3.5 border-t border-line/80 pt-5 first:border-t-0 first:pt-0"
                    >
                      <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sand-soft text-clay">
                        <Icon
                          aria-hidden="true"
                          className="h-[18px] w-[18px]"
                          strokeWidth={1.6}
                        />
                      </span>
                      <div>
                        <h4 className="text-[13.5px] font-semibold text-navy">
                          {point.title}
                        </h4>
                        <p className="mt-1 max-w-[44ch] text-[12.5px] leading-[1.7] text-slate-soft">
                          {point.body}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
