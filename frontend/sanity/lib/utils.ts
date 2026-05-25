import {dataset, projectId} from '@/sanity/lib/api'
import {createImageUrlBuilder} from '@sanity/image-url'
import type {Image} from 'sanity'

//
// Image Helpers

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export function urlForOpenGraphImage(image: Image | null | undefined) {
  if (!image?.asset?._ref) {
    return undefined
  }
  return imageBuilder?.image(image)?.width(1200).height(627).fit('crop').auto('format').url()
}

//
// Route Resolver

export function resolveHref(documentType?: string, slug?: string | null): string | undefined {
  switch (documentType) {
    case 'home':
      return '/'
    case 'page':
      return slug ? `/${slug}` : undefined
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}
