import {CaseSensitive} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const textStyleOptions = [
  {title: 'H1', value: 'ts-h1'},
  {title: 'H2', value: 'ts-h2'},
  {title: 'H3', value: 'ts-h3'},
  {title: 'Body Medium', value: 'ts-p-md'},
  {title: 'Body Small', value: 'ts-p-sm'},
  {title: 'Label', value: 'ts-h4'},
]

// If adding options, add classes to frontend/safelist-classes.txt
export const textColorOptions = [
  {title: 'Normal', value: 'text-body'},
  {title: 'Gray', value: 'text-accent'},
]

export const textAlignOptions = [
  {title: 'Left', value: 'text-left'},
  {title: 'Center', value: 'text-center'},
  {title: 'Right', value: 'text-right'},
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
      title: 'Text Align',
      name: 'textAlign',
      type: 'string',
      options: {
        list: textAlignOptions,
      },
      initialValue: 'text-left',
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
      textAlign: 'textAlign',
    },
    prepare({textContent, textStyle, textAlign}) {
      const bodyTextSizeText =
        textStyleOptions.find((o) => o.value === textStyle)?.title ?? 'Default'
      const textAlignText = textAlignOptions.find((o) => o.value === textAlign)?.title ?? 'Left'
      return {
        title: 'Text: ' + bodyTextSizeText + ' / ' + textAlignText + ' Align',
        subtitle: textContent ? textContent : 'No Text',
        media: CaseSensitive,
      }
    },
  },
})
