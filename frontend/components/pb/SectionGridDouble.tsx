import { getGridClasses, getOuterSettings } from '@/lib/utils'
import { PbColSettings, PbGridDouble } from '@/sanity.types'

import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'
import GridCol from './GridCol'

export default function SectionGridDouble({
  section,
  sectionKey,
}: {
  section: PbGridDouble
  sectionKey: string
}) {
  const {
    rowWidth,
    columnOne,
    columnTwo,
    columnProportions,
    yAlignment = 'items-center',
  } = section
  const columnOneBlocks = columnOne?.pbBlocks || []
  const columnTwoBlocks = columnTwo?.pbBlocks || []
  // Skip if no blocks yet
  if (!columnOneBlocks.length && !columnTwoBlocks.length) {
    return null
  }
  // Prep attributes
  const outerSettings = getOuterSettings(rowWidth)
  const outerClasses = outerSettings ? getGridClasses(outerSettings) : ''
  const colSizes = getColSizes(columnProportions || '50-50')
  const columnOneSettings = {
    _type: 'pbColSettings',
    size: {
      mobile: 12,
      tablet: colSizes.colOne,
      desktop: colSizes.colOne,
    },
    start: {
      mobile: 0,
      tablet: 0,
      desktop: 0,
    },
  } satisfies PbColSettings
  const columnTwoSettings = {
    _type: 'pbColSettings',
    size: {
      mobile: 12,
      tablet: colSizes.colTwo,
      desktop: colSizes.colTwo,
    },
    start: {
      mobile: 0,
      tablet: 0,
      desktop: 0,
    },
  } satisfies PbColSettings

  return (
    <SiteWidth>
      <SiteGrid>
        <div className={outerClasses}>
          <SiteGrid
            yGaps={true}
            looseColSpacing={rowWidth && rowWidth > 8 ? true : false}
            yAlignment={yAlignment}
          >
            {columnOne && columnOneBlocks.length > 0 && (
              <GridCol
                col={{
                  _key: sectionKey + 'columnOne',
                  pbBlocks: columnOneBlocks,
                  revealEffect: columnOne.revealEffect,
                  spaceBetweenBlocks: columnOne.spaceBetweenBlocks,
                  columnSettings: columnOneSettings,
                }}
                outerSettings={outerSettings}
                cardMode={columnOne.cardMode}
              />
            )}
            {columnTwo && columnTwoBlocks.length > 0 && (
              <GridCol
                col={{
                  _key: sectionKey + 'columnTwo',
                  pbBlocks: columnTwoBlocks,
                  revealEffect: columnTwo.revealEffect,
                  spaceBetweenBlocks: columnTwo.spaceBetweenBlocks,
                  columnSettings: columnTwoSettings,
                }}
                outerSettings={outerSettings}
                cardMode={columnTwo.cardMode}
              />
            )}
          </SiteGrid>
        </div>
      </SiteGrid>
    </SiteWidth>
  )
}

type ColSizes = {
  colOne: 6 | 7 | 5
  colTwo: 6 | 7 | 5
}

export const getColSizes = (
  proportions: '50-50' | '60-40' | '40-60'
): ColSizes => {
  if (proportions === '60-40') {
    return {
      colOne: 7,
      colTwo: 5,
    }
  }
  if (proportions === '40-60') {
    return {
      colOne: 5,
      colTwo: 7,
    }
  }
  return {
    colOne: 6,
    colTwo: 6,
  }
}
