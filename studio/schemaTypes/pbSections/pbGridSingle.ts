import { IconLayoutRows } from '@tabler/icons-react'
import { defineField, defineType } from 'sanity'
import { getRowWidthTitle, getTypeTitles } from '../../lib/utils'
import { rowWidthField, sectionNameField } from '../fields'
import { columnFields } from './column'

export default defineType({
  title: 'Grid: Single Column',
  name: 'pbGridSingle',
  type: 'object',
  icon: IconLayoutRows,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettings',
    }),
    defineField(sectionNameField),
    defineField(rowWidthField),
    ...columnFields,
  ],
  preview: {
    select: {
      sectionName: 'sectionName',
      rowWidth: 'rowWidth',
      blocks: 'pbBlocks',
    },
    prepare({ sectionName, rowWidth, blocks }) {
      const rowWidthTitle = getRowWidthTitle(rowWidth)
      const blockList = blocks ? blocks.map((block: any) => block._type) : []
      const blockTitles = getTypeTitles(blockList)
      return {
        title: sectionName
          ? `Single Column: ${sectionName}`
          : 'Single Column Section',
        subtitle: `${rowWidthTitle} Width / Blocks: ${blockTitles || 'None'}`,
        media: IconLayoutRows,
      }
    },
  },
})
