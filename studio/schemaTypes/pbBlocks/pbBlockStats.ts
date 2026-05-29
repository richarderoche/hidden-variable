import {Brackets} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pbBlockStats',
  title: 'Stats',
  type: 'object',
  icon: Brackets,
  fields: [
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          name: 'stat',
          title: 'Stat',
          type: 'string',
        },
      ],
    }),
  ],
  preview: {
    select: {
      stats: 'stats',
    },
    prepare({stats}) {
      return {
        title: 'Stats',
        subtitle: stats.map((stat: string) => `[ ${stat} ]`).join(' '),
        media: Brackets,
      }
    },
  },
})
