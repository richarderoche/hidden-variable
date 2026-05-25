'use client'
import { useIntersectionObserver } from 'hamo'
import Hls from 'hls.js'
import { useEffect, useRef } from 'react'

export default function Video({
  playbackId,
  className = '',
  style = {},
  useManualIsInView = false,
  manualIsInView,
  ...props
}: {
  playbackId?: string
  title?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  className?: string
  playsInline?: boolean
  style?: React.CSSProperties
  useManualIsInView?: boolean
  manualIsInView?: boolean
}) {
  const src = `https://stream.mux.com/${playbackId}.m3u8`
  const poster = `https://image.mux.com/${playbackId}/thumbnail.webp?time=0&width=1000`
  const [setRef, intersection] = useIntersectionObserver()
  const isInViewR = intersection.isIntersecting
  const isInViewM = useManualIsInView ? manualIsInView : false
  const videoRef = useRef<HTMLVideoElement>(null)
  const disableVideo =
    process.env.NEXT_PUBLIC_DISABLE_VIDEO === 'true' ? true : false

  useEffect(() => {
    let hls

    if (videoRef.current) {
      const video = videoRef.current
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // This will run in safari, where HLS is supported natively
        video.src = src
      } else if (Hls.isSupported()) {
        // This will run in all other modern browsers
        hls = new Hls()
        hls.loadSource(src)
        hls.attachMedia(video)
      }
    }
    return () => {
      if (hls) {
        hls.destroy()
      }
    }
  }, [videoRef, src])

  useEffect(() => {
    const isInView = useManualIsInView ? isInViewM : isInViewR
    if (videoRef.current) {
      if (isInView && !disableVideo) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [useManualIsInView, isInViewR, isInViewM, disableVideo])

  return (
    <video
      ref={(node) => {
        setRef(node)
        videoRef.current = node
      }}
      className={`${className} ${(useManualIsInView && isInViewM) || (!useManualIsInView && isInViewR) ? 'in-view' : 'not-in-view'} pointer-events-none`}
      style={style}
      poster={poster}
      {...props}
    />
  )
}
