/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

import type { PreloadedState } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'

import { rootApi } from '@/store/rootApi'
import { rootReducer } from '@/store/rootReducer'
import type { IRootState } from '@/store/store'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.

export type IAppStoreTest = ReturnType<typeof setupStore>

export interface IExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<IRootState>
  store?: IAppStoreTest
}

export const setupStore = (preloadedState?: PreloadedState<IRootState>) => {
  return configureStore({
    reducer: {
      ...rootReducer,
      [rootApi.reducerPath]: rootApi.reducer
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(rootApi.middleware),
    preloadedState,
  })
}

export function renderWithRedux(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: IExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<any>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }
  
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
