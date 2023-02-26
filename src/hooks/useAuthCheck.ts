'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { RolesEnum } from '@/constants/roles.enum'
import { IPublicRoute, IRouteMenu, IRouteWithRoles } from '@/constants/routes'
import { useAppSelector } from '@/store/hooks'

interface IUseCheckSessionResult {
  isAllowed: boolean
}

export interface IUseCheckSessionConfigArgs {
  publicRedirectPath: string
  privateRedirectPath: string
}

export const useAuthCheck = (routes: IRouteMenu, config: IUseCheckSessionConfigArgs): IUseCheckSessionResult => {
  const { publicRedirectPath, privateRedirectPath } = config
  
  const authState = useAppSelector(state => state.auth)
  const router = useRouter()
  const [isAllowed, setIsAllowed] = React.useState(false)
  
  const pathname = usePathname()

  const publicRoutes = React.useMemo(() => {
    return Object.values(routes).filter(route => route.isPublic)
  }, [routes])

  const privateRoutes = React.useMemo(() => {
    return Object.values(routes).filter(route => !route.isPublic)
  }, [routes])

  const checkPublicRoute = React.useCallback((path: string, isLogged: boolean) => {
    const routeInfo = publicRoutes.find(route => route.pathname === path) as IPublicRoute

    setIsAllowed(true)

    if (!isLogged || routeInfo.keepAfterAuth) {

      return
    }

    if (isLogged) {
      void router.push(privateRedirectPath)

      return
    }

  }, [privateRedirectPath, publicRoutes, router])

  const checkPrivateRoute = React.useCallback((path: string) => {
    const routeInfo = privateRoutes.find(route => route.pathname === path) as IRouteWithRoles

    const isOpenForAllLoggedUser = routeInfo?.allowedRoles?.includes(RolesEnum.BASE_USER)

    if (isOpenForAllLoggedUser) {
      setIsAllowed(true)

      return
    }

    if (authState?.roles?.length) {
      const canAccess = authState.roles.some((userRole) => {
        return routeInfo?.allowedRoles.some(role => role === userRole)
      })

      setIsAllowed(canAccess)

      return
    }

    setIsAllowed(false)
    void router.push(privateRedirectPath)
  }, [authState.roles, privateRedirectPath, privateRoutes, router])
  
  
  const checkRouteAuth = React.useCallback(() => {
    const path = pathname || ''

    const isPublicRoute = publicRoutes.some(route => route.pathname === path)
    const isLogged = Boolean(authState.user && authState.accessToken)
    
    if (!isLogged && !isPublicRoute) {
      void router.push(publicRedirectPath)

      return
    }
    
    if (isPublicRoute) {
      checkPublicRoute(path, isLogged)

      return
    }

    checkPrivateRoute(path)

  }, [
    authState.accessToken, 
    authState.user, 
    checkPrivateRoute, 
    checkPublicRoute, 
    publicRedirectPath, 
    publicRoutes, 
    router, pathname
  ])


  React.useEffect(() => {
    checkRouteAuth()
    const preventAccess = () => setIsAllowed(false)

    preventAccess()
    checkRouteAuth()
  }, [checkRouteAuth])

  return { isAllowed }
}
