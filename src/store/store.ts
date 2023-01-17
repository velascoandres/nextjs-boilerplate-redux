import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { rootApi } from './rootApi'
import { rootReducer } from './rootReducer'
import storage from './storage'
    
const persistConfig = {
  key: 'root',
  version: 1,
  whitelist: ['auth', 'ui'],
  storage,
}
    
const reducers = combineReducers({
  ...rootReducer,
  [rootApi.reducerPath]: rootApi.reducer,
})
    
const persistedReducer = persistReducer(persistConfig, reducers)
    
  
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(rootApi.middleware),
})
    
setupListeners(store.dispatch)
    
export const persistor = persistStore(store)
export type IRootState = ReturnType<typeof store.getState>
export type IAppStore = typeof store
export type IAppDispatch = typeof store.dispatch
  