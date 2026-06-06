import {urlForPointilismSlide} from '@/sanity/lib/utils'
import {useResizeObserver} from 'hamo'
import {useEffect, useMemo, useRef, useState} from 'react'

const DEFAULT_PARAMS = {
  cols: 38,
  gap: 1.2,
  minSize: 0.01,
  maxSize: 1.0,
  contrast: 2.2,
  length: 0.6,
  lengthResponse: 0.1,
  rotation: 0,
  waveEnabled: true,
  waveAmplitude: 22,
  waveFrequency: 2.5,
  waveCenterX: 0.5,
  waveCenterY: 0.5,
  wavePhase: 0,
  waveTurbulence: 0.03,
  invert: false,
  thickness: 0.4,
  holdDuration: 2.0,
  flipDuration: 0.35,
  flipStagger: 1.0,
  mouseReactive: true,
  mouseRadius: 0.18,
  mouseStrength: 1.0,
}

const PLACEHOLDER_BRIGHTNESS = 0.3
const PLACEHOLDER_DARKNESS = 0
const MIN_INTRO_MS = 300
const REVEAL_PARAMS = {
  ...DEFAULT_PARAMS,
  holdDuration: 0,
  flipDuration: DEFAULT_PARAMS.flipDuration / 3,
  flipStagger: DEFAULT_PARAMS.flipStagger / 3,
}
const INTRO_TRANSITION_PARAMS = {
  ...DEFAULT_PARAMS,
  holdDuration: 0.3,
}

// Sanity slides are cropped to 600×800 in urlForPointilismSlide
const SLIDE_ASPECT = 800 / 600
const DISPLAY_ROWS = Math.round(DEFAULT_PARAMS.cols * SLIDE_ASPECT)
const DISPLAY_ASPECT = DEFAULT_PARAMS.cols / DISPLAY_ROWS

function generatePlaceholderFrame(cols, rows, brightness = PLACEHOLDER_BRIGHTNESS) {
  const data = Array.from({length: rows}, () => Array.from({length: cols}, () => brightness))
  return {data, rows, cols}
}

function sampleImage(canvas, cols) {
  const ctx = canvas.getContext('2d')
  const aspect = canvas.height / canvas.width
  const rows = Math.round(cols * aspect)
  const cellW = canvas.width / cols
  const cellH = canvas.height / rows
  const data = []
  for (let r = 0; r < rows; r++) {
    const row = []
    for (let c = 0; c < cols; c++) {
      const px = ctx.getImageData(
        Math.floor(c * cellW + cellW / 2),
        Math.floor(r * cellH + cellH / 2),
        1,
        1,
      ).data
      row.push((px[0] * 0.299 + px[1] * 0.587 + px[2] * 0.114) / 255)
    }
    data.push(row)
  }
  return {data, rows, cols}
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function getIntroTransitionMs(params) {
  return (params.holdDuration + params.flipStagger + params.flipDuration) * 1000
}

function loadImg(src, canvas, maxDim = 800) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      let w = img.width
      let h = img.height
      if (w > maxDim || h > maxDim) {
        const s = maxDim / Math.max(w, h)
        w = Math.round(w * s)
        h = Math.round(h * s)
      }
      canvas.width = w
      canvas.height = h
      canvas.getContext('2d').drawImage(img, 0, 0, w, h)
      resolve()
    }
    img.onerror = reject
    img.src = src
  })
}

function getAngle(c, r, cols, rows, p) {
  let a = (p.rotation * Math.PI) / 180
  if (p.waveEnabled) {
    const nx = (c - cols * p.waveCenterX) / cols
    const ny = (r - rows * p.waveCenterY) / rows
    const wi = Math.sqrt(nx * nx + ny * ny)
    a +=
      ((p.waveAmplitude * Math.PI) / 180) *
      Math.sin(wi * p.waveFrequency * Math.PI * 2 + p.wavePhase)
    if (p.waveTurbulence > 0) {
      const n = Math.sin(c * 12.9898 + r * 78.233) * 43758.5453
      a += (n - Math.floor(n) - 0.5) * p.waveTurbulence * Math.PI * 0.5
    }
  }
  return a
}

function getDims(br, p, cW, cH) {
  const b = Math.pow(br, p.contrast)
  const t = p.minSize + b * (p.maxSize - p.minSize)
  const wt = 1 - p.lengthResponse + p.lengthResponse * t
  return {w: cW * p.gap * wt * p.length, h: cH * p.gap * t * p.thickness}
}

function applyMouse(cx, cy, w, h, angle, p, mouse, W, H) {
  if (!mouse || !p.mouseReactive) return {angle, w, h}
  const radius = p.mouseRadius * Math.max(W, H)
  const dx = cx - mouse.x
  const dy = cy - mouse.y
  const dist = Math.sqrt(dx * dx + dy * dy)
  if (dist > radius || dist < 0.01) return {angle, w, h}

  const falloff = 1 - dist / radius
  const smooth = falloff * falloff * (3 - 2 * falloff)
  const str = smooth * p.mouseStrength

  const toMouse = Math.atan2(dy, dx)
  const newAngle = angle + (toMouse - angle) * str * 0.8
  const boost = 1 + str * 0.4
  return {angle: newAngle, w: w * boost, h: h * boost}
}

function drawDash(ctx, cx, cy, w, h, angle) {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate(angle)
  ctx.fillRect(-w / 2, -h / 2, w, h)
  ctx.restore()
}

function hash(a, b) {
  const n = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453
  return n - Math.floor(n)
}

function getFlipDelay(c, r, p) {
  return hash(c, r) * p.flipStagger
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function renderAnimFrame(ctx, frames, p, W, H, time, mouse, fgColor) {
  const {rows, cols} = frames[0]
  const cW = W / cols
  const cH = H / rows
  const nf = frames.length
  const cycleDur = p.holdDuration + p.flipDuration + p.flipStagger
  const totalLoop = cycleDur * nf
  const lt = ((time % totalLoop) + totalLoop) % totalLoop

  ctx.clearRect(0, 0, W, H)
  ctx.fillStyle = fgColor

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const delay = getFlipDelay(c, r, p)
      const angle = getAngle(c, r, cols, rows, p)
      const cx = c * cW + cW / 2
      const cy = r * cH + cH / 2

      let fromIdx = 0
      let flipProg = -1
      let tAcc = 0
      let found = false
      for (let i = 0; i < nf; i++) {
        const holdEnd = tAcc + p.holdDuration
        const flipStart = holdEnd + delay
        const flipEnd = flipStart + p.flipDuration
        if (lt < holdEnd) {
          fromIdx = i
          found = true
          break
        } else if (lt < flipStart) {
          fromIdx = i
          found = true
          break
        } else if (lt < flipEnd) {
          fromIdx = i
          flipProg = (lt - flipStart) / p.flipDuration
          found = true
          break
        }
        tAcc += cycleDur
      }
      if (!found) {
        fromIdx = 0
        flipProg = -1
      }

      const toIdx = (fromIdx + 1) % nf
      let br
      let flipScale = 1

      if (flipProg < 0 || flipProg > 1) {
        br = frames[fromIdx].data[r][c]
        if (p.invert) br = 1 - br
      } else {
        const e = easeInOutCubic(flipProg)
        br = (e < 0.5 ? frames[fromIdx] : frames[toIdx]).data[r][c]
        if (p.invert) br = 1 - br
        flipScale = Math.abs(Math.cos(e * Math.PI))
      }

      let {w, h} = getDims(br, p, cW, cH)
      const dW = w * flipScale
      const dH = h
      if (dW < 0.2 && dH < 0.2) continue

      const m = applyMouse(cx, cy, dW, dH, angle, p, mouse, W, H)
      drawDash(ctx, cx, cy, m.w, m.h, m.angle)
    }
  }
}

function applyCanvasSize(canvas, dW, dH) {
  const dpr = window.devicePixelRatio || 1
  canvas.style.width = `${dW}px`
  canvas.style.height = `${dH}px`
  canvas.width = Math.round(dW * dpr)
  canvas.height = Math.round(dH * dpr)
  return dpr
}

function AnimCanvas({frames, params}) {
  const canvasRef = useRef(null)
  const mouseRef = useRef(null)
  const animRef = useRef(null)
  const startRef = useRef(null)
  const layoutRef = useRef({dW: 0, dH: 0, dpr: 1})

  const {rows, cols} = frames[0]
  const aspect = rows / cols

  const [setContainerRef] = useResizeObserver(
    {
      debounce: 150,
      callback: (entry) => {
        const dW = entry.contentRect.width
        layoutRef.current = {dW, dH: dW * aspect, dpr: window.devicePixelRatio || 1}
      },
    },
    [aspect],
  )

  useEffect(() => {
    if (!canvasRef.current || !frames.length) return
    const cv = canvasRef.current
    const ctx = cv.getContext('2d')
    const fgColor = getComputedStyle(cv).color
    startRef.current = null

    const tick = (ts) => {
      const {dW, dH} = layoutRef.current
      if (dW > 0) {
        const dpr = window.devicePixelRatio || 1
        const expectedW = Math.round(dW * dpr)
        if (cv.width !== expectedW || layoutRef.current.dpr !== dpr) {
          layoutRef.current.dpr = dpr
          applyCanvasSize(cv, dW, dH)
        }

        if (!startRef.current) startRef.current = ts
        const t = (ts - startRef.current) / 1000
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        renderAnimFrame(ctx, frames, params, dW, dH, t, mouseRef.current, fgColor)
      }
      animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [frames, params])

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    mouseRef.current = {x: e.clientX - rect.left, y: e.clientY - rect.top}
  }
  const handleMouseLeave = () => {
    mouseRef.current = null
  }

  return (
    <div ref={setContainerRef} className="w-full">
      <canvas
        ref={canvasRef}
        className="text-gray-200 block w-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  )
}

function PointilismCarouselContent({slides}) {
  const darkFrame = useMemo(
    () => generatePlaceholderFrame(DEFAULT_PARAMS.cols, DISPLAY_ROWS, PLACEHOLDER_DARKNESS),
    [],
  )
  const placeholderFrame = useMemo(
    () => generatePlaceholderFrame(DEFAULT_PARAMS.cols, DISPLAY_ROWS),
    [],
  )
  const [frames, setFrames] = useState(() => [darkFrame, placeholderFrame])
  const [phase, setPhase] = useState('reveal')
  const hc = useRef(null)

  useEffect(() => {
    let cancelled = false

    async function loadSlides() {
      const urls = slides.map((slide) => urlForPointilismSlide(slide)).filter(Boolean)
      if (!urls.length) return

      const revealDone = delay(getIntroTransitionMs(REVEAL_PARAMS)).then(() => {
        if (cancelled) return
        setFrames([placeholderFrame])
        setPhase('intro')
      })

      const firstFramePromise = (async () => {
        try {
          await loadImg(urls[0], hc.current)
          if (cancelled) return null
          return sampleImage(hc.current, DEFAULT_PARAMS.cols)
        } catch {
          return null
        }
      })()

      await revealDone
      if (cancelled) return

      const introStartedAt = Date.now()
      const firstFrame = await firstFramePromise
      if (cancelled || !firstFrame) return

      const remainingIntro = MIN_INTRO_MS - (Date.now() - introStartedAt)
      if (remainingIntro > 0) await delay(remainingIntro)
      if (cancelled) return

      setFrames([placeholderFrame, firstFrame])
      setPhase('transitioning')

      const remainingFramesPromise = (async () => {
        const loaded = [firstFrame]
        for (const src of urls.slice(1)) {
          await loadImg(src, hc.current)
          if (cancelled) return null
          loaded.push(sampleImage(hc.current, DEFAULT_PARAMS.cols))
        }
        return loaded
      })()

      await delay(getIntroTransitionMs(INTRO_TRANSITION_PARAMS))
      if (cancelled) return

      const allFrames = await remainingFramesPromise
      if (cancelled || !allFrames) return

      setFrames(allFrames)
      setPhase('active')
    }

    void loadSlides()

    return () => {
      cancelled = true
    }
  }, [slides, darkFrame, placeholderFrame])

  const params =
    phase === 'reveal'
      ? REVEAL_PARAMS
      : phase === 'transitioning'
        ? INTRO_TRANSITION_PARAMS
        : DEFAULT_PARAMS

  return (
    <>
      <canvas ref={hc} style={{display: 'none'}} aria-hidden />
      <div style={{width: '100%', aspectRatio: DISPLAY_ASPECT}}>
        <AnimCanvas frames={frames} params={params} />
      </div>
    </>
  )
}

export default function PointilismCarousel({slides}) {
  const slideKey = slides.map((slide) => slide._key).join('-')

  return <PointilismCarouselContent key={slideKey} slides={slides} />
}
