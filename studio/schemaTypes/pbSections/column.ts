import { defineField, defineType } from 'sanity'
import { revealEffectField, spaceBetweenBlocksField } from '../fields'

export const columnFields = [
  defineField({
    title: 'Card Mode',
    name: 'cardMode',
    type: 'boolean',
    initialValue: false,
  }),
  defineField(revealEffectField),
  defineField({
    title: 'Blocks',
    name: 'pbBlocks',
    type: 'pbBlocks',
  }),
  defineField(spaceBetweenBlocksField),
  defineField({
    title: 'Block Widths (Change sparingly)',
    description:
      'This affects every block equally. Blocks will appear side by side when able and will wrap to new lines otherwise.',
    name: 'blockWidths',
    type: 'object',
    options: { columns: 3, collapsible: true, collapsed: true },
    fields: [
      defineField({
        title: 'Mobile',
        name: 'mobile',
        type: 'string',
        initialValue: 'grid-cols-1',
        options: {
          list: [
            { title: 'Full', value: 'grid-cols-1' },
            { title: 'Half', value: 'grid-cols-2' },
            { title: 'Third', value: 'grid-cols-3' },
            { title: 'Quarter', value: 'grid-cols-4' },
          ],
        },
      }),
      defineField({
        title: 'Tablet',
        name: 'tablet',
        type: 'string',
        initialValue: 'md:grid-cols-1',
        options: {
          list: [
            { title: 'Full', value: 'md:grid-cols-1' },
            { title: 'Half', value: 'md:grid-cols-2' },
            { title: 'Third', value: 'md:grid-cols-3' },
            { title: 'Quarter', value: 'md:grid-cols-4' },
          ],
        },
      }),
      defineField({
        title: 'Desktop',
        name: 'desktop',
        type: 'string',
        initialValue: 'lg:grid-cols-1',
        options: {
          list: [
            { title: 'Full', value: 'lg:grid-cols-1' },
            { title: 'Half', value: 'lg:grid-cols-2' },
            { title: 'Third', value: 'lg:grid-cols-3' },
            { title: 'Quarter', value: 'lg:grid-cols-4' },
          ],
        },
      }),
    ],
  }),
]

export default defineType({
  title: 'Column',
  name: 'column',
  type: 'object',
  fields: columnFields,
})
