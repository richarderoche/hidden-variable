import type { PbColSettings } from '../../frontend/sanity.types'

//
// SCHEMA HELPERS

export function getGridSettings(gridSettings: PbColSettings) {
  const { size, start } = gridSettings
  if (!start || !size) {
    return ''
  }
  const startT = start.tablet === 0 ? start.mobile : start.tablet
  const sizeT = size.tablet === 0 ? size.mobile : size.tablet
  const startD = start.desktop === 0 ? startT : start.desktop
  const sizeD = size.desktop === 0 ? sizeT : size.desktop

  const mobile = `(Mob) ${gridLine(start.mobile, size.mobile)}`
  const tablet = `(Tab) ${gridLine(startT, sizeT)}`
  const desktop = `(Desk) ${gridLine(startD, sizeD)}`

  return `${mobile} / ${tablet} / ${desktop}`
}

function gridLine(start: number, size: number) {
  if (start > 1) {
    const end = start + size - 1
    return `Cols ${start}-${end}`
  }
  return `${size}col`
}

export const getTypeTitles = (types: string[]) => {
  const typeNames = types.map((type) => {
    switch (type) {
      case 'pbBlockText':
        return 'Rich Text'
      case 'pbBlockPlainText':
        return 'Plain Text'
      case 'pbBlockImage':
        return 'Image'
      case 'pbBlockVideoEmbed':
        return 'Video Embed'
      case 'pbBlockDivider':
        return 'Divider/Spacer'
      case 'pbBlockButton':
        return 'Button'
      case 'pbBlockMarquee':
        return 'Marquee'
      default:
        return null
    }
  })

  return typeNames.join(', ')
}

export const getRowWidthTitle = (rowWidth: number) => {
  if (rowWidth === 12) {
    return 'Full'
  }
  if (rowWidth === 10) {
    return 'Medium'
  }
  if (rowWidth === 8) {
    return 'Small'
  }
  return 'Extra Small'
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export { capitalize }
