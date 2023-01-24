import { RolesEnum } from '@/constants/roles.enum'

interface IBaseRoute {
  title: string
  pathname: string,
  includeNavigation?: boolean
}

export interface IPublicRoute extends IBaseRoute {
  isPublic: true
  keepAfterAuth?: boolean
}

export interface IRouteWithRoles extends IBaseRoute {
  isPublic?: false
  allowedRoles: RolesEnum[]
}

export type IRoute = IPublicRoute | IRouteWithRoles



export type IRouteMenu = Record<string, IRoute>

export const ROUTES_MENU = {
  boilerplate:  {
    title: 'Boilerplate',
    pathname: '/',
    isPublic: true,
    includeNavigation: false,
  },
  about:  {
    title: 'About',
    pathname: '/about',
    isPublic: false,
    includeNavigation: true,
    allowedRoles: [RolesEnum.BASE_USER],
  },
  tasks:  {
    title: 'Tasks',
    pathname: '/tasks',
    isPublic: false,
    includeNavigation: true,
    allowedRoles: [RolesEnum.BASE_USER],
  },
  dashboard: {
    title: 'Dashboard',
    pathname: '/dashboard',
    isPublic: false,
    includeNavigation: true,
    allowedRoles: [RolesEnum.BASE_USER]
  },
  profile: {
    title: 'My profile',
    pathname: '/profile',
    isPublic: false,
    includeNavigation: false,
    allowedRoles: [RolesEnum.BASE_USER]
  },
  changeEmail: {
    title: 'Change email',
    pathname: '/profile/change-email',
    isPublic: false,
    includeNavigation: false,
    allowedRoles: [RolesEnum.BASE_USER]
  },
  changePassword: {
    title: 'Change password',
    pathname: '/profile/change-password',
    isPublic: false,
    includeNavigation: false,
    allowedRoles: [RolesEnum.BASE_USER]
  },
  admin: {
    title: 'Admin',
    pathname: '/admin',
    includeNavigation: true,
    isPublic: false,
    allowedRoles: [RolesEnum.ADMIN]
  },
  signIn: {
    title: 'Sign In',
    pathname: '/auth/sign-in',
    isPublic: true,
  },
  signUp: {
    title: 'Sign Up',
    pathname: '/auth/sign-up',
    isPublic: true,
  },
  forgotPassword: {
    title: 'Forgot password',
    pathname: '/auth/forgot-password',
    isPublic: true,
  }
} satisfies IRouteMenu


export const ROUTES: IRoute[] = Object.values(ROUTES_MENU)
