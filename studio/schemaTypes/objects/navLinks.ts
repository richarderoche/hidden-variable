import { StackCompactIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  title: 'Nav Links',
  name: 'navLinks',
  type: 'object',
  icon: StackCompactIcon,
  fields: [
    defineField({
      title: 'Nav Items',
      name: 'navItems',
      type: 'array',
      of: [{ type: 'navExternal' }],
    }),
  ],
})
