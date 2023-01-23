import authReducer from '@/common/slices/authSlice'
import loaderReducer from '@/common/slices/loaderSlice'
import notificationsReducer from '@/common/slices/notificationSlice'
import uiReducer from '@/common/slices/uiSlice'

export const rootReducer = {
  auth: authReducer,
  loader: loaderReducer,
  notifications: notificationsReducer,
  ui: uiReducer,
}
