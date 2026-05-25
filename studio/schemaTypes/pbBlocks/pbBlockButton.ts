import { CircleArrowRight } from 'lucide-react'
import { defineField, defineType } from 'sanity'

const BUTTON_TYPE_OPTIONS: { title: string; value: string }[] = [
  { title: 'External', value: 'externalLink' },
  { title: 'File', value: 'file' },
]

export default defineType({
  title: 'Button',
  name: 'pbBlockButton',
  type: 'object',
  icon: CircleArrowRight,
  fields: [
    defineField({
      title: 'Link type',
      name: 'linkType',
      type: 'string',
      options: {
        list: BUTTON_TYPE_OPTIONS,
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      title: 'External Link',
      name: 'externalLink',
      type: 'navExternal',
      hidden: ({ parent }) => parent?.linkType !== 'externalLink',
    }),
    defineField({
      title: 'File',
      name: 'fileLink',
      type: 'object',
      hidden: ({ parent }) => parent?.linkType !== 'file',
      fields: [
        defineField({
          title: 'File',
          name: 'file',
          type: 'file',
          options: {
            accept: '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx',
          },
        }),
        defineField({
          title: 'Button text',
          name: 'buttonText',
          type: 'string',
          description: 'Text shown on the button (e.g. "Download PDF")',
        }),
      ],
    }),
  ],
  validation: (Rule) =>
    Rule.custom((block) => {
      if (!block || block.linkType !== 'file') return true
      const fileLink = block.fileLink as
        | { file?: unknown; buttonText?: string }
        | undefined
      if (!fileLink?.file)
        return 'Please add a file when using File button type.'
      if (!fileLink?.buttonText?.trim())
        return 'Please add button text when using File button type.'
      return true
    }),
  preview: {
    select: {
      linkType: 'linkType',
      externalTitle: 'externalLink.title',
      externalUrl: 'externalLink.url',
      fileButtonText: 'fileLink.buttonText',
    },
    prepare({
      linkType,
      externalTitle,
      externalUrl,
      fileButtonText,
    }) {
      const typeLabel =
        BUTTON_TYPE_OPTIONS.find((o) => o.value === linkType)?.title ?? 'Button'
      let subtitle = ''
      if (linkType === 'externalLink') {
        subtitle = externalTitle || externalUrl || 'No URL'
      } else if (linkType === 'file') {
        subtitle = fileButtonText || 'No button text'
      }
      return {
        title: `Button: ${typeLabel}`,
        subtitle,
        media: CircleArrowRight,
      }
    },
  },
})
