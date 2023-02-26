import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import * as router from 'next/navigation'

import { RolesEnum } from '@/constants/roles.enum'
import { IRouteMenu } from '@/constants/routes'
import { useAuthCheck } from '@/hooks/useAuthCheck'
import { renderReduxHook } from '@/test-utils/renderReduxHook'

const useRouterMock = jest.spyOn(router, 'useRouter')
const usePathnameMock = jest.spyOn(router, 'usePathname')

const testRoutes: IRouteMenu = {
  publicTest: {
    pathname: '/public-test',
    isPublic: true,
    title: 'public'
  },
  privateTest: {
    pathname: '/private-test',
    isPublic: false,
    title: 'private',
    allowedRoles: [RolesEnum.BASE_USER]
  },
  adminTest: {
    pathname: '/admin-test/[id]/users',
    isPublic: false,
    title: 'private',
    allowedRoles: [RolesEnum.ADMIN]
  },
  galleryTest: {
    pathname: '/gallery',
    isPublic: true,
    title: 'gallery',
    keepAfterAuth: true,
  }
}

const mockAuthState = {
  auth: {
    user: {
      id: 1,
      email: 'some@mail',
      firstname: 'Foo',
      lastname: 'Bar'
    },
    accessToken: 'some-jwt',
    success: true,
    loading: false,
    error: null,
  }
}

const pushMock = jest.fn()

describe('useAuthCheck tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('When hook renders', () => {
    beforeEach(() => {
      useRouterMock.mockImplementation(() => ({ push: pushMock } as unknown as AppRouterInstance))
      usePathnameMock.mockReturnValue('/public-test')
    })

    it('should return default allowed value', () => {
      const { result } = renderReduxHook(() => useAuthCheck(testRoutes, {
        publicRedirectPath: '/public-test',
        privateRedirectPath: '/dashboard-test'
      }))

      expect(result.current.isAllowed).toBeTruthy()
    })
  })

  describe('When user is not logged and are on a private route', () => {
    beforeEach(() => {
      usePathnameMock.mockReturnValue('/private-test')
    })

    it('should redirect to publicRedirectPath', () => {
      const { result } = renderReduxHook(() => useAuthCheck(testRoutes, {
        publicRedirectPath: '/public-test',
        privateRedirectPath: '/dashboard-test'
      }))

      expect(result.current.isAllowed).toBeFalsy()
      expect(pushMock).toHaveBeenCalledWith('/public-test')
    })
  })

  describe('When user is logged and are on a private route', () => {
    beforeEach(() => {
      usePathnameMock.mockReturnValue('/private-test')
    })

    it('should return allowed true', () => {
      const { result } = renderReduxHook(() => useAuthCheck(testRoutes, {
        publicRedirectPath: '/public-test',
        privateRedirectPath: '/dashboard-test'
      }), {
        preloadedState: mockAuthState,
      })

      expect(result.current.isAllowed).toBeTruthy()
    })
  })

  describe('When check access on a route protected by roles', () => {
    beforeEach(() => {
      usePathnameMock.mockReturnValue('/admin-test/[id]/users')
    })

    it('should redirect to set private path if user is not allowed', () => {
      const { result } = renderReduxHook(() => useAuthCheck(testRoutes, {
        publicRedirectPath: '/public-test',
        privateRedirectPath: '/dashboard-test'
      }), {
        preloadedState: mockAuthState,
      })

      expect(result.current.isAllowed).toBeFalsy()
      expect(pushMock).toHaveBeenCalledWith('/dashboard-test')
    })

    it('should return allowed true if user is allowed', () => {
      const { result } = renderReduxHook(() => useAuthCheck(testRoutes, {
        publicRedirectPath: '/public-test',
        privateRedirectPath: '/dashboard-test'
      }), {
        preloadedState: {
          auth: {
            ...mockAuthState.auth,
            roles: [RolesEnum.ADMIN]
          }
        },
      })

      expect(result.current.isAllowed).toBeTruthy()
    })
  })

  describe('When is logged at a public route with keep after auth flag as true', () => {
    beforeEach(() => {
      usePathnameMock.mockReturnValue('/gallery')
    })

    it('should not redirect to the private redirect path', () => {
      const { result } = renderReduxHook(() => useAuthCheck(testRoutes, {
        publicRedirectPath: '/public-test',
        privateRedirectPath: '/dashboard-test'
      }), {
        preloadedState: mockAuthState,
      })

      expect(result.current.isAllowed).toBeTruthy()
      expect(pushMock).not.toHaveBeenCalledWith('/dashboard-test')
      expect(pushMock).not.toHaveBeenCalledWith('/public-test')
    })
  })
})
