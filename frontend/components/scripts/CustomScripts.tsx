'use client'
import 'vanilla-cookieconsent/dist/cookieconsent.css'
import './cc-ui.css'

import type { ScriptsQueryResult } from '@/sanity.types'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import * as CookieConsent from 'vanilla-cookieconsent'

export default function CustomScripts({
  customScripts,
  enableProdScripts,
}: {
  customScripts: NonNullable<ScriptsQueryResult>['customScripts']
  enableProdScripts: boolean
}) {
  const pathname = usePathname()
  const isStudioRoute = pathname.startsWith('/studio')
  useEffect(() => {
    if (isStudioRoute) return
    CookieConsent.run({
      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {},
        marketing: {},
      },
      language: {
        default: 'en',
        translations: {
          en: modalTranslations,
        },
      },
    })
  }, [isStudioRoute])
  if (isStudioRoute) return null
  return (
    <>
      {customScripts?.map((customScript) => {
        const { _key, script, category } = customScript
        if (!script || !category) return null
        if (category === 'necessary') {
          return (
            <div
              className="hidden"
              key={_key}
              dangerouslySetInnerHTML={{ __html: script }}
            />
          )
        }
        if (enableProdScripts) {
          return <TrackScript key={_key} script={script} category={category} />
        }
        return null
      })}
    </>
  )
}

function TrackScript({
  script,
  category,
}: {
  script: string
  category: string
}) {
  // Preserve existing attributes while adding our new ones
  const formattedScript = script.replace(
    /<script([^>]*?)>/i,
    `<script$1 type="text/plain" data-category="${category}">`
  )
  return (
    <div
      className="hidden"
      dangerouslySetInnerHTML={{ __html: formattedScript }}
    />
  )
}

const modalTranslations = {
  consentModal: {
    title: 'Cookie consent',
    acceptAllBtn: 'Accept all',
    acceptNecessaryBtn: 'Reject all',
    showPreferencesBtn: 'Manage Individual preferences',
  },
  preferencesModal: {
    title: 'Manage cookie preferences',
    acceptAllBtn: 'Accept all',
    acceptNecessaryBtn: 'Reject all',
    savePreferencesBtn: 'Accept current selection',
    closeIconLabel: 'Close modal',
    sections: [
      {
        title: 'Strictly Necessary cookies',
        description:
          'These cookies are essential for the proper functioning of the website and cannot be disabled.',

        linkedCategory: 'necessary',
      },
      {
        title: 'Analytics',
        description:
          'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
        linkedCategory: 'analytics',
      },
      {
        title: 'Marketing',
        description:
          'These cookies are used to track your visit to our site and to provide you with personalized content.',
        linkedCategory: 'marketing',
      },
    ],
  },
}
