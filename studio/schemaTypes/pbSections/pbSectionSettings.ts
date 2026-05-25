import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  title: 'Section Settings',
  name: 'pbSectionSettings',
  description: '(Show/Hide, Anchor ID, & Margins)',
  type: 'object',
  icon: CogIcon,
  fieldsets: [
    { title: 'Extra Margin', name: 'margin', options: { columns: 2 } },
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      title: 'Enable Section',
      name: 'enableSection',
      type: 'boolean',
      description: 'Disable to hide this section without deleting it',
      initialValue: true,
    }),
    defineField({
      title: 'ID (for anchor links)',
      name: 'sectionId',
      type: 'string',
      validation: (Rule) => Rule.regex(/^\S*$/).warning('No spaces allowed'),
    }),
    defineField({
      title: 'Top',
      name: 'marginTop',
      type: 'number',
      fieldset: 'margin',
      options: {
        list: [1, 2, 3, 4, 5],
      },
    }),
    defineField({
      title: 'Bottom',
      name: 'marginBottom',
      type: 'number',
      fieldset: 'margin',
      options: {
        list: [1, 2, 3, 4, 5],
      },
    }),
  ],
})
