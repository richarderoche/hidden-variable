import Link from 'next/link'

import PageWrapper from '@/components/shared/PageWrapper'
import RichTextWrap from '@/components/shared/RichTextWrap'
import SiteWidth from '@/components/shared/SiteWidth'

export default function NotFound() {
  return (
    <PageWrapper>
      <SiteWidth className="mt-gut">
        <RichTextWrap>
          <h1 className="ts-h1">Not Found</h1>
          <p className="text-pretty">
            Sorry, could not find the page at that requested URL.
          </p>
          <Link className="inline-link not-prose" href="/">
            Return Home
          </Link>
        </RichTextWrap>
      </SiteWidth>
    </PageWrapper>
  )
}
