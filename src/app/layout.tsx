'use client'

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
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </>
  )
}
