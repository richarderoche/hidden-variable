import { defineType } from 'sanity'

export default defineType({
  title: 'Sections',
  name: 'pbSections',
  type: 'array',
  of: [
    { type: 'pbTitleSection' },
    { type: 'pbGridMulti' },
    { type: 'pbGridSingle' },
    { type: 'pbGridDouble' },
  ],
})
