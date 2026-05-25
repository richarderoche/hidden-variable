import ConsoleLog from '@/components/scripts/ConsoleLog'
import CustomScripts from '@/components/scripts/CustomScripts'
import { sanityFetch } from '@/sanity/lib/live'
import { settingsQuery } from '@/sanity/lib/queries'
import { GoogleTagManager } from '@next/third-parties/google'

export default async function GlobalScripts() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    stega: false,
  })
  const { googletagmanagerID, customScripts } = settings || {}
  const enableProdScripts =
    process.env.NEXT_PUBLIC_PRODUCTION_SCRIPTS === 'true'

  return (
    <>
      {enableProdScripts && googletagmanagerID && (
        <GoogleTagManager gtmId={googletagmanagerID} />
      )}
      {customScripts && (
        <CustomScripts
          customScripts={customScripts}
          enableProdScripts={enableProdScripts}
        />
      )}
      {enableProdScripts && <ConsoleLog />}
    </>
  )
}
