import { cn } from '@/lib/utils'
import Button from './Button'
import Divider from './Divider'
import SiteGrid from './SiteGrid'
import SiteWidth from './SiteWidth'

export default function StyleGuide() {
  return (
    <SiteWidth className="my-gut-200">
      <h1 className="ts-h1 mb-gut">Style Guide</h1>
      <Divider />
      <SiteGrid yGaps>
        <div className="col-span-12 lg:col-span-4 mt-gut-200">
          <h6 className="ts-h6 text-body-subtle mb-gut-200">
            Heading/Label Styles
          </h6>
          <div className="flex flex-col gap-gut">
            {hStyles.map((style) => (
              <div key={style.name} className="col-span-12 lg:col-span-6">
                <h1 className={style.style}>{style.name}</h1>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 mt-gut-200">
          <h6 className="ts-h6 text-body-subtle mb-gut-200">
            Paragraph Styles
          </h6>
          <div className="flex flex-col gap-gut pr-gut">
            {pStyles.map((style) => (
              <div key={style.name} className="col-span-12 lg:col-span-6">
                <p className={`${style.style} max-w-max-ch text-pretty`}>
                  {style.name} <span className="text-divider">•</span> {ipsum}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-2 mt-gut-200">
          <h6 className="ts-h6 text-body-subtle mb-gut-200">UI Elements</h6>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-gut">
            <div>
              <Button path="/" text="Button" style="main" />
            </div>
            <Button path="/" text="Alt Button" style="alt" />
          </div>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-2 gap-4 mt-gut-200">
            {ColorSwatches.map((swatch) => (
              <div key={swatch.name} className="aspect-square">
                <div
                  className={cn(
                    swatch.style,
                    'flex items-center justify-center aspect-square border border-divider rounded-sm'
                  )}
                >
                  <span className="ts-p-xs font-medium">{swatch.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SiteGrid>
    </SiteWidth>
  )
}

const ipsum =
  'In a world filled with CGI-laden reboots and remakes, the 1990 "Teenage Mutant Ninja Turtles" film stands as a testament to the power of storytelling, practical effects, and the enduring love for these pizza-eating, crime-fighting turtles.'

const hStyles = [
  {
    name: 'H1 Heading',
    style: 'ts-h1',
  },
  {
    name: 'H2 Heading',
    style: 'ts-h2',
  },
  {
    name: 'H3 Heading',
    style: 'ts-h3',
  },
  {
    name: 'H4 Heading',
    style: 'ts-h4',
  },
  {
    name: 'H5 Label',
    style: 'ts-h5',
  },
  {
    name: 'H6 Label',
    style: 'ts-h6',
  },
]

const pStyles = [
  {
    name: 'P XL',
    style: 'ts-p-xl',
  },
  {
    name: 'P LG',
    style: 'ts-p-lg',
  },
  {
    name: 'P MD (Default)',
    style: 'ts-p-md',
  },
  {
    name: 'P SM',
    style: 'ts-p-sm',
  },
  {
    name: 'P XS',
    style: 'ts-p-xs',
  },
]

const ColorSwatches = [
  {
    name: 'Black',
    style: 'bg-black text-white',
  },
  {
    name: 'Gray 900',
    style: 'bg-gray-900 text-white',
  },
  {
    name: 'Gray 200',
    style: 'bg-gray-200',
  },
  {
    name: 'White',
    style: 'bg-white',
  },
  {
    name: 'Accent',
    style: 'bg-accent',
  },
]
