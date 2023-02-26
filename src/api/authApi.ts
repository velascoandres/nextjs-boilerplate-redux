import { ENDPOINTS_TAGS, rootApi } from '@/store/rootApi'
import { IUser } from '@/store/slices/authSlice'
import { IRequestNotification } from '@/store/slices/notificationSlice'

export interface ILoginRequest {
  email: string
  password: string
}

export interface ISignupRequest {
  email: string
  password: string
  firstname: string
}

interface ILoginSingupRawResponse {
  access_token: string
  user: IUser
}

interface ILoginSingupResponse {
  accessToken: string
  user: IUser
}

const COMMON_TRASNFORM = (response: ILoginSingupRawResponse) => ({
  accessToken: response.access_token,
  user: response.user
})

export const authApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<ILoginSingupResponse, ILoginRequest>({
      query: (credentials) => ({
        url: 'auth/sign-in',
        method: 'POST',
        body: credentials,
        getSuccessAlert: (data) => {

          const loginResponse = data as ILoginSingupResponse

          return {
            title: 'Task manager',
            content: `Welcome: ${loginResponse.user.firstname}`,
          } as IRequestNotification
        },
        getErrorAlert: () => ({
          title: 'Login user fails',
          content: 'Error on login',
        })
      }),
      invalidatesTags: [ENDPOINTS_TAGS.AUTH],
      transformResponse: COMMON_TRASNFORM,
    }),
    signup: builder.mutation<ILoginSingupResponse, ISignupRequest>({
      query: (credentials) => ({
        url: 'auth/sign-up',
        method: 'POST',
        body: credentials,
        getErrorAlert: () => ({
          title: 'Create account fails',
          content: 'Error on create user',
        }),
        getSuccessAlert: (data) => {

          const loginResponse = data as ILoginSingupResponse

          return {
            title: 'Success',
            content: `Account Created: ${loginResponse.user.email}`,
          } as IRequestNotification
        },
      }),
      invalidatesTags: [ENDPOINTS_TAGS.AUTH],
      transformResponse: COMMON_TRASNFORM,
    }),
  }),
})

export const { useSignInMutation, useSignupMutation } = authApi