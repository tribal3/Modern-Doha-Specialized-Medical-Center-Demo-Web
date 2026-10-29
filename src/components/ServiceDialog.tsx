import { createPortal } from 'react-dom'
import { ArrowUpRight, Check, Navigation, Phone, X } from 'lucide-react'
import { clinic, type ServiceCopy } from '../content/site'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import { useModalA11y } from '../hooks/useModalA11y'
import { useLanguage } from '../language/useLanguage'
import { serviceIcons } from './serviceIcons'
import { ButtonLink } from './ui/ButtonLink'

interface ServiceDialogProps {
  service: ServiceCopy | null
  onClose: () => void
}

export function ServiceDialog({ service, onClose }: ServiceDialogProps) {
  const { t } = useLanguage()
  const open = Boolean(service)
  const ref = useModalA11y<HTMLDivElement>(open, onClose)
  useBodyScrollLock(open)

  if (!service) return null

  const Icon = serviceIcons[service.id]

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="drawer-backdrop absolute inset-0 bg-navy/50 backdrop-blur-sm"
      />

      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-dialog-title"
        tabIndex={-1}
        className="dialog-panel drawer-scroll relative z-10 max-h-[92svh] w-full overflow-y-auto rounded-t-[1.75rem] border border-white/60 bg-cream p-6 shadow-2xl sm:max-w-[560px] sm:rounded-[1.75rem] sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blush text-wine">
              <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <span className="eyebrow text-slate-soft">
              {t.services.dialogKicker}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.actions.close}
            className="-me-1 -mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-navy/15 text-navy transition-colors duration-300 hover:border-navy/35 hover:bg-white"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        <h3
          id="service-dialog-title"
          className="mt-6 font-display text-[26px] leading-[1.15] text-navy sm:text-[30px]"
        >
          {service.title}
        </h3>
        <p className="mt-3 text-[14px] leading-[1.8] text-slate-soft">
          {t.serviceDetails[service.id]}
        </p>

        <div className="mt-6 rounded-2xl border border-line bg-white p-5">
          <h4 className="eyebrow text-wine">{t.services.dialogGoodToKnow}</h4>
          <ul className="mt-3 space-y-2.5">
            {t.services.dialogPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-slate-soft"
              >
                <Check
                  aria-hidden="true"
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-wine"
                  strokeWidth={2.5}
                />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 text-[10.5px] leading-relaxed text-slate-soft">
          {t.services.dialogDisclaimer}
        </p>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <ButtonLink href={clinic.phoneHref} fullWidth size="lg">
            <Phone aria-hidden="true" className="h-4 w-4" />
            {t.services.dialogCta}
          </ButtonLink>
          <ButtonLink
            href={clinic.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            fullWidth
            size="lg"
          >
            <Navigation aria-hidden="true" className="h-4 w-4" />
            {t.actions.directions}
            <ArrowUpRight
              aria-hidden="true"
              className="h-3.5 w-3.5 rtl:-scale-x-100"
            />
          </ButtonLink>
        </div>
      </div>
    </div>,
    document.body,
  )
}
