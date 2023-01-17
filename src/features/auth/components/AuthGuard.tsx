'use client'

import React from 'react'

import { Spinner } from '@/common/components/Spinner'
import { ROUTES_MENU } from '@/constants/routes'
import { useAuthCheck } from '@/features/auth/hooks/useAuthCheck'


export interface IAuthGuardProps {
    children: React.ReactNode
}

export const AuthGuard: React.FC<IAuthGuardProps> = (props) => {
  const { children } = props
  const { isAllowed = false } = useAuthCheck(ROUTES_MENU, {
    privateRedirectPath: '/dashboard',
    publicRedirectPath: '/auth/sign-in'
  })

  if (!isAllowed) {
    return (
      <div className="flex justify-center items-center space-x-2" role="note">
        <Spinner />
      </div>
    )
  }

  return (
    <>
      {children}
    </>
  )
}
