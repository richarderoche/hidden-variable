'use client'

import { createDataAttribute } from 'next-sanity'
import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react'

/** Path segment for Sanity visual editing: field name or array item key. */
export type SanityPathSegment = string | { _key: string }

export type SanityDataAttributeFn = (
  path: SanityPathSegment[]
) => string | undefined

interface SanityVisualEditingValue {
  /** Function from createDataAttribute (id + type). */
  dataAttribute: SanityDataAttributeFn | null
  /** Current path from root to this subtree (e.g. ['pbSections', { _key }, 'columns', { _key }]). */
  path: SanityPathSegment[]
  /** Build data-sanity value for current path (optionally with extra segments). */
  getDataAttribute: (extraSegments?: SanityPathSegment[]) => string | undefined
}

const SanityVisualEditingContext =
  createContext<SanityVisualEditingValue | null>(null)

/** Serializable props so the provider can be used from Server Components. */
export interface SanityVisualEditingProviderProps {
  documentId: string | null
  documentType: string | null
  baseUrl: string
  path?: SanityPathSegment[]
  children: ReactNode
}

/** Root provider: build dataAttribute on the client from document id/type/baseUrl. */
export function SanityVisualEditingProvider({
  documentId,
  documentType,
  baseUrl,
  path = [],
  children,
}: SanityVisualEditingProviderProps) {
  const dataAttribute = useMemo(
    () =>
      documentId && documentType
        ? createDataAttribute({ baseUrl, id: documentId, type: documentType })
        : null,
    [documentId, documentType, baseUrl]
  )
  const value = useMemo<SanityVisualEditingValue>(
    () => ({
      dataAttribute,
      path,
      getDataAttribute: (extraSegments = []) =>
        dataAttribute?.([...path, ...extraSegments]),
    }),
    [dataAttribute, path]
  )
  return (
    <SanityVisualEditingContext.Provider value={value}>
      {children}
    </SanityVisualEditingContext.Provider>
  )
}

export interface SanityVisualEditingPathProps {
  /** Full path for this subtree (replaces parent path). */
  path: SanityPathSegment[]
  children: ReactNode
}

/** Nested provider: set path for this subtree so children get correct data-sanity without prop drilling. */
export function SanityVisualEditingPath({
  path,
  children,
}: SanityVisualEditingPathProps) {
  const parent = useContext(SanityVisualEditingContext)
  const dataAttribute = parent?.dataAttribute ?? null
  const value = useMemo<SanityVisualEditingValue>(
    () => ({
      dataAttribute,
      path,
      getDataAttribute: (extraSegments = []) =>
        dataAttribute?.([...path, ...extraSegments]),
    }),
    [dataAttribute, path]
  )
  return (
    <SanityVisualEditingContext.Provider value={value}>
      {children}
    </SanityVisualEditingContext.Provider>
  )
}

export function useSanityVisualEditing(): SanityVisualEditingValue | null {
  return useContext(SanityVisualEditingContext)
}

/** Hook that returns getDataAttribute; throws if used outside provider (for page builder only). */
export function useSanityDataAttribute(): SanityVisualEditingValue {
  const ctx = useContext(SanityVisualEditingContext)
  if (!ctx) {
    throw new Error(
      'useSanityDataAttribute must be used inside SanityVisualEditingProvider'
    )
  }
  return ctx
}
