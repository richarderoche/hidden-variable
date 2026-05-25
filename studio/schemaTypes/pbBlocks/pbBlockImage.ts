import { Image as ImageIcon } from 'lucide-react'
import { defineField, defineType } from 'sanity'
import { imgAltField } from '../fields'

export const crops = [
  { title: 'Original', value: 0 },
  { title: '1:1 (square)', value: 1 },
  { title: '4:6', value: 0.6666666667 },
  { title: '6:4', value: 1.5 },
  { title: '16:9', value: 1.7777777778 },
  { title: '5:2', value: 2.5 },
]

export const hotspotPreviews = [
  { title: '1:1', aspectRatio: 1 },
  { title: '4:6', aspectRatio: 0.6666666667 },
  { title: '6:4', aspectRatio: 1.5 },
  { title: '16:9', aspectRatio: 1.7777777778 },
  { title: '5:2', aspectRatio: 2.5 },
]

export default defineType({
  name: 'pbBlockImage',
  title: 'Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: {
          previews: hotspotPreviews,
        },
      },
    }),
    defineField({
      name: 'imageCrop',
      title: 'Aspect Ratio',
      type: 'number',
      options: {
        list: crops,
      },
      initialValue: 0,
    }),
    defineField({
      name: 'imageWidth',
      title: 'Image Width (in % of column)',
      description:
        'Change sparingly - this can make responsive layouts harder to manage.',
      type: 'number',
      initialValue: 100,
      validation: (Rule) => Rule.max(100),
    }),
    defineField(imgAltField),
    defineField({
      name: 'caption',
      title: 'Caption (optional supporting text for all users)',
      placeholder: 'e.g. From left to right: Jane Doe, John Doe, Jim Doe',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'priority',
      title: 'High Priority Loading',
      type: 'boolean',
      description:
        'Enable for images above the fold to improve loading performance',
      initialValue: false,
    }),
    defineField({
      name: 'disableCorners',
      title: 'Disable Rounded Corners?',
      description:
        'Disable if corner rounding causes issues (e.g. logos, icons, infographics).',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      image: 'image.asset',
      alt: 'alt',
      imageCrop: 'imageCrop',
      priority: 'priority',
      disableCorners: 'disableCorners',
    },
    prepare({ image, alt, imageCrop, priority, disableCorners }) {
      const maxLen = 40
      const truncate = (str: string) =>
        str.length > maxLen ? str.slice(0, maxLen - 1) + '…' : str
      const altText = alt ? `: ${truncate(alt)}` : '(no alt text)'
      const priorityText = priority ? 'Priority' : 'Lazy'
      const imageCropText = imageCrop
        ? `: ${crops.find((crop) => crop.value === imageCrop)?.title}`
        : 'Original'
      const disableCornersText = disableCorners
        ? '/ Corners: Normal'
        : '/ Corners: Rounded'
      return {
        title: 'Image: ' + altText,
        subtitle:
          'Crop: ' +
          imageCropText +
          ' / Priority: ' +
          priorityText +
          ' / Tone: ' +
          disableCornersText,
        media: image ? image : ImageIcon,
      }
    },
  },
})
