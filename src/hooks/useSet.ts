import { useCallback, useMemo, useRef, useState } from 'react'

export type UseSetActions<T> = {
  add: (value: T) => void
  remove: (value: T) => void
  toggle: (value: T) => void
  clear: () => void
  reset: () => void
  has: (value: T) => boolean
}

export function useSet<T>(initialValues: Iterable<T> = []) {
  const initialRef = useRef<Set<T> | null>(null)
  if (initialRef.current === null) initialRef.current = new Set(initialValues)
  const [set, setSet] = useState(() => new Set(initialRef.current!))
  const setRef = useRef(set)
  setRef.current = set

  const add = useCallback((value: T) => {
    setSet((current) => new Set(current).add(value))
  }, [])
  const remove = useCallback((value: T) => {
    setSet((current) => {
      if (!current.has(value)) return current
      const next = new Set(current)
      next.delete(value)
      return next
    })
  }, [])
  const toggle = useCallback((value: T) => {
    setSet((current) => {
      const next = new Set(current)
      if (next.has(value)) next.delete(value)
      else next.add(value)
      return next
    })
  }, [])
  const clear = useCallback(() => setSet(new Set()), [])
  const reset = useCallback(() => setSet(new Set(initialRef.current!)), [])
  const has = useCallback((value: T) => setRef.current.has(value), [])

  const actions = useMemo(
    () => ({ add, remove, toggle, clear, reset, has }),
    [add, remove, toggle, clear, reset, has],
  )
  return [set, actions] as const
}
