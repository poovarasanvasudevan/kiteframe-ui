import { useCallback, useState } from 'react'

export type SetStatePatch<T extends object> = Partial<T> | ((state: T) => Partial<T>)

export function useSetState<T extends object>(initialState: T | (() => T)) {
  const [state, setState] = useState(initialState)
  const set = useCallback((patch: SetStatePatch<T>) => {
    setState((current) => ({
      ...current,
      ...(typeof patch === 'function' ? patch(current) : patch),
    }))
  }, [])

  return [state, set] as const
}

export type UseSetStateSetter<T extends object> = (patch: SetStatePatch<T>) => void
