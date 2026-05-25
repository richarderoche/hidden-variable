import { PbSections } from '@/sanity.types'
import { studioUrl } from '@/sanity/lib/api'
import { PageBuilderData } from '@/types'
import PageBuilderSections from './PageBuilderSections'
import { SanityVisualEditingProvider } from './SanityVisualEditingContext'

export interface PageBuilderProps {
  data: PageBuilderData
  firstPbSectionKey: string
}

export default function PageBuilder({
  data,
  firstPbSectionKey,
}: PageBuilderProps) {
  const { pbSections } = data ?? {}
  const documentId = data?._id ?? null
  const documentType = data?._type ?? null
  if (!pbSections || pbSections.length === 0) return null
  return (
    <SanityVisualEditingProvider
      documentId={documentId}
      documentType={documentType}
      baseUrl={studioUrl}
    >
      <PageBuilderSections
        pbSections={pbSections as PbSections}
        firstPbSectionKey={firstPbSectionKey}
      />
    </SanityVisualEditingProvider>
  )
}
