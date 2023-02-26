'use client'

import React from 'react'

type IClickHandler = (event: MouseEvent | TouchEvent) => void

export const useClickOutside = <T extends HTMLElement>(ref: React.RefObject<T>, handler: IClickHandler) => {

  React.useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])

}