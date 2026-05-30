import '@/app/css/flipcards.css'
import {useCanHover, usePrefersReducedMotion} from '@/lib/hooks'
import {cn} from '@/lib/utils'
import {PbBeliefs} from '@/sanity.types'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/all'
import {useRef} from 'react'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'
gsap.registerPlugin(ScrollTrigger)

export default function SectionBeliefs({section}: {section: PbBeliefs}) {
  const {title, beliefCards} = section
  const hasCards = beliefCards && beliefCards.length > 0
  const flipcardsRef = useRef<HTMLDivElement>(null)
  const canHover = useCanHover()
  const reducedMotion = usePrefersReducedMotion()

  const flipcardInnerClasses = 'absolute inset-0 flex items-center p-gut-50'

  useGSAP(
    () => {
      if (canHover || !hasCards) return
      const stagger = 0.1

      const cards = gsap.utils.toArray<HTMLElement>('.flipcard')
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: flipcardsRef.current,
          start: 'top 85%',
          once: true,
          markers: false,
        },
      })

      cards.forEach((card, i) => {
        tl.call(() => card.classList.add('flipped'), undefined, i * stagger)
      })

      return () => {
        cards.forEach((card) => card.classList.remove('flipped'))
      }
    },
    {scope: flipcardsRef, dependencies: [canHover, hasCards], revertOnUpdate: true},
  )

  if (!hasCards) {
    return null
  }

  return (
    <SiteWidth>
      <SiteGrid>
        {title && (
          <div className="col-span-12 lg:col-span-3 max-lg:mb-gut-200">
            <h2 className="text-balance">{title}</h2>
          </div>
        )}
        <div
          className={cn(
            'col-span-12',
            title && 'lg:col-span-8 lg:col-start-5 lg:mt-gut',
            reducedMotion && 'reduced-motion',
          )}
        >
          <div
            ref={flipcardsRef}
            className={cn(
              'grid grid-cols-2 gap-x-gut gap-y-gut-150 lg:gap-y-gut ts-p-sm text-balance',
              title ? 'lg:grid-cols-3' : 'lg:grid-cols-4',
            )}
          >
            {beliefCards.map((beliefCard, i) => (
              <div key={beliefCard._key} className="flipcard corner-container">
                <div className="flipcard-inner relative min-h-[8em] w-full cursor-default">
                  <div
                    className={cn(
                      'flipcard-front corner bg-bg flex items-center justify-center',
                      flipcardInnerClasses,
                    )}
                  >
                    <p>{beliefCard.label}</p>
                  </div>
                  <div
                    className={cn(
                      'flipcard-back corner light-theme bg-bg-subtle',
                      flipcardInnerClasses,
                    )}
                  >
                    <p>{beliefCard.description}</p>
                  </div>
                </div>
                <span className="absolute top-[-.3em] lg:top-0 left-0 ts-h4 text-gray-500 lg:-translate-x-full -translate-y-full">
                  {leadingZero(i + 1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </SiteGrid>
    </SiteWidth>
  )
}

const leadingZero = (i: number) => {
  return i < 10 ? `0${i}` : i
}
