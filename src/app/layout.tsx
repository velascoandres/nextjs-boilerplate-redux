'use client'

import { ModalProvider } from '@/providers/ModalProvider'
import { StoreProvider } from '@/providers/StoreProvider'

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
