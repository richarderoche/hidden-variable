import { CaseSensitive } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const textStyleOptions = [
  { title: 'H1', value: 'ts-h1' },
  { title: 'H2', value: 'ts-h2' },
  { title: 'H3', value: 'ts-h3' },
  { title: 'H4', value: 'ts-h4' },
  { title: 'Body XL', value: 'ts-p-xl' },
  { title: 'Body Large', value: 'ts-p-lg' },
  { title: 'Body Medium', value: 'ts-p-md' },
  { title: 'Body Small', value: 'ts-p-sm' },
  { title: 'Body XS', value: 'ts-p-xs' },
  { title: 'Label', value: 'ts-h5' },
  { title: 'Label Small', value: 'ts-h6' },
]

// If adding options, add classes to frontend/safelist-classes.txt
export const textColorOptions = [
  { title: 'Body Normal', value: 'text-body' },
  { title: 'Accent', value: 'text-accent' },
]

export default defineType({
  name: 'pbBlockPlainText',
  title: 'Plain Text',
  type: 'object',
  icon: CaseSensitive,
  fields: [
    defineField({
      title: 'Text Style',
      name: 'textStyle',
      type: 'string',
      options: {
        list: textStyleOptions,
      },
      initialValue: 'ts-p-md',
    }),
    defineField({
      title: 'Color',
      name: 'color',
      type: 'string',
      initialValue: 'text-body',
      options: {
        list: textColorOptions,
      },
    }),
    defineField({
      title: 'Balance Lines?',
      name: 'balanceLines',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'textContent',
      title: 'Text',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: {
      textContent: 'textContent',
      textStyle: 'textStyle',
    },
    prepare({ textContent, textStyle }) {
      const bodyTextSizeText =
        textStyleOptions.find((o) => o.value === textStyle)?.title ?? 'Default'
      return {
        title: 'Text: ' + bodyTextSizeText,
        subtitle: textContent ? textContent : 'No Text',
        media: CaseSensitive,
      }
    },
  },
})
