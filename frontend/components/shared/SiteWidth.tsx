import {cn} from '@/lib/utils'

interface SiteWidthProps {
  children: React.ReactNode
  className?: string
}

export const SITE_MAX_WIDTH = 2000

export default function SiteWidth({children, className}: SiteWidthProps) {
  return (
    <div
      style={{maxWidth: SITE_MAX_WIDTH + 'px'}}
      className={cn('px-gut md:px-gut-200 w-full mx-auto', className)}
    >
      {children}
    </div>
  )
}
