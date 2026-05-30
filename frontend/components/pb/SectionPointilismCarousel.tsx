import {PbPointilismCarousel} from '@/sanity.types'
import SiteGrid from '../shared/SiteGrid'
import SiteWidth from '../shared/SiteWidth'
import PointilismCarousel from './PointilismCarousel'

export default function SectionPointilismCarousel({section}: {section: PbPointilismCarousel}) {
  const {tagline, slides} = section
  const hasSlides = slides && slides.length > 1

  if (!hasSlides) {
    return null
  }

  return (
    <SiteWidth>
      <SiteGrid>
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-4">
          <PointilismCarousel slides={slides} />
        </div>
      </SiteGrid>
    </SiteWidth>
  )
}
