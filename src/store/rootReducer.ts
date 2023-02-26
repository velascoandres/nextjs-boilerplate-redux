import authReducer from '@/store/slices/authSlice'
import loaderReducer from '@/store/slices/loaderSlice'
import notificationsReducer from '@/store/slices/notificationSlice'
import uiReducer from '@/store/slices/uiSlice'

export const rootReducer = {
  auth: authReducer,
  loader: loaderReducer,
  notifications: notificationsReducer,
  ui: uiReducer,
}
