import React from 'react'

export const DEFAULT_DEBOUNCE_TIME = 500

export const useDebounceValue = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value)
  
  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || DEFAULT_DEBOUNCE_TIME)
  
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])
  
  return debouncedValue
}