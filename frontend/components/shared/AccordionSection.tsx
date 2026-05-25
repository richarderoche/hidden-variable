'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'

import { cn } from '@/lib/utils'

import { AddIcon } from '@sanity/icons'

gsap.registerPlugin(useGSAP)

export interface AccordionSectionProps {
  children: React.ReactNode
  accordionTitle?: string
  innerId: string
  size?: 'small' | 'big'
}

export function AccordionSection({
  children,
  accordionTitle = 'Show/Hide',
  innerId,
  size = 'small',
}: AccordionSectionProps) {
  const [expanded, setExpanded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const headerId = `h-${innerId}`
  useGSAP(
    () => {
      gsap.to(ref.current, {
        height: expanded ? 'auto' : 0,
        duration: expanded ? 0.6 : 0.3,
        ease: 'expo.out',
      })
    },
    { dependencies: [expanded] }
  )
  return (
    <>
      <h3 className={size === 'big' ? 'border-t-2 ts-h2' : 'border-t ts-h3'}>
        <button
          className={cn(
            'flex items-center justify-between gap-x-8 py-8 w-full'
          )}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls={innerId}
          id={headerId}
        >
          <span>{accordionTitle}</span>
          <AddIcon
            className={cn(
              'size-[.666667em] transition-transform',
              expanded && 'rotate-45'
            )}
            aria-hidden={true}
          />
          <span className="sr-only">{expanded ? 'Collapse' : 'Expand'}</span>
        </button>
      </h3>

      <div
        ref={ref}
        className="overflow-hidden h-0"
        id={innerId}
        role="region"
        aria-labelledby={headerId}
      >
        <div className={size === 'big' ? 'py-gut' : 'py-gut-50'}>
          {children}
        </div>
      </div>
    </>
  )
}
