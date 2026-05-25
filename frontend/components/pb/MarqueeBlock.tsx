'use client'
import {cn} from '@/lib/utils'
import {PbBlockMarquee} from '@/sanity.types'
import {getImageDimensions} from '@sanity/asset-utils'
import {Marqy} from 'marqy'
import 'marqy/dist/marqy.css'
import {useState} from 'react'
import IconPause from '../icons/IconPause'
import IconPlay from '../icons/IconPlay'
import ImageBasic from '../shared/ImageBasic'

export default function MarqueeBlock({block}: {block: PbBlockMarquee}) {
  const [isPaused, setIsPaused] = useState(false)
  const {settings, elements} = block
  const {speed = 5, direction, color, imageSize} = settings ?? {}
  const colorClass = color ? color : ''

  if (!elements || elements.length === 0) return null

  return (
    <div className={cn('relative pr-28', isPaused && 'paused-by-button')}>
      <Marqy speed={speed / 10} direction={direction} pauseOnHover={false}>
        <div className={cn('flex items-center gap-gut-150 pl-gut-150 bg-current-bg', colorClass)}>
          {elements.map((item) => {
            const {_type, _key} = item
            return (
              <div key={_key}>
                {_type === 'textElement' ? (
                  <TextElement item={item} />
                ) : _type === 'imageElement' ? (
                  <ImageElement item={item} imageSize={imageSize} />
                ) : null}
              </div>
            )
          })}
        </div>
      </Marqy>
      <button
        className="grid opacity-35 absolute bottom-0 right-0 z-5"
        onClick={() => setIsPaused(!isPaused)}
        aria-label={isPaused ? 'Play' : 'Pause'}
      >
        <IconPlay className={cn('size-24 grid-stack', !isPaused && 'opacity-0')} />
        <IconPause className={cn('size-24 grid-stack', isPaused && 'opacity-0')} />
      </button>
    </div>
  )
}

const ImageElement = ({item, imageSize = 50}) => {
  const {image, roundedCorners, altText, imageCrop, invertColor, blendModeLighten} = item
  const imageRatio =
    imageCrop || getImageDimensions(image.asset).width / getImageDimensions(image.asset).height
  const weightedHeight = getWeightedHeight(imageRatio, imageSize)
  const weightedWidth = Math.round(parseFloat(weightedHeight) * imageRatio)
  return (
    <div
      className="relative corner-container "
      style={{height: weightedHeight, width: weightedWidth}}
    >
      <ImageBasic
        image={image}
        alt={altText}
        sizes={`${weightedWidth}px`}
        ratio={imageCrop || 0}
        fitTo="manual"
        className={cn(
          roundedCorners ? 'corner' : '',
          'h-full w-auto',
          invertColor ? 'invert' : '',
          blendModeLighten ? 'mix-blend-lighten' : '',
        )}
      />
    </div>
  )
}

const TextElement = ({item}) => {
  const {text, style = 'ts-p-md'} = item
  return <div className={cn('whitespace-nowrap', style)}>{text}</div>
}

const getWeightedHeight = (ratio, imageSize) => {
  const STRENGTH = 0.666667 // 0 = unweighted, 1 = fully proportional
  const height = imageSize * (1 - STRENGTH + STRENGTH / ratio)
  return Math.round(height) + 'px'
}
