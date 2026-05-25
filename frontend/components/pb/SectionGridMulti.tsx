import { getGridClasses, getOuterSettings } from '@/lib/utils'
import { PbGridMulti } from '@/sanity.types'

import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'
import GridCol from './GridCol'
import {
  SanityVisualEditingPath,
  useSanityDataAttribute,
} from './SanityVisualEditingContext'

export default function SectionGridMulti({
  section,
}: {
  section: PbGridMulti
}) {
  const { rowWidth = 12, columns } = section
  const { path: sectionPath } = useSanityDataAttribute()
  // Skip if no columns yet
  if (!columns || columns.length === 0) {
    return null
  }
  // Prep attributes
  const outerSettings = getOuterSettings(rowWidth)
  const outerClasses = outerSettings ? getGridClasses(outerSettings) : ''
  const looseColSpacing = rowWidth > 8 && columns.length < 3

  return (
    <SiteWidth>
      <SiteGrid>
        <div className={outerClasses}>
          <SiteGrid yGaps={true} looseColSpacing={looseColSpacing}>
            {columns.map((col) => (
              <SanityVisualEditingPath
                key={col._key}
                path={[...sectionPath, 'columns', { _key: col._key }]}
              >
                <GridCol
                  col={col}
                  outerSettings={outerSettings}
                  cardMode={col.cardMode}
                  blockWidths={col.blockWidths}
                />
              </SanityVisualEditingPath>
            ))}
          </SiteGrid>
        </div>
      </SiteGrid>
    </SiteWidth>
  )
}
