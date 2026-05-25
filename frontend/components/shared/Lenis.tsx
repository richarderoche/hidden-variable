'use client'

import { useStore } from '@/lib/store'
import gsap from 'gsap'
import type { LenisRef } from 'lenis/react'
import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'

export function Lenis() {
  const lenisRef = useRef<LenisRef>(null)
  const pauseLenis = useStore((state) => state.pauseLenis)
  const lenis = useLenis()

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)

    return () => gsap.ticker.remove(update)
  }, [])

  useEffect(() => {
    if (pauseLenis) {
      lenis?.stop()
    } else {
      lenis?.start()
    }
  }, [pauseLenis, lenis])

  return (
    <ReactLenis
      ref={lenisRef}
      root={true}
      options={{
        lerp: 0.125,
        autoRaf: false,
        anchors: true,
        prevent: (node: Element | null) =>
          node?.nodeName === 'VERCEL-LIVE-FEEDBACK',
      }}
    />
  )
}
