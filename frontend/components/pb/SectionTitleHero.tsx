'use client'

import { cn, getGridClasses, getOuterSettings } from '@/lib/utils'
import { PbTitleSection } from '@/sanity.types'

import ImageBasic from '../shared/ImageBasic'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'

export default function SectionTitleHero({
  section,
  isFirst,
}: {
  section: PbTitleSection
  isFirst: boolean
}) {
  const { rowWidth, titleMode, title, subtitle, image, heroImageAltText } =
    section
  const isHero = titleMode === 'hero'
  const hasHero = isHero && image?.asset?._ref

  // Prep attributes
  const outerSettings = getOuterSettings(rowWidth)
  const outerClasses = outerSettings ? getGridClasses(outerSettings) : ''
  const shortHeading = (subtitle?.length || 0) < 90
  let headingTsClass: string
  switch (true) {
    case rowWidth === 12:
      headingTsClass = 'ts-h1'
      break
    case shortHeading && rowWidth === 10:
      headingTsClass = 'ts-h1'
      break
    case rowWidth === 10:
      headingTsClass = 'ts-h2'
      break
    case shortHeading && rowWidth === 8:
      headingTsClass = 'ts-h2'
      break
    default:
      headingTsClass = 'ts-h3'
  }

  return (
    <div className="pb-gut-50">
      {hasHero && (
        <ImageBasic
          image={image}
          alt={heroImageAltText || ''}
          sizes="100vw"
          priority={isFirst ? true : false}
          ratio={2.5}
          className={cn(!isFirst && 'pt-gut-300')}
        />
      )}
      <SiteWidth className={isHero || isFirst ? 'pt-gut-200' : 'pt-gut-300'}>
        <SiteGrid>
          <div className={outerClasses}>
            <LabeledHeading
              label={title}
              heading={subtitle}
              headingTsClass={headingTsClass}
              isFirst={isFirst}
            />
          </div>
        </SiteGrid>
      </SiteWidth>
    </div>
  )
}

export const LabeledHeading = ({
  label,
  labelColorClass = 'text-body-subtle',
  heading,
  headingTsClass = 'ts-h1',
  isFirst = false,
}: {
  label?: string
  labelColorClass?: string
  heading?: string
  headingTsClass: string
  isFirst?: boolean
}) => {
  if (!heading && !label) return null
  const TopTag = isFirst ? 'h1' : 'h2'
  const BottomTag = isFirst ? 'h2' : 'h3'
  const HeadingTag = label ? BottomTag : TopTag

  return (
    <div className="flex flex-col gap-y-gut">
      {label && (
        <TopTag className={cn('ts-h5', labelColorClass)}>{label}</TopTag>
      )}
      {heading && (
        <HeadingTag className={cn(headingTsClass, 'text-balance')}>
          {heading}
        </HeadingTag>
      )}
    </div>
  )
}
