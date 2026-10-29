import {
  ArrowRight,
  HeartHandshake,
  MapPin,
  MessageSquare,
  Phone,
} from 'lucide-react'
import { useLanguage } from '../language/useLanguage'
import { ButtonLink } from './ui/ButtonLink'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { SmartImage } from './ui/SmartImage'

const pointIcons = [MessageSquare, HeartHandshake, Phone]

export function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="relative bg-cream">
      <Container className="py-20 sm:py-24 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 xl:gap-20">
          <Reveal className="order-2 lg:order-1">
            <div className="relative mx-auto w-full max-w-[480px]">
              <div
                aria-hidden="true"
                className="absolute -end-3 -bottom-3 h-full w-full rounded-[2rem] border border-brass/45 sm:-end-4 sm:-bottom-4 sm:rounded-[2.5rem]"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line/60 sm:rounded-[2.5rem]">
                <SmartImage
                  src="/images/center-building.jpg"
                  alt={t.about.imageAlt}
                  className="h-full w-full object-cover object-[center_35%]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(to_top,rgba(23,52,80,0.24),transparent_45%)]"
                />
              </div>

              <div className="absolute -bottom-7 end-2 w-[46%] overflow-hidden rounded-[1.25rem] border-[5px] border-white shadow-card sm:-bottom-8 sm:end-[-1.25rem]">
                <SmartImage
                  src="/images/about-detail.jpg"
                  alt={t.about.detailAlt}
                  className="aspect-square w-full object-cover"
                />
              </div>

              <div className="absolute top-5 -start-2 flex items-center gap-2 rounded-full border border-line/70 bg-white/95 px-3.5 py-2 shadow-card backdrop-blur sm:-start-4">
                <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-clay" />
                <span className="text-[10.5px] font-semibold text-navy">
                  {t.about.badge}
                </span>
              </div>
            </div>

            <p className="mt-14 text-[10.5px] leading-relaxed text-slate-soft sm:mt-16">
              {t.about.imageNote}
            </p>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-clay">
                <span aria-hidden="true" className="h-px w-8 bg-brass" />
                {t.about.eyebrow}
              </p>
              <h2 className="mt-5 max-w-[15ch] text-[clamp(1.95rem,4.2vw,3.25rem)] leading-[1.06] text-navy">
                {t.about.title}
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-6 max-w-[52ch] space-y-4">
                <p className="text-[14.5px] leading-[1.85] text-slate sm:text-[15.5px]">
                  {t.about.paragraphs[0]}
                </p>
                <p className="text-[13px] leading-[1.85] text-slate-soft sm:text-[13.5px]">
                  {t.about.paragraphs[1]}
                </p>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <ul className="mt-8 space-y-4">
                {t.about.points.map((point, index) => {
                  const Icon = pointIcons[index] ?? MessageSquare
                  return (
                    <li key={point.title} className="flex items-start gap-3.5">
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sand-soft text-clay">
                        <Icon
                          aria-hidden="true"
                          className="h-4 w-4"
                          strokeWidth={1.6}
                        />
                      </span>
                      <div>
                        <h3 className="text-[13px] font-semibold text-navy">
                          {point.title}
                        </h3>
                        <p className="mt-0.5 max-w-[42ch] text-[12.5px] leading-relaxed text-slate-soft">
                          {point.body}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </Reveal>

            <Reveal delay={200}>
              <ButtonLink
                href="#patients"
                variant="outline"
                className="mt-9"
              >
                {t.about.cta}
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover/btn:-translate-x-0.5"
                />
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
