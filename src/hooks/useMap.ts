import { useCallback, useMemo, useRef, useState } from 'react'

export type UseMapActions<K, V> = {
  set: (key: K, value: V) => void
  setAll: (entries: Iterable<readonly [K, V]>) => void
  remove: (key: K) => void
  clear: () => void
  reset: () => void
  get: (key: K) => V | undefined
}

export function useMap<K, V>(initialEntries: Iterable<readonly [K, V]> = []) {
  const initialRef = useRef<Map<K, V> | null>(null)
  if (initialRef.current === null) initialRef.current = new Map(initialEntries)
  const [map, setMap] = useState(() => new Map(initialRef.current!))
  const mapRef = useRef(map)
  mapRef.current = map

  const set = useCallback((key: K, value: V) => {
    setMap((current) => new Map(current).set(key, value))
  }, [])
  const setAll = useCallback((entries: Iterable<readonly [K, V]>) => {
    setMap(new Map(entries))
  }, [])
  const remove = useCallback((key: K) => {
    setMap((current) => {
      if (!current.has(key)) return current
      const next = new Map(current)
      next.delete(key)
      return next
    })
  }, [])
  const clear = useCallback(() => setMap(new Map()), [])
  const reset = useCallback(() => setMap(new Map(initialRef.current!)), [])
  const get = useCallback((key: K) => mapRef.current.get(key), [])

  const actions = useMemo(
    () => ({ set, setAll, remove, clear, reset, get }),
    [set, setAll, remove, clear, reset, get],
  )
  return [map, actions] as const
}
