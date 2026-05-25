import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandSoundcloud,
  IconBrandSpotify,
  IconBrandThreads,
  IconBrandTiktok,
  IconBrandX,
  IconBrandYoutube,
} from '@tabler/icons-react'
import { defineField, defineType } from 'sanity'

const getIcon = (icon: string) => {
  switch (icon) {
    case 'Facebook':
      return IconBrandFacebook
    case 'Instagram':
      return IconBrandInstagram
    case 'Soundcloud':
      return IconBrandSoundcloud
    case 'Spotify':
      return IconBrandSpotify
    case 'Twitter':
      return IconBrandX
    case 'Threads':
      return IconBrandThreads
    case 'YouTube':
      return IconBrandYoutube
    case 'Github':
      return IconBrandGithub
    case 'Tiktok':
      return IconBrandTiktok
    default:
      return false
  }
}

export default defineType({
  title: 'Social Link',
  name: 'socialLink',
  type: 'object',
  options: {
    columns: 2,
    collapsible: false,
  },
  fields: [
    defineField({
      title: 'Icon',
      name: 'icon',
      type: 'string',
      options: {
        list: [
          { title: 'Facebook', value: 'Facebook' },
          { title: 'Instagram', value: 'Instagram' },
          { title: 'Soundcloud', value: 'Soundcloud' },
          { title: 'Spotify', value: 'Spotify' },
          { title: 'X/Twitter', value: 'Twitter' },
          { title: 'Threads', value: 'Threads' },
          { title: 'YouTube', value: 'YouTube' },
          { title: 'Tiktok', value: 'Tiktok' },
          { title: 'Github', value: 'Github' },
        ],
      },
    }),
    defineField({
      title: 'URL',
      name: 'url',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      icon: 'icon',
      url: 'url',
    },
    prepare({ icon, url }) {
      return {
        title: icon,
        subtitle: url ? url : '(url not set)',
        media: getIcon(icon),
      }
    },
  },
})
