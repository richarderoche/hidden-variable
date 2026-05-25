'use client'

import { useEffect } from 'react'

export default function ConsoleLog() {
  useEffect(() => {
    console.log('Developed by: https://infinite-productivity.com')
    console.log('Using: React / Next / Sanity / Tailwind')
  }, [])

  return <></>
}
