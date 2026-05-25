import SiteWidth from '@/components/shared/SiteWidth'
import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import LogoLeft from './icons/LogoLeft'
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
    <footer className="bottom-0 py-gut mt-gut">
      <SiteWidth className="flex justify-between items-center gap-gut">
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
      </SiteWidth>
    </footer>
  )
}
