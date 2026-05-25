'use client'

import { useRef } from 'react'

import { useStore } from '@/lib/store'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function PageWrapper({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { enablePageTransition, setEnablePageTransition } = useStore()
  const pageWrapperRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (enablePageTransition && pageWrapperRef.current) {
      gsap.fromTo(
        pageWrapperRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' }
      )
    } else if (!enablePageTransition && pageWrapperRef.current) {
      setEnablePageTransition(true)
    }
  })

  return (
    <div ref={pageWrapperRef} {...props}>
      {children}
    </div>
  )
}
