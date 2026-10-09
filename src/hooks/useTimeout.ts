import { useEffect, useRef } from 'react'

export function useTimeout(callback: () => void, delay: number | null) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    if (delay === null) return
    const timeout = window.setTimeout(() => callbackRef.current(), Math.max(0, delay))
    return () => window.clearTimeout(timeout)
  }, [delay])
}
