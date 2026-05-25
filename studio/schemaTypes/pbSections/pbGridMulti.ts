import { IconLayoutBoardSplit } from '@tabler/icons-react'
import { defineField, defineType } from 'sanity'
import {
  getGridSettings,
  getRowWidthTitle,
  getTypeTitles,
} from '../../lib/utils'
import { rowWidthField, sectionNameField } from '../fields'
import { columnFields } from './column'

const vList = [
  { title: 'Top', value: 'self-start' },
  { title: 'Middle', value: 'self-center' },
  { title: 'Bottom', value: 'self-end' },
]

export default defineType({
  title: 'Multicolumn Grid',
  name: 'pbGridMulti',
  type: 'object',
  icon: IconLayoutBoardSplit,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettings',
    }),
    defineField(sectionNameField),
    defineField({
      ...rowWidthField,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Columns',
      name: 'columns',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Column Settings',
              name: 'columnSettings',
              type: 'pbColSettings',
              description: 'Relative to the row width in steps of 1/12th',
              options: { collapsible: true, collapsed: false },
            },
            {
              title: 'Vertical Alignment',
              name: 'yAlignment',
              type: 'object',
              options: { columns: 3, collapsible: true, collapsed: true },
              fields: [
                {
                  title: 'Mobile',
                  name: 'mobile',
                  type: 'string',
                  initialValue: 'self-start',
                  validation: (Rule) => Rule.required(),
                  options: {
                    list: vList,
                  },
                },
                {
                  title: 'Tablet',
                  name: 'tablet',
                  type: 'string',
                  initialValue: 'inherit',
                  validation: (Rule) => Rule.required(),
                  options: {
                    list: [
                      { title: 'Inherit Mobile', value: 'inherit' },
                      ...vList,
                    ],
                  },
                },
                {
                  title: 'Desktop',
                  name: 'desktop',
                  type: 'string',
                  initialValue: 'inherit',
                  validation: (Rule) => Rule.required(),
                  options: {
                    list: [
                      { title: 'Inherit Tablet', value: 'inherit' },
                      ...vList,
                    ],
                  },
                },
              ],
            },
            ...columnFields,
          ],
          preview: {
            select: {
              columnSettings: 'columnSettings',
              columnBlocks: 'pbBlocks',
            },
            prepare({ columnSettings, columnBlocks }) {
              const gridSettings = getGridSettings(columnSettings)
              const types = columnBlocks
                ? columnBlocks.map((block: any) => block._type)
                : []
              const blockList = getTypeTitles(types)
              return {
                title: `Column: ${gridSettings}`,
                subtitle: `Blocks: ${blockList || 'None'}`,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      sectionName: 'sectionName',
      rowWidth: 'rowWidth',
    },
    prepare({ sectionName, rowWidth }) {
      const rowWidthTitle = getRowWidthTitle(rowWidth)
      return {
        title: sectionName ? `Multicolumn: ${sectionName}` : 'Multicolumn Grid',
        subtitle: `${rowWidthTitle} Width`,
        media: IconLayoutBoardSplit,
      }
    },
  },
})
