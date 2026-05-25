'use client'

import gsap from 'gsap'
import { useLayoutEffect } from 'react'
import { GSAPscrollTrigger } from './GSAPscrollTrigger'

export function GSAP() {
  useLayoutEffect(() => {
    gsap.defaults({ ease: 'none' })
    gsap.ticker.lagSmoothing(0)
  }, [])

  return <GSAPscrollTrigger />
}
