import { cn } from '@/lib/utils'

export default function Card({
  children,
  bgColorClass = 'bg-bg-subtle',
}: {
  children: React.ReactNode
  bgColorClass?: string
}) {
  return (
    <div className="corner-container">
      <div className={cn('corner p-gut', bgColorClass)}>{children}</div>
    </div>
  )
}
