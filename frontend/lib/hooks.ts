import { useMediaQuery } from 'hamo'

export function useOrientation() {
  const isPortrait = useMediaQuery('(orientation: portrait)')
  const isLandscape = useMediaQuery('(orientation: landscape)')
  return { isPortrait, isLandscape }
}

export function usePrefersReducedMotion() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  return prefersReducedMotion
}
