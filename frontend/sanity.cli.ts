import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '<your project ID>'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineCliConfig({
  api: {
    projectId: projectId,
    dataset: dataset,
  },
  typegen: {
    path: './sanity/**/*.{ts,tsx,js,jsx}',
    schema: '../sanity.schema.json',
    generates: './sanity.types.ts',
    overloadClientMethods: true,
  },
})
