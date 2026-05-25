import { RedoIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'redirect',
  title: 'Redirects',
  type: 'document',
  icon: RedoIcon,
  fields: [
    defineField({
      name: 'deployNote',
      title: 'Important!',
      description:
        'Unlike simple content changes that are live when published, this redirect will not be live until published AND redeployed to Vercel. (See "Deploy" in the header menu)',
      type: 'note',
      options: {
        tone: 'caution',
      },
    }),
    defineField({
      name: 'fromPath',
      title: 'From ',
      type: 'string',
      description:
        'Old slug being redirected FROM. Use preceding slash (e.g. "/help")',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (value && !value.startsWith('/')) {
            return 'Path must start with / (e.g. "/help")'
          }
          return true
        }),
    }),
    defineField({
      name: 'toPath',
      title: 'To',
      type: 'string',
      description:
        'New slug being redirected TO. Use preceding slash (e.g. "/support")',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (value && !value.startsWith('/')) {
            return 'Path must start with / (e.g. "/help")'
          }
          return true
        }),
    }),
    defineField({
      name: 'permanent',
      title: 'Permanent (Use with caution)',
      type: 'boolean',
      description:
        'If checked, will use the 308 status code which instructs clients/search engines to cache the redirect forever, if false will use the 307 status code which is temporary and is not cached.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      to: 'toPath',
      from: 'fromPath',
    },
    prepare({ to, from }) {
      return {
        title: from,
        subtitle: `↳ ${to}`,
      }
    },
  },
})
