'use client'

import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { ModalRecipient } from '@/common/recipients/ModalRecipient'
import { AuthGuard } from '@/features/auth/components/AuthGuard'
import { persistor, store } from '@/store/store'

interface IStoreProviderProps {
    children: React.ReactNode
}

export const StoreProvider: React.FC<IStoreProviderProps> = (props) => {
  const { children } = props

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ModalRecipient />
        <AnimatePresence
          mode="wait"
          initial={true}
        >
          <AuthGuard>{children}</AuthGuard>
        </AnimatePresence>
      </PersistGate>
    </Provider>
  )
}
