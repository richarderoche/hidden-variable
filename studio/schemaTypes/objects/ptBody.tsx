import { defineArrayMember, defineType } from 'sanity'

export default defineType({
  name: 'ptBody',
  title: 'RTE',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [],
      },
      styles: [],
    }),
  ],
})
