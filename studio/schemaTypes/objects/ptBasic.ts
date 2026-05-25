import { DocumentPdfIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ptBasic',
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
          {
            name: 'fileLink',
            type: 'object',
            title: 'File link',
            icon: DocumentPdfIcon,
            fields: [
              defineField({
                title: 'File',
                name: 'file',
                type: 'file',
                options: {
                  accept: '.pdf,.doc,.docx,.ppt,.pptx',
                },
              }),
            ],
          },
        ],
      },
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Small', value: 'small' },
        { title: 'Heading 1', value: 'h1' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Label', value: 'h4' },
      ],
    },
  ],
})
