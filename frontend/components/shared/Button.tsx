import Link from 'next/link'

import { cn } from '@/lib/utils'
import { resolveHref } from '@/sanity/lib/utils'
import { NavItem } from '@/types'

interface ButtonProps {
  text?: string
  path?: string
  navItem?: NavItem
  style?: 'main' | 'alt' | 'secondary'
  className?: string
  download?: boolean
}

export default function Button(props: ButtonProps) {
  const { text, path, navItem, style = 'main', className, download } = props
  let href: string | undefined = ''
  let buttonText: string | undefined = ''

  if (navItem) {
    const { page, title, url } = navItem
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
        'border rounded-full flex w-fit items-center transition-colors',
        style === 'main'
          ? 'border-accent bg-accent hover:border-black hover:bg-black hover:text-accent'
          : style === 'alt'
            ? 'border-black hover:border-accent hover:bg-accent'
            : 'hover:bg-accent',
        className
      )}
      download={download}
    >
      <span className="leading-none whitespace-nowrap ts-h5 py-[.4em] px-[.8em] center-caps">
        {buttonText}
      </span>
    </Link>
  )
}
