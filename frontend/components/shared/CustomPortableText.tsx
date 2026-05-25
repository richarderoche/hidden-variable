import { getFileAsset } from '@sanity/asset-utils'
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from 'next-sanity'
import Link from 'next/link'

import { dataset, projectId } from '@/sanity/lib/api'
import { resolveHref } from '@/sanity/lib/utils'

export function CustomPortableText({ value }: { value: PortableTextBlock[] }) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <p>{children}</p>
      },
      h1: ({ children }) => {
        return <h2 className="ts-h1 text-balance">{children}</h2>
      },
      h2: ({ children }) => {
        return <h3 className="ts-h2 text-pretty">{children}</h3>
      },
      h3: ({ children }) => {
        return <h4 className="ts-h3 text-pretty">{children}</h4>
      },
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a
            className="inline-link not-prose"
            href={value?.href}
            rel="noreferrer noopener"
            target="_blank"
          >
            {children}
          </a>
        )
      },
      internalLink: ({ children, value }) => {
        const { slug = {}, type = 'page' } = value
        const href = resolveHref(type, slug.current)

        return (
          <Link className="inline-link not-prose" href={href || '/'}>
            {children}
          </Link>
        )
      },
      fileLink: ({ children, value }) => {
        const url = getFileAsset(value.file.asset, {
          projectId: projectId,
          dataset: dataset,
        }).url
        return (
          <a
            className="inline-link not-prose"
            href={`${url}?dl=`}
            rel="noreferrer noopener"
            target="_blank"
          >
            {children}
          </a>
        )
      },
    },
    listItem: ({ children }) => {
      return <li>{children}</li>
    },
  }

  return <PortableText components={components} value={value} />
}
