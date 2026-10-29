import {
  HeartPulse,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react'
import type { ServiceId } from '../content/site'

export const serviceIcons: Record<ServiceId, LucideIcon> = {
  dermatology: Stethoscope,
  aesthetics: Sparkles,
  gynecology: HeartPulse,
}
