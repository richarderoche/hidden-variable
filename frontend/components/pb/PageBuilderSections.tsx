'use client'

import { PbSections } from '@/sanity.types'
import { PageBuilderData } from '@/types'
import {
  SanityPathSegment,
  SanityVisualEditingPath,
  useSanityDataAttribute,
} from './SanityVisualEditingContext'
import SectionGridDouble from './SectionGridDouble'
import SectionGridMulti from './SectionGridMulti'
import SectionGridSingle from './SectionGridSingle'
import SectionTitleHero from './SectionTitleHero'

export interface PageBuilderContentProps {
  data: PageBuilderData
  baseUrl: string
  firstPbSectionKey: string
}

export default function PageBuilderSections({
  pbSections,
  firstPbSectionKey,
}: {
  pbSections: PbSections
  firstPbSectionKey: string
}) {
  const { getDataAttribute } = useSanityDataAttribute()
  if (!pbSections?.length) return null

  return (
    <div className="flex flex-col">
      {pbSections.map((section) => {
        const { _key, sectionSettings } = section
        const {
          enableSection = true,
          sectionId,
          marginTop,
          marginBottom,
        } = sectionSettings || {}

        if (!enableSection) return null

        const sectionPath: SanityPathSegment[] = ['pbSections', { _key }]

        return (
          <section
            id={sectionId ? sectionId : 'section-' + _key}
            key={_key}
            className="pt-gut first:pt-0"
            data-sanity={getDataAttribute(sectionPath)}
          >
            <div
              style={{
                paddingTop: marginTop
                  ? `calc(var(--gut) * ${marginTop})`
                  : undefined,
                paddingBottom: marginBottom
                  ? `calc(var(--gut) * ${marginBottom})`
                  : undefined,
              }}
            >
              <SanityVisualEditingPath path={[...sectionPath]}>
                {section._type === 'pbGridMulti' && (
                  <SectionGridMulti section={section} />
                )}
                {section._type === 'pbGridSingle' && (
                  <SectionGridSingle section={section} sectionKey={_key} />
                )}
                {section._type === 'pbGridDouble' && (
                  <SectionGridDouble section={section} sectionKey={_key} />
                )}
                {section._type === 'pbTitleSection' && (
                  <SectionTitleHero
                    section={section}
                    isFirst={_key === firstPbSectionKey}
                  />
                )}
              </SanityVisualEditingPath>
            </div>
          </section>
        )
      })}
    </div>
  )
}
