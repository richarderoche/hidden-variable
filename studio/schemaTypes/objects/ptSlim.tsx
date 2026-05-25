import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ptSlim',
  title: 'RTE',
  type: 'array',
  of: [
    {
      type: 'block',
      marks: {
        decorators: [],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({
                name: 'href',
                type: 'url',
                title: 'Url',
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              }),
            ],
          },
        ],
      },
      styles: [],
      lists: [],
    },
  ],
})
