'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { resolveHref } from '@/sanity/lib/utils'
import type { NavItem } from '@/types'

interface NavLinkProps {
  navItems: NavItem[]
  ulClasses?: string
  liClasses?: string
  liActiveClasses?: string
  linkClasses?: string
  sep?: boolean
  onClick?: () => void
}

export default function NavLinks(props: NavLinkProps) {
  const {
    navItems,
    ulClasses,
    liClasses,
    liActiveClasses,
    linkClasses,
    sep = false,
    onClick,
  } = props

  const pathname = usePathname()

  return (
    <ul className={ulClasses}>
      {navItems &&
        navItems.map((navItem: NavItem, i) => {
          const { page, _key, title, url } = navItem
          const href = page ? resolveHref(page.type, page.slug) : url
          const isActive = pathname === href

          return (
            <li
              key={_key}
              className={cn(liClasses, isActive && liActiveClasses)}
            >
              {i > 0 && sep && <Sep />}
              <Link
                href={href || '/'}
                target={!page ? '_blank' : undefined}
                rel={!page ? 'noopener noreferrer' : undefined}
                onClick={onClick}
                className={linkClasses}
              >
                {title || page?.title}
              </Link>
            </li>
          )
        })}
    </ul>
  )
}

function Sep() {
  return <span className="mx-[.3em]">|</span>
}
