import { useEffect, useRef } from 'react'

export type ShortcutOptions = {
  enabled?: boolean
  preventDefault?: boolean
  target?: Document | HTMLElement | null
  allowInInput?: boolean
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
}

export function useShortcut(
  shortcut: string,
  callback: (event: KeyboardEvent) => void,
  options: ShortcutOptions = {},
) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback
  const { enabled = true, preventDefault = true, target, allowInInput = false } = options

  useEffect(() => {
    if (!enabled) return
    const eventTarget = target ?? (typeof document === 'undefined' ? null : document)
    if (!eventTarget) return
    const parts = shortcut.toLowerCase().split('+').map((part) => part.trim())
    const key = parts.at(-1)

    const handler = (event: Event) => {
      const keyboardEvent = event as KeyboardEvent
      if (!allowInInput && isEditableTarget(keyboardEvent.target)) return
      const matches =
        keyboardEvent.key.toLowerCase() === key &&
        keyboardEvent.metaKey === (parts.includes('meta') || parts.includes('cmd')) &&
        keyboardEvent.ctrlKey === (parts.includes('ctrl') || parts.includes('control')) &&
        keyboardEvent.altKey === (parts.includes('alt') || parts.includes('option')) &&
        keyboardEvent.shiftKey === parts.includes('shift')
      if (!matches) return
      if (preventDefault) keyboardEvent.preventDefault()
      callbackRef.current(keyboardEvent)
    }

    eventTarget.addEventListener('keydown', handler)
    return () => eventTarget.removeEventListener('keydown', handler)
  }, [shortcut, enabled, preventDefault, target, allowInInput])
}
