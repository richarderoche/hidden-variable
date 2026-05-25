import PageBuilder from '@/components/pb/PageBuilder'
import PageWrapper from '@/components/shared/PageWrapper'
import { getFirstSectionInfo } from '@/lib/utils'
import { sanityFetch } from '@/sanity/lib/live'
import { pagesBySlugQuery, slugsByTypeQuery } from '@/sanity/lib/queries'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import type { Metadata, ResolvingMetadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Image } from 'sanity'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { data: page } = await sanityFetch({
    query: pagesBySlugQuery,
    params,
    stega: false,
  })

  const ogImage = urlForOpenGraphImage(page?.ogImage as Image)
  const noIndex = page?.noIndex ?? false

  return {
    title: page?.seoTitle ?? page?.title,
    description: page?.description ?? (await parent).description,
    openGraph: {
      images: ogImage
        ? [ogImage]
        : [...((await parent).openGraph?.images ?? [])],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        noimageindex: noIndex,
      },
    },
  }
}

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: slugsByTypeQuery,
    params: { type: 'page' },
    stega: false,
    perspective: 'published',
  })
  return data
}

export default async function PageSlugRoute({ params }: Props) {
  const { data } = await sanityFetch({ query: pagesBySlugQuery, params })

  // Only show the 404 page if we're in production, when in draft mode we might be about to create a page on this slug, and live reload won't work on the 404 route
  if (!data?._id && !(await draftMode()).isEnabled) {
    notFound()
  }

  const { firstIsHero, firstPbSectionKey } = getFirstSectionInfo(data)

  return (
    <PageWrapper className={firstIsHero ? '' : 'pt-header'}>
      <PageBuilder data={data} firstPbSectionKey={firstPbSectionKey ?? ''} />
    </PageWrapper>
  )
}
