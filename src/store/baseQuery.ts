import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios from 'axios'

import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'

import { addLoaderItem, removeLoaderItem } from '@/common/slices/loaderSlice'
import {
  addNotification,
  IRequestNotification,
  NotificationEnum,
  removeNotificationsById
} from '@/common/slices/notificationSlice'
import { IRootState } from '@/store/store'

const NOTIFICATION_DURATION_TIME = 5000

export interface IBaseError {
  status: number | undefined
  data: Record<string, unknown>
}

export const axiosBaseQuery =
  <R = unknown, E extends IBaseError = IBaseError>(
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      body?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params'],
      getSuccessAlert?: (data: R) => IRequestNotification,
      getErrorAlert?: (data: E) => IRequestNotification,
    },
    R,
    E
  > =>
    async ({
      url,
      method,
      body,
      params,
      getSuccessAlert,
      getErrorAlert,
    },
    api
    ): Promise<QueryReturnValue<R, E, Record<string, unknown>>> => {

      const state = api.getState() as IRootState
      const dispatch = api.dispatch

      const requestId = Date.now().toString()
      const headers = {} as { [key in string]: string }
      const { accessToken } = state.auth

      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`
      }
      
      const hasAlerts = getSuccessAlert || getSuccessAlert

      dispatch(addLoaderItem(requestId))

      try {
        const result = await axios({ url: baseUrl + url, method, data: body, params, headers })

        const data = result.data

        dispatch(removeLoaderItem(requestId))

        if (getSuccessAlert) {

          const notification = getSuccessAlert(data)

          dispatch(addNotification({
            ...notification,
            id: requestId,
            type: NotificationEnum.SUCCESS,
          }))
        }

        return { data }
      } catch (axiosError) {
          
        dispatch(removeLoaderItem(requestId))

        const err = axiosError as AxiosError

        const error = {
          status: err.response?.status,
          data: err.response?.data || err.message,
        } as E

        if (getErrorAlert) {

          const notification = getErrorAlert(error)

          dispatch(addNotification(
            {
              ...notification,
              id: requestId,
              type: NotificationEnum.ERROR,
            }
          ))
        }

        return {
          error,
        }
      } finally {
        if (hasAlerts) {
          setTimeout(() => {
            dispatch(
              removeNotificationsById(requestId)
            )
          }, NOTIFICATION_DURATION_TIME) 
        }   
          
      }
    }
