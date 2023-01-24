import loaderReducer from '@/common/slices/loaderSlice'
import notificationsReducer from '@/common/slices/notificationSlice'
import uiReducer from '@/common/slices/uiSlice'
import authReducer from '@/features/auth/slices/authSlice'

export const rootReducer = {
  auth: authReducer,
  loader: loaderReducer,
  notifications: notificationsReducer,
  ui: uiReducer,
}
