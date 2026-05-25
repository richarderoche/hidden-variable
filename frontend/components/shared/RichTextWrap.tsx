import { cn } from '@/lib/utils'

export default function RichTextWrap({
  children,
  className = 'ts-p-md',
  ...rest
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'prose prose-siteColor prose-li:my-0 prose-headings:mt-[.8em] prose-headings:first:mt-0',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
