'use client'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/all'
import {useRef} from 'react'
import IconBracket from '../icons/IconBracket'

gsap.registerPlugin(ScrollTrigger)

export default function StatBracket({stat}: {stat: string}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const container = containerRef.current
      const text = textRef.current
      if (!container || !text) return

      gsap.set(container, {autoAlpha: 0})
      gsap.set(text, {width: 0, opacity: 0, overflow: 'hidden'})

      gsap.set(text, {width: 'auto'})
      const targetWidth = text.offsetWidth
      gsap.set(text, {width: 0, opacity: 0, yPercent: 33, filter: 'blur(10px)'})

      gsap.set(container, {autoAlpha: 1})

      gsap
        .timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            markers: false,
          },
        })
        .to(text, {
          width: targetWidth,
          duration: 1.2,
          ease: 'expo.out',
        })
        .to(
          text,
          {
            opacity: 1,
            yPercent: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'expo.out',
          },
          '< 0.3',
        )
    },
    {scope: containerRef, dependencies: [stat]},
  )

  if (!stat) return null

  return (
    <div ref={containerRef} className="ts-h3 flex w-fit items-center gap-[.5em]">
      <IconBracket className="h-[1.25em] w-auto" aria-hidden="true" />
      <span ref={textRef} className="inline-block whitespace-nowrap center-caps">
        {stat}
      </span>
      <IconBracket className="h-[1.25em] w-auto rotate-180" aria-hidden="true" />
    </div>
  )
}
