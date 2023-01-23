'use client'

import { ModalProvider } from '@/common/providers/ModalProvider'
import { StoreProvider } from '@/common/providers/StoreProvider'

import '@/styles/globals.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang="eng"/>
      {
      }
      <head />
      <body>
        <ModalProvider>
          <StoreProvider>
            {children}
          </StoreProvider>
        </ModalProvider>
      </body>
    </>
  )
}
