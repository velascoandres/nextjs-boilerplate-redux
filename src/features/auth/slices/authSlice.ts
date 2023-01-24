import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit'

import { RolesEnum } from '@/constants/roles.enum'

import { authApi } from '../api/authApi'

export interface IUser {
  id: number
  firstname: string
  lastname: string
  email: string
}

export interface IAuthError {
  message: string
  error: Record<string, string>
}

export interface ISetAuthPayload {
  accessToken: string
  user: IUser

  roles?: RolesEnum[]
}

export interface ISetErrorPayload {
  error: IAuthError
}

export interface IAuthState {
  loading: boolean
  error: IAuthError | null
  accessToken: string
  user: IUser
  success: boolean,
  roles?: RolesEnum[]
}

const initialState: IAuthState = {
  success: false,
  error: null,
  loading: false,
  accessToken: '',
  user: {
    email: '',
    firstname: '',
    lastname: '',
    id: 0,
  }
}

export const authSlice = createSlice<
  IAuthState,
  SliceCaseReducers<IAuthState>
>({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, { payload }: PayloadAction<ISetAuthPayload>) => {
      state.success = true
      state.error = null
      state.loading = false,
      state.accessToken = payload.accessToken
      state.user = payload.user
    },
    logout: (state) => {
      state.accessToken = ''
      state.user = {
        email: '',
        firstname: '',
        lastname: '',
        id: 0
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.signIn.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.accessToken
        state.user = payload.user
      }
    ),
    builder.addMatcher(
      authApi.endpoints.signup.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.accessToken
        state.user = payload.user
      }
    )
  },
})

export const { setAuth, logout } = authSlice.actions

export default authSlice.reducer
