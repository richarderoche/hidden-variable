import {SquareUserRound} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pbPointilismCarousel',
  title: 'Pointilism Carousel',
  type: 'object',
  icon: SquareUserRound,
  fields: [
    defineField({
      name: 'sectionSettings',
      title: 'Section Settings',
      type: 'pbSectionSettings',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'slides',
      title: 'Slides',
      description: 'Minimum 2, Maximum 10',
      type: 'array',
      validation: (Rule) => Rule.min(2).max(10),
      of: [
        defineField({
          title: 'Image',
          name: 'image',
          type: 'image',
          options: {
            hotspot: {
              previews: [{title: '3:4', aspectRatio: 0.75}],
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      tagline: 'tagline',
      slides: 'slides',
    },
    prepare({tagline, slides}) {
      const slideCount = slides ? slides.length : 0
      return {
        title: `Pointilism Carousel: ${tagline || 'No Tagline'}`,
        subtitle: `Count: ${slideCount}`,
      }
    },
  },
})
