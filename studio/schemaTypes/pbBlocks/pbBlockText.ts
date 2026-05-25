import { TextInitial } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pbBlockText',
  title: 'Rich Text',
  type: 'object',
  icon: TextInitial,
  fields: [
    defineField({ name: 'textContent', title: 'Content', type: 'ptBasic' }),
  ],
  preview: {
    select: {
      content: 'textContent',
    },
    prepare({ content }) {
      return {
        title: 'Rich Text',
        subtitle: content.length > 0 ? content[0].children[0]?.text : 'Empty',
        media: TextInitial,
      }
    },
  },
})
