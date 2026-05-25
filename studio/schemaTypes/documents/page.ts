import { DocumentIcon, StackCompactIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  type: 'document',
  name: 'page',
  title: 'Page',
  icon: DocumentIcon,
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Page Builder',
      name: 'pbSections',
      type: 'pbSections',
      icon: StackCompactIcon,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      seoImage: 'seo.image',
    },
    prepare({ title, slug, seoImage }) {
      return {
        title: title ? title : 'Page',
        subtitle: slug ? `/${slug}` : '(No slug set)',
        media: seoImage || DocumentIcon,
      }
    },
  },
})
