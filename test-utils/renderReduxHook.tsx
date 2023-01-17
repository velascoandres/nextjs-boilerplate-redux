import React from 'react'
import { Provider } from 'react-redux'

import { PreloadedState } from '@reduxjs/toolkit'
import { renderHook } from '@testing-library/react'

import { IRootState } from '@/store/store'
import { setupStore } from '@/test-utils/renderWithRedux'

export interface IRenderReduxHookArgs {
  preloadedState?: PreloadedState<IRootState>
}
export const renderReduxHook = <Props, Result>(
  render: (initialProps: Props) => Result,
  options?: IRenderReduxHookArgs
) => {
  
  const store = setupStore(options?.preloadedState || {})
    
  const wrapper = ({ children }: {children: React.ReactNode}) => (
    <Provider store={store}>{children}</Provider>
  )
  
  return renderHook(render, { wrapper })
}
