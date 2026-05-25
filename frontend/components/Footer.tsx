import NavLinks from '@/components/shared/NavLinks'
import SiteWidth from '@/components/shared/SiteWidth'
import SocialIcon from '@/components/shared/SocialIcon'
import { sanityFetch } from '@/sanity/lib/live'
import { settingsQuery } from '@/sanity/lib/queries'
import CurrentYear from './shared/CurrentYear'

export default async function Footer() {
  const { data } = await sanityFetch({
    query: settingsQuery,
    stega: false,
  })
  const footerNav = data?.footerNav || []
  const socialIcons = data?.socialIcons || []

  return (
    <footer className="bottom-0 bg-accent py-gut mt-gut">
      <SiteWidth className="flex flex-col lg:flex-row lg:justify-between items-center gap-gut">
        {footerNav && footerNav?.length > 0 && (
          <nav role="navigation">
            <NavLinks navItems={footerNav} ulClasses="flex flex-wrap gap-em" />
          </nav>
        )}

        {socialIcons && (
          <div className="flex gap-gut-50">
            {socialIcons.map((link, key) => {
              return (
                <a
                  key={key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-24 hover:text-white"
                  aria-label={link.icon}
                >
                  <SocialIcon name={link.icon} />
                </a>
              )
            })}
          </div>
        )}

        <div>
          &copy; <CurrentYear />. All Rights Reserved.
        </div>
      </SiteWidth>
    </footer>
  )
}
