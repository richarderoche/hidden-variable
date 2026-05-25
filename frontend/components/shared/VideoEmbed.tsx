'use client'
import ReactPlayer from 'react-player'

export default function VideoEmbed({ url }: { url?: string }) {
  return (
    <>
      {url ? (
        <ReactPlayer
          className="absolute inset-0"
          width={'100%'}
          height={'100%'}
          src={url}
          controls
        />
      ) : null}
    </>
  )
}
