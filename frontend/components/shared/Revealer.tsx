'use client'

import {usePrefersReducedMotion} from '@/lib/hooks'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/all'
import {useRef} from 'react'

gsap.registerPlugin(ScrollTrigger)

interface RevealerProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'fade-up' | 'fade-right' | 'fade-only' | 'none' | 'stagger'
}

const TRIGGER_START = 'top 95%'
const DURATION = 1.3
const EASE = 'power2.out'
const DELAY = 0.2

export default function Revealer({children, direction = 'fade-up', ...props}: RevealerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const motionReady = reducedMotion !== undefined
  const distance = reducedMotion || direction === 'fade-only' ? 0 : 30

  useGSAP(
    () => {
      if (direction === 'none') return

      const el = ref.current
      if (!el) return

      const fromMove = direction === 'fade-right' ? {x: -distance} : {y: distance}
      const toMove = direction === 'fade-right' ? {x: 0} : {y: 0}

      if (direction === 'stagger') {
        gsap.fromTo(
          '.column-blocks > *',
          {y: distance, filter: 'blur(10px)', opacity: 0},
          {
            y: 0,
            filter: 'blur(0px)',
            opacity: 1,
            duration: DURATION,
            ease: 'expo.out',
            stagger: 0.15,
            delay: DELAY,
            scrollTrigger: {trigger: el, start: TRIGGER_START, markers: false},
          },
        )
      } else {
        gsap.fromTo(
          el,
          {filter: 'blur(10px)', opacity: 0, ...fromMove},
          {
            filter: 'blur(0px)',
            opacity: 1,
            ...toMove,
            duration: DURATION,
            ease: EASE,
            delay: DELAY,
            scrollTrigger: {
              trigger: el,
              start: TRIGGER_START,
              markers: false,
            },
          },
        )
      }
    },
    {scope: ref, dependencies: [direction, distance, motionReady]},
  )

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  )
}
