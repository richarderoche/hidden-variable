import '@/app/globals.css'
import Footer from '@/components/Footer'
import GlobalScripts from '@/components/shared/GlobalScripts'
import {GSAP} from '@/components/shared/GSAP'
import {Lenis} from '@/components/shared/Lenis'
import {sanityFetch, SanityLive} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import {urlForOpenGraphImage} from '@/sanity/lib/utils'
import {Metadata, Viewport} from 'next'
import {VisualEditing} from 'next-sanity/visual-editing'
import localFont from 'next/font/local'
import {draftMode} from 'next/headers'
import type {Image} from 'sanity'
import {Toaster} from 'sonner'
import {handleError} from './client-functions'
import {DraftModeToast} from './DraftModeToast'

export async function generateMetadata(): Promise<Metadata> {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
    stega: false,
  })

  const ogImage = urlForOpenGraphImage(settings?.ogImage as Image)
  const noIndex = settings?.noIndex ?? false
  return {
    title: settings?.title
      ? {
          template: `%s | ${settings.title}`,
          default: settings.title || 'Personal website',
        }
      : undefined,
    description: settings?.description ? settings.description : undefined,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
    formatDetection: {
      telephone: false,
      address: false,
      email: false,
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        noimageindex: noIndex,
      },
    },
    authors: [
      {
        name: 'Infinite Productivity',
        url: 'https://infinite-productivity.com',
      },
    ],
  }
}

export const viewport: Viewport = {
  themeColor: '#000',
}

const sansFont = localFont({
  src: [
    {
      path: '../public/fonts/PPMori-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/PPMori-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/PPMori-Bold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  display: 'swap', // or replace with preload: true
  variable: '--mori',
})

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const {isEnabled: isDraftMode} = await draftMode()

  return (
    <html lang="en" className={`${sansFont.variable} light-theme`} data-scroll-behavior="smooth">
      <body>
        <Lenis />
        <GSAP />
        <div className="flex min-h-screen flex-col justify-start ts-p-md">
          <main className="grow" id="main-content">
            {children}
          </main>
          <Footer />
        </div>

        <Toaster />
        <SanityLive onError={handleError} />
        {isDraftMode && (
          <>
            <DraftModeToast />
            <VisualEditing />
          </>
        )}
        <GlobalScripts />
      </body>
    </html>
  )
}
