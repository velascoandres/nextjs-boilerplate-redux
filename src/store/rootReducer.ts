import authReducer from '@/common/slices/authSlice'
import loaderReducer from '@/common/slices/loaderSlice'
import modalsReducer from '@/common/slices/modalSlice'
import notificationsReducer from '@/common/slices/notificationSlice'
import uiReducer from '@/common/slices/uiSlice'

export const rootReducer = {
  auth: authReducer,
  loader: loaderReducer,
  notifications: notificationsReducer,
  modals: modalsReducer,
  ui: uiReducer,
}
