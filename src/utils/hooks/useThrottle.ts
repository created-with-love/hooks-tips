import {useEffect, useRef, useDebugValue} from 'react'

// will work until event happens (user types something - fn will work for each timeout period)
export const useThrottle = (fn: () => void, timeout: number):void => {
  const previousRef = useRef<(() => void) | null>(null)
  const currentRef = useRef<(() => void) | null>(fn)

  if (previousRef.current !== fn) {
    currentRef.current = fn
  }

  useDebugValue(currentRef.current, (fn) => fn?.toString())

  useEffect(() => {
    const handle = setInterval(() => {
      if (currentRef.current) {
        currentRef.current()
        previousRef.current = currentRef.current
        currentRef.current = null
      }
    }, timeout)

    return () => clearInterval(handle)
  }, [timeout])
}
