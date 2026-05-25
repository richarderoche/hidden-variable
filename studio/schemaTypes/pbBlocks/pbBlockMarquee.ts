import { CaseSensitive, ImageIcon } from 'lucide-react'
import { defineField, defineType } from 'sanity'
import { marqueeIcon } from '../../lib/customIcons'
import { capitalize } from '../../lib/utils'
import { crops, hotspotPreviews } from './pbBlockImage'
import { textColorOptions, textStyleOptions } from './pbBlockPlainText'

export default defineType({
  title: 'Scrolling Marquee',
  name: 'pbBlockMarquee',
  type: 'object',
  icon: marqueeIcon,
  fields: [
    defineField({
      title: 'Settings',
      name: 'settings',
      type: 'object',
      fields: [
        defineField({
          title: 'Speed (between 1 and 20)',
          name: 'speed',
          type: 'number',
          initialValue: 2,
          validation: (Rule) => Rule.required().min(1).max(20),
        }),
        defineField({
          title: 'Direction',
          name: 'direction',
          type: 'string',
          initialValue: 'left',
          options: {
            list: [
              { title: 'Left', value: 'left' },
              { title: 'Right', value: 'right' },
            ],
            layout: 'radio',
            direction: 'horizontal',
          },
        }),
        defineField({
          title: 'Color',
          name: 'color',
          type: 'string',
          options: {
            list: textColorOptions,
          },
          initialValue: 'text-body',
        }),
        defineField({
          title: 'Photo/Logo Size (in average px height)',
          description:
            'If elements include a mixture of ratios, the size of each will be adjusted from around this value to feel balanced in visual weight.',
          name: 'imageSize',
          type: 'number',
          initialValue: 50,
          validation: (Rule) => Rule.required().min(10).max(500),
        }),
      ],
      options: {
        collapsible: true,
        collapsed: false,
      },
    }),
    defineField({
      title: 'Elements',
      description:
        'In order to automatically size images/logos proportionally to each other, trim any extra whitespace from their edges before adding them here.',
      name: 'elements',
      type: 'array',
      of: [
        {
          title: 'Text',
          name: 'textElement',
          type: 'object',
          icon: CaseSensitive,
          fields: [
            defineField({
              title: 'Text',
              name: 'text',
              type: 'string',
            }),
            defineField({
              title: 'Style',
              name: 'style',
              type: 'string',
              options: {
                list: textStyleOptions,
              },
              initialValue: 'ts-p-md',
            }),
          ],
          preview: {
            select: {
              text: 'text',
              style: 'style',
            },
            prepare({ text, style }) {
              const textStyleText =
                textStyleOptions.find((o) => o.value === style)?.title ??
                'Normal'
              return {
                title: text ? text : 'Text',
                subtitle: textStyleText,
                media: CaseSensitive,
              }
            },
          },
        },
        {
          title: 'Image',
          name: 'imageElement',
          type: 'object',
          icon: ImageIcon,
          fields: [
            defineField({
              title: 'Image',
              name: 'image',
              type: 'image',
              options: {
                hotspot: {
                  previews: hotspotPreviews,
                },
              },
            }),
            defineField({
              title: 'Alt Text',
              name: 'altText',
              type: 'text',
              placeholder:
                'e.g. A woman and two men standing on a beach during sunset',
              rows: 2,
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
              title: 'Rounded Corners?',
              name: 'roundedCorners',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              title: 'Invert Color?',
              description: 'Usually to make a dark logo light.',
              name: 'invertColor',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              title: 'Blend Mode Lighten?',
              description:
                'Hide black areas of the image and blend with the background color (usually after inverting a logo that didn’t have a transparent background).',
              name: 'blendModeLighten',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              image: 'image',
              altText: 'altText',
            },
            prepare({ image, altText }) {
              return {
                title: 'Image',
                subtitle: altText ? altText : 'No Alt Text',
                media: image ? image : ImageIcon,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      speed: 'settings.speed',
      direction: 'settings.direction',
      color: 'settings.color',
      imageSize: 'settings.imageSize',
      elements: 'elements',
    },
    prepare({
      speed = 2,
      direction = 'left',
      color = 'default',
      imageSize = 50,
      elements,
    }) {
      const elementCount = elements ? elements.length : 0
      const speedText = 'Speed: ' + speed
      const directionText = 'Direction: ' + capitalize(direction)
      const colorText = 'Color: ' + capitalize(color)
      const imageSizeText = 'Size: ' + imageSize
      const settingsArray = [speedText, directionText, colorText, imageSizeText]
      const settingsText = settingsArray.filter((s) => s !== '').join(' / ')
      return {
        title: 'Scrolling Marquee / Items: ' + elementCount,
        subtitle: settingsText,
        media: marqueeIcon,
      }
    },
  },
})
