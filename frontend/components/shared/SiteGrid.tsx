import { cn } from '@/lib/utils'

interface SiteGridProps {
  children: React.ReactNode
  className?: string
  yGaps?: boolean
  looseColSpacing?: boolean
  yAlignment?: string
}

export default function SiteGrid({
  children,
  className,
  yGaps = false,
  looseColSpacing = false,
  yAlignment,
}: SiteGridProps) {
  const gapClasses =
    looseColSpacing && yGaps
      ? 'gap-gut lg:gap-gut-200'
      : yGaps
        ? 'gap-gut'
        : looseColSpacing
          ? 'gap-x-gut lg:gap-x-gut-200'
          : 'gap-x-gut'

  return (
    <div className={cn('grid grid-cols-12', gapClasses, yAlignment, className)}>
      {children}
    </div>
  )
}
