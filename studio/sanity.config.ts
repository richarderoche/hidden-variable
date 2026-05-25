import { dashboardTool } from '@sanity/dashboard'
import { visionTool } from '@sanity/vision'
import { find, without } from 'lodash'
import { defineConfig } from 'sanity'
import { vercelWidget } from 'sanity-plugin-dashboard-widget-vercel'
import { noteField } from 'sanity-plugin-note-field'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { schemaTypes, singletonSchemaTypes } from './schemaTypes'
import { pageStructure } from './structure'

//import { defaultConfig, muxInput } from 'sanity-plugin-mux-input'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const SANITY_STUDIO_PREVIEW_URL =
  process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

/*
// Max defaults, can be overridden in field options
export const muxConfig = {
  max_resolution_tier: '2160p',
  video_quality: 'plus',
  disableTextTrackConfig: true,
  acceptedMimeTypes: ['video/*'],
  maxAssetFileSize: 1024 * 1024 * 1024, // 1 GB in bytes
  maxAssetDuration: 2 * 60 * 60, // 2 hours in seconds
} satisfies Partial<typeof defaultConfig>
*/
export default defineConfig({
  name: 'default',
  title: 'Sanity / HV',

  projectId: projectId,
  dataset: dataset,

  scheduledDrafts: {
    enabled: false,
  },

  releases: {
    enabled: false,
  },

  plugins: [
    // The order determines the order in the studio menu
    structureTool({
      structure: pageStructure(singletonSchemaTypes),
    }),
    presentationTool({
      previewUrl: {
        origin: SANITY_STUDIO_PREVIEW_URL,
        previewMode: { enable: '/api/draft-mode/enable' },
      },
    }),
    //muxInput(muxConfig),
    ...(process.env.NODE_ENV !== 'production' ? [visionTool()] : []),
    dashboardTool({
      widgets: [vercelWidget()],
    }),
    noteField(),
  ],

  tools: (prev: any) => {
    const dashboardTool = find(prev, { name: 'dashboard' })
    const toolsWithoutDashboard = without(prev, dashboardTool)

    return [
      ...toolsWithoutDashboard,
      {
        ...dashboardTool,
        name: 'deploy',
        title: 'Deploy',
      },
    ]
  },

  schema: {
    types: schemaTypes,
  },
})
