import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit'

export enum NotificationEnum{
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface INotification {
  id: string
  type: NotificationEnum
  title: string
  content: string
}

export type IRequestNotification = Omit<INotification, 'type' | 'id'>

export interface INotificationState {
  notifications: INotification[]
}

const initialState: INotificationState = {
  notifications: [],
}

export const notificationSlice = createSlice<
  INotificationState,
  SliceCaseReducers<INotificationState>
>({
  name: 'notificationsSlice',
  initialState,
  reducers: {
    addNotification: (state, { payload }: PayloadAction<INotification>) => {
      state.notifications = [...state.notifications, payload]
    },
    popNotification: (state) => {
      state.notifications.pop()
    },
    removeNotificationsById: (state, { payload: id }: PayloadAction<string>) => {
      const filtered = state.notifications.filter(notification => notification.id !== id)

      state.notifications = filtered
    }
  },
})

export const { addNotification, popNotification, removeNotificationsById } = notificationSlice.actions
export default notificationSlice.reducer
