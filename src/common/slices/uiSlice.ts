import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit'

export interface IUIState {
  sidebarIsHidden: boolean
}

const initialState: IUIState = {
  sidebarIsHidden: false,
}

export const loaderSlice = createSlice<
IUIState,
  SliceCaseReducers<IUIState>
>({
  name: 'loader',
  initialState,
  reducers: {
    showSidebar: (state) => {
      state.sidebarIsHidden = false
    },
    hideSidebar: (state) => {
      state.sidebarIsHidden = true
    },
  },
})

export const { showSidebar, hideSidebar } = loaderSlice.actions

export default loaderSlice.reducer
