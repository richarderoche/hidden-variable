import SiteWidth from '@/components/shared/SiteWidth'
import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import LogoLeft from './icons/LogoLeft'
import LogoMotto from './icons/LogoMotto'
import LogoRight from './icons/LogoRight'
import LogoWordmark from './icons/LogoWordmark'

export default async function Footer() {
  const {data} = await sanityFetch({
    query: settingsQuery,
    stega: false,
  })

  const footerMailto = data?.footerMailto
  const {text, email, subject} = footerMailto || {}

  return (
    <footer className="bottom-0 pb-gut-200 mt-gut">
      <SiteWidth>
        <div className="mt-gut-500 mb-gut-600">
          <LogoMotto className="w-full h-auto" />
        </div>
        <div className="flex justify-between items-center gap-gut">
          {email && (
            <div className="grow">
              <a
                className="inline-link"
                href={`mailto:${email}${subject ? `?subject=${subject}` : ''}`}
              >
                {text || email}
              </a>
            </div>
          )}
          <div className="flex items-center h-[1.25em]" aria-label="Hidden Variable" role="img">
            <LogoLeft className="w-auto h-full" aria-hidden="true" />
            <LogoWordmark className="w-auto h-full" aria-hidden="true" />
            <LogoRight className="w-auto h-full" aria-hidden="true" />
          </div>
        </div>
      </SiteWidth>
    </footer>
  )
}
