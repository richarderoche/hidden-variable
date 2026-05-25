import { getGridClasses, getOuterSettings } from '@/lib/utils'
import { PbGridSingle } from '@/sanity.types'

import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'
import GridCol from './GridCol'

export default function SectionGridSingle({
  section,
  sectionKey,
}: {
  section: PbGridSingle
  sectionKey: string
}) {
  const { rowWidth, pbBlocks, cardMode, revealEffect, spaceBetweenBlocks } =
    section
  // Skip if no blocks yet
  if (!pbBlocks || pbBlocks.length === 0) {
    return null
  }
  // Prep attributes
  const outerSettings = getOuterSettings(rowWidth)
  const outerClasses = outerSettings ? getGridClasses(outerSettings) : ''

  return (
    <SiteWidth>
      <SiteGrid>
        <div className={outerClasses}>
          <GridCol
            col={{
              _key: sectionKey,
              pbBlocks,
              revealEffect,
              spaceBetweenBlocks,
            }}
            outerSettings={outerSettings}
            cardMode={cardMode}
          />
        </div>
      </SiteGrid>
    </SiteWidth>
  )
}
