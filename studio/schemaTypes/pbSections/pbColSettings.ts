import { defineField, defineType } from 'sanity'

const cols = [
  { title: '1', value: 1 },
  { title: '2', value: 2 },
  { title: '3', value: 3 },
  { title: '4', value: 4 },
  { title: '5', value: 5 },
  { title: '6', value: 6 },
  { title: '7', value: 7 },
  { title: '8', value: 8 },
  { title: '9', value: 9 },
  { title: '10', value: 10 },
  { title: '11', value: 11 },
  { title: '12', value: 12 },
]

export default defineType({
  title: 'Column Settings',
  name: 'pbColSettings',
  type: 'object',
  fields: [
    defineField({
      title: 'Size',
      name: 'size',
      type: 'object',
      options: { columns: 3, collapsible: false },
      fields: [
        defineField({
          title: 'Mobile',
          name: 'mobile',
          type: 'number',
          initialValue: 12,
          validation: (Rule) => Rule.required(),
          options: {
            list: cols,
          },
        }),
        defineField({
          title: 'Tablet',
          name: 'tablet',
          type: 'number',
          initialValue: 0,
          validation: (Rule) => Rule.required(),
          options: {
            list: [{ title: 'Inherit Mobile', value: 0 }, ...cols],
          },
        }),
        defineField({
          title: 'Desktop',
          name: 'desktop',
          type: 'number',
          initialValue: 0,
          validation: (Rule) => Rule.required(),
          options: {
            list: [{ title: 'Inherit Tablet', value: 0 }, ...cols],
          },
        }),
      ],
    }),
    defineField({
      title: 'Start',
      name: 'start',
      type: 'object',
      options: { columns: 3, collapsible: false },
      fields: [
        defineField({
          title: 'Mobile',
          name: 'mobile',
          type: 'number',
          initialValue: 0,
          validation: (Rule) => Rule.required(),
          options: {
            list: [{ title: 'Auto', value: 0 }, ...cols],
          },
        }),
        defineField({
          title: 'Tablet',
          name: 'tablet',
          type: 'number',
          initialValue: 0,
          validation: (Rule) => Rule.required(),
          options: {
            list: [{ title: 'Auto', value: 0 }, ...cols],
          },
        }),
        defineField({
          title: 'Desktop',
          name: 'desktop',
          type: 'number',
          initialValue: 0,
          validation: (Rule) => Rule.required(),
          options: {
            list: [{ title: 'Auto', value: 0 }, ...cols],
          },
        }),
      ],
    }),
    defineField({
      title: 'Accordion Mode',
      name: 'accordionMode',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      title: 'Accordion Title',
      name: 'accordionTitle',
      type: 'string',
      hidden: ({ parent }) => !parent?.accordionMode,
    }),
  ],
})
