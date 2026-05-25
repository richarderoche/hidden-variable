import Link from 'next/link'

import {cn} from '@/lib/utils'
import {resolveHref} from '@/sanity/lib/utils'
import {NavItem} from '@/types'

interface ButtonProps {
  text?: string
  path?: string
  navItem?: NavItem
  className?: string
  download?: boolean
}

export default function Button(props: ButtonProps) {
  const {text, path, navItem, className, download} = props
  let href: string | undefined = ''
  let buttonText: string | undefined = ''

  if (navItem) {
    const {page, title, url} = navItem
    href = page ? resolveHref(page.type, page.slug) : url
    buttonText = title || page?.title || ''
  } else {
    if (!text || !path) return null
    href = path || ''
    buttonText = text || ''
  }

  const isExternal = href?.startsWith('http')

  return (
    <Link
      href={href || ''}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={cn(
        'border rounded-xs flex w-fit items-center transition-all hover:scale-105',
        className,
      )}
      download={download}
    >
      <span className="leading-none whitespace-nowrap ts-h4 py-[.4em] px-[.8em] center-caps">
        {buttonText}
      </span>
    </Link>
  )
}
