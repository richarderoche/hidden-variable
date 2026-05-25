import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ptSingle',
  title: 'RTE',
  type: 'array',
  of: [
    {
      type: 'block',
      options: {
        oneLine: true,
      },
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
