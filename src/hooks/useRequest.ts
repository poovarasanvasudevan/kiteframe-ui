import { useCallback, useEffect, useRef, useState } from 'react'

export type UseRequestOptions<T, P extends unknown[]> = {
  manual?: boolean
  defaultParams?: P
  initialData?: T
  onSuccess?: (data: T, params: P) => void
  onError?: (error: unknown, params: P) => void
}

export type UseRequestResult<T, P extends unknown[]> = {
  data: T | undefined
  error: unknown
  loading: boolean
  run: (...params: P) => Promise<T>
  cancel: () => void
}

export function useRequest<T, P extends unknown[] = []>(
  request: (...params: P) => Promise<T>,
  options: UseRequestOptions<T, P> = {},
): UseRequestResult<T, P> {
  const [data, setData] = useState<T | undefined>(options.initialData)
  const [error, setError] = useState<unknown>()
  const [loading, setLoading] = useState(false)
  const requestRef = useRef(request)
  const optionsRef = useRef(options)
  const sequenceRef = useRef(0)
  const mountedRef = useRef(true)
  requestRef.current = request
  optionsRef.current = options

  const cancel = useCallback(() => {
    sequenceRef.current += 1
    if (mountedRef.current) setLoading(false)
  }, [])

  const run = useCallback(async (...params: P) => {
    const sequence = ++sequenceRef.current
    setLoading(true)
    setError(undefined)

    try {
      const result = await requestRef.current(...params)
      if (mountedRef.current && sequence === sequenceRef.current) {
        setData(result)
        setLoading(false)
        optionsRef.current.onSuccess?.(result, params)
      }
      return result
    } catch (caught) {
      if (mountedRef.current && sequence === sequenceRef.current) {
        setError(caught)
        setLoading(false)
        optionsRef.current.onError?.(caught, params)
      }
      throw caught
    }
  }, [])

  useEffect(() => {
    mountedRef.current = true
    if (!optionsRef.current.manual) {
      void run(...(optionsRef.current.defaultParams ?? ([] as unknown as P))).catch(() => undefined)
    }

    return () => {
      mountedRef.current = false
      sequenceRef.current += 1
    }
  }, [run])

  return { data, error, loading, run, cancel }
}
