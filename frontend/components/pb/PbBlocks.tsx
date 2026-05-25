'use client'

import { cn } from '@/lib/utils'
import type { PbBlockVideoEmbed } from '@/sanity.types'
import { NavItem, PbBlocksQueryResult } from '@/types'
import { PortableTextBlock } from 'next-sanity'
import type { Image as SanityImageType } from 'sanity'
import Button from '../shared/Button'
import { CustomPortableText } from '../shared/CustomPortableText'
import Divider from '../shared/Divider'
import ImageBasic from '../shared/ImageBasic'
import RichTextWrap from '../shared/RichTextWrap'
import VideoEmbed from '../shared/VideoEmbed'
import MarqueeBlock from './MarqueeBlock'
import { useSanityDataAttribute } from './SanityVisualEditingContext'

export interface PbBlocksProps {
  columnBlocks: PbBlocksQueryResult
  trueSizes: string
  spaceBetweenBlocks: string
  blockWidths?: {
    mobile?: string
    tablet?: string
    desktop?: string
  }
}

export default function PbBlocks({
  columnBlocks,
  trueSizes,
  spaceBetweenBlocks,
  blockWidths = {
    mobile: 'grid-cols-1',
    tablet: 'md:grid-cols-1',
    desktop: 'lg:grid-cols-1',
  },
}: PbBlocksProps) {
  const { getDataAttribute } = useSanityDataAttribute()
  return (
    <div
      className={cn(
        'column-blocks grid h-full content-start',
        blockWidths.mobile,
        blockWidths.tablet,
        blockWidths.desktop,
        spaceBetweenBlocks
      )}
    >
      {columnBlocks &&
        columnBlocks.map((block) => {
          const { _key, _type } = block
          const blockDataSanity = getDataAttribute(['pbBlocks', { _key }])

          switch (_type) {
            // Rich Text Block
            case 'pbBlockText':
              return (
                <RichTextWrap key={_key} data-sanity={blockDataSanity}>
                  <CustomPortableText
                    value={block.textContent as PortableTextBlock[]}
                  />
                </RichTextWrap>
              )

            // Plain Text Block
            case 'pbBlockPlainText':
              return (
                <div key={_key} data-sanity={blockDataSanity}>
                  <PlainTextBlock block={block} />
                </div>
              )

            // Image Block
            case 'pbBlockImage':
              return (
                <div
                  key={_key}
                  data-sanity={blockDataSanity}
                  className="corner-container"
                >
                  <ImageBlock block={block} trueSizes={trueSizes} />
                </div>
              )

            // Video Block
            case 'pbBlockVideoEmbed':
              return (
                <div key={_key} data-sanity={blockDataSanity}>
                  <div className="relative" style={getRatioPadding(block)}>
                    <VideoEmbed url={block.videoEmbedUrl} />
                  </div>
                </div>
              )

            // Button Block
            case 'pbBlockButton':
              return (
                <div key={_key} data-sanity={blockDataSanity}>
                  <ButtonBlock block={block} />
                </div>
              )

            // Divider Block
            case 'pbBlockDivider':
              return (
                <Divider
                  key={_key}
                  data-sanity={blockDataSanity}
                  data-ignore-neighbor-padding
                  showOnMobile={block.showOnMobile ?? true}
                  showOnTablet={block.showOnTablet ?? true}
                  showOnDesktop={block.showOnDesktop ?? true}
                  showDividerLine={block.showDividerLine ?? true}
                  size={block.size ?? 1}
                />
              )

            // Scrolling Marquee Block
            case 'pbBlockMarquee':
              return (
                <div key={_key} data-sanity={blockDataSanity}>
                  <MarqueeBlock block={block} />
                </div>
              )

            default:
              return null
          }
        })}
    </div>
  )
}

export function PlainTextBlock({ block }) {
  return (
    <div
      className={cn(
        block.textStyle || 'ts-p-md',
        block.color,
        block.balanceLines ? 'text-balance' : 'text-pretty'
      )}
    >
      {block.textContent || ''}
    </div>
  )
}

export function ImageBlock({ block, trueSizes }) {
  return (
    <>
      <div
        className={cn('relative group', !block.disableCorners ? 'corner' : '')}
        style={{
          width: block.imageWidth ? block.imageWidth + '%' : 'auto',
        }}
      >
        <ImageBasic
          image={block.image as SanityImageType}
          alt={block.alt}
          sizes={trueSizes}
          ratio={block.imageCrop || 0}
          priority={block.priority ?? false}
        />
      </div>
      {block.caption && (
        <div className="ts-p-sm text-pretty text-body-subtle mt-gut-50">
          {block.caption}
        </div>
      )}
    </>
  )
}

export function ButtonBlock({ block }) {
  return (
    <>
      {block.linkType === 'sitePage' && (
        <Button navItem={block.sitePage as NavItem} />
      )}
      {block.linkType === 'externalLink' && (
        <Button navItem={block.externalLink as NavItem} />
      )}
      {block.linkType === 'file' && (
        <Button
          path={block.fileLink?.url || ''}
          text={block.fileLink?.buttonText || 'Download'}
          download
        />
      )}
    </>
  )
}

function getRatioPadding(block: PbBlockVideoEmbed) {
  const ar = block.videoAspectRatio
  const paddingRatio =
    ar && ar.width && ar.height ? ar.height / ar.width : 9 / 16
  return { paddingTop: paddingRatio * 100 + '%' }
}
