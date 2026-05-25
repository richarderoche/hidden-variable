import bundleAnalyzer from '@next/bundle-analyzer'
import type { NextConfig } from 'next'
import { groq } from 'next-sanity'
import { client } from './sanity/lib/client'

const redirectsQuery = groq`*[
	_type == "redirect" &&
	!(_id in path("drafts.**"))
] {
	'source': fromPath,
	'destination': toPath,
	permanent,
}`

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'],
          }
        : false,
    reactRemoveProperties: true,
  },
  typescript: {
    ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
  },
  logging: {
    browserToTerminal: true,
    fetches: {
      fullUrl: false,
      hmrRefreshes: false,
    },
  },
  devIndicators: false,
  compress: true,
  experimental: {
    taint: true,
    optimizePackageImports: [
      'gsap',
      'lenis',
      'zustand',
      '@sanity/client',
      '@sanity/image-url',
      '@sanity/asset-utils',
    ],
  },
  redirects: async () => {
    const allRedirects = await client.fetch(redirectsQuery)

    const sanitizedRedirects = allRedirects.map((r) => ({
      ...r,
      permanent: Boolean(r.permanent),
    }))

    return sanitizedRedirects
  },
}

const bundleAnalyzerPlugin = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const NextApp = () => {
  const plugins = [bundleAnalyzerPlugin]
  return plugins.reduce((config, plugin) => plugin(config), nextConfig)
}

export default NextApp
