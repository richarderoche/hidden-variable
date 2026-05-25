import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, studioUrl } from './api'

// Can be turned back on
// but will need to add a lot of fields to the noStega array
const useStega = false

// String fields that are for logic not content
const noStega = [
  'mobile',
  'tablet',
  'desktop',
  'playbackId', // Mux
  'assetId', // Mux
  'filename', // Mux
  'aspect_ratio',
  'sectionId',
  'spaceBetweenBlocks',
  'bodyTextSize',
  'heroSizeClasses',
  'titleMode',
]

const stegaSetup = {
  studioUrl,
  logger: console,
  filter: (props) => {
    const endPath = props.sourcePath.at(-1)
    if (endPath === 'title') {
      return true
    }

    if (noStega.includes(endPath?.toString() || '')) {
      return false
    }

    return props.filterDefault(props)
  },
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
  stega: useStega ? stegaSetup : false,
})
