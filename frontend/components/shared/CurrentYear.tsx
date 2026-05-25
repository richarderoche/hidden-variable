'use client'

import { useEffect, useState } from 'react'

type Format = 'yyyy' | 'yy'

export default function CurrentYear(props: { format?: Format }) {
  const { format = 'yyyy' } = props
  const [currentYear, setCurrentYear] = useState('2026')

  useEffect(() => {
    const year = new Date().getFullYear().toString()
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentYear(format === 'yy' ? year.slice(-2) : year)
  }, [format])

  return <>{currentYear}</>
}
