import { useState } from 'react'
import { ImageIcon } from 'lucide-react'
import { cx } from '../../lib/cx'

interface SmartImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

/** Image with a calm branded fallback if the asset cannot be loaded. */
export function SmartImage({
  src,
  alt,
  className,
  priority = false,
}: SmartImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cx(
          'flex items-center justify-center bg-[linear-gradient(150deg,#f7e6ea_0%,#fbf3f4_55%,#fbf9f5_100%)]',
          className,
        )}
      >
        <ImageIcon
          aria-hidden="true"
          className="h-9 w-9 text-wine/35"
          strokeWidth={1.25}
        />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onError={() => setFailed(true)}
      className={className}
    />
  )
}
