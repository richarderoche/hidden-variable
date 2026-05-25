import PageBuilder from '@/components/pb/PageBuilder'
import PageWrapper from '@/components/shared/PageWrapper'
import StyleGuide from '@/components/shared/StyleGuide'
import {getFirstSectionInfo} from '@/lib/utils'
import {sanityFetch} from '@/sanity/lib/live'
import {homePageQuery} from '@/sanity/lib/queries'
import {notFound} from 'next/navigation'

export default async function IndexRoute() {
  const {data} = await sanityFetch({query: homePageQuery})

  if (!data) {
    notFound()
  }

  const {firstIsHero, firstPbSectionKey} = getFirstSectionInfo(data)
  const showStyleGuide = true

  return (
    <PageWrapper className={firstIsHero ? '' : 'pt-header'}>
      {showStyleGuide && <StyleGuide />}
      <PageBuilder data={data} firstPbSectionKey={firstPbSectionKey ?? ''} />
    </PageWrapper>
  )
}
