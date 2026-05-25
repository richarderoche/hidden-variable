import {
  SanityImage,
  type SanityImageProps,
  type WrapperProps,
} from 'sanity-image'

import { dataset, projectId } from '@/sanity/lib/api'
import { SITE_MAX_WIDTH } from './SiteWidth'

export type ImageSanityProps<T extends React.ElementType = 'img'> =
  WrapperProps<T> & {
    maxDimension?: number
  }

/** Helps set reasonable srcset sizes when big images are used. Should go down to 25% of maxDimension and up to 200% of it (or original size). */

function resolveCappedDimensions(
  width: number | undefined,
  height: number | undefined,
  maxDimension: number
): [number | undefined, number | undefined] {
  if (width === undefined && height === undefined) {
    return [undefined, undefined]
  }

  const hasW = width !== undefined
  const hasH = height !== undefined

  if (hasW && !hasH) {
    return [width! > maxDimension ? maxDimension : width, undefined]
  }

  if (!hasW && hasH) {
    return [undefined, height! > maxDimension ? maxDimension : height]
  }

  const w = width!
  const h = height!
  const longer = Math.max(w, h)
  if (longer <= maxDimension) {
    return [w, h]
  }

  const scale = maxDimension / longer
  return [Math.round(w * scale), Math.round(h * scale)]
}

const Image = <T extends React.ElementType = 'img'>(
  props: ImageSanityProps<T>
) => {
  const { width, height, maxDimension = SITE_MAX_WIDTH, ...rest } = props
  const [w, h] = resolveCappedDimensions(width, height, maxDimension)

  return (
    <SanityImage
      {...({
        projectId,
        dataset,
        ...rest,
        width: w,
        height: h,
      } as SanityImageProps<T>)}
    />
  )
}

export default Image
