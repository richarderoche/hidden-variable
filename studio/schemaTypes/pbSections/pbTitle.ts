import { IconBoxAlignTop } from '@tabler/icons-react'
import { defineField, defineType } from 'sanity'
import { getRowWidthTitle } from '../../lib/utils'
import { rowWidthField } from '../fields'

export default defineType({
  title: 'Title/Hero Section',
  name: 'pbTitleSection',
  type: 'object',
  icon: IconBoxAlignTop,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettings',
    }),
    defineField({
      title: 'Title Mode',
      name: 'titleMode',
      type: 'string',
      options: {
        list: [
          { title: 'Text Only', value: 'text' },
          { title: 'Hero Image', value: 'hero' },
        ],
      },
      initialValue: 'text',
    }),
    defineField({
      ...rowWidthField,
      hidden: ({ parent }) => parent?.titleMode === 'hero',
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Subtitle',
      name: 'subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'image',
      options: {
        hotspot: {
          previews: [{ title: '5:2', aspectRatio: 2.5 }],
        },
      },
      hidden: ({ parent }) => parent?.titleMode === 'text',
    }),
    defineField({
      title: 'Image Alt Text',
      name: 'heroImageAltText',
      type: 'string',
      hidden: ({ parent }) => parent?.titleMode === 'text',
    }),
  ],
  preview: {
    select: {
      rowWidth: 'rowWidth',
      titleMode: 'titleMode',
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({ rowWidth, titleMode, title, subtitle }) {
      const rowWidthTitle = getRowWidthTitle(rowWidth)
      const mode = titleMode === 'hero' ? 'Hero' : 'Text'
      const name = title || subtitle
      return {
        title: name ? `Title/Hero: ${name}` : 'Title/Hero Section',
        subtitle: `${rowWidthTitle} Width / ${mode} Mode`,
        media: IconBoxAlignTop,
      }
    },
  },
})
