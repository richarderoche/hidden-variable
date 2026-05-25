import { AlignVerticalSpaceAround } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pbBlockDivider',
  title: 'Divider/Spacer',
  type: 'object',
  icon: AlignVerticalSpaceAround,
  fields: [
    defineField({
      title: 'Mobile Visibility',
      name: 'showOnMobile',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      title: 'Tablet Visibility',
      name: 'showOnTablet',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      title: 'Desktop Visibility',
      name: 'showOnDesktop',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      title: 'Show Divider Line?',
      name: 'showDividerLine',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      title: 'Spacing Size',
      name: 'size',
      type: 'number',
      initialValue: 1,
      options: {
        list: [1, 2, 3, 4, 5],
      },
    }),
  ],
  preview: {
    select: {
      showOnMobile: 'showOnMobile',
      showOnTablet: 'showOnTablet',
      showOnDesktop: 'showOnDesktop',
      showDividerLine: 'showDividerLine',
      size: 'size',
    },
    prepare({
      showOnMobile,
      showOnTablet,
      showOnDesktop,
      showDividerLine,
      size,
    }) {
      const shownOn = []
      if (showOnMobile) shownOn.push('Mobile')
      if (showOnTablet) shownOn.push('Tablet')
      if (showOnDesktop) shownOn.push('Desktop')
      const titleLabel = showDividerLine ? 'Divider: ' : 'Spacer: '
      return {
        title: titleLabel + 'Size ' + size,
        subtitle: 'Shown on: ' + shownOn.join(', '),
        media: AlignVerticalSpaceAround,
      }
    },
  },
})
