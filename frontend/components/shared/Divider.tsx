import { cn } from '@/lib/utils'

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  showOnMobile?: boolean
  showOnTablet?: boolean
  showOnDesktop?: boolean
  showDividerLine?: boolean
  size?: number
}

export default function Divider({
  showOnMobile,
  showOnTablet,
  showOnDesktop,
  showDividerLine,
  size = 1,
  className,
  ...props
}: DividerProps) {
  return (
    <div
      className={cn(
        'h-1 w-full hidden',
        !showDividerLine && 'opacity-0',
        showOnMobile ? 'max-md:block' : '',
        showOnTablet ? 'max-lg:block' : '',
        showOnDesktop ? 'lg:block' : '',
        className ? className : 'bg-divider',
        size === 2
          ? 'my-gut-50'
          : size === 3
            ? 'my-gut'
            : size === 4
              ? 'my-gut-150'
              : size === 5
                ? 'my-gut-200'
                : ''
      )}
      {...props}
    />
  )
}
