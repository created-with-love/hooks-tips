import {useEffect, useRef} from 'react'

// execute a function before element will be unmount
export const useWillUnmount = (fn: () => void): void => {
  const functionRef = useRef(fn)
  functionRef.current = fn

  useEffect(() => {
    return () => functionRef.current()
  }, [])
}
