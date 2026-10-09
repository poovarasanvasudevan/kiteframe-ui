import { useEffect, type DependencyList, type EffectCallback } from 'react'

export type AsyncEffectCallback = (
  signal: AbortSignal,
) => Promise<ReturnType<EffectCallback>>

export function useAsyncEffect(effect: AsyncEffectCallback, dependencies?: DependencyList) {
  useEffect(() => {
    const controller = new AbortController()
    let cleanup: ReturnType<EffectCallback>

    void effect(controller.signal).then((result) => {
      if (controller.signal.aborted) {
        if (typeof result === 'function') result()
        return
      }
      cleanup = result
    })

    return () => {
      controller.abort()
      if (typeof cleanup === 'function') cleanup()
    }
  }, dependencies)
}
