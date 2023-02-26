import React from 'react'

import { act, renderHook, waitFor } from '@testing-library/react'

import { DEFAULT_DEBOUNCE_TIME, useDebounceValue } from '@/hooks/useDebounceValue'

jest.useFakeTimers()

const DEBOUNCE_VALUE = 10

jest.spyOn(global, 'setTimeout')

describe('useDebounceValue tests', () => { 
  describe('When hook renders', () => {
    test('should return the initial value', () => {
      const { result } = renderHook(() => useDebounceValue(DEBOUNCE_VALUE))
        
      const value = result.current

      expect(value).toBe(DEBOUNCE_VALUE)
    })

    test('should call setTimeout with default time', () => {
      renderHook(() => useDebounceValue(DEBOUNCE_VALUE))
    
      expect(setTimeout).toHaveBeenLastCalledWith(
        expect.any(Function),
        DEFAULT_DEBOUNCE_TIME
      )
    })
    
    test('should call setTimeout with another time', () => {
      renderHook(() => useDebounceValue(DEBOUNCE_VALUE, 10000))
    
      expect(setTimeout).toHaveBeenLastCalledWith(
        expect.any(Function),
        10000
      )
    })
  })

  describe('When debounce', () => { 
    test('should debounce a new value', async () => {
      const { result } = renderHook(() => {
        const [value, changeValue] = React.useState(10)
        const debounceValue = useDebounceValue(value)

        return {
          debounceValue,
          changeValue,
        }
      })

      const changeValue = result.current.changeValue

      act(() => {
        changeValue(100)
      })

      await waitFor(() => {
        expect(result.current.debounceValue).toBe(100)
      })
    })
  })
})
