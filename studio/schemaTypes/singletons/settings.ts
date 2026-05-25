import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      name: 'footer',
      title: 'Footer',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'scripts',
      title: 'Scripts',
    },
  ],
  fields: [
    defineField({
      name: 'footerMailto',
      title: 'Footer Contact Link',
      type: 'object',
      group: 'footer',
      fields: [
        defineField({
          name: 'text',
          title: 'Text',
          type: 'string',
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
        }),        
        defineField({
          name: 'subject',
          title: 'Subject',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Global SEO',
      description: 'Fallback SEO content for any page left blank',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'googletagmanagerID',
      title: 'Google Tag Manager ID',
      type: 'string',
      description:
        'If you need a cookie consent banner, use the custom scripts field below instead of this.',
      group: 'scripts',
    }),
    defineField({
      name: 'customScripts',
      title: 'Custom Scripts',
      type: 'array',
      of: [
        {
          name: 'customScript',
          title: 'Custom Script',
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name (for your reference)',
              type: 'string',
            },
            {
              name: 'script',
              title: 'Script',
              type: 'text',
            },
            {
              name: 'category',
              title: 'Category',
              type: 'string',
              description:
                'Necessary: scripts that are required for the site to function. (e.g. Support chat, etc.) Analytics: scripts that are used to track site usage. (Triggers cookie consent banner) Marketing: scripts that are used to track marketing efforts. (Triggers cookie consent banner)',
              options: {
                list: ['necessary', 'analytics', 'marketing'],
              },
              initialValue: 'necessary',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              name: 'name',
              category: 'category',
            },
            prepare({ name = 'Custom Script', category }) {
              return {
                title: name,
                subtitle: category,
              }
            },
          },
        },
      ],
      group: 'scripts',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      }
    },
  },
})
