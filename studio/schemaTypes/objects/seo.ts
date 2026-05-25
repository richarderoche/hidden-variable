import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Open Graph Image',
      type: 'image',
      description:
        'Displayed on social cards and search engine results. Recommended size: 1200x627 (PNG or JPG)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description:
        'Used as the <title> tag for SEO. Leave blank to use the page title.',
    }),
    defineField({
      name: 'description',
      title: 'Used for the <meta> description tag',
      type: 'text',
      rows: 3,
      validation: (Rule) =>
        Rule.max(150).warning(
          'Longer descriptions may be truncated by search engines'
        ),
    }),
    defineField({
      name: 'hideFromSearchEngines',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false,
      description:
        'If true, the page will be public but not indexed by search engines.',
    }),
  ],
})
