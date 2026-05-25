import Image from '@/components/shared/ImageSanity'
import { getImageDimensions } from '@sanity/asset-utils'
import type { Image as SanityImageType } from 'sanity'

import { cn } from '@/lib/utils'
import { SITE_MAX_WIDTH } from './SiteWidth'

interface ImageBasicProps {
  alt?: string
  className?: string
  ratio?: number
  fitTo?: 'width' | 'height' | 'manual'
  image: SanityImageType
  priority?: boolean
  sizes?: string
  mode?: 'contain' | 'cover'
  style?: React.CSSProperties
  maxDimension?: number
}

export default function ImageBasic({
  alt = '',
  className = '',
  ratio = 0,
  fitTo = 'width',
  image,
  priority = false,
  sizes = '100vw',
  mode,
  style,
  maxDimension = SITE_MAX_WIDTH,
}: ImageBasicProps) {
  if (!image?.asset?._ref) return null
  const hasRatio = ratio !== 0
  const hotspot = image.hotspot && hasRatio ? image.hotspot : null
  const cropArea = image.crop && hasRatio ? image.crop : null

  const { width, height } = getImageDimensions(image.asset)
  const { newW, newH } = getNewDimensions(ratio, width, height)

  if (!mode && hasRatio) {
    mode = 'cover'
  } else if (!mode) {
    mode = 'contain'
  }

  return (
    <Image
      id={image.asset?._ref}
      className={cn(
        fitTo === 'width'
          ? 'w-full h-auto'
          : fitTo === 'height'
            ? 'h-full w-auto'
            : '',
        className
      )}
      alt={alt}
      width={newW || width}
      height={newH || height}
      mode={mode}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      maxDimension={maxDimension}
      {...(hotspot && { hotspot })}
      {...(cropArea && { crop: cropArea })}
      {...(style && { style })}
    />
  )
}

function getNewDimensions(ratio: number, width: number, height: number) {
  const oRatio = width / height
  const shortSide = width < height ? width : height
  // No ratio
  if (ratio === 0 || ratio === oRatio) return { newW: null, newH: null }
  // Square
  if (ratio === 1) return { newW: shortSide, newH: shortSide }
  // Other
  if (oRatio < ratio)
    return {
      newW: width,
      newH: Math.round(width / ratio),
    }
  if (oRatio > ratio)
    return {
      newW: Math.round(height * ratio),
      newH: height,
    }
  // Fallback
  return { newW: null, newH: null }
}
