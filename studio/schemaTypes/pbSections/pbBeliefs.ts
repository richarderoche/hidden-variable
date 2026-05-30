import {LayoutGrid, Square} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pbBeliefs',
  title: 'Beliefs',
  type: 'object',
  icon: LayoutGrid,
  fields: [
    defineField({
      name: 'sectionSettings',
      title: 'Section Settings',
      type: 'pbSectionSettings',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'beliefCards',
      title: 'Belief Cards',
      type: 'array',
      of: [
        {
          name: 'beliefCard',
          title: 'Belief Card',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
          ],
          preview: {
            select: {
              label: 'label',
              description: 'description',
            },
            prepare({label, description}) {
              return {
                title: label ? label : 'No Label',
                subtitle: description ? description : 'No Description',
                media: Square,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      beliefCards: 'beliefCards',
    },
    prepare({title, beliefCards}) {
      const beliefCardCount = beliefCards ? beliefCards.length : 0
      return {
        title: `Beliefs Section: ${title || 'No Title'}`,
        subtitle: `Count: ${beliefCardCount}`,
      }
    },
  },
})
