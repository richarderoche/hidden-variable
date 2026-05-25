import { SquarePlay } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pbBlockVideoEmbed',
  title: 'Video Embed',
  type: 'object',
  icon: SquarePlay,
  fields: [
    defineField({
      title: 'URL',
      name: 'videoEmbedUrl',
      description: 'The full URL to a Vimeo or Youtube video',
      type: 'url',
    }),
    defineField({
      title: 'Aspect Ratio',
      name: 'videoAspectRatio',
      type: 'object',
      fields: [
        defineField({
          title: 'Width',
          name: 'width',
          type: 'number',
          initialValue: 16,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          title: 'Height',
          name: 'height',
          type: 'number',
          initialValue: 9,
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      videoEmbedUrl: 'videoEmbedUrl',
    },
    prepare(selection) {
      const { videoEmbedUrl } = selection
      return {
        title: videoEmbedUrl ? videoEmbedUrl : 'No video URL provided',
        media: SquarePlay,
      }
    },
  },
})
