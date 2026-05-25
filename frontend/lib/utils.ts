import { SITE_MAX_WIDTH } from '@/components/shared/SiteWidth'
import type { PbColSettings, Size, Start } from '@/sanity.types'
import { PageBuilderData } from '@/types'
import { type ClassValue, clsx } from 'clsx'

// ClassName helper
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

//
// PAGE BUILDER HELPERS
export interface ScreensNum {
  mobile: number
  tablet: number
  desktop: number
}

export interface ScreensStr {
  mobile?: string
  tablet?: string
  desktop?: string
}

export function getOuterSettings(
  rowWidth: 12 | 10 | 8 | 6 = 12
): PbColSettings {
  const desktopStart =
    rowWidth === 12 ? 1 : rowWidth === 10 ? 2 : rowWidth === 8 ? 3 : 4
  return {
    _type: 'pbColSettings',
    size: {
      mobile: 12,
      tablet: 12,
      desktop: rowWidth,
    } satisfies Size,
    start: {
      mobile: 1,
      tablet: 1,
      desktop: desktopStart,
    } satisfies Start,
  }
}

export function getGridClasses(gridSettings: PbColSettings) {
  const { size, start } = gridSettings
  if (!size || !start) {
    return ''
  }
  const sizeM = size.mobile || 12
  const sizeT = size.tablet === 0 || size.tablet === sizeM ? null : size.tablet
  const sizeNow = sizeT || sizeM
  const sizeD =
    size.desktop === 0 || size.desktop === sizeNow ? null : size.desktop

  const startM = start.mobile && start.mobile > 1 ? start.mobile : null
  const startT =
    start.tablet === start.mobile
      ? null
      : start.tablet === 0
        ? 'auto'
        : start.tablet
  const startD =
    start.desktop === start.tablet
      ? null
      : start.desktop === 0
        ? 'auto'
        : start.desktop

  const mobile = `col-span-${sizeM}${startM ? ' col-start-' + startM : ''}`
  const tablet = `${sizeT ? ' md:col-span-' + sizeT : ''}${startT ? ' md:col-start-' + startT : ''}`
  const desktop = `${sizeD ? ' lg:col-span-' + sizeD : ''}${startD ? ' lg:col-start-' + startD : ''}`

  return `${mobile}${tablet}${desktop}`
}

export function getAlignClasses(set: ScreensStr, axis: string) {
  if (set === undefined || set === null) return ''
  const fallback = axis === 'x' ? 'justify-self-start' : 'self-start'
  const { mobile = fallback, tablet = 'inherit', desktop = 'inherit' } = set
  const m = mobile === fallback ? null : mobile
  const t =
    tablet === 'inherit' ? null : tablet === mobile ? null : ' md:' + tablet
  const d =
    desktop === 'inherit' ? null : desktop === tablet ? null : ' lg:' + desktop
  return `${m ? m : ''}${t ? t : ''}${d ? d : ''}`
}

export function getTrueSizes(outer: Size, inner?: Size) {
  if (!outer && !inner) {
    return ''
  }
  // Set inner to full if only one is provided
  const innerSize = inner ? inner : { mobile: 12, tablet: 12, desktop: 12 }
  const oSizeM = outer.mobile || 12
  const iSizeM = innerSize.mobile || 12
  const oSizeT = outer.tablet === 0 ? oSizeM : outer.tablet || 12
  const iSizeT = innerSize.tablet === 0 ? iSizeM : innerSize.tablet || 12
  const oSizeD = outer.desktop === 0 ? oSizeT : outer.desktop || 12
  const iSizeD = innerSize.desktop === 0 ? iSizeT : innerSize.desktop || 12
  const m = (oSizeM / 12) * (iSizeM / 12) * 100
  const t = (oSizeT / 12) * (iSizeT / 12) * 100
  const d = (oSizeD / 12) * (iSizeD / 12) * 100

  const mVw = m + 'vw'
  const tVw = t === m ? null : '(min-width: 768px) ' + t + 'vw, '
  const dVw =
    d === t ? null : d === m ? null : '(min-width: 1024px) ' + d + 'vw, '
  const maxVw =
    '(min-width: ' +
    SITE_MAX_WIDTH +
    'px) ' +
    SITE_MAX_WIDTH * (d / 100) +
    'px, '

  return `${maxVw}${dVw ? dVw : ''}${tVw ? tVw : ''}${mVw}`
}

/*
 * Helper to format image srcset sizes with max width
 * @param smWidth - Small width in viewport width percentage
 * @param mdWidth - Medium width in viewport width percentage
 * @param lgWidth - Large width in viewport width percentage
 * use null to skip a breakpoint
 */
export function imgSizesFormat(
  smWidth: number,
  mdWidth?: number | null,
  lgWidth?: number | null
) {
  const tiers: { min?: number; vw: number }[] = []
  if (lgWidth != null) tiers.push({ min: 1024, vw: lgWidth })
  if (mdWidth != null) tiers.push({ min: 768, vw: mdWidth })
  tiers.push({ vw: smWidth })

  while (tiers.length >= 2 && tiers[0].vw === tiers[1].vw) {
    tiers.shift()
  }

  const topVw = tiers[0].vw
  const maxWidthPx = SITE_MAX_WIDTH * (topVw / 100)
  const maxTier = `(min-width: ${SITE_MAX_WIDTH}px) ${maxWidthPx}px`

  const rest = tiers
    .map((t) =>
      t.min != null ? `(min-width: ${t.min}px) ${t.vw}vw` : `${t.vw}vw`
    )
    .join(', ')

  return `${maxTier}, ${rest}`
}

export function getFirstSectionInfo(data: PageBuilderData) {
  if (!data) return { firstIsHero: false, firstPbSectionKey: '' }
  const firstPbSection = data?.pbSections?.find(
    (section) => section.sectionSettings?.enableSection !== false
  )
  const firstPbSectionKey = firstPbSection?._key
  const firstPbSectionType = firstPbSection?._type
  const firstIsHero =
    firstPbSectionType === 'pbTitleSection' &&
    firstPbSection?.titleMode === 'hero'
  return { firstIsHero, firstPbSectionKey }
}
