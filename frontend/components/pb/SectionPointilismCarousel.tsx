'use client'
import {PbPointilismCarousel} from '@/sanity.types'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/all'
import {useRef} from 'react'
import LogoLeft from '../icons/LogoLeft'
import LogoRight from '../icons/LogoRight'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'
import PointilismCarousel from './PointilismCarousel'

gsap.registerPlugin(ScrollTrigger)

export default function SectionPointilismCarousel({section}: {section: PbPointilismCarousel}) {
  const {tagline, slides} = section
  const hasSlides = slides && slides.length > 1

  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const rightRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const container = containerRef.current
      const text = textRef.current
      const right = rightRef.current
      if (!container || !text || !right) return

      gsap.set(right, {x: 0})
      gsap.set(text, {opacity: 0, yPercent: 33, filter: 'blur(10px)'})

      const travel = text.offsetWidth

      gsap.set(container, {autoAlpha: 1})

      gsap
        .timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            markers: false,
          },
        })
        .to(right, {
          x: travel,
          duration: 1,
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
    {scope: containerRef, dependencies: [tagline]},
  )

  if (!hasSlides) {
    return null
  }

  return (
    <SiteWidth>
      <SiteGrid>
        <div className="col-span-10 col-start-2 lg:col-span-6 lg:col-start-4 relative">
          <PointilismCarousel slides={slides} />
          {tagline && (
            <div
              ref={containerRef}
              className="invisible flex w-fit items-center bg-bg p-5 absolute bottom-0 right-0 -translate-y-full md:-translate-y-2/1 translate-x-gut-200 lg:translate-x-3/5"
            >
              <LogoLeft className="w-auto h-[1.933333em] shrink-0" aria-hidden="true" />
              <div className="relative flex items-center">
                <p
                  ref={textRef}
                  className="ts-tagline whitespace-nowrap px-gut-50 lg:px-gut-150 opacity-0"
                >
                  {tagline}
                </p>
                <LogoRight
                  className="invisible w-auto h-[1.933333em] shrink-0"
                  aria-hidden="true"
                />
                <span
                  ref={rightRef}
                  className="absolute top-1/2 left-0 -translate-y-1/2"
                  aria-hidden="true"
                >
                  <LogoRight className="h-[1.933333em] w-auto" />
                </span>
              </div>
            </div>
          )}
        </div>
      </SiteGrid>
    </SiteWidth>
  )
}
